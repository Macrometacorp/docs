---
sidebar_position: 20
title: Create a Search View
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new search view.

## Create Search View

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new search view using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Search Views**.
1. Click **New View**.
1. Enter information about the view and then click **Create**.

   - **Name -** The user-defined name for the search view.
   - **Mapping Definition -** Optional. Choose existing data from which to create an index.
    - **Collection -** Select an existing collection.
    - **Field -** Enter a field name for the selected collection.
    - **Analyzer -** Select a text analyzer or identity analyzer to break up search inputs for improved searching and sorting.
   - **Primary Sort -** Optional. The sorting order for each attribute. Cannot be changed after view is created.
    - **Field -** Specify the sorting accodring to collections and fields in the mapping definition.
    - **Direction -** Set the sorting order to ascending (default) or descending.

After creating a view, you can **Rename** or **Delete** it from the **Search** screen.


</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create a Search View](https://www.macrometa.com/docs/api#/operations/createView).


</TabItem>
<TabItem value="cli" label="CLI">

Create a view.

```bash
gdnsl view create <view-name> [flags]
```

### Examples

```bash
  # Create test view on demo collection
  gdnsl view create test --collection demo

  # Create test view on demo collection with analyzer
  gdnsl view create test --collection demo --analyzer identity

  # Create test view on demo collection with fields
  gdnsl view update test --collection demo --field "name:text_en,text_fr" --field "age:text_en"
  
  # Create test view on demo collection with store-values
  gdnsl view create test --collection demo --store-values none

  # Create test view on demo collection with track-list-positions
  gdnsl view create test --collection demo --track-list-positions

  # Create test view on demo collection with include-all-fields
  gdnsl view create test --collection demo --include-all-fields

```

### Options

```bash
  -h, --help                   Help to create a view.
      --analyzer string        Analyzers to be used for indexing of string values. Can be given multiple times. (default: identity).
      --field string           Field and analyzers mapping in the format <fieldName:analyzer1,analyzer2> 
                               Example: "age:text_en,text_fr". Can be given multiple times.
      --store-values string    How should the view track the attribute values, this setting allows for additional value retrieval optimizations, one of:
                               none: Do not store values by the view.
                               id: Store only information about value presence, to allow use of the EXISTS() function (default "none").
      --track-list-positions boolean  The flag determines whether or not values in a lists should be treated separate (default: false).
      --include-all-fields boolean    The flag determines whether or not to index all fields on a particular level of depth (default: false).
      --fabric                 Name of the fabric to use.
```

**Options inherited:**

```bash
  --config string              gdnsl config file (default is ./gdnsl.yaml)
```


</TabItem>
<TabItem value="py" label="Python SDK">

```py
# Import libraries
from c8 import C8Client

# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "<API KEY>" # Change this to your API key.

print("--- Connecting to GDN")

# Choose one of the following methods to access the GDN. API key is recommended.

# Authenticate with API key.
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)


search_view_name = "example_search_view"
collection_name = "your_collection_name"
properties = {
    "<COLLECTION NAME>": { # Change this to the name of the collection to use with the search view.
        collection_name: {
            "analyzers": ["text_en"],
            "fields": {
                "title": {"analyzers": ["text_en"]},
                "content": {"analyzers": ["text_en"]}
            }
        }
    }
}

# Create the search view
response = client.create_view(search_view_name, properties)

```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "<API KEY>", fabricName: "_system"});
console.log("Authentication done!!...");

const collectionName = "example_collection";
const searchViewName = "example_search_view";

const properties = {
  "links": {
    [collectionName]: {
      "analyzers": ["text_en"],
      "fields": {
        "title": {"analyzers": ["text_en"]},
        "content": {"analyzers": ["text_en"]}
      }
    }
  }
};

async function createMySearchView () {
  let searchView = { "name": "" };
  if (await client.hasView(searchViewName)) {
    console.log("Search View already exists");
    searchView.name = searchViewName;
    console.log(`OLD Search View = ${searchView.name}`);
  } else {
    searchView = await client.createView(searchViewName, properties);
    console.log(`NEW Search View = ${searchView.result.name}`);
  }
}

createMySearchView();
```

</TabItem>
</Tabs>