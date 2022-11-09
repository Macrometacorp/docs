---
sidebar_position: 140
title: Change Data Capture Plugin
---

You can use plugins in Macrometa to extend the functionality of your streams.

The Change Data Capture (CDC) plugin captures change data from RDBMS databases like MySQL, MS SQL, PostgreSQL, H2, and Oracle. When a change event occurs on a database table, the CDC source receives the event in key-value format.

CDC has two available modes: _polling_ and _listening_.

- Polling mode enables you to set a periodic check at defined intervals for changes to the database. This mode uses the column `polling.column` to capture RDBMS, INSERT, and UPDATE change events. You can track changes by timestamp or by sequence number.
- Listening mode notifies you in real time when the database logs changes. This mode uses logs to capture MySQL, INSERT, UPDATE, and DELETE change events.

## Parameters

Insert the following parameters into the provided [template](#template) to create a CDC plugin.

| Name							| Data Type		| Default Value		| Optional?	| Dynamic?	| Description |
|-------------------------------|---------------|-------------------|-----------|-----------|-------------|
| url							| STRING		| N/A				| No		| No		| Database URL. Format: `jdbc:mysql://:/<database_name>` |
| mode							| STRING		| `listening`		| Yes		| No		| Change data capture mode. Choose `polling` or `listening`. |
| jdbc.driver.name				| STRING		| N/A				| Yes		| No		| SDK class name for database connection. Required if you are using polling mode. |
| username						| STRING		| N/A				| No		| No		| The user that accesses the database needs these permissions in the `table.name` field: `SELECT`, `RELOAD`, `SHOW DATABASES`, `REPLICATION SLAVE`, and `REPLICATION CLIENT`. |
| password						| STRING		| N/A				| No		| No		| Password for the user accessing the database. |
| pool.properties				| STRING		| N/A				| Yes		| No		| You can use key-value pairs for pool parameters. |
| data-source.name				| STRING		| N/A				| Yes 		| No		| If you use a data source, then you do not need to provide a URL, username, or password. Data source connections have higher priority than URL-based connections. You can only use a data source with polling mode and a stream processor. |
| table.name					| STRING		| N/A				| No		| No		| Name of the table to be monitored for changes. |
| polling.column				| STRING		| N/A				| Yes		| No		| When using polling mode, this field indicates whether records are tracked with an incremental sequence of numbers or a timestamp. Set  to `id` to track updates with a number sequence or `last_updated` to use a timestamp. Number sequences are only compatible with insertion operations. |
| polling.interval				| INT			| `1`				| Yes		| No		| Time in seconds between polling for changes. Only applicable for polling mode. |
| operation						| STRING		| N/A				| No		| No		| Change event operations you want to monitor: `insert`, `update`, or `delete`. To choose multiple, separate each value with a comma. Not case-sensitive. Required if you are using listening mode. When monitoring for multiple operations, each event is returned as a transport property `trp:operation` which can be viewed when mapping the events. |
| connector.properties			| STRING		| Empty 			| Yes		| No		| Specify Debezium connector properties as a comma-separated string. Only applicable for listening mode. Properties specified here have higher priority than other parameters. |
| database.server.id			| STRING		| Random integer between 5400 and 6400 | Yes | No | ID to use when joining MySQL database to read bin log. Use a unique integer between 1 and 2^32. Only applicable for listening mode. If none is specified, a random integer is chosen. |
| database.server.name			| STRING		| `(host)_(port)`	| Yes		| No		| Provide a logical name that will serve as the namespace for the database server. Only applicable for listening mode. |
| wait.on.missed.record			| BOOL			| `false`			| Yes		| No		| Set to `true` if you want to the process to hold if it identifies a missing our out-of-order record. The record is identified by the `polling.column` sequence. The order is sequential, so if you use this with timestamps, they will not be chronological. Enabling this parameter lowers performance and should only be used if you anticipate out-of-order records from concurrent writers. |
| missed.record.waiting.timeout	| INT			| `-1`				| Yes		| No		| Timeout in seconds to retry for missing or out-of-order records. The default value `-1` waits indefinitely. |
| polling.history.size			| INT			| `10`				| Yes		| No		| Number of recent polling results exposed to metrics. When set to `10`, the last 10 polling results are exposed to metrics. Only usable if you are gathering metrics. |
| cron.expression				| STRING		| Empty				| Yes		| No		| Specify a timestamp using a cron expression. When the system time matches the CRON expression, we print the records of insertions or deletions. Only applicable for polling mode. |
| plugin.name					| STRING		| `decoderbufs`		| Yes		| No		| Used when the logical decoding output plugin needs to specify the connection to the database. This is mainly required for PostgreSQL. |

## Template

Use the following template to create a CDC plugin:

	@source(type="cdc", url="<STRING>", mode="<STRING>", jdbc.driver.name="<STRING>", username="<STRING>", password="<STRING>", pool.properties="<STRING>", datasource.name="<STRING>", table.name="<STRING>", polling.column="<STRING>", polling.interval="<INT>", operation="<STRING>", connector.properties="<STRING>", database.server.id="<STRING>", database.server.name="<STRING>", wait.on.missed.record="<BOOL>", missed.record.waiting.timeout="<INT>", polling.history.size="<INT>", cron.expression="<STRING>", plugin.name="<STRING>", @map(...)))

## Examples

The following CDC plugin examples assume you are using a table called `students` and a database called `SimpleDB`.

### Example 1

This example listens to row insertions:

```sql
CREATE SOURCE inputStream WITH (type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'user', password = 'password', table.name = 'students', operation = 'insert', map.type='keyvalue', attributes.id = 'id', attributes.name = 'name') (id string, name string);
```

You can adjust this plugin to listen for updates or deletions by adding `update` or `delete` to the `operation` field separated by commas. For example: `operation = 'insert,update,delete'`

### Example 2

This example polls for row insertions:

```sql
CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'id', jdbc.driver.name = 'com.mysql.jdbc.Driver', url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'user', password = 'password', table.name = 'students', map.type='keyvalue', attributes.id = 'id', attributes.name = 'name') (id int, name string);
```

The `polling.column` field is set to `id`, indicating that polling will be tracked with an incremental sequence of numbers. Connection requires a URL, username, password, and JDBC SDK name.

### Example 3

This example polls for row insertions and adds sequential numbering to the polling column:

```sql
CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'id', datasource.name = 'SimpleDB', table.name = 'students', map.type='keyvalue', attributes.id = 'id', attributes.name = 'name') (id int, name string);
```

The polling column The `data-source.name` parameter is only valid with a Stream Processor.

### Example 4

This example polls for row insertions and uses a timestamp in the polling column:

```sql
CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'last_updated', datasource.name = 'SimpleDB', table.name = 'students', map.type='keyvalue') (name string);
```

The `polling.column` field is set to `last_updated`, indicating that polling will be tracked with a timestamp.

### Example 5

This example polls for row insertions with a ten-second buffer to account for any concurrent or out-of-order requests:

```sql
CREATE SOURCE inputStream (type='cdc', jdbc.driver.name='com.mysql.jdbc.Driver', url='jdbc:mysql://localhost:3306/SimpleDB', username='user', password='password', table.name='students', mode='polling', polling.column='id', operation='insert', wait.on.missed.record='true', missed.record.waiting.timeout='10', map.type='keyvalue', attributes.batch_no='batch_no', attributes.item='item', attributes.qty='qty') (id int, name string);
```

The polling column is numeric.

### Example 6

This example connects to an Oracle database and listens to row insertions to a table called `sweetproductiontable`:

```sql
CREATE SOURCE insertSweetProductionStream WITH (type = 'cdc', url = 'jdbc:oracle:thin://localhost:1521/ORCLCDB', username='c##xstrm', password='xs', table.name='DEBEZIUM.sweetproductiontable', operation = 'insert', connector.properties='oracle.outserver.name=DBZXOUT,oracle.pdb=ORCLPDB1' map.type = 'keyvalue') (ID int, NAME string, WEIGHT int);
```
