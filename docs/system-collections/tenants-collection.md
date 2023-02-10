---
sidebar_position: 50
title: _tenants Collection
slug: plans-collection
---

Collection Name: _tenants
Collection Type: Document
Stream Enabled: True
Distribution: Global
Overview:

The `_tenants` collection is a system-level collection that stores tenant configuration records on the Global Data Network, GDN. A tenant is a child of the _system fabric. There are two sample objects below, the collection definition and the sample record. The collection definition is the object that represents the metadata for the collection when it is created or updated. The sample record shows the attributes of a _tenant collection record.
_tenants configuration records:
Description:
A JSON object with attributes and metadata for a specific tenant. The “features” attribute is used to configure features for the tenant. The initial values will depend on the user details and enabled features. More information is available in the “Collection Schema and Details” section.
Related Endpoints
Administration
Related System Collections
_c8federation
Collection definition:

{
  "id": "85",
  "name": "_tenants",
  "status": 3,
  "type": 2,
  "collectionModel": "DOC",
  "isSpot": false,
  "isLocal": false,
  "hasStream": true,
  "waitForSync": false,
  "isSystem": true,
  "globallyUniqueId": "_tenants",
  "searchEnabled": false
}


Sample record:
{
	"_id": "_tenants/T-zNL2hRcSLi_meEOEPzxFQ",
	"_key": "T-zNL2hRcSLi_meEOEPzxFX",
	"_rev": "_fDJa-gW--_",
	"attribution": "Macrometa",
	"created": 1667722292995,
	"displayName": "user_macrometa.com",
	"features": {
		"CEP": true,
		"COMPUTE": false,
		"COMPUTE_AKAM": true,
		"COMPUTE_FAAS": true,
		"DOCS": true,
		"DYNAMO": true,
		"EVENT_HUB": false,
		"GEO_FABRICS": true,
		"GRAPHS": true,
		"KV": true,
		"LOCAL_COLLECTIONS": false,
		"REDIS": true,
		"SEARCH": true,
		"SQL": true,
		"STREAMS": true,
		"STREAM_IO_CONNECTORS": false,
		"USERS": true
	},
	"plan": "PLAYGROUND",
	"status": "active"
}



Collection Schema and Details:

_id: 
A unique and automatically generated value which is a combination of the collection name and the _key value. This value is unique at the fabric level. 
_key: 
A unique and user-defined or automatically generated value. Auto-generated values are based on the defKeyGenerator collection in the _c8federation collection. This value is unique at the collection level. 
_rev: 
A unique and automatically generated value used by the system to track revisions and resolve conflicts. This value is not generally used by the user.
attribution:
A key-value attribute containing a string value to set the plan attribution. Attribution and plans are related. This creates a logical grouping of plans under each attribution. Individual plans are detailed in the _plans system collection.
created:
A key-value attribute containing an integer value of the record creation date as an epoch timestamp in milliseconds.
displayName:
A key-value attribute containing a string value of the tenant owner. This is the tenant owner email address with the “@” replaced with an “_”.
features: 
A JSON object containing boolean key-value pairs to enable or disable features of the GDN.
plan:
A key-value attribute containing a string value that specifies the plan for the tenant. Individual plans are detailed in the _plans system collection.
status: 
Deprecated attribute

