---
sidebar_position: 50
title: Get GeoFabrics Endpoints
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for accessing the unique global or regional endpoints (URLs) for your GeoFabrics. You should use these unique URLs as endpoints when making requests against fabric assets such as collections and streams. Which GeoFabrics you can access depends on your assigned [Permissions](../account-management/permissions/index.md).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

To delete a GeoFabric in the Macrometa Web console:

1. Log into an administrator account in the `_system` GeoFabric.
2. Click **Geo Fabrics** to navigate to the GeoFabrics management page.


</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to get [Information about the GeoFabric](https://macrometa.com/docs/api#/operations/InformationOfTheGeo-fabric), including the `regional_urls` and `global_url`.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric describe](../cli/fabrics-cli.md#gdnsl-fabric-describe) CLI command to get unique GeoFabric `regional_urls` and `global_url`.

</TabItem>
</Tabs>
