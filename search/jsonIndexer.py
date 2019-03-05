from json import dumps
import os
from elasticsearch import Elasticsearch, helpers
import sys, json

#path to JSON collection
path='path/to/your/json/collection'

#User credentials 
USER=''
PASSWORD=''

#Choose a name for your index and an ad hoc document type (e.g. newsarticle)
INDEX_NAME='ist441-test'
DOCTYPE='webpage'

#Configuring connection parameters
es = Elasticsearch(

['ist441giles.ist.psu.edu'],
port= 9201

)

#Example without XPack (user, password) installed
#http_auth=(USER, PASSWORD),

#To avoid loading everything in memory, we use a generator
def load_json(directory):
	
	for filename in os.listdir(directory):
		if filename.endswith('.json'):
			with open(os.path.join(directory,filename),'r') as open_file:
				yield json.load(open_file)

#Indexing in Elastic via bulk load

helpers.bulk(es, load_json(path), index=INDEX_NAME, doc_type=DOCTYPE)
