---
sidebar_position: 3
title: AWS Javascript SDK (nodejs)
---

# Using AWS Javascript SDK on NodeJS with Macrometa

Macrometa GDN can be used as the data store for apps written for AWS DynamoDB. Switch to using GDN by just changing the `connection URL`, `accessKey` and `secretKey`. You can continue using aws dynamodb sdk and cli you are familiar with.

:::note
Macrometa GDN provides aws dynamo db ***global tables*** as the `default` option. 
:::

This enables you to deliver low-latency data access to your users no matter where they are located. GDN performs all of the necessary tasks to create identical tables in all the regions around the globe and propagate ongoing data changes to all of them.

Similarly GDN provides better data consistency guarantees i.e., `strong consistency` within a region and `strong eventual consistency` across regions utilizing CRDTs and partially ordered logs.

In this tutorial, you use the AWS SDK for JavaScript to write simple applications to perform the following Amazon DynamoDB operations:

* Create a table named Movies and load sample data in JSON format.
* Perform create, read, update, and delete operations on the table.
* Run simple queries.

## Prerequistes

1. Create an API Key
    * Login to your tenant account on https://gdn.paas.macrometa.io
    * Create an API key via REST API. Make a copy of the key.

    :::tip
        Following api key is created under `demo@macrometa.io/_system` on https://gdn.paas.macrometa.io with `rw` permissions.
        ```
            demo.demok1.1a1aad0f4b000ca4d2d3bdb505298cbb9467b65526b0f79364e61e5f00000000
        ```
    :::
2. Set up the AWS SDK for JavaScript. 
   * Install [Node.js](http://nodejs.org/)
   * Install the [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-node-js)

## Create Global Table

Macrometa GDN provides aws dynamo db ***global tables*** as the `default` option. In this step, you create a table named `Movies`. The primary key for the table is composed of the following attributes:

* `year` – The partition key. The AttributeType is `N` for number.
* `title` – The sort key. The AttributeType is `S` for string.

Create following file - `MoviesCreateTable.js`.

```js
    var AWS = require("aws-sdk");

    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var dynamodb = new AWS.DynamoDB();

    var params = {
        TableName : "Movies",
        KeySchema: [       
            { AttributeName: "year", KeyType: "HASH"},  //Partition key
            { AttributeName: "title", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [       
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

```

:::note
    * You set the endpoint to indicate that you are connecting to macrometa gdn.
    * For `accessKeyId` and `secretKey`, you can specify either Macrometa `api key` or `jwt token` of your account.
    * In the `createTable` call, you specify table name, primary key attributes, and its data types.
    * The ProvisionedThroughput parameter is ignored.
:::

To run the program, enter the following command.

```js
    node MoviesCreateTable.js
```

## Load Sample Data

This scenario uses a sample data file that contains information about a few thousand movies from the Internet Movie Database (IMDb). The movie data is in JSON format, as shown in the following example. For each movie, there is a year, a title, and a JSON map named info.

```json
[
   {
      "year" : ... ,
      "title" : ... ,
      "info" : { ... }
   },
   {
      "year" : ...,
      "title" : ...,
      "info" : { ... }
   },

    ...

]
```

In the JSON data, note the following:

* The year and title are used as the primary key attribute values for the Movies table.
* The rest of the info values are stored in a single attribute called info. This program illustrates how you can store JSON in an Amazon DynamoDB attribute.

The following is an example of movie data:

```json
{
    "year" : 2013,
    "title" : "Turn It Down, Or Else!",
    "info" : {
        "directors" : [
            "Alice Smith",
            "Bob Jones"
        ],
        "release_date" : "2013-01-18T00:00:00Z",
        "rating" : 6.2,
        "genres" : [
            "Comedy",
            "Drama"
        ],
        "image_url" : "http://ia.media-imdb.com/images/N/O9ERWAU7FS797AJ7LU8HN09AMUP908RLlo5JF90EWR7LJKQ7@@._V1_SX400_.jpg",
        "plot" : "A rock band plays their music at high volumes, annoying the neighbors.",
        "rank" : 11,
        "running_time_secs" : 5215,
        "actors" : [
            "David Matthewman",
            "Ann Thomas",
            "Jonathan G. Neff"
       ]
    }
}
```

1. Download the sample data archive: [moviedata.zip](moviedata.zip)

2. Extract the data file i.e., `moviedata.json` from the archive.

3. Copy and paste the `moviedata.json` file into your current directory.

4. Copy the following program and paste it into a file named `MoviesLoadData.js` to populate `Movies` table.

```js
   
    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log("Importing movies into DynamoDB. Please wait.");

    var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
    allMovies.forEach(function(movie) {
        var params = {
            TableName: "Movies",
            Item: {
                "year":  movie.year,
                "title": movie.title,
                "info":  movie.info
            }
        };

        docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify   (err, null, 2));
        } else {
            console.log("PutItem succeeded:", movie.title);
        }
        });
    });

```

5. To run the program, enter the following command.

```js
    node MoviesLoadData.js
```

## Create a New Item

In this step, you add a new item to the `Movies` table.

Copy the following program and paste it into a file named `MoviesItemOps01.js`

```js
    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Movies";

    var year = 2015;
    var title = "The Big New Movie";

    var params = {
        TableName:table,
        Item:{
            "year": year,
            "title": title,
            "info":{
                "plot": "Nothing happens at all.",
                "rating": 0
            }
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

```

:::note
The primary key is required. This code adds an item that has a primary key `(year, title)` and `info` attributes. The `info` attribute stores sample JSON that provides more information about the movie.
:::

To run the program, enter the following command.

```js
    node MoviesItemOps01.js
```

## Read an Item

You can use the `get` method to read the item from the Movies table. You must specify the primary key values, so you can read any item from Movies if you know its year and title.

Copy the following program and paste it into a file named `MoviesItemOps02.js`.

```js

    var AWS = require("aws-sdk");

    AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Movies";

    var year = 2015;
    var title = "The Big New Movie";

    var params = {
        TableName: table,
        Key:{
            "year": year,
            "title": title
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
```

To run the program, enter the following command.

```js
    node MoviesItemOps02.js
```

## Update an Item

You can use the `update` method to modify an item. You can update values of existing attributes, add new attributes, or remove attributes.

In this example, you perform the following updates:

* Change the value of the existing attributes (`rating`, `plot`).
* Add a new list attribute (`actors`) to the existing `info` map.

The item changes from the following:

```js
{
   year: 2015,
   title: "The Big New Movie",
   info: {
        plot: "Nothing happens at all.",
        rating: 0
   }
}
```

to:

```js
{
   year: 2015,
   title: "The Big New Movie",
   info: {
           plot: "Everything happens all at once.",
           rating: 5.5,
           actors: ["Larry", "Moe", "Curly"]
   }
}
```

Copy the following program and paste it into a file named `MoviesItemOps03.js`.

```js

    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient()

    var table = "Movies";

    var year = 2015;
    var title = "The Big New Movie";

    // Update the item, unconditionally,

    var params = {
        TableName:table,
        Key:{
            "year": year,
            "title": title
        },
        UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
        ExpressionAttributeValues:{
            ":r":5.5,
            ":p":"Everything happens all at once.",
            ":a":["Larry", "Moe", "Curly"]
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    }); 
```

:::note
* This program uses `UpdateExpression` to describe all updates you want to perform on the specified item.
* The `ReturnValues` parameter instructs Amazon DynamoDB to return only the updated attributes ("UPDATED_NEW").
:::

To run the program, enter the following command.

```js
    node MoviesItemOps03.js
```

## Increment an Atomic Counter

DynamoDB supports atomic counters, where you use the update method to increment or decrement the value of an attribute without interfering with other write requests. (All write requests are applied in the order in which they are received.)

The following program shows how to increment the rating for a movie. Each time you run it, the program increments this attribute by one.

Copy the following program and paste it into a file named `MoviesItemOps04.js`.

```js
 
    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient()

    var table = "Movies";

    var year = 2015;
    var title = "The Big New Movie";

    // Increment an atomic counter

    var params = {
        TableName:table,
        Key:{
            "year": year,
            "title": title
        },
        UpdateExpression: "set info.rating = info.rating + :val",
        ExpressionAttributeValues:{
            ":val": 1
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
```

To run the program, enter the following command.

```js
    node MoviesItemOps04.js
```

## Update an Item (Conditionally)

The following program shows how to use `UpdateItem` with a condition. If the condition evaluates to true, the update succeeds; otherwise, the update is not performed.

In this case, the item is updated only if there are more than three actors in the movie.

Copy the following program and paste it into a file named `MoviesItemOps05.js`.

```js

    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient()

    var table = "Movies";

    var year = 2015;
    var title = "The Big New Movie";

    // Conditional update (will fail)

    var params = {
        TableName:table,
        Key:{
            "year": year,
            "title": title
        },
        UpdateExpression: "remove info.actors[0]",
        ConditionExpression: "size(info.actors) > :num",
        ExpressionAttributeValues:{
            ":num": 3
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Attempting a conditional update...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
 
```

To run the program, enter the following command.

```js
    node MoviesItemOps05.js
```

The program should fail with the following message:

```bash
The conditional update failed
```

This is because the movie has three actors in it, but the condition is checking for `greater than three` actors.

Modify the program so that the `ConditionExpression` looks like the following.

```js
ConditionExpression: "size(info.actors) >= :num", 
```

The condition is now greater than or equal to 3 instead of greater than 3.

Run the program again. The `updateItem` operation should now succeed.

## Delete an Item

You can use the `delete` method to delete one item by specifying its primary key. You can optionally provide a `ConditionExpression` to prevent the item from being deleted if the condition is not met.

In the following example, you try to delete a specific movie item if its rating is 5 or less.

Copy the following program and paste it into a file named `MoviesItemOps06.js`.

```js
    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Movies";

    var year = 2015;
    var title = "The Big New Movie";

    var params = {
        TableName:table,
        Key:{
            "year": year,
            "title": title
        },
        ConditionExpression:"info.rating <= :val",
        ExpressionAttributeValues: {
            ":val": 5.0
        }
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    }); 
 
```

To run the program, enter the following command.

```js
    node MoviesItemOps06.js
```

The program should fail with the following message:

```js
    The conditional delete failed
```

This is because the rating for this particular movie is `greater than 5`.

Modify the program to remove the condition from `params`.

```js
var params = {
    TableName:table,
    Key:{
        "title":title,
        "year":year
    }
};
```

Run the program again. The delete succeeds because you removed the condition.

## Query the Data 

You can use the query method to retrieve data from a table. You must specify a partition key value; the sort key is optional.

The primary key for the Movies table is composed of the following:

* `year` – The partition key. The attribute type is number. 
* `title` – The sort key. The attribute type is string.

To find all movies released during a year, you need to specify only the year. You can also provide the title to retrieve a subset of movies based on some condition (on the sort key); for example, to find movies released in 2014 that have a title starting with the letter "A".

In addition to the `query` method, you can use the `scan` method to retrieve all the table data.

### Query - All Movies Released in a Year

The program included in this step retrieves all movies released in the year 1985.

Copy the following program and paste it into a file named `MoviesQuery01.js`.

```js
    
    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log("Querying for movies from 1985.");

    var params = {
        TableName : "Movies",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy": 1985
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(" -", item.year + ": " + item.title);
            });
        }
    });
  
```

:::note
    * `ExpressionAttributeNames` provides name substitution. This is used because year is a reserved word in Amazon DynamoDB. You can't use it directly in any expression, including `KeyConditionExpression`. For this reason, you use the expression attribute name `#yr`.

    * `ExpressionAttributeValues` provides value substitution. This is used because you can't use literals in any expression, including `KeyConditionExpression`. For this reason, you use the expression attribute value `:yyyy`.
:::

To run the program, enter the following command.

```js
    node MoviesQuery01.js
```

:::note
The preceding program shows how to query a table by its primary key attributes. In DynamoDB, you can optionally create one or more secondary indexes on a table, and query those indexes in the same way that you query a table. Secondary indexes give your applications additional flexibility by allowing queries on non-key attributes. 
:::

### Query - All Movies Released in a Year with Certain Titles

The program included in this step retrieves all movies released in year 1992, with title beginning with the letter "A" through the letter "L".

Copy the following program and paste it into a file named `MoviesQuery02.js`

```js                       
   
    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");

    var params = {
        TableName : "Movies",
        ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
        KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy": 1992,
            ":letter1": "A",
            ":letter2": "L"
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(" -", item.year + ": " + item.title
                + " ... " + item.info.genres
                + " ... " + item.info.actors[0]);
            });
        }
    });
 
```

To run the program, enter the following command.

```js
    node MoviesQuery02.js
```

## Scan Table

The scan method reads every item in the entire table, and returns all the data in the table. You can provide an optional filter_expression, so that only the items matching your criteria are returned. However, the filter is applied only after the entire table has been scanned.

The following program scans the entire Movies table, which contains approximately 5,000 items. The scan specifies the optional filter to retrieve only the movies from the 1950s (approximately 100 items), and discard all the others.

Copy the following program and paste it into a file named `MoviesScan.js`.

```js
 
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "Movies",
        ProjectionExpression: "#yr, title, info.rating",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year",
        },
        ExpressionAttributeValues: {
            ":start_yr": 1950,
            ":end_yr": 1959 
        }
    };

    console.log("Scanning Movies table.");
    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the movies
            console.log("Scan succeeded.");
            data.Items.forEach(function(movie) {
            console.log(
                    movie.year + ": ",
                    movie.title, "- rating:", movie.info.rating);
            });

            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
    }
```

In the code, note the following:

* `ProjectionExpression` specifies the attributes you want in the scan result.
* `FilterExpression` specifies a condition that returns only items that satisfy the condition. All other items are discarded.

To run the program, enter the following command.

```js
    node MoviesScan.js
```

:::note
You can also use the `Scan` operation with any `secondary indexes` that you have created on the table.
:::

## Delete Table

To delete the Movies table, copy the following program and paste it into a file named `MoviesDeleteTable.js`.

```js
   
    var AWS = require("aws-sdk");
    var fs = require('fs');


    const dcName = "gdn.paas.macrometa.io";

    const host = "https://api-" + dcName;
    const apiKey =
    "<your-api-key>";
    const region = "us-east-1";
    const endpoint = host + "/_api/dynamo";
    // secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
    const secretAccessKey = "c8";
    const accessKeyId = "apikey " + apiKey;
    AWS.config.update({
        region,
        endpoint,
        accessKeyId,
        secretAccessKey,
    });

    var dynamodb = new AWS.DynamoDB();

    var params = {
        TableName : "Movies"
    };

    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

```

To run the program, enter the following command.

```js
    node MoviesDeleteTable.js
```
