---
sidebar_position: 30
title: _gui Collection
slug: gui-collection
---

The `_gui` collection is a system-level collection containing records to configure authentication, analytics, and account billing features for the Macrometa GDN. 

### Collection Information
- **Collection Name:** _gui
- **Collection Type:** Document (System)
- **Stream Enabled:** True
- **Distribution:** Global

#### Description
The _gui configuration record is a JSON object that contains attributes related to authentication, alternative user signups,  product analytics (via PostHog), and product subscription and payment features (via Stripe).

#### Related Endpoints
None

#### Related System Collections
None

### Collection Definition
```json
{ "id": "223",
  "name": "_gui",
  "status": 3,
  "type": 2,
  "collectionModel": "DOC",
  "isSpot": false,
  "isLocal": false,
  "hasStream": true,
  "waitForSync": false,
  "isSystem": true,
  "globallyUniqueId": "_gui",
  "searchEnabled": false }
```

### Collection Schema and Details

#### _id: 
A unique and automatically generated value that combines the collection name and the _key value. This value is unique at the fabric level. 

#### _key: 
A unique and user-defined or automatically generated value. Auto-generated values are based on the defKeyGenerator collection in the _c8federation collection. This value is unique at the collection level. 

#### _rev: 
A unique and automatically generated value is used by the system to track revisions and resolve conflicts. This value is not generally used by the user.

#### Auth:
A key-value attribute containing the URL to be used for authentication. 

#### isProduction:
A key-value attribute containing a boolean value to configure the C8 authentication service for the GDN. If set to “True” logins will be redirected to the auth-tenant.macrometa.io URL to authenticate. If set to “False” the authentication URL will use the tenant.macrometa.io URL.

#### isSaas:
A key-value attribute containing a boolean value to configure the C8 authentication service for the GDN. If set to “True” logins will be redirected to the auth-tenant.macrometa.io URL to authenticate. If set to “False” the authentication URL will use the tenant.macrometa.io URL.

#### posthogAPIKey:
A key-value attribute containing a string value for the PostHog API Key. 
:::note
PostHog is a product analytics tool not required in a self-hosted GDN.
:::

#### posthogServerURL:
A key-value attribute containing a string value for the PostHog Server URL. 

#### signupMaintainance:
A key-value attribute containing a boolean value to configure a redirect to an alternative sign up URL.

#### signupMaintainanceLink:
A key-value attribute containing a string value to configure the alternative sign-up URL.

#### stripePublishableKey
A key-value attribute containing a string value for the Stripe Publishable API Key. 
:::note
Stripe is a payment processing tool not required in a self-hosted GDN.
:::

### Sample Record:
```json
{ "_id": "_gui/_system",
  "_key": "_system",
  "_rev": "_fEDVU7K--B",
  "auth": "https://auth.paas.macrometa.io",
  "isProduction": true,
  "isSaaS": true,
  "posthogAPIKey": "<PostHog API Key>",
  "posthogServerURL": "PostHog Server URL",
  "signupMaintainance": true,
  "signupMaintainanceLink": "https://auth-play.macrometa.io/sign-up",
  "stripePublishableKey": "<Stripe Publishable Key>" }
```