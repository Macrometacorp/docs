---
sidebar_position: 1
title: C8QL GoT Tutorial
---

This tutorial is an introduction to C8QL, the GDN query language. This tutorial assumes no pre-existing knowledge, starting with basic operations and working up to more advanced.

The tutorial is built around a small dataset of characters from the novel and fantasy drama television series Game of Thrones (as of season 1). There is no need to import the data before you start. It is provided as part of the C8QL queries in this tutorial.

## Objectives

By the end of this tutorial, you will:

- Understand how to use C8QL to create, read, update, and delete documents in a collection.
- Be able to search, sort, and filter content with C8QL queries.
- Understand the basics of Graph Edge collections.

:::note
Macrometa allows you to manage your collections several ways: web interface (console), [CLI](../../cli/index.md), [API](https://macrometa.com/docs/api), or one of our several SDKs. Because this is a tutorial for beginners, we will primarily enter commands in the console.

If you are more comfortable working in the CLI, then you can enter any C8QL command using the [gdnsl query](../../cli/queries-cli.md) command.
:::

## Prerequisites

You must have a Macrometa account with the permissions necessary to create collections.

## Dataset

The dataset features 43 characters with their name, surname, age, alive status, and trait references. The surname and age properties are not always present. The column _traits (resolved)_ is not part of the actual data used in this tutorial, but is included for your convenience.

![Characters_Table](/img/c8ql/tutorial/Characters_Table.png)

### Traits

There are 18 unique traits. Each trait has a random letter as document key. The trait labels come in English and German.

![Traits_Table](/img/c8ql/tutorial/Traits_Table.png)

### Locations

This small collection of eight locations comes with two attributes, a _name_ and a _coordinate_. The coordinates are modeled as number arrays, each including a latitude and a longitude value.

![Locations_Table](/img/c8ql/tutorial/Locations_Table.png)

## Create the Characters Collection

Before we can insert documents with C8QL, we need a place to put them in: a collection.

For this tutorial, [Create a Document Store collection](../../collections/documents/create-document-store.md) in the console. For more information about collections, refer to [Collections](../../collections/index.md).

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Collections**.
3. Click **New Collection**.
4. Click **Document Store**.
5. Name the collection **Characters** and then click **Create**.