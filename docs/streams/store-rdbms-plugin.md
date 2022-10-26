---
sidebar_position: 120
title: Store RDBMS Plugin
---

You can use plugins in Macrometa to extend the functionality of your streams.

The Store plugin provides persistence and retrieval of events to and from RDBMS databases like MySQL, MS SQL, PostgreSQL, H2, and Oracle. If you are using CEP as the Java/Python library, then you must also set the data source in the CEP Manager.

This plugin provides the following functionality:

## Create, Update, Delete (CUD)

You can use SQL CUD to perform INSERT, UPDATE, and DELETE queries on data sources.

### Parameters

Insert the following parameters into the provided [template](#template) to create a CUD function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| data-source.name	| STRING		| N/A				| No		| No		| Name of the data source on which to run the query. |
| query				| STRING		| N/A				| No		| Yes		| The INSERT, UPDATE, or DELETE query to be performed. Format according to the relevant database type. |
| parameter			| Any			| N/A				| Yes		| Yes		| If `query` is a parameter used as an SQL query, then you can use this field to pass CEP attributes to set parameter values. |

Additionally, the `numRecords` attribute (INT) indicates the number of records manipulated by the query.

### CUD Template

Use the following template to create a CUD function:

```sql
rdbms:cud(STRING datasource.name, STRING query)
rdbms:cud(STRING datasource.name, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter)
rdbms:cud(STRING datasource.name, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ...)
```

### CUD Examples

The following examples assume you have an input stream called `TriggerStream` and an output stream called `RecordStream`.

This example query updates events from the input stream by adding a `numRecords` attribute, then inserts the updated events into an output stream:

```sql
select numRecords from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName='abc' where customerName='xyz'") 
insert into  RecordStream;
```

This example query does the same thing with the addition of `previousName` and `changedName` attributes to indicate the names of the input and output streams:

```sql
select numRecords from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName=? where customerName=?", changedName, previousName) 
insert into  RecordStream;
```

## Procedure

You can use the Procedure function to run stored procedures and retrieve data to a stream worker.

### Procedure Parameters

Insert the following parameters into the provided [template](#template) to create a Procedure function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| data-source.name	| STRING		| N/A				| No		| No		| Name of the data source on which to run the query. |
| query				| STRING		| N/A				| No		| Yes		| The INSERT, UPDATE, or DELETE query to be performed. Format according to the relevant database type. |
| parameter			| Any			| N/A				| Yes		| Yes		| If `query` is a parameter used as a SQL query, you can use this field to pass CEP attributes to set parameter values. |
| attribute.definition.list | STRING | N/A				| No		| Yes		| A comma-separated list of attributes to return with the SQL query. Each item is processed in order. Supported data types are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. |
| output.parameter | STRING			| N/A				| Yes		| Yes		| A comma-separated list of sub-attributes to return with the SQL query. Each item is processed in order. Supported data types are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. |

Additionally, the `attributeName` attribute (any type) returns the attributes listed in the parameter `attribute.definition.list`.

### Procedure Template

Use the following template to create a Procedure function:

```sql
rdbms:procedure(STRING data-source.name, STRING attribute.definition.list, STRING query)
rdbms:procedure(STRING data-source.name, STRING attribute.definition.list, STRING query, STRING output.parameter)
rdbms:procedure(STRING data-source.name, STRING attribute.definition.list, STRING query, STRING output.parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter)
rdbms:procedure(STRING data-source.name, STRING attribute.definition.list, STRING query, STRING output.parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ...)
```

### Procedure Examples

In these examples, the values in the parentheses for `RETURNCON()` are the input parameter and output parameter.

This example runs a stored procedure from the database called `RETURNCON()` and returns the output `Name`, `Age`, and `Date_Time`:

```sql
select Name, Age, Date_Time from IntrimStream#rdbms:procedure('ORACLE_DB', 'Name String, Age int,Date_Time String', 'begin RETURNCON(?,?); end;','cursor', NoOfYears)
insert into tempStream1;
```

The output parameter is `cursor` and the input parameter is `NoOfYears`.

This example runs a stored procedure from the database called `RETURNCON()` and returns the output `Name`, `Age`, and `Date_Time`:

```sql
select Name, Age, Date_Time from IntrimStream#rdbms:procedure('ORACLE_DB', 'Name String, Age int,Date_Time String', 'begin RETURNCON(9,?); end;','cursor')
insert into tempStream1;
```

The output parameter is `cursor` and the input parameter is `9` as specified in the query.

## Query

You can use the Query function to perform SQL retrieval queries on a data source.

### Query Parameters

Insert the following parameters into the provided [template](#template) to create a Query function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| data-source.name	| STRING		| N/A				| No		| No		| Name of the data source on which to run the query. |
| query				| STRING		| N/A				| No		| Yes		| The INSERT, UPDATE, or DELETE query to be performed. Format according to the relevant database type. |
| parameter			| Any			| N/A				| Yes		| Yes		| If `query` is a parameter used as a SQL query, you can use this field to pass CEP attributes to set parameter values. |
| attribute.definition.list | STRING | N/A				| No		| Yes		| A comma-separated list of attributes to return with the SQL query. Each item is processed in order. Supported data types are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. |
| ack.empty.result.set | BOOL 		| `false`			| Yes		| No		| When set to `true`, null values are returned if the result set is empty. When set to `false`, nothing is returned if the result set is empty. |

Additionally, `attributeName` (any type) returns the attributes listed in the parameter `attribute.definition.list`.

### Query Template

Use the following template to create a query function:

```sql
rdbms:query(STRING data-source.name, STRING attribute.definition.list, STRING query)
rdbms:query(STRING data-source.name, STRING attribute.definition.list, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter)
rdbms:query(STRING data-source.name, STRING attribute.definition.list, STRING query, BOOL ack.empty.result.set)
rdbms:query(STRING data-source.name, STRING attribute.definition.list, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ...)
rdbms:query(STRING data-source.name, STRING attribute.definition.list, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ..., BOOL ack.empty.result.set)
```

### Query Examples

The following examples query `creditcardno`, `country`, `transaction`, and `amount` from a database called `SAMPLE_DB`, then generate an event for each record retrieval insert the events into the `recordStream` output stream:

```sql
select creditcardno, country, transaction, amount from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string, transaction string, amount int', 'select * from Transactions_Table')     
insert into recordStream;
```

The event includes the attributes defined in the `attribute.definition.list` as additional attributes (e.g. `creditcardno string, country string, transaction string, amount int`).

Additionally, this example uses the `countrySearchWord` parameter as a filter.

```sql
select creditcardno, country, transaction, amount from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string,transaction string, amount int', 'select * from where country=?', countrySearchWord)  
insert into recordStream;
```

This example returns null values if there are no events that satisfy the query:

```sql
select creditcardno, country, transaction, amount from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string,transaction string, amount int', 'select * from where country=?', countrySearchWord, true)  
insert into recordStream;
```

## Store

The Store function can create and edit event tables, configure the table's data sources and connections, and insert, update, or delete data from the tables. It requires read-write permissions on connected data sources.

### Store Parameters

Insert the following parameters into the provided [template](#template) to create a Store function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| jdbc.url			| STRING		| N/A				| No		| No		| The JDBC URL used to access the RDBMS data store. |
| username			| STRING		| N/A				| No		| No		| The username used to access the RDBMS data store. |
| password			| STRING		| N/A				| No		| No		| The password used to access the RDBMS data store. |
| jdbc.driver.name	| STRING		| N/A				| No		| No		| The name of the JDBC SDK used to access the RDBMS data store. |
| datasource 		| STRING		| N/A				| No		| No		| If you want to use a Carbon data source, specify the name of the data source on which to run the query. |
| jndi.resource 	| STRING		| null				| Yes		| No		| If you want to use JNDI look-up, specify the name of the JNDI resource through which you want to attempt connection. If you use a data source, this is not used. |
| pool.properties	| STRING		| null				| Yes		| No		| Use key-value pairs to specify any pool parameters for the database connection. If you use a datasource or jndi.resource, this is not used. |
| table.name		| STRING | Table name defined in CEP query. | Yes | No 		| Specify the name to be used for the event table. |
| field.length		| STRING		| Dependent on database type | Yes		| No		| Use a comma-separated list of key-value pairs (`field.name:`) to specify the number of characters that fields in the table must contain.  |
| table.check.query | STRING		| `tableCheckQuery` value in RDBMS configuration. | STRING | Yes | No | Specify a table name to run a query and see if the table exists in the database. |
| use.collation		| BOOL			| false				| Yes		| No		| Set to `true` to enable collation for string attributes. We use `latin1_bin` for MySQL and `SQL_Latin1_General_CP1_CS_AS` for Microsoft SQL. |
| allow.null.values | BOOL			| false				| Yes		| No		| Set to `true` to allow users to insert null values into numeric columns. |

### Store Template

Use the following template to create a Store function:

```sql
@Store(type="rdbms", jdbc.url="STRING", username="STRING", password="STRING", jdbc.SDK.name="STRING", pool.properties="STRING", jndi.resource="STRING", datasource="STRING", table.name="STRING", field.length="STRING", table.check.query="STRING", use.collation="BOOL", allow.null.values="BOOL")
@PrimaryKey("PRIMARY_KEY")
@Index("INDEX")
```

### Store Examples

The following example creates an event table named `StockTable` if one does not already exist in the database. The connection details are specified by the attributes under the `@Store` annotation.

```sql
CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/stocks", username="root", password="root", jdbc.driver.name="com.mysql.jdbc.Driver", field.length="symbol:100", PrimaryKey="id", PrimaryKey="symbol", Index="volume") (id string, symbol string, price float, volume long);
```

The `@PrimaryKey()` and `@Index()` annotations follow CEP query syntax to define the primary key and index for a table. Use commas to separate multiple attributes.

This example creates an event table named `StockTable`, then adds a stream called `InputStream`:

```sql
CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", username="root", password="root" , jdbc.driver.name="org.h2.Driver", field.length="symbol:100", PrimaryKey="symbol", Index="symbol") (symbol string, price float, volume long);

CREATE STREAM InputStream (symbol string, volume long);

select a.symbol as symbol, b.volume as volume from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol)
insert into FooStream;
```

This example checks to see if a table named `StockTable` exists in the database, and if not, creates an event table named `StockTable`.

```sql
CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", table.name="StockTable", username="root", password="root" , jdbc.driver.name="org.h2.Driver", field.length="symbol:100", table.check.query="SELECT 1 FROM StockTable LIMIT 1", PrimaryKey="symbol", Index="symbol") (symbol string, price float, volume long);

CREATE STREAM InputStream (symbol string, volume long);

select a.symbol as symbol, b.volume as volume from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol)
insert into FooStream;
```
