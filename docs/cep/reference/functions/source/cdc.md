---
title: cdc (Source)
---

The CDC source receives events when change events (i.e., INSERT, UPDATE,
DELETE) are triggered for a database table. Events are received in the
`key-value` format. There are two modes you could perform
CDC: Listening mode and Polling mode. In polling mode, the datasource is
periodically polled for capturing the changes. The polling period can be
configured. In polling mode, you can only capture INSERT and UPDATE
changes. On listening mode, the Source will keep listening to the Change
Log of the database and notify in case a change has taken place. Here,
you are immediately notified about the change, compared to polling mode.
The key values of the map of a CDC change event are as follows. For
`listening` mode:     For insert: Keys are specified as columns of the
table.     For delete: Keys are followed by the specified table columns.
This is achieved via `before_`. e.g., specifying `before_X`
results in the key being added before the column named `X`.     For
update: Keys are followed followed by the specified table columns. This
is achieved via `before_`. e.g., specifying `before_X` results in
the key being added before the column named `X`. For `polling` mode:
Keys are specified as the columns of the table.\#\#\#\# Preparations
required for working with Oracle Databases in listening mode Using the
extension in Windows, Mac OSX and AIX are pretty straight forward
inorder to achieve the required behaviour please follow the steps given
below   - Download the compatible version of oracle instantclient for
the database version from
\[here\](https://www.oracle.com/database/technologies/instant-client/downloads.html)
and extract   - Extract and set the environment variable
`LD_LIBRARY_PATH` to the location of instantclient which was exstracted
as shown below   

        export LD_LIBRARY_PATH=<path to the instant client location>


  - Inside the instantclient folder which was download there are two
jars `xstreams.jar` and `ojdbc<version>.jar` convert them to OSGi
bundles using the tools which were provided in the `<distribution>/bin`
for converting the `ojdbc.jar` use the tool `spi-provider.sh|bat` and
for the conversion of `xstreams.jar` use the jni-provider.sh as shown
below(Note: this way of converting Xstreams jar is applicable only for
Linux environments for other OSs this step is not required and
converting it through the `jartobundle.sh` tool is enough)   

        ./jni-provider.sh <input-jar> <destination> <comma seperated native library names>


  once ojdbc and xstreams jars are converted to OSGi copy the generated
jars to the `<distribution>/lib`. Currently streamprocessor-io-cdc only supports
the oracle database distributions 12 and above See parameter: mode for
supported databases and change events.

Syntax

    CREATE SOURCE <NAME> WITH (type="cdc", map.type="<STRING>", url="<STRING>", mode="<STRING>", jdbc.driver.name="<STRING>", username="<STRING>", password="<STRING>", pool.properties="<STRING>", datasource.name="<STRING>", table.name="<STRING>", polling.column="<STRING>", polling.interval="<INT>", operation="<STRING>", connector.properties="<STRING>", database.server.id="<STRING>", database.server.name="<STRING>", wait.on.missed.record="<BOOL>", missed.record.waiting.timeout="<INT>") 


## Query Parameters

| Name                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default Value                        | Possible Data Types | Optional | Dynamic |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|---------------------|----------|---------|
| url                           | The connection URL to the database. F=The format used is: `jdbc:mysql://<host>:<port>/<database_name>`                                                                                                                                                                                                                                                                                                                                                                                                                     |                                      | STRING              | No       | No      |
| mode                          | Mode to capture the change data. The type of events that can be received, and the required parameters differ based on the mode. The mode can be one of the following: `polling`: This mode uses a column named `polling.column` to monitor the given table. It captures change events of the `RDBMS`, `INSERT`, and `UPDATE` types. `listening`: This mode uses logs to monitor the given table. It currently supports change events only of the `MySQL`, `INSERT`, `UPDATE`, and `DELETE` types.                 | listening                            | STRING              | Yes      | No      |
| jdbc.driver.name              | The SDK class name for connecting the database. **It is required to specify a value for this parameter when the mode is `polling`.**                                                                                                                                                                                                                                                                                                                                                                                       |                                      | STRING              | Yes      | No      |
| username                      | The username to be used for accessing the database. This user needs to have the `SELECT`, `RELOAD`, `SHOW DATABASES`, `REPLICATION SLAVE`, and `REPLICATION CLIENT`privileges for the change data capturing table (specified via the `table.name` parameter). To operate in the polling mode, the user needs `SELECT` privileges.                                                                                                                                                                                     |                                      | STRING              | No       | No      |
| password                      | The password of the username you specified for accessing the database.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                      | STRING              | No       | No      |
| pool.properties               | The pool parameters for the database connection can be specified as key-value pairs.                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                      | STRING              | Yes      | No      |
| datasource.name               | Name of the gdn datasource to connect to the database. When datasource name is provided, the URL, username and password are not needed. A datasource based connection is given more priority over the URL based connection.  This parameter is applicable only when the mode is set to `polling`, and it can be applied only when you use this extension with gdn Stream Processor.                                                                                                                                             |                                      | STRING              | Yes      | No      |
| table.name                    | The name of the table that needs to be monitored for data changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                      | STRING              | No       | No      |
| polling.column                | The column name that is polled to capture the change data. It is recommended to have a TIMESTAMP field as the `polling.column` in order to capture the inserts and updates. Numeric auto-incremental fields and char fields can also be used as `polling.column`. However, note that fields of these types only support insert change capturing, and the possibility of using a char field also depends on how the data is input. **It is required to enter a value for this parameter only when the mode is `polling`.** |                                      | STRING              | Yes      | No      |
| polling.interval              | The time interval (specified in seconds) to poll the given table for changes. This parameter is applicable only when the mode is set to `polling`.                                                                                                                                                                                                                                                                                                                                                                                | 1                                    | INT                 | Yes      | No      |
| operation                     | The change event operation you want to carry out. Possible values are `insert`, `update` or `delete`. This parameter is not case sensitive. **It is required to specify a value only when the mode is `listening`.**                                                                                                                                                                                                                                                                                                    |                                      | STRING              | No       | No      |
| connector.properties          | Here, you can specify Debezium connector properties as a comma-separated string. The properties specified here are given more priority over the parameters. This parameter is applicable only for the `listening` mode.                                                                                                                                                                                                                                                                                                           | Empty\_String                        | STRING              | Yes      | No      |
| database.server.id            | An ID to be used when joining MySQL database cluster to read the bin log. This should be a unique integer between 1 to 2\^32. This parameter is applicable only when the mode is `listening`.                                                                                                                                                                                                                                                                                                                                     | Random integer between 5400 and 6400 | STRING              | Yes      | No      |
| database.server.name          | A logical name that identifies and provides a namespace for the database server. This parameter is applicable only when the mode is `listening`.                                                                                                                                                                                                                                                                                                                                                                                  | {host}\_{port}                       | STRING              | Yes      | No      |
| wait.on.missed.record         | Indicates whether the process needs to wait on missing/out-of-order records. When this flag is set to `true` the process will be held once it identifies a missing record. The missing recrod is identified by the sequence of the polling.column value. This can be used only with number fields and not recommended to use with time values as it will not be sequential. This should be enabled ONLY where the records can be written out-of-order, (eg. concurrent writers) as this degrades the performance.                 | false                                | BOOL                | Yes      | No      |
| missed.record.waiting.timeout | The timeout (specified in seconds) to retry for missing/out-of-order record. This should be used along with the wait.on.missed.record parameter. If the parameter is not set, the process will indefinitely wait for the missing record.                                                                                                                                                                                                                                                                                            | -1                                   | INT                 | Yes      | No      |

## Example 1

    CREATE SOURCE inputStream WITH (type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'cdcuser', password = 'pswd4cdc', table.name = 'students', operation = 'insert',
    map.type='keyvalue', map.attributes="id='id', name='name'") (id string, name string);

In this example, the CDC source listens to the row insertions that are
made in the `students` table with the column name, and the ID. This
table belongs to the `SimpleDB` MySQL database that can be accessed
via the given URL.

## Example 2

    CREATE SOURCE inputStream WITH (type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'cdcuser', password = 'pswd4cdc', table.name = 'students', operation = 'update',
    map.type='keyvalue', map.attributes="id='id', name='name', before_id='before_id', before_name='before_name'") (before_id string, id string, before_name string , name string);

In this example, the CDC source listens to the row updates that are made
in the `students` table. This table belongs to the `SimpleDB` MySQL
database that can be accessed via the given URL.

## Example 3

    CREATE SOURCE inputStream WITH (type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'cdcuser', password = 'pswd4cdc', table.name = 'students', operation = 'delete',
    map.type='keyvalue', map.attributes="before_id='before_id', before_name='before_name'") (before_id string, before_name string);

In this example, the CDC source listens to the row deletions made in the
`students` table. This table belongs to the `SimpleDB` database that
can be accessed via the given URL.

## Example 4

    CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'id', jdbc.driver.name = 'com.mysql.jdbc.Driver', url = 'jdbc:mysql://localhost:3306/SimpleDB', username = 'cdcuser', password = 'pswd4cdc', table.name = 'students', map.type='keyvalue', map.attributes="id='id', name='name'") (id int, name string);

In this example, the CDC source polls the `students` table for
inserts. `id` that is specified as the polling column is an auto
incremental field. The connection to the database is made via the URL,
username, password, and the JDBC SDK name.

## Example 5

    CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'id', datasource.name = 'SimpleDB', table.name = 'students', map.type='keyvalue', map.attributes="id='id', name='name'") (id int, name string);

In this example, the CDC source polls the `students` table for
inserts. The given polling column is a char column with the `S001,
S002, ... .` pattern. The connection to the database is made via a
data source named `SimpleDB`. Note that the `datasource.name`
parameter works only with the Stream Processor.

## Example 6

    CREATE SOURCE inputStream WITH (type = 'cdc', mode='polling', polling.column = 'last_updated', datasource.name = 'SimpleDB', table.name = 'students', map.type='keyvalue') (name string);

In this example, the CDC source polls the `students` table for inserts
and updates. The polling column is a timestamp field.

## Example 7

    CREATE SOURCE inputStream WITH (type='cdc', jdbc.driver.name='com.mysql.jdbc.Driver', url='jdbc:mysql://localhost:3306/SimpleDB', username='cdcuser', password='pswd4cdc', table.name='students', mode='polling', polling.column='id', operation='insert', wait.on.missed.record='true', missed.record.waiting.timeout='10', map.type='keyvalue', map.attributes="batch_no='batch_no', item='item', qty='qty'") (id int, name string);

In this example, the CDC source polls the `students` table for
inserts. The polling column is a numeric field. This source expects the
records in the database to be written concurrently/out-of-order so it
waits if it encounters a missing record. If the record doesn't appear
within 10 seconds it resumes the process.

## Example 8

    CREATE SOURCE insertSweetProductionStream WITH (type = 'cdc', url = 'jdbc:oracle:thin://localhost:1521/ORCLCDB', username='c##xstrm', password='xs', table.name='DEBEZIUM.sweetproductiontable', operation = 'insert', connector.properties='oracle.outserver.name=DBZXOUT,oracle.pdb=ORCLPDB1' map.type='keyvalue') (ID int, NAME string, WEIGHT int);

In this example, the CDC source connect to an Oracle database and
listens for insert queries of sweetproduction table
