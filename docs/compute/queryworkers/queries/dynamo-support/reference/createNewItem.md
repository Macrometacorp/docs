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

      function createItem() {
        var params = {
          TableName: "Movies",
          Item: {
            year: 2015,
            title: "The Big New Movie",
            info: {
              plot: "Nothing happens at all.",
              rating: 0,
            },
          },
        };
        docClient.put(params, function (err, data) {
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

var params = {
  TableName: "Movies",
  Item: {
    year: 2015,
    title: "The Big New Movie",
    info: {
      plot: "Nothing happens at all.",
      rating: 0,
    },
  },
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
```
