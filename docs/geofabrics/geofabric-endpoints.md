---
sidebar_position: 50
title: Get GeoFabrics Endpoints
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for accessing the unique global or regional endpoints (URLs) for your GeoFabrics. You should use these unique URLs as endpoints when making requests against fabric assets such as collections and streams. Which GeoFabrics you can access depends on your assigned [Permissions](../account-management/permissions/index.md).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

To view GeoFabric endpoints in the Macrometa Web console:

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/) in the `_system` GeoFabric.
1. Click **Network > Fabrics**.
1. Click the name of the GeoFabric for which you want to view endpoints.
1. Global and regional endpoints are displayed in the **ENDPOINT** field next to each global or regional entry.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to get [Information about the GeoFabric](https://www.macrometa.com/docs/api#/operations/InformationOfTheGeo-fabric), including the `regional_urls` and `global_url`.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric describe](../cli/fabrics-cli#gdnsl-fabric-describe) CLI command to get unique GeoFabric `regional_urls` and `global_url`.

</TabItem>
</Tabs>
