---
sidebar_position: 1
title: SQL Tutorial
---

This tutorial is an introduction to SQL for Macrometa geo-distributed fast data platform. This tutorial assumes no pre-existing knowledge, starting with basic operations and working up to more advanced.

The tutorial is built around a small dataset of product categories.

## Objectives

By the end of this tutorial, you will:

- Understand how to use SQL to create, read, update, and delete documents in a collection.
- Be able to search, sort, and filter content with SQL queries.

:::note
Macrometa allows you to manage your collections several ways: web interface (console), [CLI](../../../cli/), [API](https://www.macrometa.com/docs/api), or one of our several SDKs. We will primarily use SDKs for sending requests with queries.

If you are more comfortable working in the CLI, then you can enter any SQL command using the [gdnsl query](../../../cli/queries-cli) command.
:::

## Prerequisites

You must have a Macrometa account with the permissions necessary to create collections.

## Dataset

The dataset features couple categories of products:

```json
[
    {"name": "Books"},
    {"name": "Electronics"},
    {"name": "Food"}
]
```

## About this Tutorial

This tutorial guides you through several sets of tasks. To get the most out of this tutorial, complete the sections in order. Many tasks build on earlier steps, so they are necessary to successfully complete the full tutorial.

Enjoy and have fun!

- [Basic Document Tasks](sql-crud.md)
