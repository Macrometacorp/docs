---
sidebar_position: 9
---

# Unique

This extension retains and processes unique events based on the given parameters.

## Features

* **[deduplicate (StreamProcessor)](#deduplicate)**

    Removes duplicate events based on the `unique.key` parameter that
    arrive within the `time.interval` gap from one another.

* **[ever (Window)](#ever)**

    Window that retains the latest events based on a given unique keys.
    When a new event arrives with the same key it replaces the one that
    exist in the window. **This function is not recommended to be used
    when the maximum number of unique attributes are undefined, as there
    is a risk of system going out to memory**.

* **[externalTimeBatch (Window)](#externaltimebatch)**

    This is a batch (tumbling) time window that is determined based on
    an external time, i.e., time stamps that are specified via an
    attribute in the events. It holds the latest unique events that
    arrived during the last window time period. The unique events are
    determined based on the value for a specified unique key parameter.
    When a new event arrives within the time window with a value for the
    unique key parameter that is the same as that of an existing event
    in the window, the existing event expires and it is replaced by the
    new event.

* **[first (Window)](#first)**

    This is a window that holds only the first set of unique events
    according to the unique key parameter. When a new event arrives with
    a key that is already in the window, that event is not processed by
    the window.

* **[firstLengthBatch (Window)](#firstlengthbatch)**

    This is a batch (tumbling) window that holds a specific number of
    unique events (depending on which events arrive first). The unique
    events are selected based on a specific parameter that is considered
    as the unique key. When a new event arrives with a value for the
    unique key parameter that matches the same of an existing event in
    the window, that event is not processed by the window.

* **[firstTimeBatch (Window)](#firsttimebatch)**

    A batch-time or tumbling window that holds the unique events
    according to the unique key parameters that have arrived within the
    time period of that window and gets updated for each such time
    window. When a new event arrives with a key which is already in the
    window, that event is not processed by the window.

* **[length (Window)](#length)**

    This is a sliding length window that holds the events of the latest
    window length with the unique key and gets updated for the expiry
    and arrival of each event. When a new event arrives with the key
    that is already there in the window, then the previous event expires
    and new event is kept within the window.

* **[lengthBatch (Window)](#lengthbatch)**

    This is a batch (tumbling) window that holds a specified number of
    latest unique events. The unique events are determined based on the
    value for a specified unique key parameter. The window is updated
    for every window length, i.e., for the last set of events of the
    specified number in a tumbling manner. When a new event arrives
    within the window length having the same value for the unique key
    parameter as an existing event in the window, the previous event is
    replaced by the new event.

* **[time (Window)](#time)**

    This is a sliding time window that holds the latest unique events
    that arrived during the previous time window. The unique events are
    determined based on the value for a specified unique key parameter.
    The window is updated with the arrival and expiry of each event.
    When a new event that arrives within a window time period has the
    same value for the unique key parameter as an existing event in the
    window, the previous event is replaced by the new event.

* **[timeBatch (Window)](#timebatch)**

    This is a batch (tumbling) time window that is updated with the
    latest events based on a unique key parameter. If a new event that
    arrives within the time period of a windowhas a value for the key
    parameter which matches that of an existing event, the existing
    event expires and it is replaced by the latest event.

* **[timeLengthBatch (Window)](#timelengthbatch)**

    This is a batch or tumbling time length window that is updated with
    the latest events based on a unique key parameter. The window
    tumbles upon the elapse of the time window, or when a number of
    unique events have arrived. If a new event that arrives within the
    period of the window has a value for the key parameter which matches
    the value of an existing event, the existing event expires and it is
    replaced by the new event.

## deduplicate

Removes duplicate events based on the `unique.key` parameter that arrive
within the `time.interval` gap from one another.

Syntax

    unique:deduplicate(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> time.interval)

QUERY PARAMETERS

| Name          | Description                                                            | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | Parameter to uniquely identify events.                                 |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| time.interval | The sliding time period within which the duplicate events are dropped. |               | INT LONG                          | No       | No      |

EXAMPLE 1

    define stream TemperatureStream (sensorId string, temperature double)
    select *
    from TemperatureStream#unique:deduplicate(sensorId, 30 sec)
    insert into UniqueTemperatureStream;

Query that removes duplicate events of `TemperatureStream` stream based
on `sensorId` attribute when they arrive within 30 seconds.

## ever

Window that retains the latest events based on a given unique keys. When
a new event arrives with the same key it replaces the one that exist in
the window. **This function is not recommended to be used when the
maximum number of unique attributes are undefined, as there is a risk of
system going out to memory**.

Syntax

    unique:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key)
    unique:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG|FLOAT|BOOL|DOUBLE|STRING> ...)

QUERY PARAMETERS

| Name       | Description                                   | Default Value | Possible Data Types               | Optional | Dynamic |
|------------|-----------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key | The attribute used to checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |

EXAMPLE 1

    define stream LoginEvents (timestamp long, ip string);

    select count(ip) as ipCount
    from LoginEvents#window.unique:ever(ip)
    insert events into UniqueIps;

Query collects all unique events based on the `ip` attribute by
retaining the latest unique events from the `LoginEvents` stream. Then
the query counts the unique `ip`s arrived so far and outputs the
`ipCount` via the `UniqueIps` stream.

EXAMPLE 2

    define stream DriverChangeStream (trainID string, driver string);
    
    select trainID, driver
    from DriverChangeStream#window.unique:ever(trainID)
    insert expired events into PreviousDriverChangeStream;

Query collects all unique events based on the `trainID` attribute by
retaining the latest unique events from the `DriverChangeStream` stream.
The query outputs the previous unique event stored in the window as the
expired events are emitted via `PreviousDriverChangeStream` stream.

EXAMPLE 3

    define stream StockStream (symbol string, price float);
    define stream PriceRequestStream(symbol string);

    from StockStream#window.unique:ever(symbol) as s join PriceRequestStream as p
    on s.symbol == p.symbol
    select s.symbol as symbol, s.price as price
    insert events into PriceResponseStream;

Query stores the last unique event for each `symbol` attribute of
`StockStream` stream, and joins them with events arriving on the
`PriceRequestStream` for equal `symbol` attributes to fetch the latest
`price` for each requested `symbol` and output via `PriceResponseStream`
stream.

## externalTimeBatch

This is a batch (tumbling) time window that is determined based on an
external time, i.e., time stamps that are specified via an attribute in
the events. It holds the latest unique events that arrived during the
last window time period. The unique events are determined based on the
value for a specified unique key parameter. When a new event arrives
within the time window with a value for the unique key parameter that is
the same as that of an existing event in the window, the existing event
expires and it is replaced by the new event.

Syntax

    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time, <INT|LONG> time.out)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time, <INT|LONG> time.out, <BOOL> replace.time.stamp.with.batch.end.time)

QUERY PARAMETERS

| Name                                   | Description                                                                                                                             | Default Value                                                                         | Possible Data Types               | Optional | Dynamic |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------------------------------|----------|---------|
| unique.key                             | The attribute that should be checked for uniqueness.                                                                                    |                                                                                       | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| time.stamp                             | The time which the window determines as the current time and acts upon. The value of this parameter should be monotonically increasing. |                                                                                       | LONG                              | No       | Yes     |
| window.time                            | The sliding time period for which the window should hold events.                                                                        |                                                                                       | INT LONG                          | No       | No      |
| start.time                             | This specifies an offset in milliseconds in order to start the window at a time different to the standard time.                         | Timestamp of first event                                                              | INT                               | Yes      | No      |
| time.out                               | Time to wait for arrival of a new event, before flushing and returning the output for events belonging to a specific batch.             | The system waits till an event from the next batch arrives to flush the current batch | INT LONG                          | Yes      | No      |
| replace.time.stamp.with.batch.end.time | Replaces the `timestamp` value with the corresponding batch end time stamp.                                                           | false                                                                                 | BOOL                              | Yes      | No      |

EXAMPLE 1

    define stream LoginEvents (timestamp long, ip string);

    select timestamp, ip, count() as total
    from LoginEvents#window.unique:externalTimeBatch(ip, timestamp, 1 sec, 0, 2 sec)
    insert into UniqueIps ;

In this query, the window holds the latest unique events that arrive
from the `LoginEvent` stream during each second. The latest events are
determined based on the external time stamp. At a given time, all the
events held in the window have unique values for the `ip` and
monotonically increasing values for `timestamp` attributes. The events
in the window are inserted into the `UniqueIps` output stream. The
system waits for 2 seconds for the arrival of a new event before
flushing the current batch.

## first

This is a window that holds only the first set of unique events
according to the unique key parameter. When a new event arrives with a
key that is already in the window, that event is not processed by the
window.

Syntax

    unique:first(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key)
    unique:first(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG|FLOAT|BOOL|DOUBLE|STRING> ...)

QUERY PARAMETERS

| Name       | Description                                                                                                                                                            | Default Value | Possible Data Types               | Optional | Dynamic |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key | The attribute that should be checked for uniqueness. If there is more than one parameter to check for uniqueness, it can be specified as an array separated by commas. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |

EXAMPLE 1

    define stream LoginEvents (timeStamp long, ip string);

    from LoginEvents#window.unique:first(ip)
    insert into UniqueIps ;

This returns the first set of unique items that arrive from the
`LoginEvents` stream, and returns them to the `UniqueIps` stream.
The unique events are only those with a unique value for the `ip`
attribute.

## firstLengthBatch

This is a batch (tumbling) window that holds a specific number of unique
events (depending on which events arrive first). The unique events are
selected based on a specific parameter that is considered as the unique
key. When a new event arrives with a value for the unique key parameter
that matches the same of an existing event in the window, that event is
not processed by the window.

Syntax

    unique:firstLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)

QUERY PARAMETERS

| Name          | Description                                          | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events the window should tumble.       |               | INT                               | No       | No      |

EXAMPLE 1

    define window CseEventWindow (symbol string, price float, volume int)

    select symbol, price, volume
    from CseEventStream#window.unique:firstLengthBatch(symbol, 10)
    insert all events into OutputStream ;

The window in this configuration holds the first unique events from the
`CseEventStream` stream every second, and outputs them all into the
the `OutputStream` stream. All the events in a window during a given
second should have a unique value for the `symbol` attribute.

## firstTimeBatch

A batch-time or tumbling window that holds the unique events according
to the unique key parameters that have arrived within the time period of
that window and gets updated for each such time window. When a new event
arrives with a key which is already in the window, that event is not
processed by the window.

Syntax

    unique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
    unique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)

QUERY PARAMETERS

| Name        | Description                                                                                                     | Default Value                 | Possible Data Types               | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------|-------------------------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.                                                            |                               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The sliding time period for which the window should hold events.                                                |                               | INT LONG                          | No       | No      |
| start.time  | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of the first event. | INT LONG                          | Yes      | No      |

EXAMPLE 1

    define stream CseEventStream (symbol string, price float, volume int)

    select symbol, price, volume
    from CseEventStream#window.unique:firstTimeBatch(symbol,1 sec)
    insert all events into OutputStream ;

This holds the first unique events that arrive from the
`cseEventStream` input stream during each second, based on the
symbol,as a batch, and returns all the events to the `OutputStream`.

## length

This is a sliding length window that holds the events of the latest
window length with the unique key and gets updated for the expiry and
arrival of each event. When a new event arrives with the key that is
already there in the window, then the previous event expires and new
event is kept within the window.

Syntax

    unique:length(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)

QUERY PARAMETERS

| Name          | Description                                                              | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|--------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness.                     |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events that should be included in a sliding length window. |               | INT                               | No       | No      |

EXAMPLE 1

    define stream CseEventStream (symbol string, price float, volume int)

    select symbol, price, volume
    from CseEventStream#window.unique:length(symbol,10)
    insert all events into OutputStream;

In this configuration, the window holds the latest 10 unique events. The
latest events are selected based on the symbol attribute. If the
`CseEventStream` receives an event for which the value for the symbol
attribute is the same as that of an existing event in the window, the
existing event is replaced by the new event. All the events are returned
to the `OutputStream` event stream once an event expires or is added
to the window.

## lengthBatch

This is a batch (tumbling) window that holds a specified number of
latest unique events. The unique events are determined based on the
value for a specified unique key parameter. The window is updated for
every window length, i.e., for the last set of events of the specified
number in a tumbling manner. When a new event arrives within the window
length having the same value for the unique key parameter as an existing
event in the window, the previous event is replaced by the new event.

Syntax

    unique:lengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)

QUERY PARAMETERS

| Name          | Description                                          | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events the window should tumble.       |               | INT                               | No       | No      |

EXAMPLE 1

    define window CseEventWindow (symbol string, price float, volume int)

    select symbol, price, volume
    from CseEventStream#window.unique:lengthBatch(symbol, 10)
    insert expired events into OutputStream ;

In this query, the window at any give time holds the last 10 unique
events from the `CseEventStream` stream. Each of the 10 events within
the window at a given time has a unique value for the symbol attribute.
If a new event has the same value for the symbol attribute as an
existing event within the window length, the existing event expires and
it is replaced by the new event. The query returns expired individual
events as well as expired batches of events to the `OutputStream`
stream.

## time

This is a sliding time window that holds the latest unique events that
arrived during the previous time window. The unique events are
determined based on the value for a specified unique key parameter. The
window is updated with the arrival and expiry of each event. When a new
event that arrives within a window time period has the same value for
the unique key parameter as an existing event in the window, the
previous event is replaced by the new event.

Syntax

    unique:time(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)

QUERY PARAMETERS

| Name        | Description                                                      | Default Value | Possible Data Types               | Optional | Dynamic |
|-------------|------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.             |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The sliding time period for which the window should hold events. |               | INT LONG                          | No       | No      |

EXAMPLE 1

    define stream CseEventStream (symbol string, price float, volume int)

    select symbol, price, volume
    from CseEventStream#window.unique:time(symbol, 1 sec)
    insert expired events into OutputStream ;

In this query, the window holds the latest unique events that arrived
within the last second from the `CseEventStream`, and returns the
expired events to the `OutputStream` stream. During any given second,
each event in the window should have a unique value for the `symbol`
attribute. If a new event that arrives within the same second has the
same value for the symbol attribute as an existing event in the window,
the existing event expires.

## timeBatch

This is a batch (tumbling) time window that is updated with the latest
events based on a unique key parameter. If a new event that arrives
within the time period of a windowhas a value for the key parameter
which matches that of an existing event, the existing event expires and
it is replaced by the latest event.

Syntax

    unique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
    unique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)

QUERY PARAMETERS

| Name        | Description                                                                                                     | Default Value            | Possible Data Types               | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.                                                            |                          | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The tumbling time period for which the window should hold events.                                               |                          | INT LONG                          | No       | No      |
| start.time  | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of first event | INT LONG                          | Yes      | No      |

EXAMPLE 1

    define stream CseEventStream (symbol string, price float, volume int)

    select symbol, price, volume
    from CseEventStream#window.unique:timeBatch(symbol, 1 sec)
    insert all events into OutputStream ;

This window holds the latest unique events that arrive from the
`CseEventStream` at a given time, and returns all the events to the
`OutputStream` stream. It is updated every second based on the latest
values for the `symbol` attribute.

## timeLengthBatch

This is a batch or tumbling time length window that is updated with the
latest events based on a unique key parameter. The window tumbles upon
the elapse of the time window, or when a number of unique events have
arrived. If a new event that arrives within the period of the window has
a value for the key parameter which matches the value of an existing
event, the existing event expires and it is replaced by the new event.

Syntax

    unique:timeLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT> window.length)
    unique:timeLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time, <INT> window.length)

QUERY PARAMETERS

| Name          | Description                                                                                                     | Default Value            | Possible Data Types               | Optional | Dynamic |
|---------------|-----------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness.                                                            |                          | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time   | The sliding time period for which the window should hold the events.                                            |                          | INT LONG                          | No       | No      |
| start.time    | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of first event | INT LONG                          | Yes      | No      |
| window.length | The number of events the window should tumble.                                                                  |                          | INT                               | No       | No      |

EXAMPLE 1

    define stream CseEventStream (symbol string, price float, volume int)

    select symbol, price, volume
    from CseEventStream#window.unique:timeLengthBatch(symbol, 1 sec, 20)
    insert all events into OutputStream;

This window holds the latest unique events that arrive from the
`CseEventStream` at a given time, and returns all the events to the
`OutputStream` stream. It is updated every second based on the latest
values for the `symbol` attribute.
