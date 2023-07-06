#!/bin/bash

# ------------------------------------------------------------
# THIS SCRIPT IS FOR USE ON OPENAPI 3.0 FORMATTED SPECS
# ------------------------------------------------------------

INPUTFILE=$1
OUTPUTFILE=$2
TEMPFILE="/tmp/json.$$"

if [ -z $INPUTFILE ] || [ -z $OUTPUTFILE ]; then
   echo "usage:  $0 input-file output-file"
   exit 1
fi

if [[ "$INPUTFILE" == "http"* ]]; then
   curl -s $INPUTFILE > $TEMPFILE
   INPUTFILE=$TEMPFILE
fi

if [ ! -f $INPUTFILE ]; then
   echo "Input file missing."
   echo "usage:  $0 input-file output-file"
   exit 1
fi

HOSTJSON='"host": "api-play.paas.macrometa.io"'

SERVERSJSON='"servers": [
    {
      "url": "https://api-play.paas.macrometa.io",
      "description": "GDN API"
    }
  ]'

jq ". + { $HOSTJSON } |  \
    . + { $SERVERSJSON }" \
   $INPUTFILE > $OUTPUTFILE

rm -f $TEMPFILE
