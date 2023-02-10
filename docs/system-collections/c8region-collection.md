---
sidebar_position: 20
title: _c8Region Collection
slug: c8region-collection
---

Collection Name: _c8region
Collection Type: Document (System)
Stream Enabled: True
Distribution: Local
Overview:
The `_c8region` collection is a system-level collection that blocks publishing and subscribing from the replication service during the member join process. The member join process adds a new region to the Global Data Network, GDN. This is typically performed during the deployment of a GDN instance. However, regions can be added to and removed from the network after deployment. 

Data is copied from the source (peer) region when a new region is added. During this process, the C8DB service must stop receiving messages. The fabrics are added to a list in the ExcludeDbForPubSub collection record to block publishing and subscribing. While these messages are blocked, they will be stored in the backlog of the pulsar environment responsible for data replication between regions. This backlog will be consumed after the process is completed.

If no fabrics are actively being synced in the _reconcile_region system collection, the ExcludeDbForPubSub record in the _c8region collection should be empty. If there is an entry in the array, it should be verified that a synchronization process is in progress in the _reconcile_region collection for that fabric.

This is a local collection meaning data is not replicated in other regions in the GDN. All member join processes will use this region as the source to replicate and synchronize data.
_c8region configuration records:
ExcludeDbForPubSub
Related Endpoints
GeoFabrics
Environments
Data Centers
Related System Collections
 _reconcile_region 
Description:
An array of strings for the fabrics to be synchronized in the new region joining the network. The member join process will add and remove these fabrics from the “value” array. These records are created internally by the C8DB service and should require manual updating by the user.
Sample Record:

{ "_key": "ExcludeDbForPubSub",
  "_id": "_c8region/ExcludeDbForPubSub",
  "_rev": "_fBpI4VW--_",
  "value": [] # array of fabric names to be excluded from Pub/Sub }


Collection Schema and Details:
_id: 
A unique and automatically generated value that combines the collection name and the _key value. This value is unique at the fabric level. 
_key: 
A unique and user-defined or automatically generated value. Auto-generated values are based on the defKeyGenerator collection in the _c8federation collection. This value is unique at the collection level. 
_rev: 
A unique and automatically generated value is used by the system to track revisions and resolve conflicts. This value is not generally used by the user.
value:
An array of string values containing the names of the fabrics to be excluded from publishing and subscribing during the member join process. 

Example: 
{"value":
["tenant_macrometa.com._system", "tenant_macrometa.com.testFabric"]}


{"value": ["_system"]} # For the admin (root) tenant 


