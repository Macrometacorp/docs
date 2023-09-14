---
title: MySQL/MariaDB Connector
---

Macrometa collection connectors allow you to extract data from or send data to an existing MySQL or MariaDB collection.

## Prerequisites

- Macrometa account with admin permissions.
- Remotely accessible, running MySQL or MariaDB instance.
- A connection to the MySQL or MariaDB instance with necessary privileges.
- Source collections must not be empty.

## MySQL/MariaDB Source

Read this section carefully before you set up your MySQL or MariaDB source connector.

### Log-Based Replication Requirements

LOG_BASED replication makes use of the server's binary logs (binlogs). This method can only work with primary servers.

1. The source acts as a replica and requests the primary to stream log events
2. The source connector then consumes events such as row changes (inserts, updates, deletes), binlog file rotation, and GTID events.

The Macrometa source MySQL connector support two ways of consuming log events: using binlog coordinates or GTID. The default behavior is using binlog coordinates, when turning the `use_gtid` flag, you must specify the engine type (MySQL or MariaDB) due to how different the GTID implementations are in these two engines.

When enabling the `use_gtid` flag with the MariaDB engine, the Macrometa source MySQL connector will dynamically infer the GTID position from existing binlog coordinate in the state. If the engine is mysMySQLql, it will fail.

## MySQL/MariaDB Target

No additional notes.
