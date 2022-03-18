---
sidebar_position: 3
title: Bulk Update with RestQL
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bulk Update Document with RestQL

This tutorial is about using RestQL to bulk update `document` Collection data. 

:::note
If you are new to Macrometa GDN, we strongly recommend reading **[Essentials](../../../essentials/overview.md)** of Macrometa GDN.
:::

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxxx`.

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
  <TabItem value="RA" label="Rest API">

    class APIRequest {
        _headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        constructor(url) {
            this._url = url;
        }

        login(email, password) {
            const endpoint = "/_open/auth";
            const self = this;
            return new Promise(function (resolve, reject) {
                self.req(endpoint, {
                    body: { email, password },
                    method: "POST",
                })
                    .then(({ jwt, ...data }) => {
                        self._headers.authorization = `bearer ${jwt}`;
                        resolve(data);
                    })
                    .catch(reject);
            });
        }

        _handleResponse(response, resolve, reject) {
            if (response.ok) {
                resolve(response.json());
            } else {
                reject(response);
            }
        }

        req(endpoint, { body, ...options } = {}) {
            const self = this;
            return new Promise(function (resolve, reject) {
                fetch(self._url + endpoint, {
                    headers: self._headers,
                    body: body ? JSON.stringify(body) : undefined,
                    ...options,
                }).then((response) => self._handleResponse(response, resolve, reject));
            });
        }
    }

    const EMAIL = "nemo@nautilus.com";
    const PASSWORD = "xxxxxx";
    const FEDERATION_URL = "https://api-gdn.paas.macrometa.io";
    const FABRIC_NAME = "_system";
    const COLLECTION_NAME = "superhero";

    //Variables
    const inputDocs = [
        { _key: "james.kirk@mafabriccrometa.io", firstname: "James", lastname: "Kirk", email: "james.kirk@mafabriccrometa.io", zipcode: "12312" },
        { _key: "han.solo@macrfabricometa.io", firstname: "Han", lastname: "Solo", email: "han.solo@macrfabricometa.io", zipcode: "12311" },
        { _key: "bruce.wayne@mfabricacrometa.io", firstname: "Bruce", lastname: "Wayne", email: "bruce.wayne@mfabricacrometa.io", zipcode: "12345" }
    ];

    const updateKeys = ["james.kirk@mafabriccrometa.io", "bruce.wayne@mfabricacrometa.io"];
    const updateKeyValue = {
        "bruce.wayne@mfabricacrometa.io": { key: "bruce.wayne@mfabricacrometa.io", zipcode: "22222" },
        "james.kirk@mafabriccrometa.io": { key: "james.kirk@mafabriccrometa.io", zipcode: "55555" },
    };

    //Queries
    const insertData = `FOR doc in @InputDocs \
    INSERT {"firstname":doc.firstname, "lastname":doc.lastname, "email":doc.email, "zipcode":doc.zipcode, "_key": doc._key} IN ${COLLECTION_NAME}`;

    const getData = `FOR doc IN ${COLLECTION_NAME} RETURN doc`;

    const updateData = `FOR i IN ${COLLECTION_NAME} \
    FILTER i._key IN @updateKeys \
    UPDATE i with { zipcode: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].zipcode : i.zipcode } IN ${COLLECTION_NAME}`;

    const run = async function () {
        try {
            const connection = new APIRequest(FEDERATION_URL);

            /* -------------------- Login (nemo@nautilus.com/xxxxxxx) -------------------- */
            await connection.login(EMAIL, PASSWORD);
            console.log("Login Successfully using", EMAIL);

            /* -------------------------- Create Doc Collection ------------------------- */
            const collection = await connection.req(`/_fabric/${FABRIC_NAME}/_api/collection`, {
                body: { name: COLLECTION_NAME },
                method: "POST",
            });

            console.log("COLLECTION CREATED SUCCESSFULLY", collection);

            /* ------------------------ Saving a Restql Query ----------------------- */
            const saveRestQlQuery = (queryName, query, parameter) =>
                connection.req(`/_fabric/${FABRIC_NAME}/_api/restql`, {
                    body: {
                        query: {
                            name: queryName,
                            value: query,
                            parameter,
                        },
                    },
                    method: "POST",
                });

            console.log("------- Save the RestQl Queries  ------");
            await saveRestQlQuery("insertData", insertData, {});
            await saveRestQlQuery("getData", getData, {});
            await saveRestQlQuery("updateData", updateData, {});

            console.log("Queries Saved Successfully");

            /* ----------------------- Executing a Restql Query ---------------------- */
            const executeRestql = (queryName, parameter) =>
                connection.req(`/_fabric/${FABRIC_NAME}/_api/restql/execute/${queryName}`, {
                    body: {
                        bindVars: parameter,
                    },
                    method: "POST",
                });

            console.log("------- Execute the RestQl Queries  ------");

            await executeRestql("insertData", {
                InputDocs: inputDocs,
            });
            console.log("Data Inserted \n");

            console.log("Get Data...");

            const dataBeforeUpdate = await executeRestql("getData");
            console.log(dataBeforeUpdate.result);
            console.log("\n");

            await executeRestql("updateData", {
                updateKeys,
                updateKeyValue,
            });

            console.log("Data updated \n");

            const dataAfterUpdate = await executeRestql("getData");
            console.log(dataAfterUpdate.result);
            console.log("\n");
        } catch (e) {
            console.error(e);
        }
    };

    run();
  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client

    fed_url = "gdn.paas.macrometa.io"
    guest_mail = "nemo@nautilus.com"
    guest_password = "xxxxxx"
    geo_fabric = "_system"
    collection_name = "superhero"

    inputDocs = [
        { "_key": "james.kirk@mafabriccrometa.io", "firstname": "James", "lastname": "Kirk", "email": "james.kirk@mafabriccrometa.io", "zipcode": "12312"},
        { "_key": "han.solo@macrfabricometa.io", "firstname": "Han", "lastname": "Solo", "email": "han.solo@macrfabricometa.io", "zipcode": "12311"},
        { "_key": "bruce.wayne@mfabricacrometa.io", "firstname": "Bruce", "lastname": "Wayne", "email": "bruce.wayne@mfabricacrometa.io", "zipcode": "12345" }
    ]

    updateKeys = ["james.kirk@mafabriccrometa.io", "bruce.wayne@mfabricacrometa.io"]
    updateKeyValue = {
        "bruce.wayne@mfabricacrometa.io": { "key": "bruce.wayne@mfabricacrometa.io", "zipcode": "22222" },
        "james.kirk@mafabriccrometa.io": { "key": "james.kirk@mafabriccrometa.io", "zipcode": "55555"}
    }

    insert_data_query = (
        "FOR doc in @InputDocs INSERT {'firstname':doc.firstname, 'lastname':doc.lastname, 'email':doc.email, 'zipcode':doc.zipcode, '_key': doc._key} IN %s"
        % collection_name
    )
    get_data_query = "FOR doc IN %s RETURN doc" % collection_name
    update_data_query = (
        "FOR i IN %s FILTER i._key IN @updateKeys UPDATE i with { zipcode: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].zipcode : i.zipcode } IN %s"
        % (collection_name, collection_name)
    )

    insert_data = {
        "query": {
            "name": "insertRecord",
            "value": insert_data_query,
        }
    }
    get_data = {"query": {"name": "getRecords", "value": get_data_query}}
    update_data = {"query": {"name": "updateRecord", "value": update_data_query}}

    if __name__ == "__main__":

        print("\n ------- CONNECTION SETUP  ------")
        print("tenant: {}, geofabric:{}".format(guest_mail, geo_fabric))
        client = C8Client(
            protocol="https",
            host=fed_url,
            port=443,
            email=guest_mail,
            password=guest_password,
            geofabric=geo_fabric,
        )

        print("\n ------- CREATE GEO-REPLICATED COLLECTION  ------")
        if client.has_collection(collection_name):
            print("Collection exists")
        else:
            employees = client.create_collection(collection_name)
        print("Created collection: {}".format(collection_name))

        print("\n ------- CREATE RESTQLs  ------")
        client.create_restql(insert_data)
        client.create_restql(get_data)
        client.create_restql(update_data)
        print("Created RESTQLs:{}".format(client.get_restqls()))

        print("\n ------- EXECUTE RESTQLs ------")
        print("Insert data....")
        response = client.execute_restql(
            "insertRecord", {"bindVars": {"InputDocs": inputDocs}}
        )

        print("Get data....")
        response = client.execute_restql("getRecords")
        print(response)

        print("Update data....")
        response = client.execute_restql(
            "updateRecord",
            {"bindVars": {"updateKeys": updateKeys, "updateKeyValue": updateKeyValue}},
        )

        print("Get data....")
        response = client.execute_restql("getRecords")
        print(response)

        print("\n ------- DONE  ------")
  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require('jsc8');

    // Create a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    const client = new jsc8("https://gdn.paas.macrometa.io");

    //Variables
    const collectionName = "superhero" + Math.floor(1000 + Math.random() * 9000).toString();

    const inputDocs = [
        { "_key": "james.kirk@mafabriccrometa.io", "firstname": "James", "lastname": "Kirk", "email": "james.kirk@mafabriccrometa.io", "zipcode": "12312"},
        { "_key": "han.solo@macrfabricometa.io", "firstname": "Han", "lastname": "Solo", "email": "han.solo@macrfabricometa.io", "zipcode": "12311"},
        { "_key": "bruce.wayne@mfabricacrometa.io", "firstname": "Bruce", "lastname": "Wayne", "email": "bruce.wayne@mfabricacrometa.io", "zipcode": "12345" }
    ];

    const updateKeys = ["james.kirk@mafabriccrometa.io", "bruce.wayne@mfabricacrometa.io"];
    const updateKeyValue = {
        "bruce.wayne@mfabricacrometa.io": { key: "bruce.wayne@mfabricacrometa.io", zipcode: "22222" },
        "james.kirk@mafabriccrometa.io": { key: "james.kirk@mafabriccrometa.io", zipcode: "55555"}
    };

    //Queries
    const insertData = `FOR doc in @InputDocs \
    INSERT {"firstname":doc.firstname, "lastname":doc.lastname, "email":doc.email, "zipcode":doc.zipcode, "_key": doc._key} IN ${collectionName}`;

    const getData = `FOR doc IN ${collectionName} RETURN doc`;

    const updateData = `FOR i IN ${collectionName} \
    FILTER i._key IN @updateKeys \
    UPDATE i with { zipcode: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].zipcode : i.zipcode } IN ${collectionName}`;

    async function restqldemo() {
        /* Authenticate client instance with username and password */
        console.log("------- AUTHENTICATE CLIENT INSTANCE WITH USERNAME AND PASSWORD  ------");
        await client.login("nemo@nautilus.com", "xxxxxx");

        /* Create Collection */
        console.log("------- CREATE GEO-REPLICATED COLLECTION  ------");

        const collection = await client.createCollection(collectionName);

        console.log("Collection " + collectionName + " created.\n", collection);

        /* Save RestQl Queries */
        console.log("------- SAVING THE QUERIES  ------");

        await client.createRestql("insertData", insertData, {});
        await client.createRestql("getData", getData, {});
        await client.createRestql("updateData", updateData, {});

        console.log("Saved Queries Successfully\n");

        /* Execute RestQl Queries */
        console.log("------- EXECUTING THE QUERIES  ------");

        await client.executeRestql("insertData", {
            InputDocs: inputDocs
        });

        console.log("Data Inserted \n");

        const res = await client.executeRestql("getData");

        console.log("Output of get data query:");
        console.log(res.result);
        console.log("\n");

        await client.executeRestql("updateData", {
            updateKeys,
            updateKeyValue
        });

        console.log("Data updated \n");

        const data = await client.executeRestql("getData");

        console.log("Output of get data query after update:");
        console.log(data.result);
        console.log("\n");
    }

    restqldemo().then(console.log("Starting Execution"));
  </TabItem>
</Tabs>  
