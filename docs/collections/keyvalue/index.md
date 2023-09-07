---
title: Key-Value Store
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A key-value collection stores data in the form of a dictionary. This requires a key for each record and a corresponding value that contains the data. Each document in the database must have a unique key, similar to the concept of a primary key. Key-value databases are known for being quick and storage efficient resulting in faster CRUD (Create, Read, Update, Delete) operations.

In GDN, each document stored in a collection contains a `_key`, and the rest of the document is its _value_. The only key-value operations available are key lookups (single and batch) and key-value pair insertions and updates. If no sharding attribute is specified, `_key` is used for sharding the data instead.

Key-value collections are always global. You can specify time_to_live (TTL) during creation.
