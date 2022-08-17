---
title: Key-Value Store Settings
sidebar_position: 50
---

import ViewCollectionSettings from '../_partials/_view-collection-settings.md';
import CollectionSettingsApi from '../_partials/_collection-settings-api.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="ui" label="UI">

You can view and update key-value store collection settings in the Settings tab.

<ViewCollectionSettings />

## Key-Value Store Settings

Key-Value stores only have one settings option.

- **Synchronous Writes -** Select the checkbox to enable synchronous writes.

In the Settings tab, you can [Delete](../delete-collection.md) or [Truncate](../truncate-collection.md) the collection.

![Key-Value Store Settings Tab](/img/collections/key-value-store-settings.png)

</TabItem>
<TabItem value="cli" label="CLI">

Use [gdnsl collection describe](../../cli/collections-cli.md#gdnsl-collection-describe) to view information about a collection.

Results will be similar to this code block:

```bash
{
  "error": false,
  "code": 200,
  "waitForSync": false,
  "name": "kv",
  "isSystem": false,
  "isSpot": false,
  "isLocal": false,
  "status": 3,
  "searchEnabled": false,
  "id": "27025010960",
  "type": 2,
  "hasStream": true,
  "globallyUniqueId": "hC835CABCFA79/27025010960",
  "collectionModel": "KV"
}
```

Use [gdnsl collection update](../../cli/collections-cli.md#gdnsl-collection-update) to change collection settings.

</TabItem>
<TabItem value="api" label="API">

<CollectionSettingsApi />

</TabItem>
</Tabs>
