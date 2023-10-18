---
title: OracleDB Connector
---

Macrometa collection connectors allow you to extract data from or send data to an existing OracleDB collection.

## Prerequisites

- Macrometa account with admin permissions.
- Remotely accessible, running OracleDB instance. Make sure to have the required permissions on the database, schema, and tables that you want to replicate from Oracle.
- Source collections must not be empty.
- Access to `V$DATABASE` and `V_$THREAD` performance views. These are required to verify setting configuration while setting up your Oracle database and to retrieve the database's Oracle System ID.

## OracleDB Source

Read this section carefully before you set up your OracleDB source connector.

### Multi-Tenant

If **Multi-Tenant** is set as **True** and a **Pluggable Database Name** is not provided, then CDB$ROOT container is used to access the database.

### Log-Based Replication Requirements

Follow these instructions to configure log-based replication with LogMiner:

1. Verify the database's current archiving mode.

    To check the database's current mode, run:

    ```sql
        SELECT LOG_MODE FROM V$DATABASE
    ```

    If the result is ARCHIVELOG, then archiving is enabled and no further action is required. Skip to Step 3 to configure RMAN backups.

2. Enable ARCHIVELOG mode:

    1. Shut down the database instance. The database and any associated instances must be shut down before the database's archiving mode can be changed.
    2. Run the following:

        ```sql
        SQL> SHUTDOWN IMMEDIATE
        SQL> STARTUP MOUNT
        SQL> ALTER DATABASE ARCHIVELOG
        SQL> ALTER DATABASE OPEN
        ```

3. Set the retention period by RMAN:

    ```
    RMAN> CONFIGURE RETENTION POLICY TO RECOVERY WINDOW OF 3 DAYS;
    ```

    To ensure that archive log files don't consume all of your available disk space, you should also set the DB_RECOVERY_FILE_DEST_SIZE parameter to a value that agrees with your available disk quota. Refer to [Oracle's documentation](https://docs.oracle.com/cd/B28359_01/backup.111/b28270/rcmconfb.htm#BRADV89425) for more information about this parameter.

4. Enable supplemental logging:

    ```sql
    SQL> ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS
    ```

    Alternatively, to enable supplemental logging at the table level, run ALTER TABLE <SCHEMA_NAME>.<TABLE_NAME> ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS for every table you want to replicate.

    Verify that supplemental logging was successfully enabled by running the following query:

    ```sql
    SELECT SUPPLEMENTAL_LOG_DATA_MIN FROM V$DATABASE
    ```

    If the returned value is YES or IMPLICIT, then supplemental logging is enabled.

5. To use log-based replication, you'll need the following additional permissions for the user. Be sure to check with your Oracle Administrator before granting any permission!

    ```sql
    GRANT EXECUTE_CATALOG_ROLE TO USER

    GRANT SELECT ANY TRANSACTION TO USER

    GRANT SELECT ANY DICTIONARY TO USER

    GRANT EXECUTE ON DBMS_LOGMNR TO USER

    GRANT EXECUTE ON DBMS_LOGMNR_D TO USER

    GRANT SELECT ON SYS.V_$DATABASE TO USER

    GRANT SELECT ON SYS.V_$ARCHIVED_LOG TO USER

    GRANT SELECT ON SYS.V_$LOGMNR_CONTENTS TO USER
    ```

    If you're using version 12 of Oracle, then you'll also need to grant the LOGMINING privilege to the user:

    ```sql
    GRANT LOGMINING TO USER
    ```

## OracleDB Target

Fields with Boolean, JSON, and array data types in the source collection are stored as columns of VARCHAR datatype in the OracleDB target table.
