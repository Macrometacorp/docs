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

Log Based replication requirements

LOG_BASED replication makes use of the server's binary logs (binlogs), this method can only work with primary servers, the source acts as a replica and requests the primary to stream log events,the source connector then consumes events pertaining to row changes (inserts, updates, deletes), binlog file rotate and GTID events.

Macrometa source MySQL connector support two ways of consuming log events: using binlog coordinates or GTID, the default behavior is using binlog coordinates, when turning the use_gtid flag, you have to specify the engine flavor (mariadb/mysql) due to how different are the GTID implementations in these two engines.

When enabling the `use_gtid` flag and the engine is MariaDB, the Macrometa source MySQL connector will dynamically infer the GTID pos from existing binlog coordinate in the state, if the engine is mysql, it will fail.

## MySQL/MariaDB Target

No additional notes.
