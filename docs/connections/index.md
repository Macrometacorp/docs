---
title: Integrations - DRAFT
sidebar_position: 1
---

Integrations allow you to import data into Macrometa Global Data Network (GDN) from external data sources or other Macrometa document collections. You can also export data from Macrometa GDN into external data sources or other Macrometa document collections.

Once created, you can reuse integrations as many times as necessary.

:::note
This feature is currently in beta. Contact support@macrometa.com if you want to try it out.
:::

## Data Source, Connector, Workflow

These terms are used frequently when discussing connections.

A _data source_ refers to an external database or entity that contains data, such as MongoDB, PostgresSQL, a different Macrometa collection, and so on.

A _connector_ is a connection that can be set up between Macrometa and a data source. For example, the list of connectors includes MongoDB, Snowflake, and will be expanded to include others.

An _connection_ is a connection that you have created using the connector between Macrometa and a specific data source or target.

An _ETL workflow_ is a connection between a specific collection and a specific table in a data source.

## Sources and Targets

A _source connection_ allows you to use an external data source or a Macrometa collection as the originating source for data. Any records entered in the source are sent to a Macrometa collection that you choose. A collection can only have one source, and it must be set at collection creation.

A _target connection_ allows you to send data from a Macrometa collection to an external data source or a Macrometa collection. Any records entered in the collection are sent to the target that you choose. A Macrometa collection can have multiple targets.

## Transformations

You can transform data moving in or out of Macrometa, including creating roll-ups. For more information, refer to [Transformations](./transformations).

## Common Schema

If a field has more than one data type, then the data type that applies to the majority of the first 50 records will be selected for import. The rest will be ignored.

## Updating Source Tables

Once a log-based source connection is created, then Macrometa listens to inserts, updates, and deletes. It does not recognize table definition changes, such as changing a column name.

If you alter a source table, such as removing or renaming a column, after it has been mapped to a Macrometa collection, then records will not be updated. You must reload the collection in order to update the schema.

## Limitations

Here are some limitations that you should keep in mind as you work with collections and integrations:

- You cannot change a source integration assigned to a collection after the collection is created.
- You cannot change an integration name.
- An empty collection cannot be a target for an integration.
- You cannot edit transformations.
- Play tier users, refer to [Tenant Quotas and Limits](../references/quotas) to view limits on number of integrations. Keep in mind that each connection also adds one collection, and each transformation adds one stream worker.
- When you add a target, you only capture subsequent inserts, updates, and deletes made on the data after the connection is made. Truncating the collection does not count as deleting records in this case.
