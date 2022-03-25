---
sidebar_position: 14
---

# Query Language Syntax Update

We updated the query language syntax for Stream QL applications to be more consistent with the industry standard. This section describes the differences between the updated syntax (version 2) and the old syntax (version 1), and how to update your applications from version 1 to version 2. Updating to version 2 is not necessary as version 1 applications are still supported. Applications provided by Macrometa are automatically updated.

You must include `@App:qlversion('2')` at the beginning of the stream application so Stream QL recognizes it as version 2.

For all queries, version 2 replaces annotations such as `@sink` and `@source` are replaced by keywords such as `SINK` and `SOURCE` and `WITH()` properties. For example:

* Version 1:
    ```js
    @sink(type='http-call', sink.id='echo-service', publisher.url='http://postman-echo.com/post', @map(type='json', @payload('{{payloadBody}}'))) ...
    ```


* Version 2:
    ```js
    CREATE SINK sink_name WITH (type='http-call', sink.id='echo-service', publisher.url='http://postman-echo.com/post', map.type='json', map.payload = '{{payloadBody}}') ...
    ```

Refer to the following sections for more details:

* [Key Words and Types](#key-words-and-types)
* [Define Streams](#define-streams)
* [Define Tables](#define-tables)
* [Define Trigger](#define-trigger)
* [Define Sinks](#define-sinks)
* [Define Sources](#define-sources)
* [Define Stores](#define-stoes)
* [Define Named Windows](#define-named-windows)
* [Define Functions](#define-functions)
* [Define Stream As Select](#define-stream-as-select)
* [Define Table As Select](#define-table-as-select)
* [Query Order](#query-order)
* [Windows in Queries](#windows-in-queries)
* [WHERE Clauses](#where-clauses)

### Key Words and Types

With version 2, all keywords and types are case insensitive.

This table describes updates to key words and query types:

| Version 1 | Version 2 |
|--------- |---------- |
| `define`    | `CREATE` |
| `c8streams` | `stream` |
| `c8db`      | `database` |
| `restql-call` | `query-worker` |
| `restql-call-response` | `query-worker` |

Additionally, the following key words are added for more granular querying:

* `SINK`: Used with `CREATE SINK`.
* `SOURCE`: Used with `CREATE SOURCE`.
* `STORE`: Used with `CREATE STORE`.
* `GLOBAL`: Used with `CREATE STREAM GLOBAL?` or `CREATE TABLE GLOBAL|SPOT?`.
* `SPOT`: Used with `CREATE TABLE GLOBAL|SPOT?`.
* `INTERVAL`: Used with `CREATE TRIGGER`.
* `EXPRESSION`: Used with `CREATE TRIGGER`.
* `WHERE`: Alternative to `HAVING`.

### Define Streams

* Version 1:

    ```js
    @sink(type = 'c8streams', stream = "ExampleStream")
    define stream ExampleStream (data string);
    ```

* Version 2:

    ```sql
    // Creates GDN stream source (default):
    CREATE STREAM ExampleStream (data string);

    // Also creates GDN stream source:
    CREATE SOURCE STREAM ExampleStreamSource (data string);

    // Creates GDN stream sink:
    CREATE SINK STREAM ExampleStreamSink (data string);
    ```


### Define Tables

Tables no longer require `@sink` or `@source` annotations.

* Version 1:

    ```js
    @store(type=’c8db’, collection=`<table_name>`)
    define table <table_name> (<attribute_name> <attribute_type>, ...);
    ```

* Version 2:

    ```sql
    CREATE TABLE ExampleTable (data string);
    ```



### Define Trigger

* Version 1:

    ```js
    define trigger InitTrigger at 'start';
    define trigger FiveMinTrigger at every 5 min;
    define trigger WorkStartTrigger at '0 15 10 ? * MON-FRI';
    ```

* Version 2:

    ```sql
    CREATE TRIGGER InitTrigger WITH (expression = 'start');
    CREATE TRIGGER FiveMinTrigger WITH (interval = 5 min);
    CREATE TRIGGER WorkStartTrigger WITH (expression = '0 15 10 ? * MON-FRI');
    ```

### Define Sinks

* Version 1:

    ```js
    @sink(type='restql-call',restql.name="restqlExample")
    define stream restqlStream (startTime string);
    ```

* Version 2:

    ```sql
    CREATE SINK restqlStream WITH (type='query-worker', query.worker.name="restqlExample") (startTime string);
    ```

### Define Sources

* Version 1:

    ```js
    @source(type = 'c8db', collection = "ExampleInputTable", @map(type='json'))
    define stream ExampleInputTableStream (data string);

    ```

* Version 2:

    ```sql
    CREATE SOURCE ExampleInputTableStream WITH (type = 'database', collection = "ExampleInputTable", map.type='json')(data string);
    ```

### Define Stores

* Version 1:

    ```js
    @store(type="rdbms", jdbc.url="jdbc:mysql://host:3306", username="root", password="Welcome@123#", jdbc.driver.name="com.mysql.jdbc.Driver", field.length="symbol:100", table.check.query="SELECT 1 FROM StockTable LIMIT")
    @PrimaryKey("id", "symbol")
    @Index("volume")
    define table StockTable (id string, symbol string, price float, volume long);

    ```

* Version 2:

    ```sql
    CREATE STORE StockTable WITH (type="rdbms", jdbc.url="jdbc:mysql://host:3306", username="root", password="Welcome@123#", jdbc.driver.name="com.mysql.jdbc.Driver", field.length="symbol:100", table.check.query="SELECT 1 FROM StockTable LIMIT", PrimaryKey='id', PrimaryKey='symbol', Index='volume')
    (id string, symbol string, price float, volume long);

    ```

### Define Named Windows

* Version 1:

    ```js
    define window SensorWindow (deviceID string, value float, roomNo int) timeBatch(1 second);
    ```

* Version 2:

    ```sql
    CREATE WINDOW SensorWindow (deviceID string, value float, roomNo int) TUMBLING_TIME(1 second);
    ```

### Define Functions

* Version 1:

    ```js
    define function concatFn[javascript] return string {
    var str1 = data[0];
    var str2 = data[1];
    var str3 = data[2];
    var response = str1 + str2 + str3;
    return response;
    };

    ```

* Version 2:

    ```sql
    CREATE FUNCTION concatFn[javascript] RETURN STRING {
    var str1 = data[0];
    var str2 = data[1];
    var str3 = data[2];
    var response = str1 + str2 + str3;
    return response;
    };

    ```

### Define Stream As Select

* Version 1:

    ```js
    define stream StockStream (symbol string, price float, volume long);
    select symbol, price, volume
    from InputStream[price > 500]#window.length(1)
    insert into StockStream;
    ```

* Version 2:

    ```sql
    CREATE STREAM StockStream (symbol string, price float, volume long)
    AS SELECT symbol, price, volume
    FROM InputStream[price > 500] WINDOW SLIDING_LENGTH(1);
    ```

### Define Table As Select

* Version 1:

    ```js
    define table StockTable (symbol string, price float, volume long);
    select symbol, price, volume
    from InputStream[price > 500]#window.length(1)
    insert into StockTable;
    ```

* Version 2:

    ```sql
    CREATE TABLE StockTable (symbol string, price float, volume long)
    AS SELECT symbol, price, volume
    FROM InputStream[price > 500] WINDOW SLIDING_LENGTH(1);
    ```

### Query Order

The order of queries is as follows:

1. Output action
2. `SELECT` clause
3. `FROM` clause and other grouping clauses

For example:

* Version 1:

    ```js
    select symbol, price, volume
    from InputStream[price > 500]#window.length(1)
    insert into StockStream;
    ```

* Version 2:

    ```sql
    INSERT INTO StockStream
    SELECT symbol, price, volume
    FROM InputStream[price > 500] WINDOW SLIDING_LENGTH(1);
    ```

### Windows in Queries

In addition to the new syntax, windows also use new names.

* Version 1:

    ```js
    from ExampleStream#window.length(2) ...
    ```

* Version 2:

    ```sql
    FROM ExampleStream WINDOW SLIDING_LENGTH(2) ...
    ```

The following table shows the version 1 and version 2 window names:

| Version 1                     | Version 2 |
|---                            |---        |
| #window.time()                | WINDOW SLIDING_TIME() | 
| #window.timeBatch()           | WINDOW TUMBLING_TIME()    |
| #window.length()              | WINDOW SLIDING_LENGTH()   |
| #window.lengthBatch()         | WINDOW TUMBLING_LENGTH()  |
| #window.timeLength()          | WINDOW SLIDING_TIME_LENGTH()  |
| #window.session()             | WINDOW SESSION()  |
| #window.batch()               | WINDOW TUMBLING() |
| #window.sort()                | WINDOW SORT() |
| #window.cron()                | WINDOW CRON() |
| #window.externalTime()        | WINDOW SLIDING_EXTERNAL_TIME()    |
| #window.externalTimeBatch()   | WINDOW SLIDING_EXTERNAL_TIME()    |
| #window.delay()               | WINDOW DELAY()    |
| #window.expression()          | WINDOW SLIDING_EXPRESSION()   |
| #window.expressionBatch()     | WINDOW TUMBLING_EXPRESSION()  |

### WHERE Clauses

The `WHERE` clause is an alternative to the `HAVING` clause.

* Version 1:

    ```js
    select roomNo, avg(temp) as avgTemp
    from TempStream#window.time(10 min)
    having avgTemp > 30
    insert into AlertStream;

    ```

* Version 2:

    ```sql
    INSERT INTO AlertStream
    SELECT roomNo, avg(temp) as avgTemp
    FROM TempStream WINDOW SLIDING_TIME(10 min)
    WHERE avgTemp > 30;
    ```


