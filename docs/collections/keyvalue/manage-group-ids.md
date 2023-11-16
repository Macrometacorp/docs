---
title: Manage Group IDs
sidebar_position: 25
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page provides guidance for managing group IDs if they are enabled on your key-value collection.

## List Group IDs

To list all group IDs in a collection:

1. Follow the instructions to [Run a Query in the Console](../../queries/running-queries.md#run-a-query-in-the-console) or [Run a Query with the CLI](../../queries/running-queries.md#run-a-query-with-cli).
2. Run the following query:

    ```sql
    FOR doc IN @@collectionName
    COLLECT groups = doc.groupID
    LIMIT @offset, @limit
    RETURN groups
    ```

## Update Group IDs

To update all key-value pairs belonging to old groupID with new groupID in a collection:

1. Follow the instructions to [Run a Query in the Console](../../queries/running-queries.md#run-a-query-in-the-console) or [Run a Query with the CLI](../../queries/running-queries.md#run-a-query-with-cli).
2. Run the following query:

   ```sql
    FOR doc IN @@collectionName
    FILTER doc.groupID == @oldGroupID
    UPDATE doc._key WITH {groupID: @newGroupID} IN @@collectionName RETURN doc._key
   ```
