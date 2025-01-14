---
sidebar_position: 30
title: Delete Fabrics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for deleting fabrics. Which fabrics you can access depends on your assigned [Permissions](../account-management/permissions/index.md).

:::caution
Deleting a fabric removes all entities, including collections and stream workers, associated with it. Be sure you want to do this, because it cannot be undone!
:::

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

To delete a fabric in the Macrometa web console:

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/) in the `_system` fabric.
2. Click **Network > Fabrics**.
3. Click **Delete** on the row of the fabric you want to delete.
4. Confirm your choice.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove Fabric](https://www.macrometa.com/docs/api#/operations/DropGeo-fabric).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric delete](../developer-hub/cli/fabrics-cli#gdnsl-fabric-delete) CLI command to delete fabrics.

</TabItem>
</Tabs>
