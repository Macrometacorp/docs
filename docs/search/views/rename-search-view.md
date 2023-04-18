---
sidebar_position: 30
title: Rename a Search View
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to rename a search view.

## Rename Search View

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to rename a search view using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Search Views**.
1. Click **Rename** next to the search view for which you want to change the name.
1. Enter a new name in the field and click **Rename**.
1. Click **Yes** to confirm.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Rename a Search View](https://www.macrometa.com/docs/api#/operations/modifyView:rename).


</TabItem>
<TabItem value="cli" label="CLI">

Use our command line interface to [Rename a Search View](../../CLI/search-views-cli#gdnsl-view-rename).


</TabItem>
<TabItem value="py" label="Python SDK">

```py
# Import libraries
from c8 import C8Client

# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "<API Key>" # Change this to your API key.
SEARCH_VIEW_NAME = "SearchView" # Change this to the search view you want to rename.
NEW_SEARCH_VIEW_NAME = "NewSearchView" # Change this to the new name for the search view.

# Authenticate with API key.
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Check if search view exists
list_views = client.list_all_views()
if any(view.get('name') == SEARCH_VIEW_NAME for view in list_views):
    # Rename the search view if it exists
    response = client.rename_view(SEARCH_VIEW_NAME, NEW_SEARCH_VIEW_NAME)
    print(f"Successfully renamed search view from '{SEARCH_VIEW_NAME}' to '{NEW_SEARCH_VIEW_NAME}'.")
else:
    print(f"Search view '{SEARCH_VIEW_NAME}' does not exist.")


```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "<API Key>", fabricName: "_system"});
console.log("Connected to GDN.");

const searchViewName = "SearchView"; // Replace with the name of the search view you want to rename.
const newSearchViewName = "NewSearchView"; // Replace with the new name for the search view.

async function renameMySearchView () {
  const listOfViews = await client.getListOfViews();
  const view = listOfViews.result.find(v => v.name === searchViewName);
  if (!view) {
    console.log(`Search view "${searchViewName}" does not exist`);
    return;
  }
  const renamedView = await client.renameView(view.id, newSearchViewName);
  console.log(`Successfully renamed search view: ${renamedView.result.name}`);
}

renameMySearchView();


```

</TabItem>
</Tabs>