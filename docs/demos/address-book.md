---
sidebar_position: 1
---

# Global Address Book

## Using Streams

### On GDN

| **Email**         | **Passsword** | **Geo Fabric** | **Collection** | **GUI**                                                                      | **Source Code**                                                         |
| ----------------- | ------------- | -------------- | -------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| demo@macrometa.io | `xxxxxxxx`    | \_system       | `addresses`    | [AddressBook](https://macrometacorp.github.io/tutorial-addressbook-streams/) | [github](https://github.com/Macrometacorp/tutorial-addressbook-streams) |

### On GDN (Wavelength 5G)

| **Email**         | **Passsword** | **Geo Fabric** | **Collection** |**GUI**                                                                        | **Source Code** |
| ----------------- | ------------- | -------------- | -------------- | ------------------------------------------------------------------------------ | --------------- |
| demo@macrometa.io | `xxxxxxxx`    | \_system       | `addresses`    | [AddressBook](https://macrometacorp.github.io/addressbook-streams-wavelength/) |

:::note
Stream Workers is currently an Enterprise only feature. We will be rolling it out to all users in Q1 of 2022.
Please contact support@macrometa.com if you have any questions.
:::

Populate `addresses` collection with data:

```js

// Query to insert addresses
FOR persons IN [
  { firstName: "Joseph", lastName: "Smith", email: "jsmith2020@gmail.com" },
  { firstName: "Astrid", lastName: "Young", email: "missmoneybags@young.co.sg" },
  { firstName: "Boris", lastName: "Balastikov", email: "bb@refundit.com" },
  { firstName: "Sherlock", lastName: "Jones", email: "pd@elementary.org" },
  { firstName: "Alpha", lastName: "Simpson", email: "alf@simpsonrealtech.com" },
  { firstName: "Jose", lastName: "Garcia", email: "j.garcia@nebulus.com" },
  { firstName: "Lee", lastName: "Ki", email: "Lee.ki@symbol.com" },
  { firstName: "Mark", lastName: "Goldfine", email: "mark@tidalwave.com" },
  { firstName: "Ramesh", lastName: "Sriram", email: "ramesh@lifely.com" } 
  ]
  INSERT persons INTO addresses

```

Queries for RESTQL

Query Name: addAddress
```js
INSERT { firstName: @firstName, lastName: @lastName, email: @email }
  INTO addresses
```

Query Name: getAddresses
```js
FOR address IN addresses
    RETURN address
```

Query Name: updateEmail
```js
UPDATE { _key: @key }
  WITH { email: @email }
  IN addresses
```

Query Name: removeAddress
```js
REMOVE { _key: @key} 
  IN addresses
```

## Using RESTQL

### GDN

| **Email**         | **Passsword** | **Geo Fabric** | **Collection** | **GUI**                                                                              | **Source Code**                                                        |
| ----------------- | ------------- | -------------- | -------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| demo@macrometa.io | `xxxxxx`      | \_system       | `addresses`    | [AddressBook (RESTQL)](https://macrometacorp.github.io/tutorial-addressbook-restql/) | [github](https://github.com/Macrometacorp/tutorial-addressbook-restql) |

> Note: The demo app automatically creates the following RESTQLs as part of startup.

**insertAddress:**
```js
INSERT { firstName: @firstName, lastName: @lastName, email: @email}
  INTO addresses
```

**getAddresses:**
```js
FOR entry IN addresses
  RETURN entry
```

**removeAddress:**
```js
REMOVE @_key IN addresses
```

**updateAddress:**
```js
UPDATE @_key
  WITH { firstName: @firstName, lastName: @lastName, email: @email }
  IN addresses
```
