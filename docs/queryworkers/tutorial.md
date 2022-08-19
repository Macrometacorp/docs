---
sidebar_position: 70
title: Query Worker Tutorial
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial is about using C8QL queries as API (aka Query Workers) in Macrometa GDN with low latencies across the globe.

For this example, we use the following credentials:

- Tenant name: `nemo@nautilus.com`
- User password: `xxxxxx`.

## Installation

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
With Yarn or NPM

    yarn add jsc8
    (or)
    npm install jsc8

If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

    npm install --global jsc8

From source,

    git clone https://github.com/macrometacorp/jsc8.git
    cd jsC8
    npm install
    npm run dist
```

</TabItem>
<TabItem value="py" label="Python">

```py
pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

To install pyC8, simply run

    $ pip3 install pyC8

or, if you prefer to use conda:

    conda install -c conda-forge pyC8

or pipenv:

    pipenv install --pre pyC8

Once the installation process is finished, you can begin developing applications in Python.
```

</TabItem>
</Tabs>  

## Code Sample

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require('jsc8');

const gdnUrl = "https://gdn.paas.macrometa.io";

// Create auth instance with token
const client = new jsc8({
    url: gdnUrl, 
    token: "XXXX", 
    fabricName: '_system'
});

// ----- OR -----

// Create an auth instance with an API Key
const client = new jsc8({
    url: gdnUrl, 
    apiKey: "XXXX", 
    fabricName: '_system'
});

// ----- OR -----

// Create an auth instance using an email and password
const client = new jsc8(gdnUrl);
await client.login("nemo@nautilus.com", "xxxxx");

// Variables
const collection_name = "address";

// Variables - Query Workers
let parameter = {"firstname": "", "lastname": "", "email": "", "zipcode": ""};

let insert_data = {
    "query": {
        "name": "insertRecord",
        "value": `INSERT {'firstname':@firstname, 'lastname':@lastname, 'email':@email, 'zipcode':@zipcode, '_key': 'abc'} IN ${collection_name}`,
        "parameter": parameter

    }
};

let get_data = {
    "query": {
        "name": "getRecords",
        "value": `FOR doc IN ${collection_name} RETURN doc`
    }
};

let update_data = {
    "query": {
        "name": "updateRecord",
        "value": `UPDATE 'abc' WITH { \"lastname\": \"cena\" } IN ${collection_name}`
    }
};

let delete_data = {
    "query": {
        "name": "deleteRecord",
        "value": `REMOVE 'abc' IN ${collection_name}`
    }
};

let get_count = {
    "query": {
        "name": "countRecords",
        "value": `RETURN COUNT(FOR doc IN ${collection_name} RETURN 1)`
    }
};

async function createCollection() {
    console.log("\n 2. CREATE_COLLECTION");

    try {
        console.log(`Creating the collection ${collection_name}...`);
        const exists_coll = await client.hasCollection(collection_name);
        if (exists_coll === false) {
            await client.createCollection(collection_name);
        }
    } catch (e) {
        await console.log("Collection creation did not succeed due to " + e);
    }
}

async function createRestQL() {
    console.log("\n 3. CREATE_RESTQLS");

    await client.createRestql(
        insert_data.query.name.toString(),
        insert_data.query.value.toString(),
        insert_data.query.parameter
    );

    await client.createRestql(get_data.query.name.toString(), get_data.query.value.toString(), {});
    await client.createRestql(update_data.query.name.toString(), update_data.query.value.toString(), {});
    await client.createRestql(delete_data.query.name.toString(), delete_data.query.value.toString(), {});
    await client.createRestql(get_count.query.name.toString(), get_count.query.value.toString(), {});
}


async function executeRestQL() {
    console.log("\n 4. EXECUTE_RESTQLS");
    console.log("\n a. Insert Data");

    let resp = await client.executeRestql(insert_data.query.name.toString(), {
        "firstname": "john",
        "lastname": "doe",
        "email": "john.doe@macrometa.io",
        "zipcode": "511037"
    });
    console.log(resp.result);

    console.log("\n b. Get Data");
    resp = await client.executeRestql(get_data.query.name.toString(), {});
    console.log(resp.result);

    console.log("\n c. Update Data");
    resp = await client.executeRestql(update_data.query.name.toString(), {})
    console.log(resp.result);

    console.log("\n d. Get Data");
    resp = await client.executeRestql(get_data.query.name.toString(), {});
    console.log(resp.result);

    console.log("\n e. Count Records");
    resp = await client.executeRestql(get_count.query.name.toString(), {})
    console.log(resp.result);

    console.log("\n f. Delete Record");
    resp = await client.executeRestql(delete_data.query.name.toString(), {})
    console.log(resp.result);
}

async function deleteRestQL() {
    console.log("\n 4. DELETE_RESTQLS");

    await client.deleteRestql(insert_data.query.name.toString());
    await client.deleteRestql(get_data.query.name.toString());
    await client.deleteRestql(update_data.query.name.toString());
    await client.deleteRestql(get_data.query.name.toString());
    await client.deleteRestql(get_count.query.name.toString());
    await client.deleteRestql(delete_data.query.name.toString());
}


(async function() {
    await createCollection();
    await createRestQL();
    await executeRestQL();
    await deleteRestQL();
})();
```

</TabItem>

<TabItem value="py" label="Python">

```py
from c8 import C8Client
import pprint
import time

# Variables - URLs
GLOBAL_URL = "gdn.paas.macrometa.io"

# Variables - DB
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxxx"
GEO_FABRIC = "_system"
COLLECTION_NAME = "address"

# Variables - Query Workers
PARAMETER = {"firstname": "", "lastname": "", "email": "", "zipcode": ""}
INSERT_DATA = {
    "query": {
        "name": "insertRecord",
        "value": f"INSERT {{'firstname':@firstname, 'lastname':@lastname, 'email':@email, 'zipcode':@zipcode, '_key': 'abc'}} IN {COLLECTION_NAME}",
        "parameter": PARAMETER
    }
}
GET_DATA = {
    "query": {
        "name": "getRecords",
        "value": f"FOR doc IN {COLLECTION_NAME} RETURN doc"
    }
}
UPDATE_DATA = {
    "query": {
        "name": "updateRecord",
        "value": f"UPDATE 'abc' WITH {{ \"lastname\": \"cena\" }} IN {COLLECTION_NAME}"
    }
}
DELETE_DATA = {
    "query": {
        "name": "deleteRecord",
        "value": f"REMOVE 'abc' IN {COLLECTION_NAME}"
    }
}
GET_COUNT = {
    "query": {
        "name": "countRecords",
        "value": f"RETURN COUNT(FOR doc IN {COLLECTION_NAME} RETURN 1)"
    }
}

pp = pprint.PrettyPrinter(indent=4)

if __name__ == '__main__':

# Step1: Open connection to GDN. You will be routed to closest region.
    print(f"1. CONNECT: federation: {GLOBAL_URL},  user: {EMAIL}")
    client = C8Client(protocol='https', host=GLOBAL_URL, port=443,
                        email=EMAIL, password=PASSWORD,
                        geofabric=GEO_FABRIC)

    # Step2: Create a collection if not exists
    print(f"2. CREATE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    if client.has_collection(COLLECTION_NAME):
        collection = client.collection(COLLECTION_NAME)
    else:
        collection = client.create_collection(COLLECTION_NAME)

    # Step3: Create RestQLs
    print(f"3. CREATE_RESTQLs: region: {GLOBAL_URL}")
    client.create_restql(INSERT_DATA)  # name: insertRecord
    client.create_restql(GET_DATA)  # name: getRecords
    client.create_restql(UPDATE_DATA)  # name: updateRecord
    client.create_restql(DELETE_DATA)  # name: deleteRecord
    client.create_restql(GET_COUNT)  # name: countRecords
    pp.pprint(client.get_restqls())

    time.sleep(5)
    # Step4: Execute Query Workers
    print(f"4. EXECUTE_RESTQLs: region: {GLOBAL_URL}")

    print("\t a. Insert data....")
    response = client.execute_restql(
        "insertRecord", {
            "bindVars": {
                "firstname": "john",
                "lastname": "doe",
                "email": "john.doe@macrometa.io",
                "zipcode": "511037"
            }
        })
    print("\t b. Get data....")
    response = client.execute_restql("getRecords")
    pp.pprint(response['result'])
    print("\t c. Update data....")
    response = client.execute_restql("updateRecord")
    print("\t d. Get data....")
    response = client.execute_restql("getRecords")
    pp.pprint(response['result'])
    print("\t e. Count records....")
    response = client.execute_restql("countRecords")
    pp.pprint(response['result'])
    print("\t f. Delete data....")
    response = client.execute_restql("deleteRecord")

    print(f"5. DELETE_RESTQLs: region: {GLOBAL_URL}")
    client.delete_restql("insertRecord")
    client.delete_restql("getRecords")
    client.delete_restql("updateRecord")
    client.delete_restql("countRecords")
    client.delete_restql("deleteRecord")
```

</TabItem>
</Tabs>  
