---
sidebar_position: 1
title: Attributes
---

Administrators can assign attributes to users and API keys which limit document access. You can use attributes to assign read or write permissions at the document level or collection level. For more information about permissions, refer to [Permissions](../permissions/index.md).

In this example, imagine a fulfillment company with documents and collections that must be accessed by partners and employees. The partners request items for the fulfillment company to provide, and the company employees fulfill the orders of the partners' items.

![Fulfillment company example](/img/attribute-example.png)

The fulfillment company has three collections in Macrometa:

- **Items -** The requested goods that the fulfillment company must supply.
- **Orders -** The orders that the fulfillment company must fill.
- **Employees -** List of user accounts for employees of the fulfillment company.

The company wants to provide restricted queries that partners and employees can use:

- Partners can only see their own items, but cannot update them.
- Partners can only see their own orders, and can also update the order when fulfilled.
- Partners cannot see employees.
- Employees can see all items and orders, but cannot update them.

To enforce these restrictions, the fulfillment company can add _attributes_ to API keys and user accounts. In this example, each partner is given a unique API key which they use to access their order information. On the other hand, employees have user accounts with their company login credentials.

When you assign an attribute, you can also assign a value to further restrict permissions. For example, an `employee` attribute can have a `staff` or `admin` value to signify levels of permission.

For examples demonstrating how to use attributes in queries, refer to [Attribute-Based Access Control](../../compute/queryworkers/attribute-based-access.md).