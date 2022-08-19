---
title: Dynamo Table Settings
sidebar_position: 18
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ViewCollectionSettings from '../_partials/_view-collection-settings.md';
import CollectionSettingsApi from '../_partials/_collection-settings-api.md';

<Tabs groupId="operating-systems">
<TabItem value="ui" label="UI">

You can view and update key-value store collection settings in the Settings tab.

<ViewCollectionSettings />

## Dynamo Table Settings

Dynamo Table settings are displayed as a table schema similar to the following code block.

```json
{
  "TableName": "Dynamo",
  "TableStatus": "ACTIVE",
  "TableArn": "426548253",
  "ItemCount": 0,
  "KeySchema": [
    {
      "AttributeName": "dyn",
      "KeyType": "HASH"
    }
  ],
  "CreationDateTime": 1658949141,
  "AttributeDefinitions": [
    {
      "AttributeName": "dyn",
      "AttributeType": "S"
    }
  ]
}
```

In the Settings tab, you can [Delete](../delete-collection.md) or [Purge](purge-dynamo-table.md) the collection.

</TabItem>
<TabItem value="cli" label="CLI">

Use [gdnsl collection describe](../../cli/collections-cli.md#gdnsl-collection-describe) to view information about a collection.

Results will be similar to this code block:

```bash
{
  "error": false,
  "code": 200,
  "waitForSync": false,
  "name": "dynamo",
  "isSystem": false,
  "isSpot": false,
  "isLocal": false,
  "status": 3,
  "searchEnabled": false,
  "id": "27025372349",
  "type": 2,
  "hasStream": false,
  "globallyUniqueId": "hC835CABCFA79/27025372349",
  "collectionModel": "DYNAMO"
}
```

Use [gdnsl collection update](../../cli/collections-cli.md#gdnsl-collection-update) to change collection settings.

</TabItem>
<TabItem value="api" label="API">

<CollectionSettingsApi />

</TabItem>
</Tabs>