---
title: log (Stream Processor)
---

Logs the message on the given priority with or without the processed event.

## Syntax

```sql
log()
log(<STRING> log.message)
log(<BOOL> is.event.logged)
log(<STRING> log.message, <BOOL> is.event.logged)
log(<STRING> priority, <STRING> log.message)
log(<STRING> priority, <STRING> log.message, <BOOL> is.event.logged)
```

## Query Parameters

| Name          | Description        | Default Value | Possible Data Types | Optional | Dynamic |
|---------------|--------------------|---------------|---------------------|----------|---------|
| priority        | The priority/type of this log message (INFO, DEBUG, WARN, FATAL, ERROR, OFF, TRACE). | INFO          | STRING              | Yes      | No      |
| log.message     | This message will be logged.         | :        | STRING       | Yes      | Yes     |
| is.event.logged | To log the processed event.      | true      | BOOL       | Yes      | No      |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO BarStream
SELECT *
FROM FooStream#log();
```

This query, named 'query1', logs events from the `FooStream` with the stream worker name message prefix on the default log level INFO. The log events are then selected and inserted into the `BarStream`. The `log()` function is used to log events from the `FooStream`.

Essentially, this query processes records in the `FooStream`, logs the events with the specified message prefix and log level, and then creates new records in the `BarStream` with the same data as in the original `FooStream` records.

## Example 2

```sql
@info(name = 'query1')
INSERT INTO BarStream
SELECT *
FROM FooStream#log("Sample Event :");
```

This query, named 'query1', logs events from the `FooStream` with the message prefix "Sample Event :" on the default log level INFO. The log events are then selected and inserted into the `BarStream`. The `log()` function is used to log events from the `FooStream` with the specified message prefix.

Essentially, this query processes records in the `FooStream`, logs the events with the specified message prefix and log level, and then creates new records in the `BarStream` with the same data as in the original `FooStream` records.

## Example 3

```sql
@info(name = 'query1')
INSERT INTO BarStream
SELECT *
FROM FooStream#log("DEBUG", "Sample Event :", true);
```

Logs events with the message prefix "Sample Event :" on log level DEBUG.

## Example 4

```sql
@info(name = 'query1')
INSERT INTO BarStream
SELECT *
FROM FooStream#log("Event Arrived", false);
```

For each event logs a message "Event Arrived" on default log level INFO.

## Example 5

```sql
@info(name = 'query1')
INSERT INTO BarStream
SELECT *
FROM FooStream#log("Sample Event :", true);
```

Logs events with the message prefix "Sample Event :" on default log level INFO.

## Example 6

```sql
@info(name = 'query1')
INSERT INTO BarStream
SELECT *
FROM FooStream#log(true);
```

Logs events with on default log level INFO.
