---
sidebar_position: 20
title: Update Fabrics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists several methods for updating fabrics. Which fabrics you can access depends on your assigned [Permissions](../account-management/permissions/index.md).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

To modify a fabric:

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/) in the `_system` fabric.
2. Click **Network > Fabrics**.
3. Click the fabric that you want to modify.
4. Add regions to or remove regions from the fabric by clicking the **Status** switch next to each region.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Set the Fabric Metadata](https://www.macrometa.com/docs/api#/operations/SetMetadataInformationOfTheGeo-fabric)
- [Modify the Fabric Metadata](https://www.macrometa.com/docs/api#/operations/UpdateMetadataInformationOfTheGeo-fabric)

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl fabric list](../developer-hub/cli/fabrics-cli#gdnsl-fabric-update) CLI command to update fabric metadata.

</TabItem>
</Tabs>
