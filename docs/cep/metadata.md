---
sidebar_position: 10
title: Stream Worker Metadata
---

Stream workers have both required and optional metadata fields. This page explains what they are and how to use them.

## Example Metadata

This is an example of what metadata fields might look like. Each field is indicated with the `@App:` prefix. Individual metadata fields are described below.

```js
@App:name("New1")
@App:description("My description")
@App:qlVersion("2")
```

## Name (Required)

Every stream worker requires a unique name to be valid. Names cannot include spaces or special symbols such as `*`. After you save the stream worker, you cannot edit the name.

The name format is:

```js
@App:name("MyStreamWorker")
```

## Description

The description is an optional string of text that tells other users (or your future self) about the stream worker. It should not be more than one to three sentences.

The description format is:

```js
@App:description("This stream worker prints Hello World every hour, on the hour.")
```

## Query Language Version (Required)

`qlVersion` is used for backwards compatibility with deprecated stream workers. All new stream workers use version 2 as shown below.

```js
@App:qlVersion("2")
```

## Running Multiple Instances

Use `@App:instances('N')` to run multiple instances of the same stream worker. This is useful for scaling up or down when you have a lot of data coming in.

- All changes and actions such as update, publish, and unpublish are applied to all runtime instances.
- The `N` value can be set in the range from `1` up to `1000`. Default is one (1) instance.

For example, this annotation would run three instances of the stream worker:

```js
@App:instances('3')
```

## Docstrings and Other Information

You can enter a comment with testing information, update logs, or other useful information at the beginning of the stream worker definition between `/*` and `*/`. This is similar to a `docstring` in functions.

The format is for a block comment is:

```js
/* 
This
is
a comment.
*/
```

You can also write line comments by starting a line with `--` (double dashes).

```sql
-- This is a comment.
```

## Error Handling

Error handling uses `@OnError(action='...')` before a source or stream to define how errors are handled. For more information, refer to [Error Handling](error-handling/index.md).

## Event Playback

When the `@app:playback` annotation is added to the stream worker, the timestamp of the event (specified in an attribute) is treated as the current time. This results in events being processed faster.

The following elements are configured with this annotation.

|Annotation| Description|
| ------------- |-------------|
| idle.time | If no events are received during a time interval specified (in milliseconds) with this element, then the source system time is incremented by a number of seconds specified via the `increment` element.|
| increment | The number of seconds by which the source system time must be incremented if no events are received during the time interval specified in the `idle.time` element. |

In the following example, the stream worker system time is incremented by two seconds if no events arrive for a time interval of 100 milliseconds.

```js
@app:playback(idle.time = '100 millisecond', increment = '2 sec') 
```
