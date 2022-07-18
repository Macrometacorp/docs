---
title: Create Graph Edge
sidebar_position: 20
---

The Graph Edge collection is a form of document collection. It is used define relationships between two documents by using the **_from** and **_to** system attributes and the document **_id** system attribute.

## Create a Graph Edge Collection with the Console

Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Collections**.
1. Click **New Collection**.
1. Click **Document Store**.
1. Enter information about the collection and then click **Create**.

   - **Collection Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Geo Distribution -** Select whether to store data globally or locally.
   - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
   - **Wait for sync -** Synchronize to disk before completing document creation or update.

## Create a Document Store Collection with Code

Refer to the [Graph Edge Quickstart](quickstart.md) and [Using Rest API](using-rest-api.md) for code examples.