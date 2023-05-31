---
title: Macrometa Collection - DRAFT
---

Macrometa collection connectors allow you to extract data from or send data to an existing Macrometa collection. The collection can be on a different GeoFabric or even on a different tenant.

## Prerequisites

- Macrometa account with admin permissions.
- The collection that you want to connect to must already exist. For more information about creating collections, refer to [Create a Document Store](../../collections/documents/create-document-store).
- Create an API key with at least read and write access to the source or target collection. For more information about API keys, refer to [Manage API Keys](../../account-management/api-keys/).
- Source collections must not be empty.

## Data Types and Common Schema

Macrometa collections don't have a concept of `schema`, but Macrometa connectors needs an underlying schema to extract and load data. If the records in the collection don't have the same set of attributes and data types (i.e., a common schema), then the most common schema among the first 50 records will be selected as the schema for the data target. Documents that do not match the common schema will not be imported or exported.

If the records don't have a common schema and you add a data target to the source collection, then `DELETE` operations on the records (the ones that do not match the most common schema) of the source collection can lead to data inconsistencies and errors while loading data into the data target.

## Macrometa Collection Source

No additional notes.

## Macrometa Collection Target

The Macrometa _key must always be a string. If the primary key of the source data doesn't comply with the constraints of Macrometa document key then:

1. If the primary key is not of string data type, then the primary key of source will be first converted to a string and then it will be checked for compliance with the constraints mentioned above.
2. If the primary key is string but isn't compliant, then the primary key for target will be generated using a hash algorithm with the primary key of source acting as the key for hash function. The resultant hash will be stored in hex format as the primary key for target, making it compliant with macrometa document key constraints.
