---
sidebar_position: 20
title: Update GeoFabrics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for updating GeoFabrics. Which GeoFabrics you can access depends on your assigned [Permissions](../account-management/permissions/index.md).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

To modify a geofabric:

1. Log in to an administrator account in the `_system` GeoFabric.
2. Click **Geo Fabrics** to navigate to the GeoFabrics management page.
3. Click the GeoFabric that you want to modify.
4. Add regions to or remove regions from the GeoFabric by clicking the **Status** switch next to each region.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Set the GeoFabric Metadata](https://macrometa.com/docs/api#/operations/SetMetadataInformationOfTheGeo-fabric)
- [Modify the GeoFabric Metadata](https://macrometa.com/docs/api#/operations/UpdateMetadataInformationOfTheGeo-fabric)

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric list](../cli/fabrics-cli.md#gdnsl-fabric-update) CLI command to update GeoFabric metadata.

</TabItem>
</Tabs>
