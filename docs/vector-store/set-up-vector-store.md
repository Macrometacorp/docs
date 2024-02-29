---
sidebar_position: 30
title: Set Up Macrometa as a Vector Store
---

Implementing Macrometa as a vector store begins with adding your vectors to a collection. This section explains that process.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create collections.
- If you plan to interact with Macrometa programmatically, ensure that your development environment is set up with the necessary software dependencies, such as Python or Node.js, and the respective SDKs or API clients. For more information, refer to [SDKs](../sdks/), [APIs](../api-docs/), and [Command Line Interface](../cli/).

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

## Create a Collection to Store Vectors

In Macrometa, data is organized into collections, akin to tables in a relational database. To start using Macrometa as a vector store, you'll first need to create a new collection.

- If you are using an external data source, then follow the instructions in [Create a Data Source Workflow](../connections/manage-etl-workflows.md#create-a-data-source-workflow). You can only perform this task if you have the Connections feature enabled.
- If you plan to import your data using a different method, then follow the instructions in [Create a Document Store](../collections/documents/create-document-store.md). This page provides several methods for creating the document collection, so you can choose the one that best suits your workflow.

## Import Vector Data

With your collection created, the next step is to import your vectorized data. Data can be imported via the dashboard or programmatically. You can:

- [Add Documents from a File](../collections/documents/add-document.md#add-documents-from-a-file) in the web console.
- [Add Documents with Code](../collections/documents/add-document.md#add-documents-with-code) using the Python or JavaScript SDK.
- [Add Documents with API](https://www.macrometa.com/docs/api#/operations/insertDocument) using the REST API endpoint.
- [Create a Stream Worker](../cep/stream-worker-tasks/create-stream-worker.md) to convert streaming messages into documents that are stored in the collection.
