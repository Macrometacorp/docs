---
title: log (Stream Processor)
---

Logs the message on the given priority with or without the processed event.

Syntax

    log()
    log(<STRING> log.message)
    log(<BOOL> is.event.logged)
    log(<STRING> log.message, <BOOL> is.event.logged)
    log(<STRING> priority, <STRING> log.message)
    log(<STRING> priority, <STRING> log.message, <BOOL> is.event.logged)

## Query Parameters

| Name            | Description                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|--------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| priority        | The priority/type of this log message (INFO, DEBUG, WARN, FATAL, ERROR, OFF, TRACE). | INFO          | STRING              | Yes      | No      |
| log.message     | This message will be logged.                                                         | :             | STRING              | Yes      | Yes     |
| is.event.logged | To log the processed event.                                                          | true          | BOOL                | Yes      | No      |

## Example 1

    insert into BarStream
    select *
    from FooStream#log();

Logs events with StreamApp name message prefix on default log level INFO.

## Example 2
    
    insert into BarStream
    select *
    from FooStream#log("Sample Event :");

Logs events with the message prefix "Sample Event :" on default log level INFO.

## Example 3

    insert into BarStream
    select *
    from FooStream#log("DEBUG", "Sample Event :", true);

Logs events with the message prefix "Sample Event :" on log level DEBUG.

## Example 4

    insert into BarStream
    select *
    from FooStream#log("Event Arrived", false);

For each event logs a message "Event Arrived" on default log level INFO.

## Example 5

    insert into BarStream
    select *
    from FooStream#log("Sample Event :", true);

Logs events with the message prefix "Sample Event :" on default log level INFO.

## Example 6
    
    insert into BarStream
    select *
    from FooStream#log(true);

Logs events with on default log level INFO.