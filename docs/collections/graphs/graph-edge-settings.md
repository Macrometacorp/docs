---
title: Graph Edge Settings
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ViewCollectionSettings from '../_partials/_view-collection-settings.md';
import CollectionSettingsApi from '../_partials/_collection-settings-api.md';
import DocAndGraphSettings from '../_partials/_doc-and-graph-settings.mdx';

<Tabs groupId="operating-systems">
<TabItem value="ui" label="UI">

You can view and update graph edge collection settings in the Settings tab.

<ViewCollectionSettings />

## Graph Edge Settings

<DocAndGraphSettings collection='Graph edge' />

![Graph Edge Settings Tab](/img/collections/graph-edge-settings.png)

</TabItem>
<TabItem value="cli" label="CLI">

Use [gdnsl collection describe](../../cli/collections-cli.md#gdnsl-collection-describe) to view information about a collection.

Results will be similar to this code block:

```bash
{
  "error": false,
  "code": 200,
  "waitForSync": false,
  "name": "edges",
  "isSystem": false,
  "isSpot": false,
  "isLocal": false,
  "status": 3,
  "searchEnabled": false,
  "id": "27025422723",
  "type": 3,
  "hasStream": true,
  "globallyUniqueId": "hC835CABCFA79/27025422723",
  "collectionModel": "DOC"
}
```

Use [gdnsl collection update](../../cli/collections-cli.md#gdnsl-collection-update) to change collection settings.

</TabItem>
<TabItem value="api" label="API">

<CollectionSettingsApi />

</TabItem>
</Tabs>
