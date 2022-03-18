---
sidebar_position: 5
---

# Using mmDynamo Javascript SDK with Macrometa

## Browser(Javascript) NPM

* Install `mmdynamo`

  ```js
  npm install mmdynamo --save
  ```

* Import package

  ```js
  import { DynamoDB } from "mmdynamo";
  ```

* Initialize Dynamodb

  ```js
  import { DynamoDB } from "mmdynamo";

  const dcName = "test.macrometa.io";
  const host = "https://api-" + dcName;
  const apiKey = "xxxxxxxxxxxxxxxxxxxxxx";
  /*
  If you have a JWT token

  const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
  */

  const service = "dynamodb";
  const region = "us-east-1";
  const endpoint = host + "/_api/dynamo";
  // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
  const secretAccessKey = "c8";
  const accessKeyId = "apikey " + apiKey;
  /*
  If you are using JWT token use the below instead

  const accessKeyId = "bearer " + JWT;
  */

  const client = new DynamoDB({
    region,
    endpoint,
    accessKeyId,
    secretAccessKey,
  });
  ```

## Browser(Javascript) as Library

* Add `mmdynamo`

  ```html
  <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>
  ```

* Initialize Dynamodb with C8 DynamoMode

  ```html
  <script type="text/javascript">
  const dcName = "gdn.paas.macrometa.io";
  const host = "https://api-" + dcName;
  const apiKey = "<your-api-key>";
  /*
  If you have a JWT token

  const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
  */

  const service = "dynamodb";
  const region = "us-east-1";
  const endpoint = host + "/_api/dynamo";
  // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
  const secretAccessKey = "c8";
  const accessKeyId = "apikey " + apiKey;

    /*
  If you are using JWT token use the below instead

  const accessKeyId = "bearer " + JWT;
  */
    const { DynamoDB } = window.mmdynamo;

    const client = new DynamoDB({
      region,
      endpoint,
      accessKeyId,
      secretAccessKey,
    });
  </script>
  ```


## Create a Table

```html

<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "gdn.paas.macrometa.io";
    const host = "https://api-" + dcName;
    const apiKey = "<your-api-key>";
    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
      const { DynamoDB } = window.mmdynamo;

      const client = new DynamoDB({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

      function createMovies() {
        var params = {
          TableName: "Movies",
          KeySchema: [
            { AttributeName: "year", KeyType: "HASH" },
            { AttributeName: "title", KeyType: "RANGE" },
          ],
          AttributeDefinitions: [
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        };

        client.createTable(params, function (err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML =
              "Unable to create table: " +
              "\n" +
              JSON.stringify(err, undefined, 2);
          } else {
            document.getElementById("textarea").innerHTML =
              "Created table: " + "\n" + JSON.stringify(data, undefined, 2);
          }
        });
      }
    </script>
  </head>

  <body>
    <input
      id="createTableButton"
      type="button"
      value="Create Table"
      onclick="createMovies();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>

```

## Create an Item

```html

<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "gdn.paas.macrometa.io";
    const host = "https://api-" + dcName;
    const apiKey = "<your-api-key>";
    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
      const { DynamoDB } = window.mmdynamo;

      const client = new DynamoDB({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

      function createItem() {
        var params = {
          TableName: "Movies",
          Item: {
            year: { N: "2015" },
            title: { S: "The Big New Movie" },
          },
        };

        client.putItem(params, function (err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML =
              "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
          } else {
            document.getElementById("textarea").innerHTML =
              "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
          }
        });
      }
    </script>
  </head>

  <body>
    <input
      id="createItem"
      type="button"
      value="Create Item"
      onclick="createItem();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>
```

## Read an Item

```html

<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "gdn.paas.macrometa.io";
    const host = "https://api-" + dcName;
    const apiKey = "<your-api-key>";
    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
      const { DynamoDB } = window.mmdynamo;

      const client = new DynamoDB({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

      function readItem() {
        var table = "Movies";
        var year = 2015;
        var title = "The Big New Movie";

        var params = {
          TableName: table,
          Key: {
            year: year,
            title: title,
          },
        };

        client.getItem(params, function (err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML =
              "Unable to read item: " +
              "\n" +
              JSON.stringify(err, undefined, 2);
          } else {
            document.getElementById("textarea").innerHTML =
              "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
          }
        });
      }
    </script>
  </head>

  <body>
    <input
      id="readItem"
      type="button"
      value="Read Item"
      onclick="readItem();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>
```

## Update an Item

```html

<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "gdn.paas.macrometa.io";
    const host = "https://api-" + dcName;
    const apiKey = "<your-api-key>";
    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
      const { DynamoDB } = window.mmdynamo;

      const client = new DynamoDB({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

   const { DynamoDB } = window.mmdynamo;

const client = new DynamoDB({
  region,
  endpoint,
  accessKeyId,
  secretAccessKey,
});
    

      function updateItem() {
     
        var table = "Movies";
        var year = "2015";
        var title = "The Big New Movie";

        var params = {
          TableName: table,
          Key: {
            year: { N: year },
            title: { S: title },
          },
        };

        client.updateItem(params, function (err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML =
              "Unable to update item: " +
              "\n" +
              JSON.stringify(err, undefined, 2);
          } else {
            document.getElementById("textarea").innerHTML =
              "UpdateItem succeeded: " +
              "\n" +
              JSON.stringify(data, undefined, 2);
          }
        });
      }
   
    </script>
  </head>

  <body>
    <input
      id="updateItem"
      type="button"
      value="Update Item"
      onclick="updateItem();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>
```


## Query Data
```html

<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "smoke1.eng3.macrometa.io"
    const host = "https://api-" + dcName;
    const apiKey = "guest.id1.CGYpbciDDhYK5cnyIjdSXQln2PUj1x7qO0cS4YgR9HBFzEm34cvhKa2Ge7kh00Zgce1af7"


    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;

      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
   const { DynamoDB } = window.mmdynamo;

const client = new DynamoDB({
  region,
  endpoint,
  accessKeyId,
  secretAccessKey,
});
    

function queryData() {
        document.getElementById("textarea").innerHTML +=
          "Querying for movies from 1985.";

        var params = {
          TableName: "Movies",
          ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
          KeyConditionExpression:
            "#yr = :yyyy and title between :letter1 and :letter2",
          ExpressionAttributeNames: { "#yr": "year" },
          ExpressionAttributeValues: {
            ":yyyy": { N: "1992" },
            ":letter1": { S: "A" },
            ":letter2": { S: "L" },
          },
        };

        client.query(params, function (err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML +=
              "Unable to query. Error: " +
              "\n" +
              JSON.stringify(err, undefined, 2);
          } else {
            document.getElementById("textarea").innerHTML +=
              "Querying for movies from 1992 - titles A-L, with genres and lead actor: " +
              "\n" +
              JSON.stringify(data, undefined, 2);
          }
        });
      }


   
    </script>
  </head>

  <body>
    <input
      id="Query"
      type="button"
      value="Query Data"
      onclick="queryData();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>
```
## Scan Data

```html

<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "smoke1.eng3.macrometa.io"
    const host = "https://api-" + dcName;
    const apiKey = "guest.id1.CGYpbciDDhYK5cnyIjdSXQln2PUj1x7qO0cS4YgR9HBFzEm34cvhKa2Ge7kh00Zgce1af7"


    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;

      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
   const { DynamoDB } = window.mmdynamo;

const client = new DynamoDB({
  region,
  endpoint,
  accessKeyId,
  secretAccessKey,
});
    
function scanData() {
        document.getElementById("textarea").innerHTML +=
          "Scanning Movies table." + "\n";

        var params = {
          TableName: "Movies",
          ProjectionExpression: "#yr, title, info.rating",
          FilterExpression: "#yr between :start_yr and :end_yr",
          ExpressionAttributeNames: { "#yr": "year" },
          ExpressionAttributeValues: {
            ":start_yr": { N: "1950" },
            ":end_yr": { N: "1959" },
          },
        };

        client.scan(params, onScan);

        function onScan(err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML +=
              "Unable to scan the table: " +
              "\n" +
              JSON.stringify(err, undefined, 2);
          } else {
            // Print all the movies
            document.getElementById("textarea").innerHTML +=
              "Scan succeeded. " + "\n";
            data.Items.forEach(function (movie) {
              document.getElementById("textarea").innerHTML +=
                movie.year +
                ": " +
                movie.title +
                " - rating: " +
                movie.info.rating +
                "\n";
            });

            // Continue scanning if we have more movies (per scan 1MB limitation)
            document.getElementById("textarea").innerHTML +=
              "Scanning for more..." + "\n";
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            client.scan(params, onScan);
          }
        }
      }


   
    </script>
  </head>

  <body>
    <input
      id="Scan"
      type="button"
      value="Scan Data"
      onclick="scanData();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>
```

## Delete Item

```html
<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "gdn.paas.macrometa.io";
    const host = "https://api-" + dcName;
    const apiKey = "<your-api-key>";
    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
      const { DynamoDB } = window.mmdynamo;

      const client = new DynamoDB({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

     
      function conditionalDelete() {
        var params = {
          TableName: "Movies",
          Key: { year: { N: "2015" }, title: { S: "The Big New Movie" } },
          ConditionExpression: "info.rating <= :val",
          ExpressionAttributeValues: { ":val": { N: "5" } },
        };

        client.deleteItem(params, function (err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML =
              "The conditional delete failed: " +
              "\n" +
              JSON.stringify(err, undefined, 2);
          } else {
            document.getElementById("textarea").innerHTML =
              "The conditional delete succeeded: " +
              "\n" +
              JSON.stringify(data, undefined, 2);
          }
        });
      }
    </script>
  </head>

  <body>
    <input
      id="deleteItem"
      type="button"
      value="Delete Item"
      onclick="conditionalDelete();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>
```

## Delete Table

```html

<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
    const dcName = "gdn.paas.macrometa.io";
    const host = "https://api-" + dcName;
    const apiKey = "<your-api-key>";
    /*
    If you have a JWT token

    const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
    */

    const service = "dynamodb";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
      /*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */
      const { DynamoDB } = window.mmdynamo;

      const client = new DynamoDB({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

      function deleteMovies() {
        var params = {
          TableName: "Movies",
        };

        client.deleteTable(params, function (err, data) {
          if (err) {
            document.getElementById("textarea").innerHTML =
              "Unable to delete table: " +
              "\n" +
              JSON.stringify(err, undefined, 2);
          } else {
            document.getElementById("textarea").innerHTML = "Table deleted.";
          }
        });
      }

    </script>
  </head>

  <body>
    <input
      id="deleteTable"
      type="button"
      value="Delete Table"
      onclick="deleteMovies();"
    />
    <br /><br />
    <textarea
      readonly
      id="textarea"
      style={{ width:400px; height:800px }}
    ></textarea>
  </body>
</html>
```