---
sidebar_position: 100
title: Stream Worker Logs
---

In Macrometa stream workers, you can use logging to help monitor, debug, and analyze your stream processing applications. Logging allows you to keep track of events and data processed by your stream workers, making it an essential tool for understanding the behavior of your real-time applications.

## Using the `log` Sink

To log data from your stream workers, you can use the `log` sink. The `log` sink is used to display log messages in the Log Viewer pane, which can be accessed by clicking the **Log Viewer** button in the Stream Workers section of the Macrometa web console.

### Configuring the `log` Sink

The `log` sink allows you to configure the log level or priority, as well as add a custom prefix to the log messages. The available log levels are `INFO`, `DEBUG`, `WARN`, `FATAL`, `ERROR`, `OFF`, and `TRACE`.For example:

```sql
CREATE SINK InfoStream WITH (type='log', prefix='My Log', priority='DEBUG') (prev_price double, curr_price double);
```

This example creates a log sink named `InfoStream` with a priority of `DEBUG` and a prefix of "My Log". The sink will receive two double values, `prev_price` and `curr_price`.

For more information about the `log` sink, refer to [log](sink/sink-types/log).

### Logging Data

After defining a log sink, you can use the `INSERT INTO` statement to log data. The data must match the schema specified when creating the log sink. For example:

```sql
INSERT INTO InfoStream
SELECT e2.close as prev_price, e1.close as curr_price
FROM EVERY (e1=PricesUSD[not(e1.close is null)]) ->  e2=PricesUSD[e1.close >= e2.close];
```

In this example, the `INSERT INTO` statement logs data into the `InfoStream` log sink, matching the schema defined previously. The data comes from another stream named `PricesUSD`.

For more information about writing queries like this, refer to [Stream Worker Queries](query-guide/).

### Viewing Log Output

By default, Macrometa delivers log output to a specialized streaming window called Log Viewer. To access logs in the Log Viewer:

1. [Publish a stream worker](stream-worker-tasks/publish-unpublish-stream-workers) that uses the `log` sink.
2. In the Macrometa web console, navigate to **Stream Workers**.
3. Click **Log Viewer**.

Macrometa opens a stream window at the bottom of the screen that displays all log messages from all published stream workers that have logs.

You can also view the `c8locals.streamworkerslog` stream using one of the methods in [View Streams](../streams/stream-tasks/view-streams). You can also [Subscribe to Streams](../streams/stream-tasks/subscribe-streams) with the Macrometa SDK or API.

## Storing Log Data

Because streams are not persistent, if you want to keep the logging data, then you must store it somewhere, such as a Macrometa collection (table) or an external sink. This section presents some options for doing that.

When using the samples below, keep in mind that the required [Stream Worker Order](stream-worker-basics/stream-worker-order) means that the two items in the example might not be next to each other in the finished stream worker.

### Logging Data to a Table

To store log data in a table, first, create a table using the `CREATE TABLE` command, then create a query to insert log entries into the table:

```sql
CREATE TABLE LogTable (timestamp string, priority string, message string);

INSERT INTO LogTable
SELECT time:currentTimestamp() as timestamp, 'INFO' as priority, 'Sample log message' as message
FROM SomeStream;
```

For more information about using Macrometa tables (collections), refer to [Tables](table/). For more information about writing queries like this, refer to [Stream Worker Queries](query-guide/).

### Logging to External Sinks

In addition to logging within the Macrometa system, you can also send log data to external sinks, such as Amazon S3 or Prometheus. To do this, you'll need to configure an appropriate sink type and provide the necessary parameters.

For more information about what sinks are available, refer to [Sink Types](sink/sink-types/).

#### Amazon S3 Example

Create the [Amazon S3 sink](sink/sink-types/s3), then insert log data into it:

```sql
CREATE SINK aws_streamworkerslog WITH (type='s3', bucket.name='your-bucket', object.path='streamworkerslog', aws.region='us-west-1',
      credential.provider='software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider', 
      aws.access.key='your-access-key', aws.secret.key='your-secret-key',
      flush.size='50', map.type='json') (region string, appName string, priority string, prefix string, event object);

INSERT INTO aws_streamworkerslog
SELECT region, appName, priority, prefix, event
FROM InfoStream;
```

In this example, log data is inserted into the `aws_streamworkerslog` Amazon S3 sink from the `InfoStream` log sink created earlier.

#### Prometheus Example

Create the [Prometheus sink](sink/sink-types/prometheus), then insert log data into the Prometheus sink:

```sql
CREATE SINK prometheus_streamworkerslog WITH (type='prometheus', endpoint='http://localhost:9091', job='streamworkerslog', instance='my-instance') (region string, appName string, priority string, prefix string, event object);

INSERT INTO prometheus_streamworkerslog
SELECT region, appName, priority, prefix, event
FROM InfoStream;
```

In this example, log data is inserted into the `prometheus_streamworkerslog` Prometheus sink from the `InfoStream` log sink created earlier.

## Stream Worker Logging Examples

Here are some example stream workers that demonstrate logging usage. Each example increases in complexity.

### Example 1

```sql
CREATE STREAM SensorDataStream (sensorId string, temperature double);

CREATE SINK InfoLog WITH (type='log', prefix='Sensor Log', priority='INFO') (sensorId string, temperature double);

INSERT INTO InfoLog
SELECT sensorId, temperature
FROM SensorDataStream;
```

This example creates a simple stream worker that logs sensor data. The sensor data includes a sensor ID and a temperature.

### Example 2

```sql
CREATE STREAM StockDataStream (symbol string, price double, volume long);

CREATE SINK PriceChangeLog WITH (type='log', prefix='Price Change', priority='INFO') (symbol string, prev_price double, curr_price double);

INSERT INTO PriceChangeLog
SELECT e1.symbol, e1.price as prev_price, e2.price as curr_price
FROM EVERY (e1=StockDataStream[not(e1.price is null)]) -> e2=StockDataStream[e1.price != e2.price];
```

This example creates a medium complexity stream worker that logs stock price changes. The log sink records the symbol, previous price, and current price.

### Example 3

```sql
CREATE STREAM IoTDataStream (deviceId string, temperature double, humidity double, timestamp string);

CREATE SINK TempHumidityLog WITH (type='log', prefix='Temperature and Humidity', priority='INFO') (deviceId string, temperature double, humidity double);

CREATE SINK AnomalyLog WITH (type='log', prefix='Anomaly Detected', priority='WARN') (deviceId string, message string);

INSERT INTO TempHumidityLog
SELECT deviceId, temperature, humidity
FROM IoTDataStream;

INSERT INTO AnomalyLog
SELECT deviceId, 'Temperature above threshold' as message
FROM IoTDataStream
WHERE temperature > 30;

INSERT INTO AnomalyLog
SELECT deviceId, 'Humidity below threshold' as message
FROM IoTDataStream
WHERE humidity < 30;
```

This example creates an advanced stream worker that logs IoT data, including temperature and humidity readings. It also logs anomalies, such as when the temperature is above a certain threshold or humidity is below a certain threshold.
