---
title: Release Notes 0.17.16
sidebar_position: 95
---

This document describes what has changed in Macrometa release 0.17.16. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## Miscellaneous Changes

The following minor changes were added in this release.

| Change # | Description |
| -------- | ----------- |
| CEP-559 | Change extension name for [unitconversion](../cep/query-guide/functions/unitconversion/) of `kgToStones` function. New name is [kgToStone](../cep/query-guide/functions/unitconversion/kgToStone). |
| STRM-588 | Supports geo-replicated topics created by Pulsar clients.  |

## Defect Fixes

The following defects were fixed in this release.

| Defect #  | Description  |
|---|---|
| CEP-562 | The [bayesianRegression](../cep/query-guide/functions/streaming-ml/bayesianregression) and [updateBayesianRegression](../cep/query-guide/functions/streaming-ml/updatebayesianregression) stream processors were not working properly. |
| DB-2463  | Allow `/api/version` endpoint to return the system version for all users.  |
