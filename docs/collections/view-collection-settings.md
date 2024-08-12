---
sidebar_position: 20
title: View Collection Settings
---

import ViewCollectionSettings from './_partials/_view-collection-settings.md';
import CollectionSettingsApi from './_partials/_collection-settings-api.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Macrometa GDN offers numerous ways to allow you manage collection settings: the web console, CLI, and API. 

<Tabs groupId="operating-systems">
<TabItem value="ui" label="Web Console">

View and update collection settings in the Settings tab. You can also [Delete](work-collections.md#delete-a-collection) or [Truncate](work-collections.md#truncate-a-collection) the collection.

<ViewCollectionSettings />

The Settings tab contains the following details about a collection:

**Collection Details**

- **Collection Name** - The name used to create the collection. Cannot be changed.
- **Collection ID** - System-generated ID of the selected collection.
- **Distribution** - Global or local, defined at collection creation. For more information, refer to [Global or Local Collections](./index.md#global-or-local-collections).
- **Data Model** - Type of data that the collection accepts, either **document** or **edge**.
- **Strong Consistency** - Indicates whether this collection has strong consistency guarantees. For more information, refer to [Strong Consistency](strong-consistency.md).
- **Synchronous Writes** - Click to turn synchronous writes on or off for the collection.
- **Resource URL** - API URL and endpoint to access the collection. This is useful when creating a cURL command or HTTP request to interact with the collection.

![Collection Details Section](/img/collections/collection-details.png)

**Collection Stream**

This section is not in [Redis Mode collection](./redis-mode/) settings.

:::note
Streams are enabled and disabled on a per-region basis, not a per-fabric basis.Hence, toggling streams on/off only affects the location displayed at the top-right side menu. Repeat this process to apply stream changes to other locations.
:::

- **Stream Enabled** - Toggle to enable/disable streams for this collection. Enabling streams helps you to access the Stream tab.
- **Stream Name** - The name of the collection stream.
- **Replication** - indicates if stream replication occurs local or global
- **WebSocket URL** - The WebSocket connection to the collection stream allows you to interact with the stream in real-time. This connection allows you to receive live updates as documents are added, updated, or removed from the collection.

![Collection Stream Section](/img/collections/collection-stream.png)

**Truncate Collection**

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
