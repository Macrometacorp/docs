---
sidebar_position: 4
---

# Using AWS Boto3 with Macrometa

## Prerequistes

1. Create an API Key
    * Login to your tenant account on https://gdn.paas.macrometa.io
    * Create an API key via REST API. Make a copy of the key.

    :::tip
        Following api key is created under `demo@macrometa.io/_system` on https://gdn.paas.macrometa.io with `rw` permissions.
        ```
            demo.demok1.1a1aad0f4b000ca4d2d3bdb505298cbb9467b65526b0f79364e61e5f00000000
        ```
    :::
2. Install boto3

        ```
            pip install boto3==1.0.0

        ```
    You can find more details here - https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html#installation


## Create a Table

``` python tab="Python"
import boto3

REGION = "us-east-1"
dcName = "gdn.paas.macrometa.io"
host = "https://api-" + dcName
apiKey = "<your-api-key>"
accessKeyId = "apikey " + apiKey

def create_movie_table(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.client('dynamodb',
                                region_name=REGION,
                                endpoint_url=host + "/_api/dynamo",
                                aws_access_key_id=accessKeyId,
                                aws_secret_access_key=""
                                )
    table = dynamodb.create_table(
        TableName='Movies',
        KeySchema=[
            {
                'AttributeName': 'year',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'title',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'year',
                'AttributeType': 'N'
            },
            {
                'AttributeName': 'title',
                'AttributeType': 'S'
            },

        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table


if __name__ == '__main__':
    movie_table = create_movie_table()
    print("Table status:", movie_table)
```

## Load Sample Data

```python tab="Python"
import json
import boto3


REGION = "us-east-1"
REGION = "sfo2"
dcName = "gdn.paas.macrometa.io"
host = "https://api-" + dcName
apiKey ="<your-api-key>";
host = "https://api-" + dcName
accessKeyId = "apikey " + apiKey

def load_movies(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.client('dynamodb',
                                region_name=REGION,
                                endpoint_url=host + "/_api/dynamo",
                                aws_access_key_id=accessKeyId,
                                aws_secret_access_key=""
                                )

        print("Adding movie:")
        dynamodb.put_item(
            TableName="Movies",
            Item=   {
            "year": {"N": "2013"},
            "title": {"S": "Rush"},
            "info": {"M":
                {
                    "directors": {"L": [{"S": "Ron Howard"}]},
                    "release_date": {"S": "2013-09-02T00:00:00Z"},
                    "rating": {"N": "8.3"},
                    "genres": {"L": [{"S": "Action"}, {"S": "Biography"}, {"S": "Drama"}, {"S": "Sport"}]},
                    "image_url": {"S": "http://ia.media-imdb.com/images/M/MV5BMTQyMDE0MTY0OV5BMl5BanBnXkFtZTcwMjI2OTI0OQ@@._V1_SX400_.jpg"},
                    "plot": {"S": "A re-creation of the merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda."},
                    "rank": {"N": "2"},
                    "running_time_secs": {"N": "7380"},
                    "actors": {"L": [{"S": "Daniel Bruhl"}, {"S": "Chris Hemsworth"}, {"S": "Olivia Wilde"}]}
                }
            }
        }
        )
       
if __name__ == '__main__':
    
    load_movies()
    
```

## Read an Item

```python tab="Python"
import boto3

REGION = "us-east-1"
REGION = "sfo2"
dcName = "gdn.paas.macrometa.io"
host = "https://api-" + dcName
apiKey ="<your-api-key>";
accessKeyId = "apikey " + apiKey

def get_movie(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.client('dynamodb',
                                region_name=REGION,
                                endpoint_url=host + "/_api/dynamo",
                                aws_access_key_id=accessKeyId,
                                aws_secret_access_key=""
                                )

       
        resp =dynamodb.get_item(
            TableName="Movies",
            Key={"year": {"N": "2013"},
            "title": {"S": "Rush"}}
        )
        print("Get movie: ", resp)

if __name__ == '__main__':   
    get_movie()
```

## Update an Item

```python tab="Python"
import boto3

REGION = "us-east-1"
REGION = "sfo2"
dcName = "gdn.paas.macrometa.io"
host = "https://api-" + dcName
apiKey ="<your-api-key>";
accessKeyId = "apikey " + apiKey

def update_movie(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.client('dynamodb',
                                region_name=REGION,
                                endpoint_url=host + "/_api/dynamo",
                                aws_access_key_id=accessKeyId,
                                aws_secret_access_key=""
                                )

        resp =dynamodb.update_item(
            TableName="Movies",
            Key= {
            "year": {"N": "2013"},
            "title": {"S": "Rush"}
            },
            UpdateExpression="set info.rating = :r, info.plot=:p",
            ExpressionAttributeValues= {
                ":r": {"N":"5.5"},
                ":p": {"S":"Everything happens all at once."},
            },
            ReturnValues= "UPDATED_OLD"
        )
        print("Update movie: ", resp)

if __name__ == '__main__':
    
    update_movie()

```

## Query
```python tab="Python"

import boto3
from decimal import Decimal


REGION = "us-east-1"
REGION = "sfo2"
dcName = "gdn.paas.macrometa.io"
host = "https://api-" + dcName
apiKey ="<your-api-key>";
accessKeyId = "apikey " + apiKey

def query(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.client('dynamodb',
                                region_name=REGION,
                                endpoint_url=host + "/_api/dynamo",
                                aws_access_key_id=accessKeyId,
                                aws_secret_access_key=""
                                )

        resp =dynamodb.query(
            TableName="Movies",
            KeyConditionExpression="title == :t",
            ExpressionAttributeValues={
                ":t": {"S": "Rush"}
            },
            Limit=12
        )
        print("query response: ", resp)
if __name__ == '__main__':
    
    query()
```

## Delete an Item

```python tab="Python"

import boto3
from decimal import Decimal


REGION = "us-east-1"
REGION = "sfo2"
dcName = "gdn.paas.macrometa.io"
host = "https://api-" + dcName
apiKey ="<your-api-key>";
accessKeyId = "apikey " + apiKey

def delete_item(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.client('dynamodb',
                                region_name=REGION,
                                endpoint_url=host + "/_api/dynamo",
                                aws_access_key_id=accessKeyId,
                                aws_secret_access_key=""
                                )

        resp =dynamodb.delete_item(
            TableName="Movies",
            Key= {
            "year": {"N": "2013"},
            "title": {"S": "Rush"}
            },
            ReturnValues="ALL_OLD",
            ConditionExpression="title == :f",
            ExpressionAttributeValues={
                ":f": {"S": "Rush"},
            }
        )
        print("delete response: ", resp)

if __name__ == '__main__':
    
    delete_item()

```
