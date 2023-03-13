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
