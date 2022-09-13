---
sidebar_position: 10
title: View Collections
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes the features available in the GDN console and how to work with your collections.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Once you log in to a Macrometa account, you can view all collections that you have access to.

1. Log in to Macrometa.
1. Click **Collections**.

Macrometa dispays a list of collections. The following columns show information about each collection.

| Field Name  | Description  |
|---|---|
| Collection Name  | The list of all collections you have access to, sorted alphabetically.  |
| Data Model  | Displays the type of each collection.  |
| Stream Enabled  | Shows whether a collection stream is enabled (Yes) or not enabled (No). You can change this in the collection Data tab.  |
| Distribution  | When a collection is created, it can be locally or globally distributed across Macrometa servers. This section displays the distribution type for your collections - Local or Global.  |
| Filter Collections | If you have many collections, then it can be helpful to filter your collection list so that you have fewer to sort through. |

**Filter Collections**

You can filter collections by _name_ or by _type_.

- **Filter Collections by Name :** To filter collections by name, start typing in the search field that says **Filter collections**. Macrometa begins to filter the list as soon as you start typing.

- **Filter Collections by Type :** To filter collections by type, click one of the collection types next to **All**. Macrometa displays only collections matching the selected type.

**New Collection**

When viewing your collections, you can click **New Collection** to create a new collection. For full instructions, refer to the following topics:

- [Create a Document Store](documents/create-document-store.md)
- [Create a Key-Value Store](keyvalue/create-key-value-store.md)
- [Create a Dynamo Table](dynamo/create-dynamo-table.md)
- [Create a Graph Edge](graphs/create-graph-edge.md)

</TabItem>
<TabItem value="apo" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [List All Collections](https://macrometa.com/docs/api#/operations/handleCommandGet)
- [Get Information About a Collection](https://macrometa.com/docs/api#/operations/handleCommandGet:collectionGetProperties)
- [Get Number of Documents in a Collection](https://macrometa.com/docs/api#/operations/handleCommandGet:getCollectionCount)

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl collection list](../cli/collections-cli.md#gdnsl-collection-list) CLI command to see what collections exist.

Use the [gdnsl collection describe](../cli/collections-cli.md#gdnsl-collection-describe) CLI command to learn more about a specific collection.

Output from these commands looks similar to the following:

```bash
MacBook-Pro ~ % gdnsl collection list
┌────────┐
│ Name   │
├────────┤
│ edges  │
│ docs   │
│ dynamo │
│ kv     │
└────────┘

MacBook-Pro ~ % gdnsl collection describe kv

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

</TabItem>
</Tabs>
