

A transaction is created, and collections coll1 and coll2 are expected to be written to within the transaction:

```bash
curl -X 'POST' \
  'https://api-xxyyzz-san.eng.macrometa.io/_fabric/_system/_api/transaction/begin' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: apikey <YOUR API KEY>' \
  -d '{
  "collections": {
    "write": [
      "coll1",
      "coll2"
    ]
  }
}'
```

Here is a possible response, in which the ID of the just-created transaction is 14464588:

```json
{
  "code": 201,
  "error": false,
  "result": {
    "id": "14464588",
    "status": "running"
  }
}
```

Then two documents are inserted into coll1 within transaction 14464588:

```bash
    curl -X 'POST' \
    'https://api-xxyyzz-san.eng.macrometa.io/_fabric/_system/_api/document/coll1' \
    -H 'accept: application/json' \
    -H 'x-gdn-trxid: 14464588' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: apikey <YOUR API KEY>' \
    -d '[
    {
        "name": "foo",
        "value": 42
    },
    {
        "name": "bar",
        "value": 523
    }
    ]'
```

Then a document with key abc-def-ghi is removed from collection coll2 within transaction 14464588:

```bash
curl -X 'DELETE' \
  'https://api-xxyyzz-san.eng.macrometa.io/_fabric/_system/_api/document/coll2/abc-def-ghi' \
  -H 'accept: application/json' \
  -H 'x-gdn-trxid: 14464588' \
  -H 'Authorization: apikey <YOUR API KEY>'
```

Finally, transaction 14464588 is committed:

```bash
curl -X 'PUT' \
  'https://api-xxyyzz-san.eng.macrometa.io/_fabric/_system/_api/transaction/14464588' \
  -H 'accept: application/json' \
  -H 'Authorization: apikey <YOUR API KEY>'
```

or aborted:

```bash
curl -X 'DELETE' \
  'https://api-xxyyzz-san.eng.macrometa.io/_fabric/_system/_api/transaction/14464588' \
  -H 'accept: application/json' \
  -H 'Authorization: apikey <YOUR API KEY>'
```
