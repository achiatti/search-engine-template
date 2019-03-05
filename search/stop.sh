ELASTIC_PORT=9202
INTERFACE_PORT=5002


#if lsof -Pi :$ELASTIC_PORT -sTCP:LISTEN -t >/dev/null ; then
   # command to stop $ELASTIC_PORT
   #echo "Elastic process killed"
#else
#    echo "Elastic is not running"
#fi

if lsof -Pi :$INTERFACE_PORT -sTCP:LISTEN -t >/dev/null ; then
    INTERFACE_PID=`lsof -i tcp:$INTERFACE_PORT| tail -n +2 | awk '{print $2}'`
    kill $INTERFACE_PID
    echo "Interface process killed"
else
    echo "Interface process not running"
fi

