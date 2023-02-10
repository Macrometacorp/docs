---
sidebar_position: 60
title: _users Collection
slug: users-collection
---

Collection Name: _user
Collection Type: Document
Stream Enabled: True
Distribution: Global
Overview:

The `_users` collection is a system-level collection with records containing attributes and metadata for an individual user or API Key at the tenant level. 
_user configuration records:
Description:
A JSON object with attributes and metadata for a specific user. These attributes are used for permissions configuration for individual collections and streams and default access permissions. A user is a child of a tenant.
Related Endpoints
Users
Related System Collections
_account
_tenants
Collection Definition:
{ "id": "4",
"name": "_users",
"status": 3,
"type": 2,
"collectionModel": "DOC",
"isSpot": false,
"isLocal": false,
"hasStream": true,
"waitForSync": false,
"isSystem": true,
"globallyUniqueId": "_users",
"searchEnabled": false}

Sample Record:
{
  "_id": "_users/test.user.apikey",
  "_key": "test.user.apikey",
  "_rev": "_d3Qo8xy--_",
  "apikey": {
    "hash": "727f00b43e417d1441d5d720d125074453f0d1a2dc4b837a72101aacd2fffb13",
    "parent": "test.user_macrometa.com.root"
  },
  "authData": {
    "active": true,
    "simple": {
    "hash": "ff79d3a13d7e50c951dbcf6b3bffbf9119ca8d4a37949c6125039d82ea6af7df",
    "method": "sha256",
    "salt": "a0eaa8a5"
    }
  },
  "billing": {
    "permissions": {
      "read": false,
	"write": false
      }
    },
  "databases": {
    "test.user_macrometa.com._system": {
	"collections": {
	  "*": {
	    "permissions": {
	      "read": true,
		"write": true
		}
    }
  },
  "permissions": {
    "read": true,
    "write": true
    },
  "streams": {
    "*": {
      "permissions": {
	  "read": true,
	  "write": true
	  }
	}
    }
  }
},
  "email": "test.user@apikey",
  "source": "LOCAL",
  "tenant": "test.user_macrometa.com",
  "user": "test.user"
}



Collection Schema and Details:
_id: 
A unique and automatically generated value that combines the collection name and the _key value. This value is unique at the fabric level. 
_key: 
A unique and user-defined or automatically generated value. Auto-generated values are based on the defKeyGenerator collection in the _c8federation collection. This value is unique at the collection level. 
_rev: 
A unique and automatically generated value is used by the system to track revisions and resolve conflicts. This value is not generally used by the user.
apikey:
A JSON object containing a “hash” and “parent” attribute used to determine the _user record type. There are two record types in the _users collection, user and API Key records. The “parent” attribute for API Key records is the parent tenant under which the record was created. The “parent” attribute is empty for user records.
authData:
A JSON object containing an ”active” attribute with a boolean value and a “simple” object with a “hash”, “method”, and “salt” attribute used during authentication.
Billing:
A JSON object containing a “permissions” object to configure boolean “read” and “write” attributes. This controls access to the billing API endpoints.
databases:
A JSON object containing an object for each fabric on the tenant. Each fabric object contains the following objects; “collections”, “permissions”, and “streams”. The boolean “read” and “write” attributes control access to the collections and streams and define a default permission level.
email:
A key-value attribute containing the email address associated with the user. This must be unique for each user at a tenant level.
source:
Deprecated attribute
tenant:
A key-value attribute containing the UUID of the tenant associated with the user.
user:
A key-value attribute containing the user ID. This is a string value. 
