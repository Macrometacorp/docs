---
sidebar_position: 40
title: Attribute-Based Access Control
---

For this example, assume the following organizations each have employees who must access their own data:

- Supplier Store
- Partner 1
- Partner 2

Each partner store needs an API key with appropriate attributes to limit their access. Additionally, individual supplier employees need similar limitations.

For this example, configure an API key for each of the following users:

- Partner 1:
    - **Attribute -** `partner`
    - **Value -** `partner1`
- Partner 2:
    - **Attribute -** `partner`
    - **Value -** `partner2`
- Supplier Admin:
    - **Attribute -** `employee`
    - **Value -** `admin`
- Supplier Staff:
    - **Attribute -** `employee`
    - **Value -** `staff`

Refer to the [Add Attributes to API Keys](../account-management/attributes/add-attributes-api.md) section for instructions on adding attributes to API keys.

Create two collections which will contain customer data for the examples: `item` and `customer`.

Add the following data to the `item` collection:

```sql
{
   { "item": "hammer", "price": 5.99, "count": 55, "partner": "partner1" },
   { "item": "screw driver", "price": 3.99, "count": 15, "partner": "partner1" },
   { "item": "pliers", "price": 4.95, "count": 28, "partner": "partner2" },
   { "item": "drill", "price": 42.90, "count": 5, "partner": "partner2" }
}
```

Add the following data to the `customer` collection:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" },
   { "customer": 2, "item": "drill", "ordered": 1, "partner": "partner2" }
}
```

## Example 1

In this example, partners can see their own items but cannot update them.

The name of this Query Worker is `PartnerItems`.

```sql
FOR doc IN items
    FILTER doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner")
    RETURN doc
```

When we execute this Query Worker, we only see items for this partner:

```sql
curl -X 'POST' \\
  '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/PartnerItems>' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
  -d '{ "bindVars": {}}'
```

Result:

```sql
{
   { "item": "hammer", "price": 5.99, "count": 55, "partner": "partner1" },
   { "item": "screw driver", "price": 3.99, "count": 15, "partner": "partner1" },
}
```

## Example 2

In this example, partners can see their orders and update them when they are filled.

The name of this Query Worker is `PartnerOrders`:

```sql
FOR doc IN orders
    FILTER doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner")
    RETURN doc
```

The name of this Query Worker is `PartnerOrdersUpdate`:

```sql
FOR doc IN orders
    FILTER doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner") AND
            doc.customer == @customer
    UPDATE doc WITH {"ordered": doc.ordered + 1} IN orders
    RETURN NEW
```



```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/PartnerOrders>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
    -d '{ "bindVars": {}}'
```

When you run the `PartnerOrders` query, you should see a result similar to the following:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" }
}
```

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/PartnerOrders>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
    -d '{ "bindVars": { "customer": 1}}'
```

When you run the `PartnerOrdersUpdate` query, you should see a result similar to the following:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" },
}
```

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/PartnerOrders>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
    -d '{ "bindVars": { "customer": 2}}'
```

Result:

```sql
{
   {}
}
```



## Example 3

In this example, partners cannot view employee data.

The name of this Query Worker is `Employees`.

```sql
FOR doc IN employees
    FILTER CURRENT_APIKEY_ATTRIBUTE("partner") == null
    RETURN doc
```

Query result:

```sql
{
   {}
}
```




## Example 4

In this example, employees can see all items and orders but cannot update them.

The name of this Query Worker is `ViewOrders`.

```sql
OR doc IN orders
    FILTER doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner") OR 
            CURRENT_USER_ATTRIBUTE("employee") == "admin" OR
            CURRENT_USER_ATTRIBUTE("employee") == "staff"
    RETURN doc
```

The name of this Query Worker is `OrdersUpdate`.

```sql
FOR doc IN orders
    FILTER doc.customer == @customer AND
            doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner") OR
            CURRENT_USER_ATTRIBUTE("employee") == "admin"
    UPDATE doc WITH {"ordered": doc.ordered + 1} IN orders
    RETURN NEW
```

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/ViewOrders>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
    -d '{ "bindVars": {}}'
```

Result:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" }
}
```

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/ViewOrders>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cC...' \\
    -d '{ "bindVars": {}}'
```

Result:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" },
   { "customer": 2, "item": "drill", "ordered": 1, "partner": "partner2" }
}
```

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/OrdersUpdate>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
    -d '{ "bindVars": { "customer": 1}}'
```

Result:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 3, "partner": "partner1" }
}
```

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/OrdersUpdate>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cC...' \\
    -d '{ "bindVars": { "customer": 1}}'
```

Result:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 4, "partner": "partner1" }
}
```