---
sidebar_position: 20
title: View GeoFabrics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for viewing GeoFabrics. Which GeoFabrics you can access depends on your assigned [Permissions](../account-management/permissions/index.md).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view GeoFabrics using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Network > Fabrics**. Macrometa displays a list of GeoFabrics you have access to.
1. Click a GeoFabric name to view details about a GeoFabric, such as unique endpoints and which locations are enabled.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [List All GeoFabrics](https://www.macrometa.com/docs/api#/operations/ListOfGeo-fabrics)
- [List Accessible GeoFabrics](https://www.macrometa.com/docs/api#/operations/ListOfAccessibleGeoFabrics)
- [Get Information about a GeoFabric](https://www.macrometa.com/docs/api#/operations/InformationOfTheGeo-fabric)

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric list](../cli/fabrics-cli#gdnsl-fabric-list) CLI command to list GeoFabrics and [gdnsl fabric describe](../cli/fabrics-cli#gdnsl-fabric-describe) CLI command to view GeoFabric details.

</TabItem>
</Tabs>
