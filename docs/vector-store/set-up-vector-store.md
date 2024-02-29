---
sidebar_position: 30
title: Set Up Macrometa as a Vector Store
---

Implementing Macrometa as a vector store begins with adding your vectors to a collection. This section explains that process.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create collections.
- If you plan to interact with Macrometa programmatically, ensure that your development environment is set up with the necessary software dependencies, such as Python or Node.js, and the respective SDKs or API clients. For more information, refer to [SDKs](../sdks/), [APIs](../api-docs/), and [Command Line Interface](../cli/).
- 

:::note
All commands required to use Macrometa as a vector store are supported by the API, but semantic search is not supported by SDKs or CLI. However, all CRUD commands for document collections, where the vectors are stored, are supported by all three methods.
:::

## Before You Begin

A bit of planning and practice before you begin will make the vector store setup much easier.

### Familiarize Yourself with Macrometa

Before you begin setting up your vector store in Macrometa, we recommend completing the [Quickstart](../quickstart.md) so that you are familiar with basic Macrometa tasks. The quickstart walks you through a simple exercise of creating and querying a collection.

Also consider completing the following tutorials:

- [Getting Started with Semantic Search](../search-views/semantic-search/getting-started-semantic-search.md)
- [Query Tutorial](../queries/got-tutorial/)

### Are Your Vectors Stored in an External Database?

If so, then you might be able to use them as  an external source using Macrometa's Connections feature. Make sure they have a common schema and they are stored in a supported data source.

A connection source _must_ be set up when you create the collection, so make sure everything in the source is prepared for import into Macrometa before you begin the process.

For more information, refer to [Connections](../connections/).

### Will Vectors be Streaming into the Collection?

In order to better understand Macrometa [streams](../streams/) and [stream workers](../cep/), consider completing the following tutorials:

- [Getting Started with Streams](../streams/getting-started-streams.md)
- [Getting Started with Stream Workers](../cep/getting-started-stream-workers.md)

## Create a Vector Store Collection

Before storing vectors in Macrometa, you must 



**Collection Creation:**
- In Macrometa, data is organized into collections, akin to tables in a relational database. To start using Macrometa as a vector store, you'll first need to create a new collection.
- Navigate to the "Collections" section within the dashboard and create a new collection. Specify the collection name and any other relevant settings, such as replication factors or sharding options, depending on your performance and resilience requirements.

**Schema Definition:**
- While Macrometa supports schema-less collections, defining a schema can improve performance and data integrity. For vector data, your schema should reflect the structure of your vectors, such as specifying fields for vector dimensions and any additional metadata.

This is also important if your vectors are stored in an external data source and 

**Data Import and Indexing:**
- With your collection created and schema defined, the next step is to import your vectorized data. Data can be imported via the dashboard or programmatically through API calls.
- After importing, consider creating indexes on your data to optimize query performance. Macrometa allows for the creation of various index types, including geo-spatial indexes and full-text search indexes, which can be particularly useful for vector data.
