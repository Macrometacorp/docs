---
sidebar_position: 4
---

# Integrating Plugins

You can use plugins in your tenants to extend the functionality of your streams.

* [Store RDBMS](#store-rdbms)
* [Change Data Capture (CDC)](#cdc)

## Store RDBMS

The Store plugin provides persistence and retrieval of events to and from RDBMS databases like MySQL, MS SQL, PostgreSQL, H2, and Oracle. If you are using CEP as the Java/Python library, you must also set the datasource in the CEP Manager.

This plugin provides the following functionality:

* [CUD](#cud)
* [Procedure](#procedure)
* [Query](#query)
* [Store](#store)

### CUD

You can use SQL CUD to perform INSERT, UPDATE, and DELETE queries on data sources.

#### Parameters

Insert the following parameters into the provided [template](#template) to create a CUD function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| datasource.name	| STRING		| N/A				| No		| No		| Name of the datasource on which to run the query. |
| query				| STRING		| N/A				| No		| Yes		| The INSERT, UPDATE, or DELETE query to be performed. Format according to the relevant database type. |
| parameter			| Any			| N/A				| Yes		| Yes		| If `query` is a parameter used as an SQL query, you can use this field to pass CEP attributes to set parameter values. |

Additionally, the `numRecords` attribute (INT) indicates the number of records manipulated by the query.

#### Template

Use the following template to create a CUD function:

```
rdbms:cud(STRING datasource.name, STRING query)
rdbms:cud(STRING datasource.name, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter)
rdbms:cud(STRING datasource.name, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ...)
```

#### Examples

The following examples assume you have an input stream called `TriggerStream` and an output stream called `RecordStream`.

This example query updates events from the input stream by adding a `numRecords` attribute, then inserts the updated events into an output stream:

```
select numRecords from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName='abc' where customerName='xyz'") 
insert into  RecordStream;
```

This example query does the same thing with the addition of `previousName` and `changedName` attributes to indicate the names of the input and output streams:

```
select numRecords from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName=? where customerName=?", changedName, previousName) 
insert into  RecordStream;

```

### Procedure

You can use the Procedure function to run stored procedures and retrieve data to CEP.

#### Parameters

Insert the following parameters into the provided [template](#template) to create a Procedure function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| datasource.name	| STRING		| N/A				| No		| No		| Name of the datasource on which to run the query. |
| query				| STRING		| N/A				| No		| Yes		| The INSERT, UPDATE, or DELETE query to be performed. Format according to the relevant database type. |
| parameter			| Any			| N/A				| Yes		| Yes		| If `query` is a parameter used as a SQL query, you can use this field to pass CEP attributes to set parameter values. |
| attribute.definition.list | STRING | N/A				| No		| Yes		| A comma-separated list of attributes to return with the SQL query. Each item is processed in order. Supported data types are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. |
| output.parameter | STRING			| N/A				| Yes		| Yes		| A comma-separated list of sub-attributes to return with the SQL query. Each item is processed in order. Supported data types are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. |

Additionally, the `attributeName` attribute (any type) returns the attributes listed in the parameter `attribute.definition.list`.


#### Template

Use the following template to create a Procedure function:

```
rdbms:procedure(STRING datasource.name, STRING attribute.definition.list, STRING query)
rdbms:procedure(STRING datasource.name, STRING attribute.definition.list, STRING query, STRING output.parameter)
rdbms:procedure(STRING datasource.name, STRING attribute.definition.list, STRING query, STRING output.parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter)
rdbms:procedure(STRING datasource.name, STRING attribute.definition.list, STRING query, STRING output.parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ...)
```

#### Examples

In these examples, the values in the parentheses for `RETURNCON()` are the input parameter and output parameter.

This example runs a stored procedure from the database called `RETURNCON()` and returns the output `Name`, `Age`, and `Date_Time`:

```
select Name, Age, Date_Time from IntrimStream#rdbms:procedure('ORACLE_DB', 'Name String, Age int,Date_Time String', 'begin RETURNCON(?,?); end;','cursor', NoOfYears)
insert into tempStream1;
```

The output parameter is `cursor` and the input parameter is `NoOfYears`.

This example runs a stored procedure from the database called `RETURNCON()` and returns the output `Name`, `Age`, and `Date_Time`:

```
select Name, Age, Date_Time from IntrimStream#rdbms:procedure('ORACLE_DB', 'Name String, Age int,Date_Time String', 'begin RETURNCON(9,?); end;','cursor')
insert into tempStream1;
```

The output parameter is `cursor` and the input parameter is `9` as specified in the query.



### Query

You can use the Query function to perform SQL retrieval queries on a datasource.

#### Parameters

Insert the following parameters into the provided [template](#template) to create a Query function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| datasource.name	| STRING		| N/A				| No		| No		| Name of the datasource on which to run the query. |
| query				| STRING		| N/A				| No		| Yes		| The INSERT, UPDATE, or DELETE query to be performed. Format according to the relevant database type. |
| parameter			| Any			| N/A				| Yes		| Yes		| If `query` is a parameter used as a SQL query, you can use this field to pass CEP attributes to set parameter values. |
| attribute.definition.list | STRING | N/A				| No		| Yes		| A comma-separated list of attributes to return with the SQL query. Each item is processed in order. Supported data types are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. |
| ack.empty.result.set | BOOL 		| `false`			| Yes		| No		| When set to `true`, null values are returned if the result set is empty. When set to `false`, nothing is returned if the result set is empty. |

Additionally, `attributeName` (any type) returns the attributes listed in the parameter `attribute.definition.list`.


#### Template

Use the following template to create a Query function:

```
rdbms:query(STRING datasource.name, STRING attribute.definition.list, STRING query)
rdbms:query(STRING datasource.name, STRING attribute.definition.list, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter)
rdbms:query(STRING datasource.name, STRING attribute.definition.list, STRING query, BOOL ack.empty.result.set)
rdbms:query(STRING datasource.name, STRING attribute.definition.list, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ...)
rdbms:query(STRING datasource.name, STRING attribute.definition.list, STRING query, STRING|BOOL|INT|DOUBLE|FLOAT|LONG parameter, STRING|BOOL|INT|DOUBLE|FLOAT|LONG ..., BOOL ack.empty.result.set)
```

#### Examples

The following examples query `creditcardno`, `country`, `transaction`, and `amount` from a database called `SAMPLE_DB`, then generate an event for each record retrieval insert the events into the `recordStream` output stream:

```
select creditcardno, country, transaction, amount from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string, transaction string, amount int', 'select * from Transactions_Table')     
insert into recordStream;
```

The event includes the attributes defined in the `attribute.definition.list` as additional attributes (e.g. `creditcardno string, country string, transaction string, amount int`).

Additionally, this example uses the `countrySearchWord` parameter as a filter.

```
select creditcardno, country, transaction, amount from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string,transaction string, amount int', 'select * from where country=?', countrySearchWord)  
insert into recordStream;
```

This example returns null values if there are no events that satisfy the query:

```
select creditcardno, country, transaction, amount from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string,transaction string, amount int', 'select * from where country=?', countrySearchWord, true)  
insert into recordStream;

```


### Store

The Store function can create and edit event tables, configure the table's data sources and connections, and insert, update, or delete data from the tables. It requires read-write permissions on connected datasources.

#### Parameters

Insert the following parameters into the provided [template](#template) to create a Store function.

| Name				| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------|---------------|-------------------|-----------|-----------|-------------|
| jdbc.url			| STRING		| N/A				| No		| No		| The JDBC URL used to access the RDBMS data store. |
| username			| STRING		| N/A				| No		| No		| The username used to access the RDBMS data store. |
| password			| STRING		| N/A				| No		| No		| The password used to access the RDBMS data store. |
| jdbc.driver.name	| STRING		| N/A				| No		| No		| The name of the JDBC driver used to access the RDBMS data store. |
| datasource 		| STRING		| N/A				| No		| No		| If you want to use a Carbon data source, specify the name of the datasource on which to run the query. |
| jndi.resource 	| STRING		| null				| Yes		| No		| If you want to use JNDI look-up, specify the name of the JNDI resource through which you want to attempt connection. If you use a datasource, this is not used. |
| pool.properties	| STRING		| null				| Yes		| No		| Use key-value pairs to specify any pool parameters for the database connection. If you use a datasource or jndi.resource, this is not used. |
| table.name		| STRING | Table name defined in CEP query. | Yes | No 		| Specify the name to be used for the event table. |
| field.length		| STRING		| Dependent on database type | Yes		| No		| Use a comma-separated list of key-value pairs (`field.name:`) to specify the number of characters that fields in the table must contain.  |
| table.check.query | STRING		| `tableCheckQuery` value in RDBMS configuration. | STRING | Yes | No | Specify a table name to run a query and see if the table exists in the database. |
| use.collation		| BOOL			| false				| Yes		| No		| Set to `true` to enable collation for string attributes. We use `latin1_bin` for MySQL and `SQL_Latin1_General_CP1_CS_AS` for Microsoft SQL. |
| allow.null.values | BOOL			| false				| Yes		| No		| Set to `true` to allow users to insert null values into numeric columns. |

#### Template

Use the following template to create a Store function:

```
@Store(type="rdbms", jdbc.url="STRING", username="STRING", password="STRING", jdbc.driver.name="STRING", pool.properties="STRING", jndi.resource="STRING", datasource="STRING", table.name="STRING", field.length="STRING", table.check.query="STRING", use.collation="BOOL", allow.null.values="BOOL")
@PrimaryKey("PRIMARY_KEY")
@Index("INDEX")
```

#### Examples

The following example creates an event table named `StockTable` if one does not already exist in the database. The connection details are specified by the attributes under the `@Store` annotation.

```
CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/stocks", username="root", password="root", jdbc.driver.name="com.mysql.jdbc.Driver", field.length="symbol:100", PrimaryKey="id", PrimaryKey="symbol", Index="volume") (id string, symbol string, price float, volume long);
```

The `@PrimaryKey()` and `@Index()` annotations follow CEP query syntax to define the primary key and index for a table. Use commas to separate multiple attributes.

This example creates an event table named `StockTable`, then adds a stream called `InputStream`:

```
CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", username="root", password="root" , jdbc.driver.name="org.h2.Driver", field.length="symbol:100", PrimaryKey="symbol", Index="symbol") (symbol string, price float, volume long);

CREATE STREAM InputStream (symbol string, volume long);

select a.symbol as symbol, b.volume as volume from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol)
insert into FooStream;
```

This example checks to see if a table named `StockTable` exists in the database, and if not, creates an event table named `StockTable`.

```
CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", table.name="StockTable", username="root", password="root" , jdbc.driver.name="org.h2.Driver", field.length="symbol:100", table.check.query="SELECT 1 FROM StockTable LIMIT 1", PrimaryKey="symbol", Index="symbol") (symbol string, price float, volume long);

CREATE STREAM InputStream (symbol string, volume long);

select a.symbol as symbol, b.volume as volume from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol)
insert into FooStream;
```




## Change Data Capture (CDC)

The Change Data Capture (CDC) plugin captures change data from RDBMS databases like MySQL, MS SQL, PostgreSQL, H2, and Oracle. When a change event occurs on a database table, the CDC source receives the event in key-value format.

CDC has two available modes: *polling* and *listening*.

* Polling mode enables you to set a periodic check at defined intervals for changes to the database. This mode uses the column `polling.column` to capture RDBMS, INSERT, and UPDATE change events. You can track changes by timestamp or by sequence number.
* Listening mode notifies you in real time when the database logs changes. This mode uses logs to capture MySQL, INSERT, UPDATE, and DELETE change events.

### Parameters

Insert the following parameters into the provided [template](#template) to create a CDC plugin.

| Name							| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------------------|---------------|-------------------|-----------|-----------|-------------|
| url							| STRING		| N/A				| No		| No		| Database URL. Format: `jdbc:mysql://:/<database_name>` |
| mode							| STRING		| `listening`		| Yes		| No		| Change data capture mode. Choose `polling` or `listening`. |
| jdbc.driver.name				| STRING		| N/A				| Yes		| No		| Driver class name for database connection. Required if you are using polling mode. |
| username						| STRING		| N/A				| No		| No		| The user that accesses the database needs these permissions in the `table.name` field: `SELECT`, `RELOAD`, `SHOW DATABASES`, `REPLICATION SLAVE`, and `REPLICATION CLIENT`. |
| password						| STRING		| N/A				| No		| No		| Password for the user accessing the database. |
| pool.properties				| STRING		| N/A				| Yes		| No		| You can use key-value pairs for pool parameters. | 
| datasource.name				| STRING		| N/A				| Yes 		| No		| If you use a datasource, you do not need to provide a URL, username, or password. Datasource connections have higher priority than URL-based connections. You can only use a datasource with polling mode and a stream processor. |
| table.name					| STRING		| N/A				| No		| No		| Name of the table to be monitored for changes. |
| polling.column				| STRING		| N/A				| Yes		| No		| When using polling mode, this field indicates whether records are tracked with an incremental sequence of numbers or a timestamp. Set  to `id` to track updates with a number sequence or `last_updated` to use a timestamp. Number sequences are only compatible with insertion operations. |
| polling.interval				| INT			| `1`				| Yes		| No		| Time in seconds between polling for changes. Only applicable for polling mode. |
| operation						| STRING		| N/A				| No		| No		| Change event operations you want to monitor: `insert`, `update`, or `delete`. To choose multiple, separate each value with a comma. Not case sensitive. Required if you are using listening mode. When monitoring for multiple operations, each event is returned as a transport property `trp:operation` which can be viewed when mapping the events. |
| connector.properties			| STRING		| Empty 			| Yes		| No		| Specify Debezium connector properties as a comma-separated string. Only applicable for listening mode. Properties specified here have higher priority than other parameters. |
| database.server.id			| STRING		| Random integer between 5400 and 6400 | Yes | No | ID to use when joining MySQL database to read bin log. Use a unique integer between 1 and 2^32. Only applicable for listening mode. If none is specified, a random integer is chosen. |
| database.server.name			| STRING		| `(host)_(port)`	| Yes		| No		| Provide a logical name that will serve as the namespace for the database server. Only applicable for listening mode. |
| wait.on.missed.record			| BOOL			| `false`			| Yes		| No		| Set to `true` if you want to the process to hold if it identifies a missing our out-of-order record. The record is identified by the `polling.column` sequence. The order is sequential, so if you use this with timestamps, they will not be chronological. Enabling this parameter lowers performance and should only be used if you anticipate out-of-order records from concurrent writers. |
| missed.record.waiting.timeout	| INT			| `-1`				| Yes		| No		| Timeout in seconds to retry for missing or out-of-order records. The default value `-1` waits indefinitely. |
| polling.history.size			| INT			| `10`				| Yes		| No		| Number of recent polling results exposed to metrics. When set to `10`, the last 10 polling results are exposed to metrics. Only usable if you are gathering metrics. |
| cron.expression				| STRING		| Empty				| Yes		| No		| Specify a timestamp using a cron expression. When the system time matches the CRON expression, we print the records of insertions or deletions. Only applicable for polling mode. |
| plugin.name					| STRING		| `decoderbufs`		| Yes		| No		| Used when the logical decoding output plugin needs to specify the connection to the database. This is mainly required for PostgreSQL. |



### Template

Use the following template to create a CDC plugin:

	@source(type="cdc", url="<STRING>", mode="<STRING>", jdbc.driver.name="<STRING>", username="<STRING>", password="<STRING>", pool.properties="<STRING>", datasource.name="<STRING>", table.name="<STRING>", polling.column="<STRING>", polling.interval="<INT>", operation="<STRING>", connector.properties="<STRING>", database.server.id="<STRING>", database.server.name="<STRING>", wait.on.missed.record="<BOOL>", missed.record.waiting.timeout="<INT>", polling.history.size="<INT>", cron.expression="<STRING>", plugin.name="<STRING>", @map(...)))

### Examples

The following CDC plugin examples assume you are using a table called `students` and a database called `SimpleDB`. 

#### Example 1

This example listens to row insertions:

```
CREATE SOURCE inputStream WITH (type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'user', password = 'password', table.name = 'students', operation = 'insert', map.type='keyvalue', attributes.id = 'id', attributes.name = 'name') (id string, name string);
```

You can adjust this plugin to listen for updates or deletions by adding `update` or `delete` to the `operation` field separated by commas. For example: `operation = 'insert,update,delete'`


#### Example 2

This example polls for row insertions:

```
CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'id', jdbc.driver.name = 'com.mysql.jdbc.Driver', url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'user', password = 'password', table.name = 'students', map.type='keyvalue', attributes.id = 'id', attributes.name = 'name') (id int, name string);
```

The `polling.column` field is set to `id`, indicating that polling will be tracked with an incremental sequence of numbers. Connection requires a URL, username, password, and JDBC driver name.


#### Example 3

This example polls for row insertions and adds sequential numbering to the polling column:

```
CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'id', datasource.name = 'SimpleDB', table.name = 'students', map.type='keyvalue', attributes.id = 'id', attributes.name = 'name') (id int, name string);
```

The polling column The `datasource.name` parameter is only valid with a Stream Processor.


#### Example 4

This example polls for row insertions and uses a timestamp in the polling column:

```
CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'last_updated', datasource.name = 'SimpleDB', table.name = 'students', map.type='keyvalue') (name string);
```

The `polling.column` field is set to `last_updated`, indicating that polling will be tracked with a timestamp.

#### Example 5

This example polls for row insertions with a ten-second buffer to account for any concurrent or out-of-order requests:

```
CREATE SOURCE inputStream (type='cdc', jdbc.driver.name='com.mysql.jdbc.Driver', url='jdbc:mysql://localhost:3306/SimpleDB', username='user', password='password', table.name='students', mode='polling', polling.column='id', operation='insert', wait.on.missed.record='true', missed.record.waiting.timeout='10', map.type='keyvalue', attributes.batch_no='batch_no', attributes.item='item', attributes.qty='qty') (id int, name string);
```

The polling column is numeric.

#### Example 6

This example connects to an Oracle database and listens to row insertions to a table called `sweetproductiontable`:

```
CREATE SOURCE insertSweetProductionStream WITH (type = 'cdc', url = 'jdbc:oracle:thin://localhost:1521/ORCLCDB', username='c##xstrm', password='xs', table.name='DEBEZIUM.sweetproductiontable', operation = 'insert', connector.properties='oracle.outserver.name=DBZXOUT,oracle.pdb=ORCLPDB1' map.type = 'keyvalue') (ID int, NAME string, WEIGHT int);
```