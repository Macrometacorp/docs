---
title: rdbms (Store)
---

This extension assigns data sources and connection instructions to event
tables. It also implements read-write operations on connected data
sources.

## Syntax

    @PrimaryKey("PRIMARY_KEY")
    @Index("INDEX")
    CREATE STORE <NAME> WITH (type="rdbms", jdbc.url="<STRING>", username="<STRING>", password="<STRING>", jdbc.driver.name="<STRING>", pool.properties="<STRING>", jndi.resource="<STRING>", datasource="<STRING>", table.name="<STRING>", field.length="<STRING>", table.check.query="<STRING>", use.collation="<BOOL>")

## Query Parameters

| Name              | Description        | Default Value                | Possible Data Types | Optional | Dynamic |
|----------|-----------|-----------------------------------------|---------------------|----------|---------|
| jdbc.url          | The JDBC URL via which the RDBMS data store is accessed.                    |             | STRING              | No       | No      |
| username          | The username to be used to access the RDBMS data store.                     |             | STRING              | No       | No      |
| password          | The password to be used to access the RDBMS data store.                     |             | STRING              | No       | No      |
| jdbc.driver.name  | The SDK class name for connecting the RDBMS data store.                  |             | STRING              | No       | No      |
| pool.properties   | Any pool parameters for the database connection must be specified as key-value pairs.             | null        | STRING              | Yes      | No      |
| jndi.resource     | The name of the JNDI resource through which the connection is attempted. If this is found, the pool properties described above are not taken into account and the connection is attempted via JNDI lookup instead.           | null        | STRING              | Yes      | No      |
| datasource        | The name of the Carbon datasource that should be used for creating the connection with the database. If this is found, neither the pool properties nor the JNDI resource name described above are taken into account and the connection is attempted via Carbon datasources instead. Only works in Stream App Distribution            | null        | STRING              | Yes      | No      |
| table.name        | The name with which the event table should be persisted in the store. If no name is specified via this parameter, the event table is persisted with the same name as the Stream App table.                 | The table name defined in the Stream App App query.         | STRING              | Yes      | No      |
| field.length      | The number of characters that the values for fields of the `STRING` type in the table definition must contain. Each required field must be provided as a comma-separated list of key-value pairs in the `<field.name>:<length>` format. If this is not specified, the default number of characters specific to the database type is considered. | null        | STRING              | Yes      | No      |
| table.check.query | This query will be used to check whether the table is exist in the given database. But the provided query should return an SQLException if the table does not exist in the database. Furthermore if the provided table is a database view, and it is not exists in the database a table from given name will be created in the database                 | The tableCheckQuery which define in store rdbms configs | STRING              | Yes      | No      |
| use.collation     | This property allows users to use collation for string attirbutes. By default it's false and binary collation is not used. Currently `latin1\_bin` and `SQL_Latin1_General_CP1_CS_AS` are used as collations for MySQL and Microsoft SQL database types respectively.       | false       | BOOL                | Yes      | No      |

System Parameters

| Name               | Description              | Default Value                | Possible Parameters  |
|-----------------------|------------------------------|-----------------------------|----------------------|
| {{RDBMS-Name}}.maxVersion                | The latest version supported for {{RDBMS-Name}}.            | 0      | N/A                  |
| {{RDBMS-Name}}.minVersion                | The earliest version supported for {{RDBMS-Name}}.          | 0      | N/A                  |
| {{RDBMS-Name}}.tableCheckQuery           | The template query for the `check table` operation in {{RDBMS-Name}}.           | **H2**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **MySQL**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **Oracle**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **Microsoft SQL Server**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **PostgreSQL**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **DB2.\***: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) | N/A                  |
| {{RDBMS-Name}}.tableCreateQuery          | The template query for the `create table` operation in {{RDBMS-Name}}.          | **H2**: SELECT 1 FROM {{TABLE\_NAME}} LIMIT 1 **MySQL**: SELECT 1 FROM {{TABLE\_NAME}} LIMIT 1 **Oracle**: SELECT 1 FROM {{TABLE\_NAME}} WHERE rownum=1 **Microsoft SQL Server**: SELECT TOP 1 1 from {{TABLE\_NAME}} **PostgreSQL**: SELECT 1 FROM {{TABLE\_NAME}} LIMIT 1 **DB2.\***: SELECT 1 FROM {{TABLE\_NAME}} FETCH FIRST 1 ROWS ONLY                     | N/A                  |
| {{RDBMS-Name}}.indexCreateQuery          | The template query for the `create index` operation in {{RDBMS-Name}}.          | **H2**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **MySQL**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **Oracle**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **Microsoft SQL Server**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **PostgreSQL**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **DB2.\***: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) | N/A                  |
| {{RDBMS-Name}}.recordInsertQuery         | The template query for the `insert record` operation in {{RDBMS-Name}}.         | **H2**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **MySQL**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **Oracle**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **Microsoft SQL Server**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **PostgreSQL**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **DB2.\***: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}})       | N/A                  |
| {{RDBMS-Name}}.recordUpdateQuery         | The template query for the `update record` operation in {{RDBMS-Name}}.         | **H2**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **MySQL**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **Oracle**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **Microsoft SQL Server**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **PostgreSQL**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **DB2.\***: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}}          | N/A                  |
| {{RDBMS-Name}}.recordSelectQuery         | The template query for the `select record` operation in {{RDBMS-Name}}.         | **H2**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **MySQL**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **Oracle**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **Microsoft SQL Server**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **PostgreSQL**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **DB2.\***: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}}| N/A                  |
| {{RDBMS-Name}}.recordExistsQuery         | The template query for the `check record existence` operation in {{RDBMS-Name}}.| **H2**: SELECT TOP 1 1 FROM {{TABLE\_NAME}} {{CONDITION}} **MySQL**: SELECT 1 FROM {{TABLE\_NAME}} {{CONDITION}} **Oracle**: SELECT COUNT(1) INTO existence FROM {{TABLE\_NAME}} {{CONDITION}} **Microsoft SQL Server**: SELECT TOP 1 FROM {{TABLE\_NAME}} {{CONDITION}} **PostgreSQL**: SELECT 1 FROM {{TABLE\_NAME}} {{CONDITION}} LIMIT 1 **DB2.\***: SELECT 1 FROM {{TABLE\_NAME}} {{CONDITION}} FETCH FIRST 1 ROWS ONLY                     | N/A                  |
| {{RDBMS-Name}}.recordDeleteQuery         | The query for the `delete record` operation in {{RDBMS-Name}}.                  | **H2**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **MySQL**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **Oracle**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **Microsoft SQL Server**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **PostgreSQL**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **DB2.\***: DELETE FROM {{TABLE\_NAME}} {{CONDITION}}                  | N/A                  |
| {{RDBMS-Name}}.stringSize                | This defines the length for the string fields in {{RDBMS-Name}}.                  | **H2**: 254 **MySQL**: 254 **Oracle**: 254 **Microsoft SQL Server**: 254 **PostgreSQL**: 254 **DB2.\***: 254| N/A                  |
| {{RDBMS-Name}}.fieldSizeLimit            | This defines the field size limit for select/switch to big string type from the default string type if the `bigStringType` is available in field type list.    | **H2**: N/A **MySQL**: N/A **Oracle**: 2000 **Microsoft SQL Server**: N/A **PostgreSQL**: N/A **DB2.\***: N/A                     | 0 =\< n =\< INT\_MAX |
| {{RDBMS-Name}}.batchSize                 | This defines the batch size when operations are performed for batches of events.  | **H2**: 1000 **MySQL**: 1000 **Oracle**: 1000 **Microsoft SQL Server**: 1000 **PostgreSQL**: 1000 **DB2.\***: 1000                | N/A                  |
| {{RDBMS-Name}}.batchEnable               | This specifies whether `Update` and `Insert` operations can be performed for batches of events or not.                    | **H2**: true **MySQL**: true **Oracle (versions 12.0 and less)**: false **Oracle (versions 12.1 and above)**: true **Microsoft SQL Server**: true **PostgreSQL**: true **DB2.\***: true    | N/A                  |
| {{RDBMS-Name}}.transactionSupported      | This is used to specify whether the JDBC connection that is used supports JDBC transactions or not.     | **H2**: true **MySQL**: true **Oracle**: true **Microsoft SQL Server**: true **PostgreSQL**: true **DB2.\***: true                | N/A                  |
| {{RDBMS-Name}}.typeMapping.binaryType    | This is used to specify the binary data type. An attribute defines as `object` type in Stream App stream will be stored into RDBMS with this type.                 | **H2**: BLOB **MySQL**: BLOB **Oracle**: BLOB **Microsoft SQL Server**: VARBINARY(max) **PostgreSQL**: BYTEA **DB2.\***: BLOB(64000)                    | N/A                  |
| {{RDBMS-Name}}.typeMapping.booleanType   | This is used to specify the boolean data type. An attribute defines as `bool` type in Stream App stream will be stored into RDBMS with this type.                  | **H2**: TINYINT(1) **MySQL**: TINYINT(1) **Oracle**: NUMBER(1) **Microsoft SQL Server**: BIT **PostgreSQL**: BOOLEAN **DB2.\***: SMALLINT               | N/A                  |
| {{RDBMS-Name}}.typeMapping.doubleType    | This is used to specify the double data type. An attribute defines as `double` type in Stream App stream will be stored into RDBMS with this type.                 | **H2**: DOUBLE **MySQL**: DOUBLE **Oracle**: NUMBER(19,4) **Microsoft SQL Server**: FLOAT(32) **PostgreSQL**: DOUBLE PRECISION **DB2.\***: DOUBLE       | N/A                  |
| {{RDBMS-Name}}.typeMapping.floatType     | This is used to specify the float data type. An attribute defines as `float` type in Stream App stream will be stored into RDBMS with this type.                   | **H2**: FLOAT **MySQL**: FLOAT **Oracle**: NUMBER(19,4) **Microsoft SQL Server**: REAL **PostgreSQL**: REAL **DB2.\***: REAL      | N/A                  |
| {{RDBMS-Name}}.typeMapping.integerType   | This is used to specify the integer data type. An attribute defines as `int` type in Stream App stream will be stored into RDBMS with this type.                   | **H2**: INTEGER **MySQL**: INTEGER **Oracle**: NUMBER(10) **Microsoft SQL Server**: INTEGER **PostgreSQL**: INTEGER **DB2.\***: INTEGER                 | N/A                  |
| {{RDBMS-Name}}.typeMapping.longType      | This is used to specify the long data type. An attribute defines as `long` type in Stream App stream will be stored into RDBMS with this type.                     | **H2**: BIGINT **MySQL**: BIGINT **Oracle**: NUMBER(19) **Microsoft SQL Server**: BIGINT **PostgreSQL**: BIGINT **DB2.\***: BIGINT| N/A                  |
| {{RDBMS-Name}}.typeMapping.stringType    | This is used to specify the string data type. An attribute defines as `string` type in Stream App stream will be stored into RDBMS with this type.                 | **H2**: VARCHAR(stringSize) **MySQL**: VARCHAR(stringSize) **Oracle**: VARCHAR(stringSize) **Microsoft SQL Server**: VARCHAR(stringSize) **PostgreSQL**: VARCHAR(stringSize) **DB2.\***: VARCHAR(stringSize)     | N/A                  |
| {{RDBMS-Name}}.typeMapping.bigStringType | This is used to specify the big string data type. An attribute defines as `string` type in Stream App stream and field.length define in the annotation is greater than the fieldSizeLimit, will be stored into RDBMS with this type. | **H2**: N/A **MySQL**: N/A**Oracle**: CLOB**Microsoft SQL Server**: N/A **PostgreSQL**: N/A **DB2.\***: N/A | N/A                  |

## Example 1

    @PrimaryKey("id", "symbol")
    @Index("volume")
    CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/stocks", username="root", password="root", jdbc.driver.name="com.mysql.jdbc.Driver",field.length="symbol:100") (id string, symbol string, price float, volume long);

The above example creates an event table named `StockTable` in the
database if it does not already exist (with four attributes named `id`,
`symbol`, `price`, and `volume` of the types `string`, `string`,
`float`, and `long` respectively). The connection is made as
specified by the parameters configured for the `@Store` annotation.
 The @PrimaryKey() and @Index() annotations can be used to define
primary keys or indexes for the table and they follow Stream App query
syntax. RDBMS store supports having more than one `attributes` in the
@PrimaryKey or @Index annotations.  In this example a composite
Primary key of both attributes `id` and `symbol` will be created.

## Example 2

    @PrimaryKey("symbol")
    @Index("symbol")
    CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", username="root", password="root" , jdbc.driver.name="org.h2.Driver",field.length="symbol:100") (symbol string, price float, volume long);
    CREATE STREAM InputStream (symbol string, volume long);

    insert into FooStream
    select a.symbol as symbol, b.volume as volume
    from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol);

The above example creates an event table named `StockTable` in the
database if it does not already exist (with three attributes named
`symbol`, `price`, and `volume` of the types `string`, `float`
and `long` respectively). Then the table is joined with a stream named
`InputStream` based on a condition. The following operations are
included in the condition: [ AND, OR, Comparisons( < <= > >= == !=), IS NULL, NOT, str:contains(`Table<Column>`, `Stream<Attribute>` or Search String)]

## Example 3

    @PrimaryKey("symbol")
    @Index("symbol")
    CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", table.name="StockTable", username="root", password="root" , jdbc.driver.name="org.h2.Driver", field.length="symbol:100", table.check.query="SELECT 1 FROM StockTable LIMIT 1") (symbol string, price float, volume long);
    CREATE STREAM InputStream (symbol string, volume long);

    insert into FooStream
    select a.symbol as symbol, b.volume as volume
    from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol);

The above example creates an event table named `StockTable` in the
database if it does not already exist (with three attributes named
`symbol`, `price`, and `volume` of the types `string`, `float`
and `long` respectively). Then the table is joined with a stream named
`InputStream` based on a condition. The following operations are
included in the condition: [ AND, OR, Comparisons( < <= > >= == !=), IS NULL, NOT, str:contains(Table`<Column>`, Stream`<Attribute>` or Search.String)]
