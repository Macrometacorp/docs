---
title: Create a Graph Edge Collection
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Graph Edge collection](../../collections/graph-edge/) is a form of document collection. It is used define relationships between two documents by using the **_from** and **_to** system attributes and the document **_id** system attribute.

Different ways to create edge collections are described below.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new collection Graph Edge collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Collections**.
3. Click **New Collection**.
4. Click **Graph Edge**.
5. Enter information about the collection and then click **Create**.

   - **Collection Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Geo Distribution -** Select whether to store data globally or locally.
   - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
   - **Wait for sync -** Synchronize to disk before completing document creation or update.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create a Graph Edge Collection](https://www.macrometa.com/docs/api#/operations/handleCommandPost:CreateCollection).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl collection create](../../cli/collections-cli#gdnsl-collection-create) CLI command to create a
Graph Edge collection.

</TabItem>
</Tabs>
