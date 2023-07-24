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

![Create a Document Collection](/img/search/range-example/create-collection.png)

![New Document Collection Settings](/img/search/range-example/inventory.png)

## 2. Import Shoe Inventory Data into the Inventory Collection

Add the records from `shoe-inventory.json` to the `inventory` collection.

The following images show key steps in the process. For detailed instructions, refer to [Add Documents from a File](../collections/documents/add-document).

![Import Documents](/img/search/range-example/import-data.png)

After importing the file, the collection should contain 50 documents with shoe records.

## 3. Set Up a CRUD API with Query Workers

To create a CRUD (Create, Read, Update, Delete) API, you'll create a query worker for each operation.

The following sections provide queries that you will use to create query workers. Follow the instructions in [Create a New Query Worker](../queryworkers/query-workers#create-a-new-query-worker) to create the query workers that you will use for the CRUD API.

Any query worker can be used as an API endpoint. For more information, refer to [API Endpoints](../queryworkers/api-endpoints).

### 3.1 Create a Query Worker for the "Read" API Endpoint

First, let's create a query worker to handle the "Read" operation. This query worker, named `fetchProducts`, will be used as an API endpoint.

Use this simple query to fetch all documents in the `inventory` collection:

```sql
FOR docs IN inventory
RETURN docs
```

### 3.2 Create a Query Worker for the "Create" API Endpoint

Now, create a query worker for the "Create" operation. This query worker, named `saveProduct`, will be used as an API endpoint.

Use the following query to create a new document in the `inventory` collection:

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

This query contains bind parameters for inserting data into the document. Bind parameters are denoted by the `@` symbol, such as `@brand`. For more information about bind parameters, refer to [Bind Parameters](../queries/bind-parameters).

![Create a Query Worker](/img/search/range-example/query-workers.png)

With the `saveProduct` query worker in place, you've successfully set up the "Create" operation as part of your CRUD API.

### 3.3 Create a Query Worker for the "Update" API Endpoint

Next, create a query worker to handle the "Update" operation. This query worker, named `updateProduct`, will be used as an API endpoint.

Use the following C8QL query to update a document in the `inventory` collection:

```sql
UPDATE TO_STRING(@_key) WITH {
    brand: @brand,
    category: @category,
    color: @color,
    name: @name,
    price: @price,
    product_id: @product_id,
    quantity: @quantity, 
    size: @size 
}
IN inventory
```

This query contains bind parameters for updating the document. Bind parameters are denoted by the `@` symbol, such as `@brand`.

With the `updateProduct` query worker in place, you've successfully set up the "Update" operation as part of your CRUD API.

### 3.4 Create a Query Worker for the "Delete" API Endpoint

Lastly, create a query worker to handle the "Delete" operation. This query worker, named `removeProduct`, will be used as an API endpoint.

Use the following C8QL query to delete a document in the `inventory` collection:

```sql
REMOVE TO_STRING(@_key)
IN inventory
```

This query contains a bind parameter, `@_key`, the string that specifies the document to be deleted. When you enter the numeric _key, it must be converted to a string to successfully perform the REMOVE operation.

With the `removeProduct` query worker in place, you've successfully set up the "Delete" operation as part of your CRUD API.

Now that you've created query workers for all CRUD operations, you have successfully built your CRUD API. The next step is to create a search view to enable advanced search capabilities on your shoe store inventory.

## 4. Create a Search View for the Inventory Collection

Now that you have data in the `inventory` collection, it's time to enable high-performance search on various fields in the document store.

Create a search view named `inventory_view`. Follow the instructions in [Create a Fulltext Search View](../search-views/fulltext-search/tasks/create-search-views.md) to create the `inventory_view` search view.

When you create the `inventory_view` search view, map the following fields:

- size
- quantity
- price
- name
- brand

Make sure that you add all the fields, as they are all referenced in the query workers.

Here's an example screenshot of creating the search view in the UI:

![Create a Search View](/img/search/range-example/create-view.png)

Creating this search view allows you to perform high-performance search operations on the `inventory` collection.

## 5. Query the Created Search View

Now that you have created the `inventory_view` search view, you can write queries to search for specific data in the `inventory` collection.

The objective is to write a query that searches the `inventory_view` by shoe name, brand, minimum and maximum size, and minimum and maximum price. This query will help you find specific shoes in the inventory collection that match the given criteria. By using the `inventory_view` search view, the query will execute more quickly and efficiently, resulting in faster search results.

Use the following query to search the `inventory_view`:

```c8ql
LET keyword = LOWER(to_string(@keyword))
LET minSize = @Min_Size
LET maxSize = @Max_Size
LET minPrice = @Min_Price
LET maxPrice = @Max_Price

FOR product IN inventory_view
  SEARCH ANALYZER(
    (STARTS_WITH(product.name, keyword) OR
    STARTS_WITH(product.brand, keyword) OR
    PHRASE(product.name, keyword) OR
    PHRASE(product.brand, keyword)) AND
    (IN_RANGE(product.size, minSize, maxSize, true, true) AND 
    IN_RANGE(product.price, minPrice, maxPrice, true, true)), "text_en"
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

![Query with Bind Parameters](/img/search/range-example/query-data.png)

## 6. Save the Query as a Query Worker

Save the query you just wrote as a query worker named `inventorySearch`. This creates an API endpoint for it. For more information, refer to [API Endpoints](../queryworkers/api-endpoints).

![Save Query Worker](/img/search/range-example/search-query-worker.png)

## 7. Test the Query Worker API Endpoints

You now have five query workers, each with an API endpoint. To view the API endpoint, [edit the query worker](../queryworkers/query-workers#edit-a-query-worker) and then click **API Endpoint**. Macrometa displays a cURL command that you can use to test the API endpoint.

![API Endpoint](/img/search/range-example/search-api.png)

## Conclusion

Congratulations! You have successfully set up a CRUD API with query workers and a search view for your inventory collection. This setup allows you to efficiently perform Create, Read, Update, Delete, and Search operations using API endpoints.

Now that you have completed this tutorial, consider exploring the following topics to enhance your understanding and further develop your skills:

- [Getting Started with Search](../search-views/fulltext-search/getting-started-search)
- [Getting Started with Graphs](../graphs/getting-started-with-graphs)
- [C8QL Query Tutorial](../queries/got-tutorial/)

By diving into these topics, you will be well-equipped to optimize and expand your Macrometa-powered projects. Good luck, and happy coding!
