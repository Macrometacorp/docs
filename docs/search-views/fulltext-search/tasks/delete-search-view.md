---
sidebar_position: 40
title: Delete a Search View
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to delete a search view.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a search view using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Search Views**.
3. Click **Delete** next to the search view that you want to delete.
4. Click **Yes** to confirm.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Delete a Search View](https://www.macrometa.com/docs/api#/operations/deleteView).


</TabItem>
<TabItem value="cli" label="CLI">

Use our command line interface to [Delete a Search View](../../../CLI/search-views-cli#gdnsl-view-delete).


</TabItem>
<TabItem value="py" label="Python SDK">

```py
# Import libraries
from c8 import C8Client

# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "<API Key>" # Change this to your API key.
SEARCH_VIEW_NAME = "example_search_view"

# Authenticate with API key.
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)
print("Connected to GDN.")

# Check if search view exists
list_views = client.list_all_views()
if any(view.get('name') == SEARCH_VIEW_NAME for view in list_views):
    # Delete the search view if it exists
    response = client.delete_view(SEARCH_VIEW_NAME)
    if response is True:
        print(f"Successfully deleted search view: {SEARCH_VIEW_NAME}.")
    else:
        print("Error deleting search view.")
else:
    print(f"Search view {SEARCH_VIEW_NAME} does not exist.")
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "<API Key>", fabricName: "_system"});
console.log("Connected to GDN.");

const searchViewName = "Search"; // Replace with the name of the search view you want to delete.

async function deleteMySearchView() {
  const listOfViews = await client.getListOfViews();
  const view = listOfViews.result.find(v => v.name === searchViewName);
  if (!view) {
    console.log(`Search view "${searchViewName}" does not exist`);
    return;
  }
  await client.deleteView(view.name);
  console.log(`Successfully deleted search view: ${searchViewName}`);
}

deleteMySearchView();


```

</TabItem>
</Tabs>