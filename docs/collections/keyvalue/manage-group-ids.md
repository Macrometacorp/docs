---
title: Manage Group IDs
sidebar_position: 25
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page provides guidance for managing group IDs if they are enabled on your key-value collection.

## List Group IDs

<Tabs groupId="list-group-ids">
<TabItem value="console" label="Web Console">

In the GDN console web UI, you can use a C8QL query to fetch a list of group IDs for a collection.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Do stuff...

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 
18 programming languages to 
[Task Name](Link to API command).

</TabItem>
</Tabs>

## Update Group IDs

<Tabs groupId="update-group-ids">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new collection using the GDN console web UI.

1. Follow the instructions to [Run a Query in the Console](../../queries/running-queries.md#run-a-query-in-the-console) or [Run a Query with the CLI](../../queries/running-queries.md#run-a-query-with-cli).
2. Run the following query:

   ```sql
  FOR doc IN @@collectionName
  COLLECT groups = doc.groupID
  LIMIT @offset, @limit
  RETURN groups
   ```

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 
18 programming languages to 
[Task Name](Link to API command).

</TabItem>
</Tabs>

the API for listing the groups in a collection is equivalent to the following C8QL query:

FOR doc IN @@collectionName
  COLLECT groups = doc.groupID
  LIMIT @offset, @limit
  RETURN groups

And the API for updating all key-value pairs belonging to old groupID with new groupID in a collection is equivalent to the following C8QL query:

FOR doc IN @@collectionName
  FILTER doc.groupID == @oldGroupID
  UPDATE doc._key WITH {groupID: @newGroupID} IN @@collectionName RETURN doc._key