---
sidebar_position: 100
title: uniqueEdges Traversal Examples
---

This page provides examples of traversing graphs using the `uniqueEdges` option. For more information about this option, refer to [Traversal Query Syntax](../graph-queries/traversal-queries/traversal-syntax.md).

## Use Case: Analyze Content Recommendation Paths in OTT Video Streaming

An OTT video streaming service wants to analyze how users discover new content through the platform's recommendation system. By understanding the unique recommendation paths, the streaming service can optimize their recommendation algorithms and enhance user engagement.

### Recommendation Paths Graph Structure

The streaming service has the following graph structure:

- Vertex collections: `users`, `content`
- Edge collections: `viewed` (edges represent the "viewed" relationship between users and content), `recommended` (edges represent the "recommended" relationship between content items)

### C8QL Query

The `uniqueEdges` option can be used in a [C8QL](../../queries/c8ql/) query to find unique recommendation paths that led users to discover new content:

```sql
FOR user IN users
  FILTER user._key == 'sampleUser'
  FOR v, e, p IN 1..5 OUTBOUND user viewed
    OPTIONS {uniqueEdges: 'path'}
    FILTER e.recommended == true
    RETURN {content: v.title, path: p.edges[*].title}
```

In this query, a specific user (e.g., 'sampleUser') is first filtered from the `users` collection. Then, for the selected user, the graph is traversed in the `OUTBOUND` direction following the `viewed` edges to find the content they watched. The `uniqueEdges: 'path'` option ensures that only unique edges in the path are considered, preventing any duplicates or loops in the recommendation paths.

The query then filters the results by checking if the `recommended` attribute of the edge is set to `true`. The result includes the unique recommendation paths that led the user to discover and watch new content.

By analyzing the unique recommendation paths, the OTT video streaming service can optimize its algorithms to provide users with a better content discovery experience and, in turn, increase user engagement on the platform.

## Use Case: Optimizing Supply Chain in Retail

A retail company wants to optimize its supply chain by analyzing the relationships between suppliers, products, and retail locations. By understanding the dependencies between these entities, the company aims to improve its inventory management, reduce costs, and enhance overall operational efficiency.

### Supply Chain Graph Structure

The retail company has the following graph structure:

- Vertex collections: `suppliers`, `products`, `retail_locations`
- Edge collections: `supplies` (edges represent the "supplies" relationship between suppliers and products), `stocks` (edges represent the "stocks" relationship between products and retail locations)

### C8QL Query

The `uniqueEdges` option can be used in a C8QL query to find unique paths between suppliers, products, and retail locations, which can help identify inefficiencies and opportunities for optimization in the supply chain:

```sql
WITH suppliers, products, retail_locations, supplies, stocks
FOR supplier IN suppliers
  FOR product, supply_edge IN 1..1 OUTBOUND supplier supplies
    FILTER supply_edge.supply_volume > 500
    FOR location, stock_edge IN 1..1 OUTBOUND product stocks
      FILTER stock_edge.stock_level < 100
      OPTIONS {uniqueEdges: "path"}
      RETURN {
        supplier: supplier.name,
        product: product.name,
        location: location.name,
        supply_volume: supply_edge.supply_volume,
        stock_level: stock_edge.stock_level
      }
```

This query retrieves paths between suppliers, products, and retail locations, where the supplier has a supply volume greater than 500 and the retail location has a stock level lower than 100 for the specific product. The `uniqueEdges` option ensures that the analysis only considers distinct relationships between these entities, allowing the company to identify specific areas in the supply chain that require attention and optimization.
