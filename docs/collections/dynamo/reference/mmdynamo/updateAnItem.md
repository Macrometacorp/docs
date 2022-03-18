1. Browser

Save as .html and open the file in your browser.

```html
<html>
  <head>
    <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>

    <script>
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
      const { DynamoDB } = window.mmdynamo;

      const client = new DynamoDB({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
      });

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
