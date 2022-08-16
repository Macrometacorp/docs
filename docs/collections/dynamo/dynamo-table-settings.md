---
title: Dynamo Table Settings
sidebar_position: 18
---

import ViewCollectionSettings from '../_view-collection-settings.md';

You can view and update key-value store collection settings in the Settings tab.

<ViewCollectionSettings />

## Dynamo Table Settings

Dynamo Table settings are displayed as a table schema, similar to the following code block.

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
