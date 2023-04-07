---
sidebar_position: 60
title: Range Search
---

# Creating CRUD and Search APIs on Shoe Store Catalog data

Dataset:
Link shoe-inventory.json
Description: List of Shoes in catalog with information about category, price etc.

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

Goals:

1. Create a document collection called `inventory`
2. Import the [shoe-inventory.json](/datasets/shoe-inventory.json) file to our new collection. When the JSON file opens in a new browser tab, right click and choose save as to download the file..
3. Create Search View on our inventory collection
4. Query the view
5. Save the query as Query Worker
6. Execute the Query Worker as API


## Create a document collection
First step is to create collection from Macrometa console:

![Create Document Collection](/img/search/range-example/create-collection.png)

Name of the document store collection is `inventory`:

![Create Document Collection](/img/search/range-example/inventory.png)

## Import shoe inventory data to inventory collection
In the step before, we created a document store collection now we will add test data to that collection.
From the list of collections select `inventory` collection.

![Create Document Collection](/img/search/range-example/import-data.png)

After importing the file we should have 50 documents in the collection.
One document contains various shoe information. (Shown below)

## Create a CRUD API 

Write your first query
```sql
FOR docs IN inventory
RETURN docs
```

## Create your first Query Worker (API endpoint)

Name your Query Worker `saveProduct`

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

![Create Document Collection](/img/search/range-example/query-workers.png)

## Create a search view for inventory

Now that we have data in the inventory, we can enable high performance search on various collections and fields in the document store.

We will name the search view `inventory_view`.

![Create Document Collection](/img/search/range-example/create-view.png)

Fields to map from above (all fields must be added as they are all referenced in the query worker): 

- size 
- quantity
- price
- name
- brand

## Query the newly created view

Now that we have created a view we can write queries and search specific data in inventory.

![Create Document Collection](/img/search/range-example/query-data.png)

**Goal:**
Write a query that can search `inventory_view` by shoe name.

Solution:
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


Save as a Query Worker named inventory-search:

![Create Document Collection](/img/search/range-example/search-query-worker.png)


Execute query worker as an API

![Create Document Collection](/img/search/range-example/search-api.png)