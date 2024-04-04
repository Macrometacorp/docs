---
sidebar_position: 20
title: View Fabrics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for viewing fabrics. Which fabrics you can access depends on your assigned [Permissions](../account-management/permissions/index.md).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view fabrics using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Network > Fabrics**. Macrometa displays a list of fabrics you have access to.
3. Click a fabric name to view details about a fabric, such as unique endpoints and which locations are enabled.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [List All Fabrics](https://www.macrometa.com/docs/api#/operations/ListOfGeo-fabrics)
- [List Accessible Fabrics](https://www.macrometa.com/docs/api#/operations/ListOfAccessibleGeoFabrics)
- [Get Information about a Fabric](https://www.macrometa.com/docs/api#/operations/InformationOfTheGeo-fabric)

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric list](../cli/fabrics-cli#gdnsl-fabric-list) CLI command to list fabrics and [gdnsl fabric describe](../cli/fabrics-cli#gdnsl-fabric-describe) CLI command to view fabric details.

</TabItem>
</Tabs>
