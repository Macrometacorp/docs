---
title: Key-Value Store
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A key-value collection stores data in the form of a dictionary. This requires a key for each record and a corresponding value that contains the data. Each document in the database must have a unique key, similar to the concept of a primary key. Key-value databases are known for being quick and storage efficient resulting in faster CRUD (Create, Read, Update, Delete) operations.

## Key-Value Store Contents

In GDN, each key-value pair (document) stored in a collection contains a `_key`, and the rest of the document is its _value_. The only key-value operations available are key lookups (single and batch) and key-value pair insertions and updates. If no sharding attribute is specified, then `_key` is used for sharding the data instead.

Key-value collections are always global. You can specify time_to_live (TTL) during creation.

## Group ID

When you create a key-value store collection, you can select the **Group** option to enable the **GROUP ID** field. This allows you to organize key-value pairs in groups. This option has several effects:

- The Group ID field is automatically indexed, which makes querying based on the ID faster.
- The `_key` becomes the **Group ID** appended to the **Key**. Example: `group_A_foo1`
- You can perform queries and truncate based on the group ID value.

## KV Blob Storage

:::note
This feature is available upon request. Contact support@macrometa.com to enable it on your account.
:::

If this feature is enabled on your account, then when you create a new key-value store, you can select the **Blob storage** checkbox. This marks the collection as a blob-based KV collection. These collections can only be used to store blob files, such as images. Once created, this setting cannot be changed.

- Maximum blob file size is 1 MB. This can be changed, but can never exceed 2 MB.
- You can add blob records using the Macrometa API. Adding records in the Macrometa web console is not supported.
