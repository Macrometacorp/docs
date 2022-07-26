---
sidebar_position: 100
title: Release Notes 0.17.9
---

# Release Notes 0.17.9

This document describes what has changed in Macrometa release 17.9. To check what version of GDN you are using, use the [Client Version](../cli/client-version-cli.md) command in the CLI or the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## Bug Fixes

- API-179 - Fixed issues with API server latency.
- STRM-296 / STRM-160 / STRM-215 - Fixed an issue where a metadata error in streams caused duplicate messages.
- DEPL-168 / STRM-274 / STRM-255 - Fixed a timeout issue which occasionally caused probe failures in Zookeeper.
- DB-1340 / DB-1354 / STRM-296 - Various reliability enhancements.
- DB-1442 / DB-1444 - If you added documents to a collection from different regions, occasionally a document would fail to add after trying to use a unique key claimed by another document.
- GUI-798 - Fixed an issue where the GDN GUI would display improperly for some users.
- CEP-247 - Improvements to logging.
- DB-1038 - Added a limit to the number of login attempts within a timeframe.
- SEC-210 - Security fix.
