---
title: OracleDB - DRAFT
---

Macrometa collection connectors allow you to extract data from or send data to an existing OracleDB collection.

## Prerequisites

- Macrometa account with admin permissions.
- Remotely accessible, running OracleDB instance. Make sure to have the required permissions on the database, schema, and tables that you want to replicate from Oracle.
- Source collections must not be empty.
- Access to `V$DATABASE` and `V_$THREAD` performance views. These are required to verify setting configuration while setting up your Oracle database and to retrieve the database's Oracle System ID.

## OracleDB Source

Note: If Multi-Tenant is set as True and a Pluggable Database Name is not provided, then CDB$ROOT container is used to access the database.

UI:
- Integration Name
- Source Table in UI, not repo

Repo:

| Config keys   | Type    | Required?  | Description         |  Default             |  Example   |
|---------------|---------|------------|---------------------|----------------------|------------|
| Connection Name       | String  | Yes        | Name of the connection            | None   | FromOracle|
| Host    | String  | Yes        | Oracle DB host      | None   | oracle_host             |
| Port    | Integer | Yes        | Oracle DB port      | None   | 1521      |
| Username | String  | Yes        | Oracle DB username  | None   | system    |
| Password | String  | Yes        | Oracle DB user password           | None   | password  |
| Replication Method     | String  | Yes        | Choose from LOG_BASED, FULL_TABLE  | FULL_TABLE   | FULL_TABLE|
| Source Schema  | String  | Yes    | Source Schema to scan   | None   | C##CUSTOMERS   |
| Source Table          | String  | Yes        | Source Table to scan (Case-sensitive).| None   | my_table  |
| Service Name          | String  | Yes        | Oracle DB service name            | None   | ORCLCDB   |
| Multi-Tenant          | Boolean | No         | Is Oracle DB is multi tenant or not   | False   |   False      |
| Pluggable Database Name     | String  | No         | Oracle portable db name           | None   | ORCLPDB1  |
| SCN Window Size       | Integer | No         | Oracle SCN window size to mine in a single iteration for logminer replication (LOG_BASED)    | 100   |    50         |
| Polling Interval      | Integer | No         | The number of seconds the connector should wait after a fetch data attempt returned empty results. This is only applicable for LOG_BASED replication method   | 60   |    30         |
| Client ewallet.pem file (Enables SSL/TLS connection)           | String  | No         | Specify the content of ewallet.pem file here. This enables SSL/TLS connection using the oracle wallet of the client. If ewallet.pem file is not present then convert ewallet.p12 to ewallet.pem using any third party tool or from the script mentioned here (https://python-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#creating-a-pem-file-for-python-oracledb-thin-mode)  | None   | my_ewallet_pem  |
| Wallet Password      | String  | No         | Specifies the password for the PEM file (ewallet.pem). If Oracle Cloud was used to download the wallet, then the parameter should be set to the password created in the cloud console when downloading the wallet      | None   | my_wallet_password     |

### Log Based replication requirements

Follow these instructions to configure Log Based replication with LogMiner:

1. Verify the database's current archiving mode

    To check the database's current mode, run:

    ```sql
        SELECT LOG_MODE FROM V$DATABASE
    ```

    If the result is ARCHIVELOG, archiving is enabled and no further action is required. Skip to Step 3 to configure RMAN backups.

2. Enable ARCHIVELOG mode

    Shut down the database instance. The database and any associated instances must be shut down before the database's archiving mode can be changed.

    ```sql
        SQL> SHUTDOWN IMMEDIATE
        SQL> STARTUP MOUNT
        SQL> ALTER DATABASE ARCHIVELOG
        SQL> ALTER DATABASE OPEN
    ```

3. Set retention period by RMAN

    ```
        RMAN> CONFIGURE RETENTION POLICY TO RECOVERY WINDOW OF 3 DAYS;
    ```

    Note: To ensure that archive log files don't consume all of your available disk space, you should also set the DB_RECOVERY_FILE_DEST_SIZE parameter to a value that agrees with your available disk quota. Refer to [Oracle's documentation](https://docs.oracle.com/cd/B28359_01/backup.111/b28270/rcmconfb.htm#BRADV89425) for more info about this parameter.

4. Enable supplemental logging

    ```
        SQL> ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS
    ```

    Note: Alternatively to enable supplemental logging at the table level, run ALTER TABLE <SCHEMA_NAME>.<TABLE_NAME> ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS for every table you want to replicate.

    Verify that supplemental logging was successfully enabled by running the following query:

    ```
        SELECT SUPPLEMENTAL_LOG_DATA_MIN FROM V$DATABASE
    ```

    If the returned value is YES or IMPLICIT, supplemental logging is enabled.

5. To use Log Based replication, you'll need the following additional permissions for the user (Please check and consult with your Oracle Administrator before granting any permission):

    ```
        GRANT EXECUTE_CATALOG_ROLE TO USER

        GRANT SELECT ANY TRANSACTION TO USER

        GRANT SELECT ANY DICTIONARY TO USER

        GRANT EXECUTE ON DBMS_LOGMNR TO USER

        GRANT EXECUTE ON DBMS_LOGMNR_D TO USER

        GRANT SELECT ON SYS.V_$DATABASE TO USER

        GRANT SELECT ON SYS.V_$ARCHIVED_LOG TO USER

        GRANT SELECT ON SYS.V_$LOGMNR_CONTENTS TO USER
    ```

    If you're using version 12 of Oracle, you'll also need to grant the LOGMINING privilege to the user:

    ```
        GRANT LOGMINING TO USER
    ```
