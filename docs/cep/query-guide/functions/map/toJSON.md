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
CREATE STREAM CompanyInput (symbol string, volume int, price float);
CREATE SINK STREAM CompanyJson (companyJson string);

@info(name = 'TransformCompanyToJson')
INSERT INTO CompanyJson
SELECT map:toJSON(company) AS companyJson
FROM CompanyInput#window.lengthBatch(10);
```

In this stream worker example, two streams are defined: the `CompanyInput` stream for input data and the `CompanyJson` stream for the output.

The query named `TransformCompanyToJson` listens for batches of 10 events from the `CompanyInput` stream. Each event consists of company details such as `symbol`, `volume`, and `price`.

The `map:toJSON(company)` function is used to transform each batch of company details into a JSON formatted string. This string, named `companyJson`, is then inserted into the `CompanyJson` stream.

The query continuously converts batches of company details into JSON strings and feeds these strings into the `CompanyJson` stream.
