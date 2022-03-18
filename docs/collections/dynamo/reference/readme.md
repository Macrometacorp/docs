# Connect to dynamodb C8

## Node/Javascript

1. Install AWS SDK

   ```
   npm install aws-sdk --save
   ```

2. Import package

   ```js
   // import entire SDK
   import AWS from "aws-sdk";

   // import AWS object without services
   import AWS from "aws-sdk/global";

   // import individual service
   import DynamoDB from "aws-sdk/clients/dynamodb";
   ```

3. Initialize Dynamodb with C8 Dynamo

   ```js
   import AWS from "aws-sdk";

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

   AWS.config.update({
   region,
   endpoint,
   accessKeyId,
   secretAccessKey,
   });

   var dynamodb = new AWS.DynamoDB();
   ...
   ...
   ```

## Browser

If you want to sign and send AWS requests in a modern browser, or an environment like Cloudflare Workers, for dynamodb instance checkout [mmdynamo](https://www.npmjs.com/package/mmdynamo), everything else check out [aws4fetch](https://www.npmjs.com/package/aws4fetch). Consider reading API References for AWS service you are using(eg: [dynamodb](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html))

1. Add AWS SDK

   ```html
   <script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.16.min.js"></script>
   ```

2. Initialize Dynamodb with C8 Dynamo

   ```html
   <script type="text/javascript">

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

     AWS.config.update({
     region,
     endpoint,
     accessKeyId,
     secretAccessKey,
     });

     var dynamodb = new AWS.DynamoDB();
     ...
     ...
   </script>
   ```

## Examples

1. [Create a Table](createTable.md)
2. [Create New Item](createNewItem.md)
3. [Read an Item](readAnItem.md)
4. [Update an Item](updateAnItem.md)
5. [Delete an Item](deleteAnItem.md)
6. [Update Table](updateTable.md)
7. [Delete a Table](deleteTable.md)
