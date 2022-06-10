---
sidebar_position: 1
title: Quickstart
---

Get started with Macrometa by creating a simple address book. It demonstrates how you can use our stateless-serverless backend to run a globally distributed database with local read-write latencies around 50ms.

## Step 1: Create a Macrometa account or log in.

You must have a Macrometa account in order to complete this quickstart. If you already have a Macrometa account, then go to [https://www.macrometa.com/](https://www.macrometa.com/) and log in.

1. If you don't already have a Macrometa account, go [https://www.macrometa.com/](https://www.macrometa.com/) and then click **Get Started**.
2. Enter your **Email Address** and **Password**, then click **Sign up**.

## Step 2: Create a collection.

A _collection_ is a group of documents with a unique name and identifier. For the address book, you will create a document collection that contains names and addresses.

1. On the side menu, click **COLLECTIONS**.
2. Click **New Collection**.
3. Click **Document Store**.
4. In **Collection Name**, enter `addresses`.
5. Click **Create**.

![Create a collection](/img/quickstart/create-doc-view.png)

Macrometa distributes this collection to every location in the global fabric. However, it's empty. Let's fix that.

## Step 3: Add data to your new collection with a query.


Now, click the `QUERIES` tab in the left nav to open the `C8QL` query editor. Copy and paste the query below into the editor and click `Run Query` a couple times. 

```sql
// Query to insert addresses
FOR persons IN [ 
  { firstname: "Captain", lastname: "Nemo", email: "cpnemo@gnautilus.com" },
  { firstname: "Pierre", lastname: "Aronnax", email: "pierre@asoc.org" },
  { firstname: "Ned", lastname: "Land", email: "ned@nature.org" },
  { firstname: "Cyrus", lastname: "Smith", email: "cycy@laborrights.org" },
  { firstname: "Tom", lastname: "Ayrton", email: "tommy@water.org" },
  { firstname: "Jules", lastname: "Verne", email: "j.garcia@en-julesverne.nantesmetropole.fr" } 
  ]
  INSERT persons INTO addresses
```

Your `Query Result` will be empty brackets, but if you click on `Profile` button you can checkout what just happened along with some performance details. Your data was just written to the location you're currently logged into and replicated across all of the nodes in your fabric.

## Step 4: View the documents in the collection

## Step 5: Query the documents in the collection

Now, let's query the data you just added to your collection. Copy the below query and replace the `INSERT` query currently in the editor with it.

```sql
FOR docs IN addresses RETURN docs 
```

You should see the data you just saved returned.

Ok, now we are going to save this query. Saving it will turn it into a `Query Worker`.

## Step 6: Save the query.

Click the `Save Query` button and name the saved query `getAddresses`

Now, in **around 50ms**, you have a globally distributed stateful-serverless endpoint.

![dashboard](/img/dashboard.png)

## Step 7: Create an API.

Now that you've saved the query click on the `API Usage` button, and we automatically generate a Query Worker (Exactly like a serverless function, but a save query instead of a function)!

![create-query-worker](/img/query-worker.png)

## Step 8: Test the API.

Nice job you totally rocked that quickstart! 

Now let's build out the _REST_ of our CRUD API. Just create a `Query Worker` for each of these queries.

**SaveContact**
```sql
INSERT {firstname:@firstName,
        lastname:@lastName,
        email:@email} 
INTO addresses
```

**ReadContact**
```sql
FOR entry 
IN addresses 
RETURN entry
```

**RemoveContact**
```sql
REMOVE @_key 
IN addresses
```

**UpdateContact**
```sql
UPDATE @_key WITH { firstname:@firstName, 
                    lastname:@lastName, 
                    email:@email} 
IN addresses
```

Sweet, so now you have a full functional API for your app. [We made a front-end for you to take your new backend for a spin](https://github.com/Macrometacorp/tutorial-addressbook-restql).

## Next Steps

Now that you've build your app, full stack, you can dig into the docs and see all the rad things Macrometa can help you build >> **[Essentials](essentials/index.md)** guide.