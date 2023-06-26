---
sidebar_position: 20
title: View Collection Settings
---

import ViewCollectionSettings from './_partials/_view-collection-settings.md';
import CollectionSettingsApi from './_partials/_collection-settings-api.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to view and update collection settings.

<Tabs groupId="operating-systems">
<TabItem value="ui" label="UI">

In the Macrometa web console, you can view and update collection settings in the Settings tab. You can also [Delete](delete-collection.md) or [Truncate](truncate-collection.md) the collection.

<ViewCollectionSettings />

The Settings tab contains the following fields:

**Collection Details**

- **Collection Name** - The name set at collection creation. Cannot be changed.
- **Collection ID** - System-generated ID of the selected collection.
- **Distribution** - Global or local, defined at collection creation. For more information, refer to [Global or Local Collections](./index.md#global-or-local-collections).
- **Data Model** - Type of data that the collection accepts, either **document** or **edge**.
- **Synchronous Writes** - Click to turn synchronous writes on or off for the collection.
- **Resource URL** - API URL and endpoint to access the collection. You might use this when creating a cURL command or HTTP request to interact with the collection.

![Collection Details Section](/img/collections/collection-details.png)

**Collection Stream**

This section is not in [Redis Mode collection](./redis-mode/) settings.

:::note
Streams are enabled and disabled on a per-region basis, not a per-fabric basis. This means that when you toggle streams on or off, that selection only applies to the location displayed at the top of the side menu. You must change location and repeat the selection to apply the change to other locations.
:::

- **Stream Enabled** - Click to turn streams on or off for this collection. When streams are enabled, you can access the Stream tab.
- **Stream Name** - The name of the collection stream.
- **Replication** - Whether the stream is replicated globally or locally.
- **WebSocket URL** - The WebSocket connection to the collection stream allows you to interact with the stream in real-time. This connection allows you to receive live updates as documents are added, updated, or removed from the collection.

![Collection Stream Section](/img/collections/collection-stream.png)

**ETL Workflows and Reload Collections**

The ETL Workflows and Reload Collections sections only apply to [Document Store collections](./documents/) and only appear if you have Connections enabled.

For more information about integrations and connections, refer to [Connections](../connections/).

![Connections and Reload Collection Sections](/img/collections/etl-workflows-and-reload-collection.png)

**Truncate Collection**

For more information, refer to [Truncate Collection](./truncate-collection).

**Delete Collection**

For more information, refer to [Delete Collection](./delete-collection).

</TabItem>
<TabItem value="cli" label="CLI">

Use [gdnsl collection describe](../cli/collections-cli#gdnsl-collection-describe) to view information about a collection.

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

Use [gdnsl collection update](../cli/collections-cli#gdnsl-collection-update) to change collection settings.

</TabItem>
<TabItem value="api" label="API">

<CollectionSettingsApi />

</TabItem>
</Tabs>
