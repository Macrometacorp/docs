---
title: Event Playback
---

When `@app:playback` annotation is added to the stream worker, the timestamp of the event (specified via an attribute) is treated as the current time. This results in events being processed faster.

The following elements are configured with this annotation.

|Annotation| Description|
| ------------- |-------------|
|`idle.time`|If no events are received during a time interval specified (in milliseconds) via this element, the source system time is incremented by a number of seconds specified via the `increment` element.|
|`increment`|The number of seconds by which the source system time must be incremented if no events are received during the time interval specified via the `idle.time` element.|

e.g., In the following example, the Stream system time is incremented by two seconds if no events arrive for a time interval of 100 milliseconds.

```sql
@app:playback(idle.time = '100 millisecond', increment = '2 sec') 
```
