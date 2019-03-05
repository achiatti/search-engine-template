ELASTIC_PORT=9202
INTERFACE_PORT=5002


#################################
#INTERFACE STARTUP
#################################
#echo $ELASTIC_PORT > interface/elastic-settings.txt

if sudo lsof -Pi :$INTERFACE_PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Interface already running for this port"
else
    cd interface
    nohup python manage.py runserver ist441giles.ist.psu.edu:$INTERFACE_PORT  &
    echo "Interface started on http://yourhost.edu:$INTERFACE_PORT"
    cd ..
fi
