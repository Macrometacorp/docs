---
title: Create a Key-Value Store
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Key-Value Store collection.

## Create a Key-Value Store Collection with the Console

Follow these instructions to create a new collection using the GDN console web UI.

1. Log in to your Macrometa account.
1. Click **COLLECTIONS**.
1. Click **New Collection**.
1. Click **Key-Value Store**.
1. Enter information about the collection and then click **Create**.

   - **Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Expiration -** Enable expiration. This allows key-value documents to be removed at a certain date and time.
   - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
   - **Wait for sync -** Synchronize to disk before completing record creation or update.

## Create Key-Value Store Collection with Code
