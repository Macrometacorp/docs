---
title: MSSQL Connector
---

Macrometa collection connectors allow you to extract data from or send data to an existing MSSQL server database.

## Prerequisites

- Macrometa account with admin permissions.
- Remotely accessible, running MSSQL instance.
- Source collections must not be empty.
- To use `LOG_BASED` replication, Microsoft SQL Server must be either Standard or Enterprise edition.

## MSSQL Source

Read this section carefully before you set up your MSSQL source connector.

### Log-Based Replication Requirements

To use the `LOG_BASED` replication method, you must use Microsoft SQL Server Standard or Enterprise edition. Also, You must have CDC enabled for the database and the table which you intend to replicate.

You can follow these steps to enable CDC on your Microsoft SQL Server instance.

#### On-Premise Databases

```sql
-- ====
-- Enable Database for CDC template
-- ====
USE [<database_name>] ;
EXEC sp_changedbowner 'sa';
EXEC sys.sp_cdc_enable_db;

-- ====
-- Create a new File Group for the CDC tables
-- ====
USE [<database_name>];
ALTER DATABASE [<database_name>] ADD FILEGROUP CDC_FILEGROUP;

-- Add files to the filegroup
ALTER DATABASE [<database_name>] ADD FILE ( NAME = cdc_files, FILENAME = 'C:\MySQLFiles\CDC_FILES' ) to FILEGROUP CDC_FILEGROUP;

-- ====
-- Enable Snapshot Isolation - Highly recommended for read consistency and to avoid dirty commits.
-- ====
-- https://www.sqlservercentral.com/articles/what-when-and-who-auditing-101-part-2
-- Consider running one of these options to ensure read consistency. Do consider the impact however of enabling these features.
ALTER DATABASE [<database_name>] SET READ_COMMITTED_SNAPSHOT ON;
ALTER DATABASE [<database_name>] SET ALLOW_SNAPSHOT_ISOLATION ON;

SELECT DB_NAME(database_id),
       is_read_committed_snapshot_on,
       snapshot_isolation_state_desc
FROM sys.databases
WHERE database_id = DB_ID();

-- ====
-- Create a new Role for accessing the CDC tables
-- ====

USE [<database_name>];

-- Create a new login
CREATE LOGIN CDC_USER WITH PASSWORD = '<cdc_user password>';
ALTER SERVER ROLE sysadmin ADD MEMBER CDC_USER;

-- Create a new user associated with the new login and access to the database
CREATE USER CDC_USER FOR LOGIN CDC_USER;
ALTER USER CDC_USER WITH DEFAULT_SCHEMA=dbo;

-- ====
-- Create a new Role for accessing the CDC tables
-- ====
CREATE ROLE CDC_Role;
ALTER ROLE CDC_Role ADD MEMBER CDC_USER;

-- =========
-- Enable CDC Tracking on tables Specifying Filegroup Option Template
-- =========
USE [<database_name>];

EXEC sys.sp_cdc_enable_table
@source_schema = N'HumanResources',
@source_name   = N'Employee',
@role_name     = N'CDC_Role',
@filegroup_name = N'CDC_FILEGROUP',
@supports_net_changes = 1
;

-- =========
-- Fixing the logging if it was not working
-- =========

-- Stopping the Capture Process
    
-- Flushing the logs
EXEC sp_repldone @xactid = NULL, @xact_segno = NULL, @numtrans = 0, @time = 0, @reset = 1;
EXEC sp_replflush;

-- Start the Capture Process

-- =========
-- CDC Queries to check what is happening
-- =========

-- Check for CDC errors
SELECT * FROM sys.dm_cdc_errors;

-- Stop the CDC Capture Job
EXEC sys.sp_cdc_stop_job;

-- Start the CDC Capture Job
EXEC sys.sp_cdc_start_job;

-- Check that CDC is enabled on the database
SELECT name, is_cdc_enabled
FROM sys.databases
WHERE database_id = DB_ID();

-- Check tables which have CDC enabled on them
SELECT s.name AS schema_name, t.name AS table_name, t.is_tracked_by_cdc, t.object_id
FROM sys.tables t JOIN sys.schemas s ON (s.schema_id = t.schema_id)
WHERE t.is_tracked_by_cdc = 1;
```

#### Azure or AWS RDS databases
```sql
/*
Note:
Snapshot Isolation level HASN'T been implemented as part of the the recommendation below as it can cause:
https://www.sqlservercentral.com/articles/row-level-versioning
-Increases resource usage when modifying data since row versions are maintained in tempDB.
-Update and Delete transaction will use more resource since it has to create a snapshot in the tempDB. This could cause higher IO, CPU and Memory usage.
-TempDB must have enough space to handle all the additional requirements.
-14 Bytes will be added to the row in the database to keep track of the versions.
-If there are long version chains then Data Read performance will be affected.
*/

-- ====
-- Enable Database for CDC template
-- ====

USE [<database_name>];

EXEC sp_changedbowner 'sa';
--For AWS RDS dbowner is rdsa so no need to run the above statement.

EXEC sys.sp_cdc_enable_db;
--Equivalent command to above on Azure or AWS RDS as per below:

--AWS RDS:
exec msdb.dbo.rds_cdc_enable_db [<database_name>]
--Otherwise running above command: EXEC sys.sp_cdc_enable_db; on AWS RDS db will give you permission error: "Msg 22902, Level 16, State 1, Procedure sp_cdc_enable_db, Line 21 [Batch Start Line 9]
--Caller is not authorized to initiate the requested action. Sysadmin privileges are required."

--Azure: This is same as normal SQL command above.
sys.sp_cdc_enable_db;

--Query to check if cdc is enabled:
SELECT name, is_cdc_enabled
FROM sys.databases
WHERE database_id = DB_ID();

-- ====
-- Create a new File Group for the CDC tables
-- ====

USE [<database_name>];

ALTER DATABASE [<database_name>] ADD FILEGROUP CDC_FILEGROUP;

-- Add files to the filegroup
ALTER DATABASE [<database_name>] ADD FILE ( NAME = cdc_files, FILENAME = 'C:\MySQLFiles\CDC_FILES' )to FILEGROUP CDC_FILEGROUP;

-- ====
-- Enable Snapshot Isolation - Highly recommended for read consistency and to avoid dirty commits.
-- ====

/*
-- https://www.sqlservercentral.com/articles/what-when-and-who-auditing-101-part-2
-- Consider running one of these options to ensure read consistency. Do consider the impact however of enabling these features.

ALTER DATABASE [<database_name>]
SET READ_COMMITTED_SNAPSHOT ON;

ALTER DATABASE [<database_name>]
SET ALLOW_SNAPSHOT_ISOLATION ON;

SELECT DB_NAME(database_id),
    is_read_committed_snapshot_on,
    snapshot_isolation_state_desc
FROM sys.databases
WHERE database_id = DB_ID();

Comments:
Configuring snapshots can also affect performance and have added I/O and CPU overhead:
With enabling Snapshots this would
1.	Increase resource usage when modifying data since row versions are maintained in tempDB.
2.	Update and Delete transaction will use more resource since it has to create a snapshot in the tempDB. This could cause higher IO, CPU and Memory usage.
3.	TempDB must have enough space to handle all the additional requirements.
4.	14 Bytes will be added to the row in the database to keep track of the versions.
5.	If there are long version chains then Data Read performance will be affected.

It's recommended that to leave snapshot isolation settings out of the mix and see if there are any concurrency issues during reads with cdc once that is implemented.
*/


-- ====
-- Create a new Role for accessing the CDC tables
-- ====

USE [<database_name>];

-- Create a new login
CREATE LOGIN CDC_USER WITH PASSWORD = '<EnterPassword>',
DEFAULT_DATABASE=[<database_name>], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON;

--ALTER SERVER ROLE sysadmin ADD MEMBER SA_SQLDProv_CDCUser;
--Above is not required

-- Create a new user associated with the new login and access to the database

CREATE USER CDC_USER FOR LOGIN CDC_USER;
ALTER USER CDC_USER WITH DEFAULT_SCHEMA=dbo;

-- ====
-- Create a new Role for accessing the CDC tables
-- ====

CREATE ROLE CDC_Role;
ALTER ROLE CDC_Role ADD MEMBER CDC_USER;

-- Add explicit permissions to tracked tables, use this script to generate the required grant permissions

-- ====
-- Add required CDC permissions to the CDC role
-- ====
USE [<database_name>]
GO
ALTER
ROLE [db_owner] ADD MEMBER [CDC_Role]
GO

--OR
----

USE [<database_name>]
GO
ALTER
ROLE [db_datareader] ADD MEMBER [CDC_Role]
GO


USE [<database_name>]
GO
GRANT EXECUTE ON SCHEMA ::cdc TO [CDC_Role]
GO

GRANT VIEW DATABASE STATE TO [CDC_Role]
GO

-- =========
-- Enable CDC Tracking on tables Specifying Filegroup Option Template
-- =========

--https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sys-sp-cdc-enable-table-transact-sql?view=sql-server-ver15 (for @supports_net_changes description)
--If 1, the functions that are needed to query for net changes are also generated.If supports_net_changes is set to 1, index_name must be specified, or the source table must have a defined primary key.
--Most tables have a primary key so index_name can be ommited.
/*
Table list to enable CDC:
1.	TABLE1
2.	TABLE2
3.	....

IMPORTANT: Please ensure that the user to access the CDC tables e.g. CDC_USER has access to the appropriate CDC Role e.g. CDC_Role. The role specified in the sys.sp_cdc_enable_table
           function must align with the CDC role allocated to the CDC_User.

*/

USE [<database_name>];

--1.	EXAM
=============
EXEC sys.sp_cdc_enable_table
@source_schema = N'dbo',
@source_name   = N'TABLE1',
@role_name     = N'CDC_Role',
@filegroup_name = N'CDC_FILEGROUP',
@supports_net_changes = 1;

--2.	EXAM_CODES
=============
EXEC sys.sp_cdc_enable_table
@source_schema = N'dbo',
@source_name   = N'TABLE2',
@role_name     = N'CDC_Role',
@filegroup_name = N'CDC_FILEGROUP',
@supports_net_changes = 1;

-- =========
-- Fixing the logging if it was not working
-- =========

-- Stopping the Capture Process

-- Flushing the logs
EXEC sp_repldone @xactid = NULL, @xact_segno = NULL, @numtrans = 0, @time = 0, @reset = 1;
EXEC sp_replflush;

-- Start the Capture Process

-- =========
-- CDC Queries to check what is happening
-- =========

-- Check for CDC errors
SELECT * FROM sys.dm_cdc_errors;

--To get cdc job information:
SELECT * FROM msdb.dbo.sysjobs
--Or Use database that has cdc enabled:
         Use <database_name>
EXEC sys.sp_cdc_help_jobs

-- Stop the CDC Capture Job
EXEC sys.sp_cdc_stop_job;

-- Start the CDC Capture Job
EXEC sys.sp_cdc_start_job;

-- Check that CDC is enabled on the database
SELECT name, is_cdc_enabled
FROM sys.databases
WHERE database_id = DB_ID();

-- Check tables which have CDC enabled on them
SELECT s.name AS schema_name, t.name AS table_name, t.is_tracked_by_cdc, t.object_id
FROM sys.tables t
         JOIN sys.schemas s ON (s.schema_id = t.schema_id)
WHERE t.is_tracked_by_cdc = 1;

--Get cdc details:
USE <database_name>;
EXEC sys.sp_cdc_help_change_data_capture;

--CDC System tables located under <database_name> > System Tables

--BACKOUT PLAN
--============================================
--To disable cdc on indvidual tables:
--The Change Data Capture can easily be disabled on a given table with the help of the sys.sp_cdc_disable_table system stored procedure, as stated below:
EXEC sys.sp_cdc_disable_table
@source_schema = N'dbo',
@source_name   = N'<Table_Name>',
@role_name     = N'CDC_Role',
@capture_instace =N'<Capture_instance>';
--Capture instance name can be found using the following query: Normally Capture_instance name is just Schema_TableName eg: dbo_Patient
Select *
from cdc.change_tables EXEC sys.sp_cdc_disable_table
@source_schema = N'dbo',
@source_name   = N'TABLE1',
@capture_instance =N'dbo_TABLE1';

EXEC sys.sp_cdc_disable_table
@source_schema = N'dbo',
@source_name   = N'TABLE2',
@capture_instance =N'dbo_TABLE2';

--To disable cdc on DB:
--You can disable SQL Server CDC completely at the database level, without the need to disable it on CDC-enabled tables one at a time.
exec msdb.dbo.rds_cdc_disable_db [<database_name>];

--Remove Logins, db_users, roles created above.

--Romove FILEGROUP 'CDC_FILEGROUP'
```

## MSSQL Target

No additional notes.
