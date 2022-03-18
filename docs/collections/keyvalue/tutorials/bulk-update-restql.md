---
sidebar_position: 2
title: Bulk Update with RestQL
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bulk Update Key-Value Collection with RestQL

The following example bulk updates key-value collection data via RestQL.

Assume these credentials:

* Tenant name: nemo@nautilus.com
* Password: xxxxxx

## Driver download

Download the appropriate drivers for Python or JavaScript.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

    To install pyC8, run

        $ pip3 install pyC8

    Alternatively, you can use conda:

        conda install -c conda-forge pyC8

    Alternatively, you can use pipenv:

        pipenv install --pre pyC8

    Any one of these three commands will install Python and enable you to develop applications.

  </TabItem>
  <TabItem value="js" label="Javascript">

    With Yarn:

        yarn add jsc8
    
	With NPM:

        npm install jsc8

    If you want to use the driver outside of the current directory, you can also install it globally using the `--global` flag:

        npm install --global jsc8

    From source:

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
        { "_key": "james.kirk@mafabriccrometa.io", "value": "James"},
        { "_key": "han.solo@macrfabricometa.io", "value": "Han"},
        { "_key": "bruce.wayne@mfabricacrometa.io", "value": "Bruce"}
    ];

    const updateKeys = ["james.kirk@mafabriccrometa.io", "bruce.wayne@mfabricacrometa.io"];
    const updateKeyValue = {
        "bruce.wayne@mfabricacrometa.io": { key: "bruce.wayne@mfabricacrometa.io",  value: "Bruce Wayne"},
        "james.kirk@mafabriccrometa.io": { key: "james.kirk@mafabriccrometa.io", value: "James T Kirk"}
    };

    //Queries
    const insertData = `FOR doc in @InputDocs \
    INSERT {"_key": doc._key, "value": doc.value} IN ${COLLECTION_NAME}`;

    const getData = `FOR doc IN ${COLLECTION_NAME} RETURN doc`;

    const updateData = `FOR i IN ${COLLECTION_NAME} \
    FILTER i._key IN @updateKeys \
    UPDATE i with { value: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].value : i.value } IN ${COLLECTION_NAME}`;

    const run = async function () {
        try {
            const connection = new APIRequest(FEDERATION_URL);

            /* -------------------- Log in (nemo@nautilus.com/xxxxxxx) -------------------- */
            await connection.login(EMAIL, PASSWORD);
            console.log("Login Successfully using", EMAIL);

            /* -------------------------- Create doc collection ------------------------- */
            const collection = await connection.req(`/_fabric/${FABRIC_NAME}/_api/kv/${COLLECTION_NAME}`, {
                body: { stream: false },
                method: "POST",
            });

            console.log("COLLECTION CREATED SUCCESSFULLY", collection);

            /* ------------------------ Save a RestQL query ----------------------- */
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

            /* ----------------------- Run a RestQL query ---------------------- */
            const executeRestql = (queryName, parameter) =>
                connection.req(`/_fabric/${FABRIC_NAME}/_api/restql/execute/${queryName}`, {
                    body: {
                        bindVars: parameter,
                    },
                    method: "POST",
                });

            console.log("------- Bulk run RestQl queries  ------");

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
        { "_key": "james.kirk@mafabriccrometa.io", "value": "James"},
        { "_key": "han.solo@macrfabricometa.io", "value": "Han"},
        { "_key": "bruce.wayne@mfabricacrometa.io", "value": "Bruce"}
    ]

    updateKeys = ["james.kirk@mafabriccrometa.io", "bruce.wayne@mfabricacrometa.io"]
    updateKeyValue = {
        "bruce.wayne@mfabricacrometa.io": { "key": "bruce.wayne@mfabricacrometa.io",  "value": "Bruce Wayne"},
        "james.kirk@mafabriccrometa.io": { "key": "james.kirk@mafabriccrometa.io", "value": "James T Kirk"}
    }

    insert_data_query = (
        "FOR doc in @InputDocs INSERT {'_key': doc._key, 'value': doc.value} IN %s"
        % collection_name
    )
    get_data_query = "FOR doc IN %s RETURN doc" % collection_name
    update_data_query = (
        "FOR i IN %s FILTER i._key IN @updateKeys UPDATE i with { value: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].value : i.value } IN %s"
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
            employees = client.create_collection_kv(collection_name)
        print("Created collection: {}".format(collection_name))

        print("\n ------- CREATE RESTQLs  ------")
        client.create_restql(insert_data)
        client.create_restql(get_data)
        client.create_restql(update_data)
        print("Created RESTQLs:{}".format(client.get_restqls()))

        print("\n ------- RUN RESTQLs ------")
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

    // Create an authenticated instance with a JSON Web Token or API key
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    const client = new jsc8("https://gdn.paas.macrometa.io");

    //Variables
    const collectionName = "superhero" + Math.floor(1000 + Math.random() * 9000).toString();

    const inputDocs = [
        { "_key": "james.kirk@mafabriccrometa.io", "value": "James"},
        { "_key": "han.solo@macrfabricometa.io", "value": "Han"},
        { "_key": "bruce.wayne@mfabricacrometa.io", "value": "Bruce"}
    ];

    const updateKeys = ["james.kirk@mafabriccrometa.io", "bruce.wayne@mfabricacrometa.io"];
    const updateKeyValue = {
        "bruce.wayne@mfabricacrometa.io": { key: "bruce.wayne@mfabricacrometa.io",  value: "Bruce Wayne"},
        "james.kirk@mafabriccrometa.io": { key: "james.kirk@mafabriccrometa.io", value: "James T Kirk"}
    };

    //Queries
    const insertData = `FOR doc in @InputDocs \
    INSERT {"_key": doc._key, "value": doc.value} IN ${collectionName}`;

    const getData = `FOR doc IN ${collectionName} RETURN doc`;

    const updateData = `FOR i IN ${collectionName} \
    FILTER i._key IN @updateKeys \
    UPDATE i with { value: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].value : i.value } IN ${collectionName}`;

    async function restqldemo() {
        /* Authenticate client instance with username and password */
        console.log("------- AUTHENTICATE CLIENT INSTANCE WITH USERNAME AND PASSWORD  ------");
        await client.login("nemo@nautilus.com", "xxxxxx");

        /* Create Collection */
        console.log("------- CREATE GEO-REPLICATED COLLECTION  ------");

        const collection = await client.createKVCollection(collectionName);

        console.log("Collection " + collectionName + " created.\n", collection);

        /* Save RestQl Queries */
        console.log("------- SAVE THE QUERIES  ------");

        await client.createRestql("insertData", insertData, {});
        await client.createRestql("getData", getData, {});
        await client.createRestql("updateData", updateData, {});

        console.log("Saved Queries Successfully\n");

        /* Execute RestQl Queries */
        console.log("------- RUN THE QUERIES  ------");

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
