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

      var docClient = new AWS.DynamoDB.DocumentClient();

      function updateItem() {
        var table = "Movies";
        var year = 2015;
        var title = "The Big New Movie";

        var params = {
          TableName: table,
          Key: {
            year: year,
            title: title,
          },
          UpdateExpression:
            "set info.rating = :r, info.plot=:p, info.actors=:a",
          ExpressionAttributeValues: {
            ":r": 5.5,
            ":p": "Everything happens all at once.",
            ":a": ["Larry", "Moe", "Curly"],
          },
          ReturnValues: "UPDATED_NEW",
        };

        docClient.update(params, function (err, data) {
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

var docClient = new AWS.DynamoDB.DocumentClient();

function updateItem() {
  var table = "Movies";
  var year = 2015;
  var title = "The Big New Movie";

  var params = {
    TableName: table,
    Key: {
      year: year,
      title: title,
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues: {
      ":r": 5.5,
      ":p": "Everything happens all at once.",
      ":a": ["Larry", "Moe", "Curly"],
    },
    ReturnValues: "UPDATED_NEW",
  };

  console.log("Updating the item...");
  docClient.update(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
}
```
