#!/bin/bash
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

CONSUMESJSON='"consumes": [
    "application/json"
  ]'

PRODUCESJSON='"produces": [
    "application/json"
  ]'

SCHEMESJSON='"schemes": [
    "https"
  ]'

SERVERSJSON='"servers": [
    {
      "url": "api-play.paas.macrometa.io",
      "description": "Production server"
    }
  ]'
SECURITYJSON='"security": [
    {
      "ApiKeyAuth": []
    }
  ]'

SECURITYDEFINITIONSJSON='"securityDefinitions": {
    "ApiKeyAuth": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    }
  }'

jq ". + { $HOSTJSON } |  \
    . + { $CONSUMESJSON } | \
    . + { $PRODUCESJSON } | \
    . + { $SCHEMESJSON } | \
    . + { $SERVERSJSON } | \
    . + { $SECURITYJSON } | \
    . + { $SECURITYDEFINITIONSJSON }" \
   $INPUTFILE > $OUTPUTFILE

rm -f $TEMPFILE
