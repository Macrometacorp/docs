---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Drivers

## Pre-requisite

Let's assume your

* tenant name is `nemo@nautilus.com` and 
* user password is `xxxxx`.

## Driver download

<Tabs groupId="operating-systems">
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
</Tabs>

## Connect to GDN

The first step in using GDN is to establish a connection to a local region. When this code executes, it initializes the server connection to the region URL you sepcified. You can create an API key from the GUI or REST API.

<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "xxxx", fabricName: '_system'});
  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    # OR Using token
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, token="XXXX")
  </TabItem>
  <TabItem value="" label="Rest">

    import requests
    import json

    # Constants
    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    AUTH_TOKEN = "bearer "

    # Create a HTTPS Session
    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})  
  </TabItem>
</Tabs>

## Create an API Key

<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    try{
        await client.createApiKey(keyid);
    }
    catch(e){
        console.log('API Creation Failed: ', e);
    }

  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    # Create an api key
    print("Create API Key: ", client.create_api_key('id1'))

  </TabItem>
  <TabItem value="RA" label="Rest API">

    # Create an API Key
    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    keyid = "id1"
    url = FED_URL + "/_api/key"
    payload= {
    "keyid": keyid
    }

    resp = session.post(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("API Key Created: ", resp)

  </TabItem>    
</Tabs>
    
## Get Accessible Resources

<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    //Fetch accessible databases
    try{
        var databases = await client.listAccessibleDatabases(keyid)
        console.log("Accessible Databases")
        console.log(databases.result)
    }
    catch(e){
        console.log('Failed to fetch accessible dataases: ', e);

    }
    // Fetch accessible streams
    try{
        streams = await client.listAccessibleStreams(keyid, '_system', full=false)
        console.log("Accessible Streams")
        console.log(streams.result)
    }
    catch(e){
        console.log('Failed to fetch accessible streams: ', e);

    }

  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    # Fetch List of accessible databases and streams
    print("Accessible Databases: ", client.list_accessible_databases('id1'))

    print("Accessible Streams of a db: ", client.list_accessible_streams('id1', '_system'))
    
  </TabItem>
  <TabItem value="RA" label="Rest API">


    # Fetch List of accessible databases and streams
    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    keyid = "id1"
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Accessible Streams: ", resp)

    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Accessible Collections: ", resp)

    url = FED_URL + "/_api/key/" + keyid + "/database"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Accessible Databases: ", resp)

  </TabItem>
</Tabs>

## Set Permissions

:::note
* Use `rw` to set the access level to `Administrate`.
* Use `ro` to set the access level to `Read Only`.
* Use `none` to set the access level to `No access`.
:::

<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    // Set Access Level for an API Key
    // Create Colleciton
    var coll = await client.getCollections();
    var collectionName = 'testCollection'
    var streamName = 'testStream'
    console.log("Existing Collections: ", coll.result)
    try{
        await client.createCollection(collectionName);
        console.log("Collection Created Successfully")
    }
    catch(e){
        console.log("Collection creation did not succeed due to " + e)
    }
    try{
        await client.setCollectionAccessLevel(keyid, '_system', collectionName, 'rw')
    }
    catch(e){
        console.log("Failed to set Collection Access Level: ",e)
    }
    // Create stream
    try{
        await client.createStream(streamName)
    }
    catch(e){
        console.log("Stream Creation Failed: ",e)
    }
    try{
        await client.setStreamAccessLevel(keyid, '_system', "c8globals."+streamName, 'ro')
    }
    catch(e){
        console.log("Failed to set Stream Access Level: ",e)
    }
    try{
        await client.setDatabaseAccessLevel(keyid, '_system', 'rw')
    }
    catch(e){
        console.log("Failed to set Database Access Level: ",e)
    }

  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    # Set Accesslevels for an API Key

    # Create a new collection if it does not exist
    if client.has_collection('testCollection'):
        print("Collection exists")
    else:
        client.create_collection_kv(name='testCollection')
    # Create a new stream
    # print(client.create_stream('testStream'))

    print("Set Database Access Level: ", client.set_database_access_level('id1', '_system', 'rw'))

    print("Set Collection Access Level: ", client.set_collection_access_level('id1', 'testCollection', '_system', 'rw'))

    print("Set Stream Access Level: ", client.set_stream_access_level('id1','c8globals.testStream', '_system'))

  </TabItem>
  <TabItem value="RA" label="Rest API">

    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    keyid = "id1"
    # Set Database Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system"
    payload={
    "grant": "rw"
    }
    resp = session.put(url,data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Set Database Access Level: ", resp)

    # Set Collection Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
    payload={
    "grant": "rw"
    }
    resp = session.put(url,data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Set Collection Access Level: ", resp)

    # Set Stream Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
    payload={
    "grant": "rw"
    }
    resp = session.put(url,data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Set Stream Access Level: ", resp)
        
  </TabItem>
</Tabs>


## Get Access Levels

<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    try{
        await client.getCollectionAccessLevel(keyid, '_system', collectionName)
    }
    catch(e){
        console.log("Failed to Get Access Level for the Collection: ",e)
    }
    try{
        await client.getStreamAccessLevel(keyid, '_system', "c8globals."+streamName)
    }
    catch(e){
        console.log("Failed to Get Access Level for the Stream: ",e)
    }
    try{
        await client.getDatabaseAccessLevel(keyid, '_system')

    }
    catch(e){
        console.log("Failed to Get Access Level for the Database: ",e)
    }

  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    # Get AccessLevel
    print("Get DB Access Level", client.get_database_access_level('id1','_system'))

    print("Get Coll Access Level: ", client.get_collection_access_level('id1','testCollection', '_system'))

    print("Get Stream Access Level: ", client.get_stream_access_level('id1','c8globals.testStream', '_system'))

  </TabItem>
  <TabItem value="RA" label="Rest API">

    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    keyid = "id1"
    # Get Database Acces Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Get Database Access Level: ", resp)

    # Get Stream Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Get Stream Access Level: ", resp)

    # Get Collection Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Get Collection Access Level: ", resp)

  </TabItem>            
</Tabs>

## Clear Access Level
<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    // Clear Access Level
    try{
        await client.clearDatabaseAccessLevel(keyid, '_system')
    }
    catch(e){
        console.log("Clearing Access Level for Database Failed: ",e)
    }
    try{
        await client.clearStreamAccessLevel(keyid, '_system', "c8globals."+streamName)

    }
    catch(e){
        console.log("Clearing Access Level for Stream Failed: ",e)
    }
    try{
        await client.clearCollectionAccessLevel(keyid, '_system', collectionName)
    }
    catch(e){
        console.log("Clearing Access Level for Collection Failed: ",e)
    }

  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    # Clear Access Level
    print("Clear DB Access Level: ", client.clear_database_access_level('id1','_system'))

    print("Clear Coll Access Level: ", client.clear_collection_access_level('id1','testCollection', '_system'))

    print("Clear Stream Access Level: ", client.clear_stream_access_level('id1','c8globals.testStream', '_system'))

  </TabItem>
  <TabItem value="RA" label="Rest API">

    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    keyid = "id1"
    # Clear Database Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system"
    resp = session.delete(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Clear Database Access Level: ", resp)

    # Clear Collection Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
    resp = session.delete(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Clear Collection Access Level: ", resp)

    # Clear Stream Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
    resp = session.delete(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Clear Stream Access Level: ", resp)

  </TabItem>        
</Tabs>

## Remove an API Key
<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    // Remove an api key
    try{
        await client.removeApiKey(keyid);
    }
    catch(e){
        console.log('API Deletion Failed: ', e);   
    }

  </TabItem>
  <TabItem value="py" label="Python">
    
    from c8 import C8Client

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    # Remove api key
    remove = client.remove_api_key('id1')

    print(remove)

  </TabItem>
  <TabItem value="RA" label="Rest API">

    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    keyid = "id1"
    # Delete an API Key
    url = FED_URL + "/_api/key/"+ keyid
    resp = session.delete(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("API Key Deleted: ", resp)

  </TabItem>        
</Tabs>

## Complete Example
<Tabs groupId="operating-systems">
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");
    const client = new jsc8("https://gdn.paas.macrometa.io");

    async function main(){
        const keyid="id1";
        await client.login("nemo@nautilus.com", "xxxxxx");
        // Create an api key
        try{
            await client.createApiKey(keyid);
        }
        catch(e){
            console.log('API Creation Failed: ', e);
        }

        //Fetch accessible databases
        try{
            var databases = await client.listAccessibleDatabases(keyid)
            console.log("Accessible Databases")
            console.log(databases.result)
        }
        catch(e){
            console.log('Failed to fetch accessible dataases: ', e);

        }
        // Fetch accessible streams
        try{
            streams = await client.listAccessibleStreams(keyid, '_system', full=false)
            console.log("Accessible Streams")
            console.log(streams.result)
        }
        catch(e){
            console.log('Failed to fetch accessible streams: ', e);

        }

        // Set Access Level for an API Key
        // Create Colleciton
        var coll = await client.getCollections();
        var collectionName = 'testCollection'
        var streamName = 'testStream'
        console.log("Existing Collections: ", coll.result)
        try{
            await client.createCollection(collectionName);
            console.log("Collection Created Successfully")
        }
        catch(e){
            console.log("Collection creation did not succeed due to " + e)
        }
        try{
            await client.setCollectionAccessLevel(keyid, '_system', collectionName, 'rw')
        }
        catch(e){
            console.log("Failed to set Collection Access Level: ",e)
        }
        // Create stream
        try{
            await client.createStream(streamName)
        }
        catch(e){
            console.log("Stream Creation Failed: ",e)
        }
        try{
            await client.setStreamAccessLevel(keyid, '_system', "c8globals."+streamName, 'ro')
        }
        catch(e){
            console.log("Failed to set Stream Access Level: ",e)
        }
        try{
            await client.setDatabaseAccessLevel(keyid, '_system', 'rw')
        }
        catch(e){
            console.log("Failed to set Database Access Level: ",e)
        }

        // Get Access Levels
        try{
            await client.getCollectionAccessLevel(keyid, '_system', collectionName)
        }
        catch(e){
            console.log("Failed to Get Access Level for the Collection: ",e)
        }
        try{
            await client.getStreamAccessLevel(keyid, '_system', "c8globals."+streamName)
        }
        catch(e){
            console.log("Failed to Get Access Level for the Stream: ",e)
        }
        try{
            await client.getDatabaseAccessLevel(keyid, '_system')

        }
        catch(e){
            console.log("Failed to Get Access Level for the Database: ",e)
        }
        // Clear Access Level
        try{
            await client.clearDatabaseAccessLevel(keyid, '_system')
        }
        catch(e){
            console.log("Clearing Access Level for Database Failed: ",e)
        }
        try{
            await client.clearStreamAccessLevel(keyid, '_system', "c8globals."+streamName)

        }
        catch(e){
            console.log("Clearing Access Level for Stream Failed: ",e)
        }
        try{
            await client.clearCollectionAccessLevel(keyid, '_system', collectionName)
        }
        catch(e){
            console.log("Clearing Access Level for Collection Failed: ",e)

        }
        // Remove an api key
        try{
            await client.removeApiKey(keyid);
        }
        catch(e){
            console.log('API Deletion Failed: ', e);

        }
    }

    main();

  </TabItem>
  <TabItem value="py" label="Python">

    from c8 import C8Client
    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password='xxxxx',
                            geofabric='_system')

    #remove = client.remove_api_key('id1')

    # Create an api key
    print("Create API Key: ", client.create_api_key('id1'))

    # Fetch List of accessible databases and streams
    print("Accessible Databases: ", client.list_accessible_databases('id1'))

    print("Accessible Streams of a db: ", client.list_accessible_streams('id1', '_system'))

    # Set Accesslevels for an API Key

    # Create a new collection if it does not exist
    if client.has_collection('testCollection'):
        print("Collection exists")
    else:
        client.create_collection_kv(name='testCollection')
    # Create a new stream
    # print(client.create_stream('testStream'))

    print("Set DB Access Level: ", client.set_database_access_level('id1', '_system', 'rw'))

    print("Set Coll Access Level: ", client.set_collection_access_level('id1', 'testCollection', '_system', 'rw'))

    print("Set Stream Access Level: ", client.set_stream_access_level('id1','c8globals.testStream', '_system'))

    # Get AccessLevel
    print("Get DB Access Level", client.get_database_access_level('id1','_system'))

    print("Get Coll Access Level: ", client.get_collection_access_level('id1','testCollection', '_system'))

    print("Get Stream Access Level: ", client.get_stream_access_level('id1','c8globals.testStream', '_system'))

    # Clear Access Level
    print("Clear DB Access Level: ", client.clear_database_access_level('id1','_system'))

    print("Clear Coll Access Level: ", client.clear_collection_access_level('id1','testCollection', '_system'))

    print("Clear Stream Access Level: ", client.clear_stream_access_level('id1','c8globals.testStream', '_system'))

    # Remove api key
    remove = client.remove_api_key('id1')

    print(remove)

  </TabItem>
  <TabItem value="RA p" label="Rest API (python)">

    import requests
    import json

    # Constants

    FEDERATION = "api-gdn.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    AUTH_TOKEN = "bearer "

    # Create a HTTPS Session

    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

    # Create an API Key
    keyid = "id1"
    url = FED_URL + "/_api/key"
    payload= {
    "keyid": keyid
    }

    resp = session.post(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("API Key Created: ", resp)
            
    # Fetch List of accessible databases and streams
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Accessible Streams: ", resp)

    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Accessible Collections: ", resp)

    url = FED_URL + "/_api/key/" + keyid + "/database"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Accessible Databases: ", resp)

    # Set Database Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system"
    payload={
    "grant": "rw"
    }
    resp = session.put(url,data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Set Database Access Level: ", resp)

    # Set Collection Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
    payload={
    "grant": "rw"
    }
    resp = session.put(url,data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Set Collection Access Level: ", resp)

    # Set Stream Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
    payload={
    "grant": "rw"
    }
    resp = session.put(url,data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Set Stream Access Level: ", resp)

    # Get Database Acces Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Get Database Access Level: ", resp)

    # Get Stream Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Get Stream Access Level: ", resp)

    # Get Collection Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
    resp = session.get(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Get Collection Access Level: ", resp)

    # Clear Database Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system"
    resp = session.delete(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Clear Database Access Level: ", resp)

    # Clear Collection Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
    resp = session.delete(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Clear Collection Access Level: ", resp)

    # Clear Stream Access Level
    url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
    resp = session.delete(url)
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("Clear Stream Access Level: ", resp)

    # Delete an API Key
    url = FED_URL + "/_api/key/"+ keyid
    resp = session.delete(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    if resp['error'] is True:
        print("ERROR: " , resp)
    else:
        print("API Key Deleted: ", resp)

  </TabItem> 
  <TabItem value="RA js" label="Rest API (javascript)">

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
    self
    .req(endpoint, {
    body: { email, password },
    method: "POST",
    })
    .then(({ jwt, ...data }) => {
    self._headers.authorization = bearer `${jwt}`;
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
    const FEDERATION_URL = "https://api-gdn.prod.macrometa.io";

    const COLLECTION_NAME = "testCollection";
    const STREAM_NAME = "testStream"
    const KEY_ID = "id1"
    const run = async function () {
    try {
    const connection = new APIRequest(FEDERATION_URL);

    /* -------------------- Login (nemo@nautilus.com/xxxxxx) -------------------- */

    await connection.login(EMAIL, PASSWORD);

    console.log("Login Successfully using", EMAIL);

    /* -------------------------- Create an API Key ------------------------- */

    const apiKey = await connection.req(
    `/_fabric/_system/_api/key`,
    {
    method: "POST",
    body: {
        "keyid": KEY_ID
    }
    }
    );

    console.log("API KEY CREATED SUCCESSFULLY", apiKey);

    /* ---------------------------- Get List of Accessible Databases and Streams ---------------------------- */

    const accessibleStreams = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream`,
    {
    method: "GET",
    }
    );

    console.log("ACCESSIBLE STREAMS", accessibleStreams);

    const accessibleCollections = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection`,
    {
    method: "GET",
    }
    );

    console.log("ACCESSIBLE COLLECTIONS", accessibleCollections);

    const accessibleDatabases = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database`,
    {
    method: "GET",
    }
    );

    console.log("ACCESSIBLE DATABASES", accessibleDatabases);
        

    /* ----------------------------- Set Access Level ----------------------------- */
    const setDatabaseAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system`,
    {
    method: "PUT",
    body:{
        "grant": "rw"
    }
    }
    );
    console.log("SET DATABASE ACCESS LEVEL", setDatabaseAccessLevel);


    const setCollectionAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection/${COLLECTION_NAME}`,
    {
    method: "PUT",
    body:{
        "grant": "rw"
    }
    }
    );
        
    console.log("SET COLLECTION ACCESS LEVEL", setCollectionAccessLevel);

    const setStreamAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream/c8globals.${STREAM_NAME}`,
    {
    method: "PUT",
    body:{
        "grant": "rw"
    }
    }
    );
        
    console.log("SET STREAM ACCESS LEVEL", setStreamAccessLevel);

        
    /* ---------------------------- Get Access Level ---------------------------- */

    const getStreamAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream/c8globals.${STREAM_NAME}`,
    {
    method: "GET",
    }
    );
        
    console.log("GET STREAM ACCESS LEVEL", getStreamAccessLevel);

    const getCollectionAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection/${COLLECTION_NAME}`,
    {
    method: "GET",
    }
    );
        
    console.log("GET COLLECTION ACCESS LEVEL", getCollectionAccessLevel);

    const getDatabaseAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system`,
    {
    method: "GET",
    }
    );
    console.log("SET DATABASE ACCESS LEVEL", getDatabaseAccessLevel);



    /* -----------------------------Clear Access Level ----------------------------- */

    const clearDatabaseAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system`,
    {
    method: "DELETE",
    }
    );
    console.log("CLEAR DATABASE ACCESS LEVEL", clearDatabaseAccessLevel);

    const clearCollectionAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection/${COLLECTION_NAME}`,
    {
    method: "DELETE",
    }
    );
            
    console.log("CLEAR COLLECTION ACCESS LEVEL", clearCollectionAccessLevel);

    const clearStreamAccessLevel = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream/c8globals.${STREAM_NAME}`,
    {
    method: "DELETE",
    }
    );
        
    console.log("CLEAR STREAM ACCESS LEVEL", clearStreamAccessLevel);
    /* --------------------------- Delete API Key ---------------------------- */

    const removeApiKey = await connection.req(
    `/_fabric/_system/_api/key/${KEY_ID}`,
    {
    method: "DELETE",
    }
    );
        
    console.log("CLEAR STREAM ACCESS LEVEL", removeApiKey);

        
    } catch (e) {
    console.error(e);
    }
    };

    run();

  </TabItem>    
</Tabs>