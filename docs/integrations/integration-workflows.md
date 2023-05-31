---
title: Integration Workflows - DRAFT
sidebar_position: 10
---

This page explains the high-level workflow of integrations and connections.

## 1. Create an Integration

Creating an integration is the first step of connecting a Macrometa document collection to an external source or target. In the Macrometa web console, you can perform this task either in the Integrations section or while creating a new document collection. For example, you might connect to a MongoDB source or a PostgresSQL target.

## 2. Create a Connection

Once you have defined an integration, you can create a connection between a document collection and a specific table in an external data source.

- To create a source connection, which means that the collection would import records from the external data source, you must define it when you create a new document collection.

- To create a target connection, which means that the collection would export records to the external data source, you must create a collection and add at least one record to it. After that, you can add targets in the Collection Settings screen.

## 3. Transform the Data

While creating a connection, after the integration is validated, you can add a transformation that will act on every record as it moves in or out of the collection.
