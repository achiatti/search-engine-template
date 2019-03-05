from django.db import models

# Create your models here.

class FigureInfo:
    def __init__(self,figid,desc="No description found",figloc="No image file found"):
        self.figid=figid
        self.desc=desc
        self.figloc=figloc
        self.reloc=""

class FigureResult:
    def __init__(self,figid,figloc="Image not found",authors="Unknown Authors",desc=""):
        self.figid=figid
        self.figloc=figloc
        self.desc=desc

class HTMLResult:
    def __init__(self,htmlid,title="title not found",content="content not found",url="no url found",keywords="no keyword found",lesscontent=None):
        self.htmlid=htmlid
        self.title=title
        self.content=content
        self.url=url
        self.keywords=keywords
        self.lesscontent=lesscontent

class SummaryResult:
    def __init__(self,docid,article="article not found",summary="summary not found",lessarticle=None,lesssummary=None):
        self.docid=docid
        self.article=article
        self.summary=summary
        self.lessarticle=lessarticle
        self.lesssummary=lesssummary

          	
