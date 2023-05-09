---
sidebar_position: 60
title: Range Search Tutorial
---

# Shoe Store Catalog: Building CRUD and Range Search APIs

In this tutorial, we'll guide you through creating CRUD (Create, Read, Update, Delete) and search APIs for a sample shoe store catalog dataset. By following these steps, you'll learn how to import data, create a document collection, establish a search view, and construct query workers for efficient, high-performance search operations on your dataset.

This tutorial covers the following:

- Importing the shoe store catalog dataset (`shoe-inventory.json`) and creating a document collection named `inventory`.
- Implementing a CRUD API to interact with the inventory collection using query workers for each operation.
- Setting up a search view on the inventory collection to enable high-performance search capabilities.
- Crafting a query to fetch data from the collection using the search view.
- Saving the query as a query worker to be used as an API endpoint.

Let's begin building your CRUD and search APIs for the shoe store catalog dataset!

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.
- If you want to run cURL commands, then [Create an API Key](../account-management/api-keys/create-api-keys).
- Download the `shoe-inventory.json` dataset: [shoe-inventory.json](/datasets/shoe-inventory.json)

## Dataset Overview

For this tutorial, you'll work with the `shoe-inventory.json` dataset, which contains a list of shoes in a catalog, along with their brand, category, color, name, price, product ID, quantity, and size information.

Here's an example shoe record from the dataset in JSON format:

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

## 1. Create the Inventory Collection

Create a Document Store collection called `inventory`. Be sure to enable the collection stream when you create the collection.

The following images show key steps in the process. For detailed instructions, refer to [Create a Document Store](../collections/documents/create-document-store).

![Create Document Collection](/img/search/range-example/create-collection.png)

![Create Document Collection](/img/search/range-example/inventory.png)

## 2. Import Shoe Inventory Data into the Inventory Collection

Add the records from `shoe-inventory.json` to the `inventory` collection.

The following images show key steps in the process. For detailed instructions, refer to [Add Documents from a File](../collections/documents/add-document).

![Create Document Collection](/img/search/range-example/import-data.png)

After importing the file, the collection should contain 50 documents with shoe records.

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