---
sidebar_position: 60
title: Range Search
---

# Creating CRUD and Search APIs on Shoe Store Catalog Data

## Dataset

Here is the link to the `shoe-inventory.json` dataset: [shoe-inventory.json](/datasets/shoe-inventory.json).

## Description

The `shoe-inventory.json` dataset contains a list of shoes in a catalog with information about their brand, category, color, name, price, product ID, quantity, and size. 

Here is an example shoe record from the dataset in JSON format:

```json
{
    "brand": "Adidas",
    "category": "Running",
    "color": "Grey One",
    "name": "Adidas Ultraboost 21",
    "price": 180,
    "product_id": "011",
    "quantity": 20,
    "size": 9
}
```

## Goals

The following goals need to be accomplished to create the required APIs:

1. Create a document collection called `inventory`.
2. Import the `shoe-inventory.json` file to the new collection. You can download the JSON file by right-clicking on this [link](/datasets/shoe-inventory.json) and choosing "Save As".
3. Create a search view on the `inventory` collection.
4. Query the view to fetch data from the collection.
5. Save the query as a Query Worker.
6. Execute the Query Worker as an API.

By completing these goals, you will have a functional CRUD API and a search API that can be used to interact with the shoe inventory dataset.


## Create a Document Collection
First step is to create collection from Macrometa console:

![Create Document Collection](/img/search/range-example/create-collection.png)

Name of the document store collection is `inventory`:

![Create Document Collection](/img/search/range-example/inventory.png)

## Import Shoe Inventory Data to Inventory Collection
In the step before, we created a document store collection now we will add test data to that collection.
From the list of collections select `inventory` collection.

![Create Document Collection](/img/search/range-example/import-data.png)

After importing the file we should have 50 documents in the collection.
One document contains various shoe information. (Shown at the beginning of this tutorial)

# Create a CRUD API

To create a CRUD (Create, Read, Update, Delete) API, you need to start with a simple query to fetch all documents in the collection. Here is the query you can use:

```sql
FOR docs IN inventory
RETURN docs
```

You can consider this query as a "Read" operation. To create a CRUD API, you need to create a Query Worker.

## Creating a Query Worker for API Endpoint

To create a new document in the collection, we will now create a Query Worker named `saveProduct`. That Query Worker will be used as an API endpoint. 

Here's the query you can use to create the new document:

```sql
INSERT {
    brand: @brand,
    category: @category,
    color: @color,
    name: @name,
    price: @price,
    product_id: @product_id,
    quantity: @quantity, 
    size: @size 
}
INTO inventory
```
This query has bind parameters that will be used to insert data into the document. 
Bind parameters are denoted by the `@` symbol. For example, `@brand` is a bind parameter.
You can consider this query as a "Create" operation.

![Create Document Collection](/img/search/range-example/query-workers.png)

## Create a Search View for Inventory

Now that we have data in the `inventory` collection, we can enable high-performance search on various collections and fields in the document store. To do this, we will create a search view named `inventory_view`.

To create the `inventory_view` search view, you need to map the following fields:

- size
- quantity
- price
- name
- brand

Make sure to add all the fields as they are all referenced in the Query Worker. 

Here's an example screenshot of creating the search view in the UI:

![Create Document Collection](/img/search/range-example/create-view.png)

By creating this search view, you will be able to perform high-performance search operations on the `inventory` collection.


## Querying the Created View

Now that we have created the `inventory_view` search view, we can write queries and search specific data in the `inventory` collection.

The goal is to write a query that can search the `inventory_view` search view by shoe name, brand, minimum and maximum size, and minimum and maximum price. This query will allow you to find specific shoes in the inventory collection that match the specified criteria. By using the `inventory_view` search view, the query will execute faster and more efficiently, resulting in faster search results.

You can use the following query to search the `inventory_view`:

```sql
let keyword = LOWER(to_string(@keyword))
let minSize = @Min_Size
let maxSize = @Max_Size
let minPrice = @Min_Price
let maxPrice = @Max_Price

FOR product IN inventory_view
  SEARCH ANALYZER(
    (STARTS_WITH(product.name, keyword) OR
    STARTS_WITH(product.brand, keyword) OR
    PHRASE(product.name, keyword) OR
    PHRASE(product.brand, keyword)) AND
    (IN_RANGE(product.size, minSize, maxSize,true,true) AND 
    IN_RANGE(product.price, minPrice, maxPrice,true,true)),  "text_en"
  )
  RETURN KEEP(product,
    "name",
    "brand",
    "price",
    "size", 
    "quantity"
  )
```

Here's an example screenshot of how to write a query and where to place bind parameters:

![Create Document Collection](/img/search/range-example/query-data.png)

## Save as a Query Worker
The query you just wrote can be saved as a Query Worker. You can name the Query Worker `inventory-search`. 

![Create Document Collection](/img/search/range-example/search-query-worker.png)


## Execute Query Worker as an API
You now have a full functional search API!

![Create Document Collection](/img/search/range-example/search-api.png)