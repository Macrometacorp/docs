---
title: Release Notes 0.17.16
sidebar_position: 95
---

This document describes what has changed in Macrometa release 0.17.16. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### Connections - Beta

With connections, you can now connect Macrometa document collections to external data sources or other Macrometa collections, either as a source or target.

This beta feature is available for instances larger than 16GB (SX-10 and DX-10). Contact support@macrometa.com if you want to try it out.

The [Connections](../../connections) section was added as a result of this feature.

## Feature Updates

The following features updates are included in this release.

### Improved Collection Settings Tab

The Settings tab in collections has been expanded and improved with updated look and new functionality, including:

- Information about connections and ETL workflows.
- Expanded information about collection streams.

[View Collection Settings](../../database/collections/view-collection-settings) was added as a result of this changed. Several pages had minor updates as a result of this change. Individual collection settings pages were removed for Document Store, Key-Value Store, Graph Edge, and Redis Mode collections.

### Miscellaneous Changes

The following minor changes were added in this release.

| Change # | Description |
| -------- | ----------- |
| CEP-559 | Change extension name for [unitconversion](../../compute/cep/query-guide/functions/unitconversion) of `kgToStones` function. New name is [kgToStone](../../compute/cep/query-guide/functions/unitconversion/kgToStone). |
| STRM-588 | Supports geo-replicated topics created by Pulsar clients.  |

## Defect Fixes

The following defects were fixed in this release.

| Defect # | Description |
| -------- | ----------- |
| CEP-562 | The [bayesianRegression](../../compute/cep/query-guide/functions/streaming-ml/bayesianregression) and [updateBayesianRegression](../../compute/cep/query-guide/functions/streaming-ml/updatebayesianregression) stream processors were not working properly. |
| DB-2463  | Allow `/api/version` endpoint to return the system version for all users.  |
