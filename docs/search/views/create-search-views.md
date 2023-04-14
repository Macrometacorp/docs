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




</TabItem>
<TabItem value="cli" label="CLI">




</TabItem>
<TabItem value="py" label="Python SDK">

```py
from macrometa import GDN

gdn = GDN("<API_KEY>")

search_view_name = "example_search_view"
collection_name = "your_collection_name"
properties = {
    "links": {
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
response = gdn.create_view(search_view_name, properties)
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

</TabItem>
</Tabs>