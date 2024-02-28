---
sidebar_position: 30
title: Set Up Macrometa as a Vector Store
---

Implementing Macrometa as a vector store begins with adding your vectors to a collection. This section explains that process.

## Prerequisites

- A compatible web browser for accessing the Macrometa dashboard and ensuring your network configuration allows for connections to Macrometa's servers.
- If you plan to interact with Macrometa programmatically, ensure that your development environment is set up with the necessary software dependencies, such as Python or Node.js, and the respective SDKs or API clients. For more information, refer to [SDKs](../sdks/), [APIs](../api-docs/), and [Command Line Interface](../cli/).

:::note
All commands required to use Macrometa as a vector store are supported by the API, but semantic search is not supported by SDKs or CLI. However, all CRUD commands for document collections, where the vectors are stored, are supported by all three methods.
:::

## Initial Configuration

**Accessing Macrometa:**
- **Sign Up:** Begin by creating an account on Macrometa. You can choose from various plans, including options that offer free tiers suitable for development and testing purposes.
- **Dashboard Overview:** Once logged in, familiarize yourself with the Macrometa dashboard. This web interface allows you to manage collections, execute queries, and monitor your usage and performance metrics.

**API Access:**
- For those who prefer or require programmatic access, Macrometa provides RESTful APIs. Retrieve your API credentials from the dashboard, which you'll use to authenticate your applications.

## Creating Your First Vector Store in Macrometa

**Collection Creation:**
- In Macrometa, data is organized into collections, akin to tables in a relational database. To start using Macrometa as a vector store, you'll first need to create a new collection.
- Navigate to the "Collections" section within the dashboard and create a new collection. Specify the collection name and any other relevant settings, such as replication factors or sharding options, depending on your performance and resilience requirements.

**Schema Definition:**
- While Macrometa supports schema-less collections, defining a schema can improve performance and data integrity. For vector data, your schema should reflect the structure of your vectors, such as specifying fields for vector dimensions and any additional metadata.

**Data Import and Indexing:**
- With your collection created and schema defined, the next step is to import your vectorized data. Data can be imported via the dashboard or programmatically through API calls.
- After importing, consider creating indexes on your data to optimize query performance. Macrometa allows for the creation of various index types, including geo-spatial indexes and full-text search indexes, which can be particularly useful for vector data.
