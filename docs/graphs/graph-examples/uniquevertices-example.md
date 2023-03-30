---
sidebar_position: 100
title: uniqueVertices Example
---

This page provides examples of traversing graphs using the `uniqueVertices` option. For more information about this option, refer to [Traversal Query Syntax](../graph-queries/traversal-queries/traversal-syntax.md).

## Use Case: Identify Unique Viewers for Personalized Recommendations

Consider an OTT video streaming service that wants to improve its content recommendations for viewers. The service wants to identify unique viewers who have recently watched content from a specific genre in order to offer them personalized recommendations and enhance their streaming experience. This approach can help the streaming service increase viewer engagement and promote content tailored to individual preferences.

### Unique Viewers Graph Structure

The streaming platform has the following graph structure:

- Vertex collections: `users`, `content`
- Edge collections: `watched` (edges represent the "watched" relationship between users and content)

### C8QL Query

The uniqueVertices option can be used in a [C8QL](../../queries/c8ql/) query to find unique viewers who have recently watched content from the 'Sci-Fi' genre:

```sql
FOR user, edge, path IN 1..1 OUTBOUND 'content/Sci-Fi' watched
  OPTIONS {uniqueVertices: 'global'}
  RETURN user
```

In this query, the graph is traversed using the `OUTBOUND` direction, starting from the 'Sci-Fi' genre vertex in the content collection, and following the `watched` edges to find unique users who have watched content from this genre. The `uniqueVertices: 'global'` option ensures that only distinct users are returned, preventing any duplicates.

## Use Case: Identify Influential Customers in Financial Services

Imagine a financial services company looking to identify influential customers to develop targeted marketing campaigns. The company wants to find customers who have made significant investments and have had a strong influence on their connections' investment decisions. This approach allows the financial services company to focus its marketing efforts on influential customers, leading to increased engagement and potentially higher investment volumes.

### Influential Customers Graph Structure

The financial services company has the following graph structure:

- Vertex collections: `customers`, `investments`
- Edge collections: `invested_in` (edges represent the "invested in" relationship between customers and investments), `influenced` (edges represent the "influenced" relationship between customers)

### C8QL Query

The `uniqueVertices` option can be used in a C8QL query to find unique influential customers who have made significant investments:

```sql
LET investmentThreshold = 50000
FOR customer IN customers
  FILTER customer.total_investment >= investmentThreshold
  FOR influenced_customer, influenced_edge IN 1..1 OUTBOUND customer influenced
    COLLECT influenced_investment = influenced_customer.total_investment INTO groups
    SORT LENGTH(groups) DESC, influenced_investment DESC
    LIMIT 10
    FOR influential_customer, investment_edge, path IN 1..1 INBOUND influenced_customer._id invested_in
      OPTIONS {uniqueVertices: 'path'}
      RETURN DISTINCT influential_customer
```

In this query, customers with a total investment equal to or greater than the investment threshold (e.g., 50,000) are first filtered. Then, for each customer, the graph is traversed in the `OUTBOUND` direction following the `influenced` edges to find customers they have influenced. The influenced customers' total investments are collected into groups and the groups are sorted by the number of influenced customers and their investment amounts. The result is limited to the top 10 influential customers.

Finally, for each influential customer, the graph is traversed in the `INBOUND` direction following the `invested_in` edges. The `uniqueVertices: 'path'` option ensures that only unique vertices in the path are considered, preventing any duplicates. The query returns the top 10 unique influential customers based on their investment influence.
