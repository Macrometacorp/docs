---
title: Manage ETL Workflows - DRAFT
sidebar_position: 30
---


Manage workflows

Create data source workflow
Add data target workflow

- When you attach targets to a collection, only the data that is available in the current region is used for the target workflow. However, if the current region becomes unreachable, the workflow will stop copying data. To ensure uninterrupted data copying, you should enable streams for the source collection in other regions as a backup. This way, data copying will automatically switch to one of those regions when the current region becomes unavailable.
- DFP Note - Ask Koshy how to do this

View ETL workflows
Delete workflow
Reload collection - It initially truncates the current collection and then only re-starts the Source connection.
