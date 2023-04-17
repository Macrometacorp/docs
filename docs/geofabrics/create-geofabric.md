---
sidebar_position: 10
title: Create a GeoFabric
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for creating GeoFabrics. Whether or not you can create GeoFabrics depends on your assigned [Permissions](../account-management/permissions/index.md).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

To create a GeoFabric in the Macrometa web console:

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/) in the `_system` GeoFabric.
2. Click **Network > Fabrics** to navigate to the GeoFabrics management page. If you do not see the **Fabrics** link, then you might not be logged in to the `_system` GeoFabric.
3. Click **New Geo Fabric**.
4. Enter a GeoFabric **Name**.
5. Select at least two Edge Locations across which you want the GeoFabric distributed.
6. Select the **Username** of the account for which you want to own the GeoFabric. Default is `root`.
7. Click **Create**.

After creating the GeoFabric, click the GeoFabric name on the list to view its unique global or regional URLs. The owning user can also select their GeoFabric and log in normally.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create GeoFabrics](https://www.macrometa.com/docs/api#/operations/CreateGeo-fabric).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric create](../cli/fabrics-cli#gdnsl-fabric-create) CLI command to create GeoFabrics.

</TabItem>
</Tabs>