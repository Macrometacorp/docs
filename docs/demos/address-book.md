---
sidebar_position: 1
---

# Global Address Book

## Using Streams

### On GDN

| **Email** | **Passsword** | **Geo Fabric** |**Collection** | **GUI**|**Source Code**|
|------------|---------- |-------------- |-------------- |------------|----------|
| demo@macrometa.io | `xxxxxxxx` | _system | `addresses` | [AddressBook](https://macrometacorp.github.io/tutorial-addressbook-streams/)| [github](https://github.com/Macrometacorp/tutorial-addressbook-streams)|

### On GDN (Wavelength 5G)

| **Email** | **Passsword** | **Geo Fabric** |**Collection** | **GUI**|**Source Code**|
|------------|---------- |-------------- |-------------- |------------|----------|
| demo@macrometa.io | `xxxxxxxx` | _system | `addresses` | [AddressBook](https://macrometacorp.github.io/addressbook-streams-wavelength/)| 

:::note
Stream Workers is currently an Enterprise only feature. We will be rolling it out to all users in Q1 of 2022.
Please contact support@macrometa.com if you have any questions.
:::

Populate `addresses` collection with data:

```js

// Query to insert addresses
FOR persons IN [ 
  { firstname: "Joseph", lastname: "Smith", email: "jsmith2020@gmail.com" },
  { firstname: "Astrid", lastname: "Young", email: "missmoneybags@young.co.sg" },
  { firstname: "Boris", lastname: "Balastikov", email: "bb@refundit.com" },
  { firstname: "Sherlock", lastname: "Jones", email: "pd@elementary.org" },
  { firstname: "Alpha", lastname: "Simpson", email: "alf@simpsonrealtech.com" },
  { firstname: "Jose", lastname: "Garcia", email: "j.garcia@nebulus.com" },
  { firstname: "Lee", lastname: "Ki", email: "Lee.ki@symbol.com" },
  { firstname: "Mark", lastname: "Goldfine", email: "mark@tidalwave.com" },
  { firstname: "Ramesh", lastname: "Sriram", email: "ramesh@lifely.com" } 
  ]
  INSERT persons INTO addresses

```

Queries for RESTQL

Query Name: addAddress
```js
INSERT { firstname: @firstname, 
        lastname: @lastname, 
        email: @email, 
        zipcode: @zipcode }
   INTO addresses
```

Query Name: getAddresses
```
FOR address IN addresses
    RETURN address
```

Query Name: updateEmail
```
UPDATE { _key: @key }
  WITH { email: @email }
  IN addresses
```

Query Name: removeAddress
```
REMOVE { _key: @key} 
  IN addresses
```

## Using RESTQL

### GDN

| **Email** | **Passsword** | **Geo Fabric** |**Collection** | **GUI**|**Source Code**|
|------------|---------- |-------------- |-------------- |------------|----------|
| demo@macrometa.io | `xxxxxx` | _system | `addresses` | [AddressBook (RESTQL)](http://addressbook-restql-gdn.s3-website-us-east-1.amazonaws.com/)| [github](https://github.com/Macrometacorp/tutorial-addressbook-restql)|

> Note: The demo app automatically creates the following RESTQLs as part of startup.

**SaveContact:**
```js
INSERT {firstname:@firstName,lastname:@lastName,email:@email} INTO addresses
```

**ReadContact:**
```js
FOR entry IN addresses RETURN entry
```

**RemoveContact:**
```js
REMOVE @_key IN addresses
```

**UpdateContact:**
```js
UPDATE @_key WITH { firstname:@firstName, lastname:@lastName, email:@email} IN addresses
```
