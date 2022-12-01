---
title: Document Store Settings
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ViewCollectionSettings from '../_partials/_view-collection-settings.md';
import DocAndGraphSettings from '../_partials/_doc-and-graph-settings.mdx';
import CollectionSettingsApi from '../_partials/_collection-settings-api.md';

<Tabs groupId="operating-systems">
<TabItem value="ui" label="UI">

You can view and update document store collection settings in the Settings tab.

<ViewCollectionSettings />

## Document Store Settings

<DocAndGraphSettings collection='Document store' />

![Document Store Settings Tab](/img/collections/doc-store-settings.png)

</TabItem>
<TabItem value="cli" label="CLI">

Use [gdnsl collection describe](../../cli/collections-cli.md#gdnsl-collection-describe) to view information about a collection.

Results will be similar to this code block:

```bash
{
  "error": false,
  "code": 200,
  "waitForSync": true,
  "name": "docs",
  "isSystem": false,
  "isSpot": false,
  "isLocal": false,
  "status": 3,
  "searchEnabled": false,
  "id": "47024645105",
  "type": 2,
  "hasStream": true,
  "globallyUniqueId": "hC835XXBCXX79/27024685109",
  "collectionModel": "DOC"
}
```

Use [gdnsl collection update](../../cli/collections-cli.md#gdnsl-collection-update) to change collection settings.

</TabItem>
<TabItem value="api" label="API">

<CollectionSettingsApi />

</TabItem>
</Tabs>