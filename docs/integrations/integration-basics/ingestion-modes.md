---
title: Ingestion Modes
sidebar_position: 20
---

Macrometa integrations support two modes of data ingestion: LOG_BASED and FULL_TABLE. This page explains each mode, as well as why you might choose one or the other.

## LOG_BASED Ingestion

This method uses the log files that the database generates as part of its normal operation. Whenever a change is made to the database, an entry is added to the log file. By reading this log file, it's possible to see exactly what changes have been made and when they were made.

LOG_BASED replication works by continuously checking these log files for new entries, and then copying these changes over to the target system. This allows for near real-time replication, and because it only requires copying over the changes, it can be less resource-intensive than FULL_TABLE replication. However, not all databases support this type of replication, and it often requires special configuration settings on the database side.

## FULL_TABLE Ingestion

This method works by scanning the entire table from the source database and copying all rows into the destination system. This happens each time the replication is run.

FULL_TABLE is the most comprehensive way of replicating data, as it ensures that the destination system contains a complete copy of the source table at the point the replication was run. However, it can be resource-intensive, particularly for large tables, and it doesn't reflect changes in real-time. Instead, the changes are only visible after the next replication run.

## Which to Choose

Each of these methods has their pros and cons, and the choice between them often depends on the specific use case. For example, if real-time data is a requirement and the database supports it, LOG_BASED replication might be the better choice. However, if the database is relatively small and changes infrequently, FULL_TABLE replication could be simpler and just as effective.
