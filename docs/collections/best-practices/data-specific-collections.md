---
sidebar_position: 60
title: Data Specific Collections 
---

Query performance is linked, in part, to the number of documents in the collections and the indexes used. When a single collection contains a large number of complex documents optimizing for performance becomes difficult. Designing collections around purpose-built documents and indexes for returning specific results makes query writing simpler and improves performance.

In this example, we have a single collection, `Garage`. It contains `Account`, `Cars`, `Orders`, and `Staff` attributes with further nested attributes. This makes query writing and indexing difficult. Here is an example document for the `Garage` collection.

## Example Complex Collection Document

```json
{
    "_id": "Garage/349351645",
    "_key": "349351645",
    "_rev": "_eUgrDn2--_",
    "account": {
      "first_name": "John",
      "id": 123,
      "joined_date": "2022-01-01",
      "last_name": "Doe",
      "phone": "555-555-5555"
    },
    "cars": {
      "car_a": {
        "make": "Audi",
        "model": "Q5",
        "year": "2019"
      },
      "car_b": {
        "make": "Ford",
        "model": "F-150",
        "year": "2021"
      }
    },
    "orders": {
      "account_id": 123,
      "car_id": "car_b",
      "customer_phone": "555-555-5555",
      "date": "2022-03-14",
      "invoice_number": 456,
      "price": "$100.00"
    },
    "staff": {
      "first_name": "Jane",
      "last_name": "Smith",
      "tech_id": 789
    }
  }
```

The next example shows how one might structure documents inside of individual, data specific, collections. This approach can help in creating indexes on correct attributes in each collection and reduce record scan count.

## Example Simple Collection Documents

```json
//Account Document
{
    "_id": "Accounts/349491803",
    "_key": "349491803",
    "_rev": "_eUhBHmi--_",
    "car_ids": [
      "Cars/349434363",
      "Cars/349446110"
    ],
    "first_name": "John",
    "id": 123,
    "joined_date": "2022-01-01",
    "last_name": "Doe",
    "phone": "555-555-5555"
  }

//Car Document
{
    "_id": "Cars/349446110",
    "_key": "349446110",
    "_rev": "_eUg1Tl6--_",
    "customer_id": 123,
    "make": "Audi",
    "model": "Q5",
    "year": 2019
  },
  {
    "_id": "Cars/349434363",
    "_key": "349434363",
    "_rev": "_eUg1fJe--_",
    "customer_id": 123,
    "make": "Ford",
    "model": "F-150",
    "year": 2021
  }

// Order Document
{
    "_id": "Orders/349454643",
    "_key": "349454643",
    "_rev": "_eUg9dXS--_",
    "account_id": 123,
    "car_ids": [
      "Cars/349446110"
    ],
    "date": "2022-03-14",
    "invoice_number": 456,
    "price": "$100.00",
    "staff_id": 789
  }

// Staff Document
{
    "_id": "Staff/349422825",
    "_key": "349422825",
    "_rev": "_eUgvNOW--_",
    "first_name": "Jane",
    "last_name": "Smith",
    "tech_id": 789
  }
  ```