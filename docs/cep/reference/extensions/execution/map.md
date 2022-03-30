---
sidebar_position: 2
---

# Map

This extension provides capability to generate and manipulate map (key-value) data objects.

## Features

* **[collect (Aggregate Function)](#collect)**

    Collect multiple key-value pairs to construct a map. Only distinct keys
    are collected, if a duplicate key arrives, it overrides the old value

* **[merge (Aggregate Function)](#merge)**

    Collect multiple maps to merge as a single map. Only distinct keys are
    collected, if a duplicate key arrives, it overrides the old value.

* **[clear (Function)](#clear)**

    Function returns the cleared map.

* **[clone (Function)](#clone)**

    Function returns the cloned map.

* **[combineByKey (Function)](#combinebykey)**

    Function returns the map after combining all the maps given as
    parameters, such that the keys, of all the maps will be matched with an
    Array list of values from each map respectively.

* **[containsKey (Function)](#containskey)**

    Function checks if the map contains the key.

* **[containsValue (Function)](#containsvalue)**

    Function checks if the map contains the value.

* **[create (Function)](#create)**

    Function creates a map pairing the keys and their corresponding values.

* **[createFromJSON (Function)](#createfromjson)**

    Function returns the map created by pairing the keys with their
    corresponding values given in the JSON string.

* **[createFromXML (Function)](#createfromxml)**

    Function returns the map created by pairing the keys with their
    corresponding values,given as an XML string.

* **[get (Function)](#get)**

    Function returns the value corresponding to the given key from the map.

* **[isEmpty (Function)](#isempty)**

    Function checks if the map is empty.

* **[isMap (Function)](#ismap)**

    Function checks if the object is type of a map.

* **[keys (Function)](#keys)**

    Function to return the keys of the map as a list.

* **[put (Function)](#put)**

    Function returns the updated map after adding the given key-value pair.
    If the key already exist in the map the key is updated with the new
    value.

* **[putAll (Function)](#putall)**

    Function returns the updated map after adding all the key-value pairs
    from another map. If there are duplicate keys, the key will be assigned
    new values from the map that\'s being copied.

* **[putIfAbsent (Function)](#putifabsent)**

    Function returns the updated map after adding the given key-value pair
    if key is absent.

* **[remove (Function)](#remove)**

    Function returns the updated map after removing the element with the
    specified key.

* **[replace (Function)](#replace)**

    Function returns the updated map after replacing the given key-value
    pair only if key is present.

* **[replaceAll (Function)](#replaceall)**

    Function returns the updated map after replacing all the key-value pairs
    from another map, if keys are present.

* **[size (Function)](#size)**

    Function to return the size of the map.

* **[toJSON (Function)](#tojson)**

    Function converts a map into a JSON object and returns the JSON as a
    string.

* **[toXML (Function)](#toxml)**

    Function returns the map as an XML string.

* **[values (Function)](#values)**

    Function to return the values of the map.

* **[tokenize (StreamProcessor)](#tokenize)**

    okenize the map and return each key, value as new attributes in events

## collect

Collect multiple key-value pairs to construct a map. Only distinct keys
are collected, if a duplicate key arrives, it overrides the old value

Syntax

    <OBJECT> map:collect(<INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description            | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|------------------------|---------------|------------------------------------------|----------|---------|
| key   | Key of the map entry   |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING  | No       | Yes     |
| value | Value of the map entry |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    select map:collect(symbol, price) as stockDetails
    from StockStream#window.lengthBatch(10)
    insert into OutputStream;

For the window expiry of 10 events, the collect() function will collect
attributes of `key` and `value` to a single map and return as
stockDetails.

## merge

Collect multiple maps to merge as a single map. Only distinct keys are
collected, if a duplicate key arrives, it overrides the old value.

Syntax

    <OBJECT> map:merge(<OBJECT> map)

QUERY PARAMETERS

| Name | Description          | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------|---------------|---------------------|----------|---------|
| map  | Maps to be collected |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    select map:merge(map) as stockDetails
    from StockStream#window.lengthBatch(2)    
    insert into OutputStream;

For the window expiry of 2 events, the merge() function will collect
attributes of `map` and merge them to a single map, returned as
stockDetails.

## clear

Function returns the cleared map.

Syntax

    <OBJECT> map:clear(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------|---------------|---------------------|----------|---------|
| map  | The map which needs to be cleared |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:clear(stockDetails)

Returns an empty map.

## clone

Function returns the cloned map.

Syntax

    <OBJECT> map:clone(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                          | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------|---------------|---------------------|----------|---------|
| map  | The map to which needs to be cloned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:clone(stockDetails)

Function returns cloned map of stockDetails.

## combineByKey

Function returns the map after combining all the maps given as
parameters, such that the keys, of all the maps will be matched with an
Array list of values from each map respectively.

Syntax

    <OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map)
    <OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map, <OBJECT> ...)

QUERY PARAMETERS

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:combineByKey(map1, map2)

If `map2` contains key-value pairs *('symbol': 'GDN'), ('volume' :
100)*, and if `map2` contains key-value pairs *('symbol': 'IBM'),
('price' : 12)*, then the function returns the map with key value pairs
as follows, *(symbol: ArrayList('GDN', 'IBM'))*, *(volume:
ArrayList(100, null))* and *(price: ArrayList(null, 12))*

## containsKey

Function checks if the map contains the key.

Syntax

    <BOOL> map:containsKey(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key)

QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types               | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| map  | The map the needs to be checked on containing the key or not. |               | OBJECT                            | No       | Yes     |
| key  | The key to be checked.                                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:containsKey(stockDetails, '1234')

Returns `true` if the stockDetails map contains key `1234` else it
returns `false`.

## containsValue

Function checks if the map contains the value.

Syntax

    <BOOL> map:containsValue(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                                     | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|-----------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| map   | The map the needs to be checked on containing the value or not. |               | OBJECT                            | No       | Yes     |
| value | The value to be checked.                                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:containsValue(stockDetails, 'IBM')

Returns `true` if the stockDetails map contains value `IBM` else it
returns `false`.

## create

Function creates a map pairing the keys and their corresponding values.

Syntax

    <OBJECT> map:create()
    <OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1)
    <OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> ...)

QUERY PARAMETERS

| Name   | Description | Default Value | Possible Data Types                            | Optional | Dynamic |
|--------|-------------|---------------|------------------------------------------------|----------|---------|
| key1   | Key 1       | \-            | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |
| value1 | Value 1     | \-            | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

EXAMPLE 1

    map:create(1, 'one', 2, 'two', 3, 'three')

This returns a map with keys `1`, `2`, `3` mapped with their
corresponding values, `one`, `two`, `three`.

EXAMPLE 2

    map:create()

This returns an empty map.

## createFromJSON

Function returns the map created by pairing the keys with their
corresponding values given in the JSON string.

Syntax

    <OBJECT> map:createFromJSON(<STRING> json.string)

QUERY PARAMETERS

| Name        | Description                                        | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------|---------------|---------------------|----------|---------|
| json.string | JSON as a string, which is used to create the map. |               | STRING              | No       | Yes     |

EXAMPLE 1

    map:createFromJSON("{‘symbol' : 'IBM', 'price' : 200, 'volume' : 100}")

This returns a map with the keys `symbol`, `price`, and `volume`, and
their values, `IBM`, `200` and `100` respectively.

## createFromXML

Function returns the map created by pairing the keys with their
corresponding values,given as an XML string.

Syntax

    <OBJECT> map:createFromXML(<STRING> xml.string)

QUERY PARAMETERS

| Name       | Description                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------------------------------------------|---------------|---------------------|----------|---------|
| xml.string | The XML string, which is used to create the map. |               | STRING              | No       | Yes     |

EXAMPLE 1

    map:createFromXML("<stock>
                          <symbol>IBM</symbol>
                          <price>200</price>
                          <volume>100</volume>
                       </stock>")

This returns a map with the keys `symbol`, `price`, `volume`, and with
their values `IBM`, `200` and `100` respectively.

## get

Function returns the value corresponding to the given key from the map.

Syntax

    <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)
    <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> default.value)

QUERY PARAMETERS

| Name          | Description                                                | Default Value | Possible Data Types                            | Optional | Dynamic |
|---------------|------------------------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map           | The map from where the value should be obtained.           |               | OBJECT                                         | No       | Yes     |
| key           | The key to fetch the value.                                |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING        | No       | Yes     |
| default.value | The value to be returned if the map does not have the key. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

EXAMPLE 1

    map:get(companyMap, 1)

If the companyMap has key `1` and value `ABC` in it\'s set of key value
pairs. The function returns `ABC`.

EXAMPLE 2

    map:get(companyMap, 2)

If the companyMap does not have any value for key `2` then the function
returns `null`.

EXAMPLE 3

    map:get(companyMap, 2, 'two')

If the companyMap does not have any value for key `2` then the function
returns `two`.

## isEmpty

Function checks if the map is empty.

Syntax

    <BOOL> map:isEmpty(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map the need to be checked whether it\'s empty or not. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:isEmpty(stockDetails)

Returns `true` if the stockDetails map is empty else it returns
`false`.

## isMap

Function checks if the object is type of a map.

Syntax

    <BOOL> map:isMap(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> arg)

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types                            | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|------------------------------------------------|----------|---------|
| arg  | The argument the need to be determined whether it\'s a map or not. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:isMap(stockDetails)

Returns `true` if the stockDetails is and an instance of
`java.util.Map` else it returns `false`.

## keys

Function to return the keys of the map as a list.

Syntax

    <OBJECT> map:keys(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                     | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map from which list of keys to be returned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:keys(stockDetails)

Returns keys of the `stockDetails` map.

## put

Function returns the updated map after adding the given key-value pair.
If the key already exist in the map the key is updated with the new
value.

Syntax

    <OBJECT> map:put(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                 | Default Value | Possible Data Types                            | Optional | Dynamic |
|-------|---------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT                                         | No       | Yes     |
| key   | The key to be added.                        |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |
| value | The value to be added.                      |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:put(stockDetails , 'IBM' , '200')

Function returns the updated map named stockDetails after adding the
value `200` with the key `IBM`.

## putAll

Function returns the updated map after adding all the key-value pairs
from another map. If there are duplicate keys, the key will be assigned
new values from the map that\'s being copied.

Syntax

    <OBJECT> map:putAll(<OBJECT> to.map, <OBJECT> from.map)

QUERY PARAMETERS

| Name     | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |
| from.map | The map from which the key-values are copied.     |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:putAll(toMap, fromMap)

If `toMap` contains key-value pairs *('symbol': 'GDN'), ('volume'
: 100)*, and if `fromMap` contains key-value pairs *('symbol': 'IBM'),
('price' : 12)*, then the function returns updated `toMap` with
key-value pairs *('symbol': 'IBM'), ('price' : 12), ('volume' : 100)*.

## putIfAbsent

Function returns the updated map after adding the given key-value pair
if key is absent.

Syntax

    <OBJECT> map:putIfAbsent(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                 | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|---------------------------------------------|---------------|-----------------------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT                            | No       | Yes     |
| key   | The key to be added.                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| value | The value to be added.                      |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:putIfAbsent(stockDetails , 1234 , 'IBM')

Function returns the updated map named stockDetails after adding the
value `IBM` with the key `1234` if key is absent from the original map.

## remove

Function returns the updated map after removing the element with the
specified key.

Syntax

    <OBJECT> map:remove(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)

QUERY PARAMETERS

| Name | Description                                   | Default Value | Possible Data Types                            | Optional | Dynamic |
|------|-----------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map  | The map that needs to be updated.             |               | OBJECT                                         | No       | Yes     |
| key  | The key of the element that needs to removed. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:remove(stockDetails, 1234)

This returns the updated map, stockDetails after removing the key-value
pair corresponding to the key `1234`.

## replace

Function returns the updated map after replacing the given key-value
pair only if key is present.

Syntax

    <OBJECT> map:replace(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                     | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|-----------------------------------------|----------|---------|
| map   | The map to which the key-value should be replaced. |               | OBJECT                                  | No       | Yes     |
| key   | The key to be replaced.                            |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |
| value | The value to be replaced.                          |               | INT LONG FLOAT DOUBLE BOOL STRING       | No       | Yes     |

EXAMPLE 1

    map:replace(stockDetails , 1234 , 'IBM')

Function returns the updated map named stockDetails after replacing the
value `IBM` with the key `1234` if present.

## replaceAll

Function returns the updated map after replacing all the key-value pairs
from another map, if keys are present.

Syntax

    <OBJECT> map:replaceAll(<OBJECT> to.map, <OBJECT> from.map)

QUERY PARAMETERS

| Name     | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |
| from.map | The map from which the key-values are copied.     |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:replaceAll(toMap, fromMap)

If `toMap` contains key-value pairs *('symbol': 'GDN'), ('volume'
: 100)*, and if `fromMap` contains key-value pairs *('symbol': 'IBM'),
('price' : 12)*, then the function returns updated `toMap` with
key-value pairs *('symbol': 'IBM'), ('volume' : 100)*.

## size

Function to return the size of the map.

Syntax

    <INT> map:size(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map for which size should be returned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:size(stockDetails)

Returns size of the `stockDetails` map.

## toJSON

Function converts a map into a JSON object and returns the JSON as a
string.

Syntax

    <STRING> map:toJSON(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map that needs to be converted to JSON |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:toJSON(company)

If `company` is a map with key-value pairs, *('symbol':
'GDN'),('volume' : 100)*, and *('price', 200)*, it returns the JSON
string `{"symbol" : "GDN", "volume" : 100 , "price" : 200}`.

## toXML

Function returns the map as an XML string.

Syntax

    <STRING> map:toXML(<OBJECT> map)
    <STRING> map:toXML(<OBJECT> map, <OBJECT|STRING> root.element.name)

QUERY PARAMETERS

| Name              | Description                                | Default Value                        | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------------------------|--------------------------------------|---------------------|----------|---------|
| map               | The map that needs to be converted to XML. |                                      | OBJECT              | No       | Yes     |
| root.element.name | The root element of the map.               | The XML root element will be ignored | OBJECT STRING       | Yes      | Yes     |

EXAMPLE 1

    toXML(company, 'abcCompany')

If `company` is a map with key-value pairs, *('symbol' : 'GDN'),
('volume' : 100)*, and *('price' : 200)*, this function returns XML as
a string,
`<abcCompany><symbol>GDN</symbol><volume><100></volume><price>200</price></abcCompany>`.

EXAMPLE 2

    toXML(company)

If `company` is a map with key-value pairs, *('symbol' : 'GDN'),
('volume' : 100)*, and *('price' : 200)*, this function returns XML
without root element as a string,
`<symbol>GDN</symbol><volume><100></volume><price>200</price>`.

## values

Function to return the values of the map.

Syntax

    <OBJECT> map:values(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map from which list if values to be returned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:values(stockDetails)

Returns values of the `stockDetails` map.

## tokenize

Tokenize the map and return each key, value as new attributes in events

Syntax

    map:tokenize(<OBJECT> map)
    map:tokenize(<OBJECT> map, <OBJECT> ...)

QUERY PARAMETERS

| Name | Description                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------|---------------|---------------------|----------|---------|
| map  | Hash map containing key value pairs |               | OBJECT              | No       | Yes     |

Extra Return Attributes

| Name  | Description                                                                                                                                              | Possible Types |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| key   | Key of an entry consisted in the map                                                                                                                     | OBJECT         |
| value | Value of an entry consisted in the map. If more than one map is given, then an Array List of values from each map is returned for the `value` attribute. | OBJECT         |

EXAMPLE 1

    define stream StockStream(symbol string, price float);

    select map:collect(symbol, price) as symbolPriceMap
    from StockStream#window.lengthBatch(2)
    insert into TempStream;

    select key, value
    from TempStream#map:tokenize(customMap)
    insert into SymbolStream;

Based on the length batch window, `symbolPriceMap` will collect two
events, and the map will then again tokenized to give 2 events with key
and values being symbol name and price respectively.
