---
title: Connection Workflows
sidebar_position: 10
---

This page explains the high-level workflow of connections and ETL workflows.

## 1. Create a Connection

Creating a connection is the first step of connecting a Macrometa document collection to an external data source or target. In the Macrometa web console, you can perform this task either in the Connections section or while creating a new document collection. For example, you might connect to a MongoDB source or a PostgresSQL target.

## 2. Create an ETL Workflow

Once you have created a connection, you can create a workflow between a document collection and a specific table in an external data source.

- To create a source workflow, which means that the collection would import records from the external data source, you must define it when you create a new document collection.
- To create a target workflow, which means that the collection would export records to the external data source, you must create a collection and add at least one record to it. After that, you can add targets in the Collection Settings screen. A collection can have multiple targets.

## 3. Transform the Data

While creating an ETL workflow, after the connection is validated, you can add a transformation that will act on every record as it moves in or out of the collection.
