Create Table

1. Browser

Save as .html and open the file in your browser.

```html
<html>
  <head>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.16.min.js"></script>

    <script>
      const dcName = "test.macrometa.io";
      const host = "https://api-" + dcName;

      const apiKey = "xxxxxxxxxxxxxxxxxxxxxx";
      const accessKeyId = "apikey " + apiKey;

      // OR
      // const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
      // const accessKeyId = "bearer " + JWT;

      const service = "dynamodb";
      const region = "us-east-1";
      const endpoint = host + "/_api/dynamo";
      const secretAccessKey = "c8";

      AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

      var dynamodb = new AWS.DynamoDB();

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

        dynamodb.createTable(params, function (err, data) {
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

2. JS/NODE

```js
var AWS = require("aws-sdk");

const dcName = "test.macrometa.io";
const host = "https://api-" + dcName;

const apiKey = "xxxxxxxxxxxxxxxxxxxxxx";
const accessKeyId = "apikey " + apiKey;

// OR
// const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
// const accessKeyId = "bearer " + JWT;

const service = "dynamodb";
const region = "us-east-1";
const endpoint = host + "/_api/dynamo";
const secretAccessKey = "c8";

AWS.config.update({
  region,
  endpoint,
  accessKeyId,
  secretAccessKey,
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Movies",
  KeySchema: [
    { AttributeName: "year", KeyType: "HASH" }, //Partition key
    { AttributeName: "title", KeyType: "RANGE" }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "year", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
```
