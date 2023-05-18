---
title: Integrations
sidebar_position: 1
---

Integrations allow you to import data into Macrometa Global Data Network (GDN) from external data sources or other Macrometa document collections. You can also export data from Macrometa GDN into external data sources or other Macrometa document collections.

Once created, you can reuse integrations as many times as necessary.

## Data Source, Integration, Connection

These terms are used frequently when discussing integrations.

A _data source_ refers to an external database or entity that contains data, such as MongoDB, PostgresSQL, a different Macrometa collection, and so on.

An _integration_ is a connection between Macrometa and a data source. You can create an integration with Macrometa.

A _connection_ connects a Macrometa collection to a specific table in a data source, either as a source or target.

## Source and Target Integrations

A _source integrations_ allows you to use an external data source or a Macrometa collection as the originating source for data. Any records entered in the source are sent to a Macrometa collection that you choose. A collection can only have one source, and it must be set at collection creation.

A _target integrations_ allows you to send data from a Macrometa collection to an external data source or a Macrometa collection. Any records entered in the collection are sent to the target that you choose. A Macrometa collection can have multiple targets.

## Transformations and Roll-ups

## Common Schema

## Limitations

Here are some limitations that you should keep in mind as you work with collections and integrations:

- You cannot change a source integration assigned to a collection after the collection is created.
- You cannot change an integration name.
- An empty collection cannot be a target for an integration.
- You cannot edit transformations.
- If a field has more than one data type, then the data type that applies to the most records will be selected.
- - Update tier limits with integration limits (confirm what they are with SME)
