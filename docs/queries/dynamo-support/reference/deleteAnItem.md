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

      function conditionalDelete() {
        var table = "Movies";
        var year = 2015;
        var title = "The Big New Movie";

        var params = {
          TableName: table,
          Key: {
            year: year,
            title: title,
          },
          ConditionExpression: "info.rating <= :val",
          ExpressionAttributeValues: {
            ":val": 5.0,
          },
        };

        docClient.delete(params, function (err, data) {
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
      id="conditionalDelete"
      type="button"
      value="Conditional Delete"
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

function conditionalDelete() {
  var table = "Movies";
  var year = 2015;
  var title = "The Big New Movie";

  var params = {
    TableName: table,
    Key: {
      year: year,
      title: title,
    },
    ConditionExpression: "info.rating <= :val",
    ExpressionAttributeValues: {
      ":val": 5.0,
    },
  };

  console.log("Attempting a conditional delete...");
  docClient.delete(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
}
```
