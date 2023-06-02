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

In this Macrometa stream worker example, two streams are created - `CompanyInput` and `CompanyJson`. The former stream provides input to the query and includes details about the company such as `symbol`, `volume`, and `price`, as well as a `company` map. The latter stream is responsible for collecting the output.

The query, `TransformCompanyToJson`, is designed to listen for batches of 10 events from the `CompanyInput` stream. To transform each batch of `company` maps into a JSON formatted string, the query uses the `map:toJSON(company)` function. The resulting string, `companyJson`, is then inserted into the `CompanyJson` stream.
