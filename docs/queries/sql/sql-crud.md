---
sidebar_position: 20
title: Basic Document Tasks
---

You can perform basic document tasks such as create, read, update, and delete (CRUD) on documents in a collection. This portion of the tutorial guides you through those tasks.
We will first review the syntax of CRUD commands and then use SDKs to send queries to Macrometa platform.

## Create the Characters Collection

Before we can insert documents with SQL, we need a place to put them in: a collection.

For this tutorial, [Create a Document Store collection](../../collections/documents/create-document-store.md) in the console. For more information about collections, refer to [Collections](../../collections/index.md).

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Collections**.
3. Click **New Collection**.
4. Click **Document Store**.
5. Name the collection **categories** and then click **Create**.

## Working with Dataset

Imagine an online store where we need to put all our products in categories.
Initially, we are adding categories to the empty collection. In some cases, we will need to update existing categories or remove some of them.
We are doing all the aforementioned operations so that we could have specific data on request.

### Add One Document to the Collection

Add one document to the collection with a query.

Classic SQL syntax:

```sql
INSERT INTO categories (_key,name) VALUES('0','Books')
```

### Add Multiple Documents to the Collection

Add one multiple documents to the collection with a query.

We can json strings(we don't specify any columns):
```sql
INSERT INTO categories VALUES ('{\"_key\":\"1\",\"name\":\"Electronics\"}'),('{\"_key\":\"2\",\"name\":\"Food\"}')
```

### Update One Document in the Collection

Update one document in the collection with a query.

Classic SQL syntax:
```sql
UPDATE categories SET name='Software' WHERE _key = '0'
```

### Delete One Document in the Collection

Delete one document in the collection with a query.

Classic SQL syntax:
```sql
DELETE FROM categories WHERE _key='0'
```

### Get One Document from the Collection

Get one document from the collection with a query.

Classic SQL syntax:
```sql
SELECT * FROM categories WHERE _key='0'
```

### Get all Documents from the Collection

Get all documents from the collection with a query.

Classic SQL syntax:
```sql
SELECT * FROM categories
```

### Send SQL Queries with Macrometa SDKs

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

- First we need to add dependency for Macrometa [SDK](https://www.npmjs.com/package/jsc8).
- To create instance of `jsc8` we need to provide URL and fabric name to `jsc8` constructor.
`jsc8` holds all the methods needed to work with Macrometa platform. 
- Function `await client.login(email, password)` will do a login to Macrometa platform.
- Function `await client.executeQuery(query, {}, { sql: true })` with `sql` as a field in object sends SQL query to Macrometa platform.

```js
const jsc8 = require("jsc8");

// Authentication parameters
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";

// SQL Query
const query = "SELECT * FROM categories";

const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

async function sqlQueries() {
    await client.login(email, password);
    const result = await client.executeQuery(
         query, {}, { sql: true }
    );
    // Test data will be printed in the terminal
    await console.log(result);
  }
  
sqlQueries();

```

</TabItem>
<TabItem value="py" label="Python">

- First we need to add dependency for Macrometa [SDK](https://pypi.org/project/pyC8/).
- To create instance of `C8Client` we need to provide credentials, protocol, URL and port to `C8Client` constructor.
`C8Client` holds all the methods needed to work with Macrometa platform.
- Function `client.execute_query(QUERY, sql=True)` with `sql` parameter sends SQL query to Macrometa platform.

```py
from c8 import C8Client

# Authentication parameters
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
URL = "play.paas.macrometa.io"

# SQL Query
QUERY = 'SELECT * FROM categories'

client = C8Client(protocol='https', host=URL, port=443, email=EMAIL, password=PASSWORD)

cursor = client.execute_query(QUERY, sql=True)
docs = [doc for doc in cursor]
# Test data will be printed in the terminal
print(docs)

```

</TabItem>
</Tabs>