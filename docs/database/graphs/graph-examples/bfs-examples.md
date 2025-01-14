---
sidebar_position: 100
title: bfs Traversal Examples
---

This page provides examples of traversing graphs using the `bfs` option. For more information about this option, refer to [Traversal Query Syntax](../graph-queries/traversal-queries/traversal-syntax.md).

## Use Case: Fraud Detection in Bank Accounts Network

For the financial services industry, a useful application of the `bfs` traversal option in Macrometa graphs would be to identify potential fraud within a network of bank accounts.

### Bank Accounts Graph Structure

The bank has the following graph structure:

- Vertex collections: `accounts`
- Edge collections: `transactions` (edges represent transactions between two accounts)

Each vertex in the `accounts` collection represents a bank account, and each edge in the `transactions` collection represents a transaction between two accounts.

### C8QL Query

The `bfs` option can be used in a [C8QL](../../../compute/queryworkers/queries/c8ql/) query to traverse the graph and identify patterns of suspicious activity that may indicate fraudulent behavior.

For example, suppose the bank has identified a single account as potentially fraudulent. It can use the `bfs` traversal option to identify all accounts that are directly or indirectly connected to the fraudulent account through a sequence of transactions. Then, the bank can analyze the transaction patterns of these connected accounts to see if there are any commonalities or anomalies that suggest fraudulent behavior.

```sql
LET startingAccount = 'accounts/fraudulentAccount'
FOR v, e, p IN 1..5 OUTBOUND startingAccount transactions
    OPTIONS { bfs: true }
    FILTER p.vertices[*].status ALL != 'closed' AND p.vertices[0]._id != p.vertices[-1]._id
    RETURN p.vertices[*]._key
```

This query uses the `FOR` statement to start at the `startingAccount` node and traverse the graph for up to five levels of depth using the `OUTBOUND` keyword. In the `OPTIONS`, `bfs` is set to `true`. The `FILTER` statement removes any paths that include a closed account or a path that loops back to the starting node.

The `RETURN` statement returns the `_key` property of all vertices in the traversed paths, which are the account IDs that are directly or indirectly connected to the starting fraudulent account. These IDs can be used for further analysis to identify patterns of suspicious activity.

## Use Case: Identify Influential Players in a Game Community

For the gaming and e-sports industry, identifying influential players can be a valuable strategy for community building and marketing. An influential player may have a large following, contribute frequently to forums and social media, and have high engagement rates. By identifying these players, game companies can target them for promotional campaigns, provide them with exclusive content, and encourage them to advocate for their products.

### Game Community Graph Structure

Suppose there is a graph where each node represents a player in a game community, and each edge represents a relationship between two players. The edges might represent social connections, gameplay interactions, or forum engagement.

- Vertex collections: `players`
- Edge collections: `relationships`

### C8QL Query

The `bfs` traversal option can be used to identify influential players in the game community. The company starts by selecting a player with a high number of followers or engagement, and then traverses the graph to identify other players who are directly or indirectly connected to this influential player. The company can then analyze the relationship patterns of these connected players to identify other influential players.

```sql
LET startingPlayer = 'players/influentialPlayer'
FOR v, e, p IN 1..3 OUTBOUND startingPlayer relationships
    OPTIONS { bfs: true }
    FILTER p.edges[*].type ALL IN ['social', 'gameplay'] AND p.vertices[0]._id != p.vertices[-1]._id
    COLLECT player = p.vertices[-1], score = LENGTH(p) INTO groups
    SORT score DESC
    RETURN { player: player, score: score }
```

In this query, the `FOR` statement starts at the `startingPlayer` node and traverses the graph for up to three levels of depth using the `OUTBOUND` keyword. In the `OPTIONS`, `bfs` is set to `true`. The `FILTER` statement removes any paths that include a self-loop or a non-social or non-gameplay edge.

The `COLLECT` statement groups the results by the last vertex in the path (i.e., the connected player) and the length of the path (i.e., the distance from the starting player). The `SORT` statement sorts the groups in descending order by path length, which indicates the influence score of each connected player. Finally, the `RETURN` statement returns an object containing the player and their influence score.

By analyzing the results of this query, game companies can identify influential players and use this information to develop targeted marketing campaigns, provide special incentives, or engage them in community-building activities.
