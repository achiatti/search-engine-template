# search-engine-template
Template code to build your own search engine in Django and Elasticsearch for Python.

## Dependencies 

* Elasticsearch 6.1 
* Kibana 6.1
* fs-crawler 2.4
* Django 
* Python requests 

Note that Web crawling is omitted here (Heritrix or Scrapy are good alternatives).
This example indexes custom data available locally.

Following are some step-by-step guidelines to get the code up and running.

## Step 1: Indexing data in Elasticsearch

  Prerequisite: creating an index in [Kibana](https://www.elastic.co/guide/en/kibana/6.2/tutorial-load-dataset.html)
  Different data analyzers for pre-processing can be found in the [reference docs](
  https://www.elastic.co/guide/en/elasticsearch/reference/6.2/analysis.html)


## Step 2: Indexing data from file system

  Works for HTML pages. If your collection is already in JSON format (Elasticsearch 6.1 native format), see Python alternative below.
  Using FS crawler for Elasticsearch (which is actually an indexer!):
  https://github.com/dadoonet/fscrawler
    

## Alternative: Elasticsearch Python API to index local JSON files 

   A code example is provided under `./search/jsonIndexer.py`

## Step 3: Customising your search engine interface!

   All implemented within Python Django. The interface-related code can be found under the
   `./search/interface` folder. 
   

   * `startup.sh` and `stop.sh` start and kill the interface process respectively.
   * `./interface/media` can be used to store images to use and/or index in the search engine. It is linked with the `settings.py` file
     too, to ensure that the browser visualization of local files is enabled (see `urls.py` file settings too). 
   * `./interface/templates` gathers all the HTML templates used in this demo. Related stylesheets are store under `intui-static`
   * Following the Django framework, models for the data records to retrieve are defined under `./interface/rsc/models.py`
   * `./interface/rsc/views.py` is the main file handling the whole querying of the index. Queries can be defined directly 
     in Python, ideally after testing out the syntax from the Kibana interface on toy examples. 
     This module exploits python Django also to return specific web pages based on the outcomes of the request sent to the Elasticsearch index 

