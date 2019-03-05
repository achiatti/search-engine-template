from django.http import HttpResponse
from django.shortcuts import render_to_response
from models import *
from django.template.context import RequestContext
import settings
from django.shortcuts import get_object_or_404
import requests
from settings import *
from manage import * 
from elasticsearch import Elasticsearch, helpers

ERR_QUERY_NOT_FOUND='<h1>Query not found</h1>'
ERR_IMG_NOT_AVAILABLE='The requested result can not be shown now'

ELASTIC_PORT = "9202"
#USER = open("elastic-settings.txt").read().split("\n")[1]
#PASSWORD = open("elastic-settings.txt").read().split("\n")[2]
ELASTIC_INDEX= 'YOUR_INDEX_NAME'

#open connection to Elastic
es = Elasticsearch(

['YOUR_HOST_NAME'],
port= ELASTIC_PORT
)

#Include the following if user authentication is on (i.e., XPack is installed and linked with Elastic)
#http_auth=(USER, PASSWORD),

def home(request):
    if request.method == 'POST':
        q = request.POST.get('q',None)
        start=request.POST.get('start',0)
        if q != None and len(q) > 2:
            return search(request,q,start)
        else:
            if q==None:
                return render_to_response('rsc/index.html',{'errormessage':None},context_instance=RequestContext(request))
            else:
                errormessage='Please use larger queries'
                return render_to_response('rsc/index.html',{'errormessage':errormessage},context_instance=RequestContext(request))
    else: # it's a get request, can come from two sources. if start=0, or start not in GET dictionary, someone is requesting the page 
         #for the first time 
   
        start=int(request.GET.get('start',0))
        query=request.GET.get('q',None)
        if start==0 or query==None:
            return render_to_response('rsc/index.html',context_instance=RequestContext(request))
        else:
            return search(request,query,start)
                

def search(request,query,start):
      
       size=10       
 
       res = es.search(index=ELASTIC_INDEX, body= {"from": start, "size": size, "query":{"match":{"content": query} }, 'highlight':{'fields':{'content':{} }}})

       if not res.get('hits'):

            return render_to_response('rsc/error.html',{'errormessage':'Your query returned zero results, please try another query'})
        
         
       else:
            print "search done"
            totalresultsNumFound= res['hits']['total']
            #hlresults=r.json()['highlighting']
            results=res['hits']['hits']
            SearchResults=[] 
            if len(results) > 0:
                for result in results:

                    resultid= result['_id'] 
                    f = SearchResult(resultid) #calling the object class that is defined inside models.py

                    f.content= result['_source']['content']
                    
                    
                    rawpath= result['_source']['file']['url']
                    
                    #removing local folder path
                    f.url= rawpath.split('/data/ist441/team1/crawler/heritrix-3.3.0-SNAPSHOT/jobs/test1/latest/mirror/')[1]

                    f.title = result['_source']['meta']['title']
                    #f.description = str(result['_source']['meta']['raw']['description'])
                    f.description =result['highlight']['content']

                    f.description = " ".join(f.description).encode("utf-8")
                    '''
                    if len(result.get('category',[])) > 0:
                       f.category=result['category'][0].encode("utf-8") 
                    '''
                    #trying to use the location field to get the file name to display the image
                    #f.filename= str(imageid)+'.png'
                    SearchResults.append(f)
                
                return render_to_response('rsc/htmlresult.html', {'results':SearchResults ,'q': query,\
							  'total':totalresultsNumFound, 'i':str(start+1)\
							  , 'j':str(len(results)+start) },context_instance=RequestContext(request))
            else:
               return render_to_response('rsc/error.html',{'errormessage':'Your search returned zero results, please try another query'}\
            ,context_instance=RequestContext(request))
				
	


