# Connect to dynamodb C8 using mmdynamo

## Browser(Javascript) NPM

1. Install mmdynamo

   ```
   npm install mmdynamo --save
   ```

2. Import package

   ```js
   import { DynamoDB } from "mmdynamo";
   ```

3. Initialize Dynamodb

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

## Browser(Javascrio) as Library

1. Add mmdynamo

   ```html
   <script src="https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js"></script>
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
     const { DynamoDB } = window.mmdynamo;

     const client = new DynamoDB({
       region,
       endpoint,
       accessKeyId,
       secretAccessKey,
     });
   </script>
   ```

## Examples

1. [Create a Table](createTable.md)
2. [Create New Item](createNewItem.md)
3. [Read an Item](readAnItem.md)
4. [Update an Item](updateAnItem.md)
5. [Delete an Item](deleteAnItem.md)
6. [Update Table](../updateTable.md)
7. [Delete a Table](deleteTable.md)
