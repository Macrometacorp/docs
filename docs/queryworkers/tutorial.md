---
sidebar_position: 2
title: Tutorials
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Query Workers

This tutorial is about using C8QL queries as API (aka Query Workers) in Macrometa GDN with low latencies across the globe.

For this example, we use the following credentials:

* Tenant name: `nemo@nautilus.com`
* User password: `xxxxxx`.

## Driver download

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

    To install pyC8, simply run

        $ pip3 install pyC8

    or, if you prefer to use conda:

        conda install -c conda-forge pyC8

    or pipenv:

        pipenv install --pre pyC8

    Once the installation process is finished, you can begin developing applications in Python.

   </TabItem>
   <TabItem value="js" label="Javascript">

    With Yarn or NPM

        yarn add jsc8
        (or)
        npm install jsc8

    If you want to use the driver outside of the current directory, you can also install it globally using the `--global` flag:

        npm install --global jsc8

    From source,

        git clone https://github.com/macrometacorp/jsc8.git
        cd jsC8
        npm install
        npm run dist

  </TabItem>
</Tabs>  

## Code Sample

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    import pprint

    # Variables - URLs
    global_url = "gdn.paas.macrometa.io"

    # Variables - DB
    email = "nemo@nautilus.com"
    password = "xxxxxx"
    geo_fabric = "_system"
    collection_name = "address"

    # Variables - Query Workers
    parameter = {"firstname": "", "lastname": "", "email": "", "zipcode": ""}
    insert_data = {
        "query": {
            "name": "insertRecord",
            "value": "INSERT {'firstname':@firstname, 'lastname':@lastname, 'email':@email, 'zipcode':@zipcode, '_key': 'abc'} IN %s" % collection_name,
            "parameter": parameter
        }
    }
    get_data = {
        "query": {
            "name": "getRecords",
            "value": "FOR doc IN %s RETURN doc" % collection_name
        }
    }
    update_data = {
        "query": {
            "name": "updateRecord",
            "value": "UPDATE 'abc' WITH { \"lastname\": \"cena\" } IN %s" % collection_name
        }
    }
    delete_data = {
        "query": {
            "name": "deleteRecord",
            "value": "REMOVE 'abc' IN %s" % collection_name
        }
    }
    get_count = {
        "query": {
            "name": "countRecords",
            "value": "RETURN COUNT(FOR doc IN %s RETURN 1)" % collection_name
        }
    }

    pp = pprint.PrettyPrinter(indent=4)

    if __name__ == '__main__':

    # Step1: Open connection to GDN. You will be routed to closest region.
        print("1. CONNECT: federation: {},  user: {}".format(global_url, email))
        client = C8Client(protocol='https', host=global_url, port=443,
                            email=email, password=password,
                            geofabric=geo_fabric)      
    
        # Step2: Create a collection if not exists
        print("2. CREATE_COLLECTION: region: {},  collection: {}".format(global_url, collection_name))
        if client.has_collection(collection_name):
            collection = client.collection(collection_name)
        else:
            collection = client.create_collection(collection_name)
    
        # Step3: Create RestQLs
        print("3. CREATE_RESTQLs: region: {}".format(global_url))
        client.create_restql(insert_data)  # name: insertRecord
        client.create_restql(get_data)  # name: getRecords
        client.create_restql(update_data)  # name: updateRecord
        client.create_restql(delete_data)  # name: deleteRecord
        client.create_restql(get_count)  # name: countRecords
        pp.pprint(client.get_restqls())
    
        # Step4: Execute Query Workers
        print("4. EXECUTE_RESTQLs: region: {}".format(global_url))
    
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
    
        print("5. DELETE_RESTQLs: region: {}".format(global_url))
        client.delete_restql("insertRecord")
        client.delete_restql("getRecords")
        client.delete_restql("updateRecord")
        client.delete_restql("countRecords")
        client.delete_restql("deleteRecord")

  </TabItem>
  <TabItem value="js" label="Javascript">

    'use strict'

    const jsc8 = require('jsc8');

    // Variables - DB
    const global_url = "https://gdn.paas.macrometa.io";

    // Crete a authenticated instance with Token / apiKey
    // const client = new jsc8({url: global_url, token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: global_url, apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8(global_url);

    await client.login("nemo@nautilus.com", "xxxxx");

    //Variables
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

    try{
        console.log(`Creating the collection ${collection_name}...`);
        const exists_coll = await client.hasCollection(collection_name);
        if (exists_coll === false) {
            await client.createCollection(collection_name);
        }
    }
        catch (e) {
        await console.log("Collection creation did not succeed due to " + e);
    }
    }

    async function createRestQL(){
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


    async function executeRestQL(){
    console.log("\n 4. EXECUTE_RESTQLS");
    console.log("\n a. Insert Data");
    let resp = await client.executeRestql(insert_data.query.name.toString(), {"firstname": "john","lastname": "doe","email": "john.doe@macrometa.io","zipcode": "511037"});
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

    async function deleteRestQL(){
    console.log("\n 4. DELETE_RESTQLS")
    await client.deleteRestql(insert_data.query.name.toString());
    await client.deleteRestql(get_data.query.name.toString());
    await client.deleteRestql(update_data.query.name.toString());
    await client.deleteRestql(get_data.query.name.toString());
    await client.deleteRestql(get_count.query.name.toString());
    await client.deleteRestql(delete_data.query.name.toString());
    }


    (async function(){
    await createCollection();
    await createRestQL();
    await executeRestQL();
    await deleteRestQL();
    })();
    
  </TabItem>
</Tabs>  
