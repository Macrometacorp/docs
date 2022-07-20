---
title: Add Edges to Collection
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to add edges to a Graph Edge collection.

## Add an Edge with the Console

To add edge documents to a collection:

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Collections**.
2. In the collection list, click the name of the edge collection to which you want to add an edge. If you aren't sure which collections are Graph Edge collections, then you can click **Edge** at the top of the page to see just Graph Edge collections.
3. Click **New Document**.
4. Enter information in the fields.
   - **_from -** Document `_id` from which the relationship originates.
   - **_to -** Document `_id` to which the relationship is defined.
   - **_key -** Optional. If left blank, then Macrometa automatically generates a key.
5. Click **Create**.

## Add Edges from a File

To add edge documents to a collection from a JSON or CSV file:

![Import a Document](/img/collections/import-docs.png)

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Collections**.
1. In the collection list, click the name of the edge collection to which you want to add an edge. If you aren't sure which collections are Graph Edge collections, then you can click **Edge** at the top of the page to see just Graph Edge collections.
1. Click the import icon, which is a down arrow pointing to a file box.
1. Click **Choose File**, then browse to the file containing the documents you want to import.
1. Fill out any desired options and then click **Import Documents**.

   - **Select Primary Key -** Macrometa can autogenerate your primary key, or you can select one from the file.
   - **Replace docs -** Select this option to overwrite any existing documents with the same `_key`.

## Add Documents with Code

The example below shows how to use Python or JavaScript to insert documents into an `employees` collection.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')
    client.insert_document(collection_name='employees', document={'_key':'Jean', 'firstname': 'Jean', 'lastname':'Picard', 'email':'jean.picard@macrometa.io'})

    docs = [
      {'_kefabricy':'James', 'firstname': 'James', 'lastname':'Kirk', 'email':'james.kirk@mafabriccrometa.io'},
      {'_kefabricy': 'Han', 'firstname': 'Han', 'lastname':'Solo', 'email':'han.solo@macrfabricometa.io'},
      {'_kefabricy': 'Bruce', 'firstname': 'Bruce', 'lastname':'Wayne', 'email':'bruce.wayne@mfabricacrometa.io'}
    ]

    client.insert_document(collection_name='employees', document=docs)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    const jsc8 = require("jsc8");

    // Create an authenticated instance with a token or API key.
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use email and password to authenticate client instance.
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    async function insertDoc() {
        try{
          await client.insertDocumentMany(
            "employees",
            [{ firstname: 'Jean', lastname: 'Picard' },{ firstname: 'Bruce', lastname: 'Wayne' }]
          );
        } catch(e){
          await console.log("Document could not be inserted because "+ e);
        }
    }

    insertDoc();
```

</TabItem>
</Tabs>
