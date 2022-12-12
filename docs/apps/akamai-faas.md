---
sidebar_position: 17
title: Akamai FaaS
---

## Macrometa

| **Platform**                       | **Tenat**                      | **Geo Fabric** |
| ---------------------------------- | ------------------------------ | -------------- |
| [Play](https://play.macrometa.io/) | `demo-akamai-ew@macrometa.com` | `_system`      |

## Akamai

| **URL**                                              | **Email**            |
| ---------------------------------------------------- | -------------------- |
| [Akamai Control Center](https://control.akamai.com/) | `demo@macrometa.com` |

## Query Worker

`get_car_by_model`

```
FOR doc in cars
FILTER doc.car_model == @model
RETURN doc
```

Sample value for `@model` could be "Lecacy".

## Function

### `get_car_by_make`

cURL command

```
curl -X 'POST' 'https://api-play.paas.macrometa.io/_fabric/_system/_api/function/invoke/get_car_by_make?params=%7B%22make%22%3A%22Mercedes%22%7D' \
 -H 'accept: application/json' \
 -H 'Authorization: apikey <API_KEY>' \
 -d ''
```

cURL command to invoke Akamai EdgeWorker directly

```
curl --location -g -X GET 'https://macrometa-akamai-ew.macrometa.io/mm-_system-get_car_by_make?bindVars={"make":"Mercedes"}' \
-H 'authorization: apikey <API_KEY>'
```

Sample value used here is `{"make":"Mercedes"}`

### `add_car_data`

cURL command

```
curl -X 'POST' \
'https://api-play-us-west.paas.macrometa.io/_fabric/_system/_api/function/invoke/add_car_data?params=%20%7B%22car_make%22%3A%22Mercedes%22%2C%22car_model%22%3A%22Benz%22%2C%22car_model_year%22%3A1996%7D' \
 -H 'accept: application/json' \
 -H 'Authorization: apikey <API_KEY> \
 -d ''
```

Sample value used here is `{"car_make":"Mercedes","car_model":"Benz","car_model_year":1996}`

### `car_adhoc_query`

cURL command

```
curl -X 'POST' \
'https://api-play-us-west.paas.macrometa.io/_fabric/_system/_api/function/invoke/car_adhoc_query?params=%7B%22query%22%3A%22SELECT%20*%20FROM%20TotalCarsByMake%22%7D' \
-H 'accept: application/json' \
-H 'Authorization: apikey <API_KEY> \
-d ''
```

**Note**: Stream workers `add_car_data` and `car_adhoc_query`, used for the functions above, must be published in your current location.
