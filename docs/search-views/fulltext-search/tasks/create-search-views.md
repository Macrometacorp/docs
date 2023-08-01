---
sidebar_position: 20
title: Create a Search View
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new search view.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.
- At least one collection created.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new search view using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Search Views**.
3. Click **New View**.
4. Enter a **Search View Name**.
5. In **View Type**, select **Fulltext Search**.
6. Enter data sources for the search view. You can add multiple collections and fields for the search view
   1. In the **Collection** field, select the collection you want to index in the search view.
   2. (Optional) Enter a field to be indexed in the search view. If you do not enter a field, then all fields are indexed.
   3. (Optional) Select a text analyzer or identity analyzer to break up search inputs for improved searching and sorting. If you do not make a selection, then no analyzer is used.
7. (Optional) In the Primary Sort section, you can apply sorting to indexed fields. This is the sorting order for each attribute. It cannot be changed after view is created.
   - **Field -** Specify the sorting according to collections and fields in the mapping definition.
   - **Sort Direction -** Set the sorting order to ascending (default) or descending.
   - **Add Field -** Click to add sorting on another field.
8. Click **Create**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create a Search View](https://www.macrometa.com/docs/api#/operations/createView).

</TabItem>
<TabItem value="cli" label="CLI">

Use our command line interface to [Create a Search View](../../../CLI/search-views-cli#gdnsl-view-create).

</TabItem>
<TabItem value="py" label="Python SDK">

```py
# Import libraries
from c8 import C8Client
# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "<API Key>" # Change this to your API key.

# Choose one of the following methods to access the GDN. API key is recommended.
# Authenticate with API key.
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)
print("Connected to GDN.")
search_view_name = "example_search_view"
collection_name = "your_collection_name"
properties = {
    collection_name: {
        "fields": {
                "title": {"analyzers": ["text_en"]},
                "content": {"analyzers": ["text_en"]}
        }
    }
}
primary_sort = [{"field": "title", "direction": "asc"}]
# Check if collection exists
if not client.has_collection(collection_name):
    print(f"Collection '{collection_name}' does not exist.")
else:
    list_views = client.list_all_views()
    if all(view.get('name') != search_view_name for view in list_views):
        # Create the search view if view does not exists
        response = client.create_view(search_view_name, properties, primary_sort)
        print(f"Successfully created search view: {response['name']}.")
    else:
        print(f"Search view {search_view_name} already exists.")
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "<API Key>", fabricName: "_system"});
console.log("Connected to GDN.");
const collectionName = "example_collection"; // Replace this with your collection name.
const searchViewName = "example_search_view";
const properties = {
  [collectionName]: {
    "fields": {
      "title": {"analyzers": ["text_en"]},
      "content": {"analyzers": ["text_en"]}
    }
  }
};
const primarySort = [{"field": "title", "direction": "asc"}]
async function createMySearchView () {
  if (!await client.hasCollection(collectionName)) {
    console.log(`Collection "${collectionName}" does not exist`);
    return;
  }
  let searchView = { "name": "" };
  const listOfViews = await client.getListOfViews();
  if (listOfViews.result.some(e => e.name === searchViewName)) {
    searchView.name = searchViewName;
    console.log(`Search view "${searchView.name}" already exists`);
  } else {
    searchView = await client.createView(searchViewName, properties, primarySort);
    console.log(`Successfully created search view "${searchView.name}"`);
  }
}
createMySearchView();
```

</TabItem>
</Tabs>
