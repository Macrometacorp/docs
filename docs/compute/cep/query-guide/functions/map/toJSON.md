---
title: toJSON (Function)
---

Function converts a map into a JSON object and returns the JSON as a string.

## Syntax

```sql
<STRING> map:toJSON(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map that needs to be converted to JSON |               | OBJECT  | No | Yes |

## Example 1

```sql
map:toJSON(company)
```

The `map:toJSON(company)` function is used to transform the `company` map, which consists of key-value pairs such as (`symbol`:`gdn`), (`volume` : 100), and (`price`, 200), into a JSON formatted string: `{"symbol" : "gdn", "volume" : 100 , "price" : 200}`.

## Example 2

```sql
CREATE STREAM CompanyInput (symbol string, volume int, price float, company object);
CREATE SINK STREAM CompanyJson (companyJson string);

@info(name = 'TransformCompanyToJson')
INSERT INTO CompanyJson
SELECT map:toJSON(company) AS companyJson
FROM CompanyInput WINDOW TUMBLING_LENGTH(10);
```

In this stream processing example, the `CompanyInput` stream is created to provide input to the query, and the `CompanyJson` stream is created to collect the output.

The `CompanyInput` stream includes details about the company (`symbol`, `volume`, `price`) and a `company` map. The `TransformCompanyToJson` query listens for batches of 10 events from the `CompanyInput` stream.

The `map:toJSON(company)` function is used to transform the `company` map of each batch into a JSON formatted string. This string, referred to as `companyJson`, is then inserted into the `CompanyJson` stream.

This way, the query continuously transforms batches of `company` map details into JSON strings and sends these strings to the `CompanyJson` stream.
