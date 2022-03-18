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

      function deleteMovies() {
        var params = {
          TableName: "Movies",
        };

        dynamodb.deleteTable(params, function (err, data) {
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
      id="deleteTableButton"
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
};

dynamodb.deleteTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to delete table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Deleted table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
```
