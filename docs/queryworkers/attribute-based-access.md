---
sidebar_position: 40
title: Attribute-Based Access Control
---

For this example, assume the following organizations each have employees who must access their own data:

- Supplier Store
- Partner 1
- Partner 2

Each partner store needs an API key with appropriate attributes to limit their access. Additionally, individual supplier employees need similar limitations.

For this example, configure an API key for each of the following users, then add an attribute with these values:

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

Refer to [Add Attributes to API Keys](../account-management/attributes/add-attributes-api.md) for instructions on adding attributes to API keys.

Create two collections that will contain customer data for the examples: `item` and `customer`.

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

In this example, customer 1 is partner 1 and customer 2 is partner 2.

## Example 1 - Attribute Can Only View

In this example, partners can see their own items but cannot update them.

The query worker `PartnerItems` displays data from a collection to which the active user can access:

```sql
FOR doc IN items
    FILTER doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner")
    RETURN doc
```

When Partner 1 wants to view their data, they can run a command with their API key similar to the following:

```sql
curl -X 'POST' \\
  '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/PartnerItems>' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
  -d '{ "bindVars": {}}'
```

Note that in the results, only data with the `partner1` attribute displays:

```sql
{
   { "item": "hammer", "price": 5.99, "count": 55, "partner": "partner1" },
   { "item": "screw driver", "price": 3.99, "count": 15, "partner": "partner1" },
}
```

## Example 2

In this example, partners can see their orders and update them when they are filled.

The query worker `PartnerOrdersUpdate` updates data in the collection if the active user has access:

```sql
FOR doc IN orders
    FILTER doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner") AND
            doc.customer == @customer
    UPDATE doc WITH {"ordered": doc.ordered + 1} IN orders
    RETURN NEW
```

When Partner 1 wants to update their data, they can run a command with their API key similar to the following:

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/PartnerOrdersUpdate>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey acme_key.897b6e...' \\
    -d '{ "bindVars": { "customer": 1}}'
```

The displayed results show the added data:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" },
}
```

On the other hand, if Partner 1 tries to run the same command to edit data belonging to Partner 2:

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/PartnerOrdersUpdate>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
    -d '{ "bindVars": { "customer": 2}}'
```

The result is empty because the attempt failed:

```sql
{
   {}
}
```

## Example 3

In this example, partners attempt to view employee data and are blocked because they do not have proper access.

The name of this query worker is `Employees`:

```sql
FOR doc IN employees
    FILTER CURRENT_APIKEY_ATTRIBUTE("partner") == null
    RETURN doc
```

The result is empty because API keys with the `partner` attribute do not have access to the `employees` collection:

```sql
{
   {}
}
```

## Example 4

In this example, employees can see all items and orders but cannot update them, and partners can view and update their own items.

The name of this query worker is `ViewOrders`.

```sql
FOR doc IN orders
    FILTER doc.partner == CURRENT_APIKEY_ATTRIBUTE("partner") OR 
            CURRENT_USER_ATTRIBUTE("employee") == "admin" OR
            CURRENT_USER_ATTRIBUTE("employee") == "staff"
    RETURN doc
```

Partner 1 can run a command to add data to their order:

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/ViewOrders>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: apikey <PARTNER 1 API KEY>' \\
    -d '{ "bindVars": {}}'
```

The result shows the added data:

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" }
}
```

Similarly, if an employee is logged onto their account they can run a command to view all data:

```
curl -X 'POST' \\
    '<https://fulfillment.eng.macrometa.io/_fabric/_system/_api/restql/execute/ViewOrders>' \\
    -H 'accept: application/json' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cC...' \\
    -d '{ "bindVars": {}}'
```

The result shows data for both customers since the employee has view access to both.

```sql
{
   { "customer": 1, "item": "hammer", "ordered": 2, "partner": "partner1" },
   { "customer": 2, "item": "drill", "ordered": 1, "partner": "partner2" }
}
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

Partner 1 can run a command to add data to their order:

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

Similarly, if an employee is logged onto their account they can run a command to add data:

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