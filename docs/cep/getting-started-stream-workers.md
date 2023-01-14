---
sidebar_position: 10
title: Getting Started with Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Steps from '../_partials/_get-started-steps.md';

This article is an introduction to using stream workers with the Macrometa GDN console.

<Prerequisites />

## Get Started with Stream Workers

This page guides you through creating a stream worker and updating it.

<Steps />

If you want to skip the explanation and just run the code, then go directly to the [Full Demo File](#full-demo-file).

### Step 1. Define Query Name

Write a name and description. If no `qlVersion` is specified, default is `2`. Do not change this value unless you are working with a version 1 stream.

```sql
@App:name('sample-cargo-app')
@App:description('Basic Stream application to demonstrate reading data from input stream and store it in the collection. The stream & collection will be created automatically if they do not already exist.')
@App:qlVersion('2')
```

### Step 2. Create Source

Example to create a source for a stream worker.

```sql
-- Defines `SampleCargoAppInputTable` Source.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);
```

### Step 3. Create Sink

Example to create a sink for a stream worker.

```sql
-- Defines `SampleCargoAppDestStream` Stream.
CREATE SINK STREAM SampleCargoAppDestStream (weight int);
```

### Step 4. Write and Save Query

Example query that adds data from the source into the sink.

```sql
-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;
```

### Step 5. Add Data to the Source

Upload the following data to your source. In this case, it's a collection called `SampleCargoAppInputTable`.

```sql
{"weight": 1}
{"weight": 2}
{"weight": 3}
{"weight": 4}
{"weight": 5}
```

View the stream output in the GUI for `SampleCargoAppDestStream`. You will see results similar to the following:

```sql
[2021-08-27T14:12:15.795Z] {"weight":1}
[2021-08-27T14:12:15.799Z] {"weight":2}
[2021-08-27T14:12:15.805Z] {"weight":3}
[2021-08-27T14:12:15.809Z] {"weight":4}
[2021-08-27T14:12:15.814Z] {"weight":5}
```

## Full Demo File

The following example uses the code snippets provided in this tutorial.

```sql
@App:name('sample-cargo-app')
@App:description('Basic Stream application to demonstrate reading data from input stream and store it in the collection. The stream and collection are created automatically if they do not already exist.')
@App:qlVersion('2')

-- Defines `SampleCargoAppInputTable` Source.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);

-- Defines `SampleCargoAppDestStream` Stream.
CREATE SINK STREAM SampleCargoAppDestStream (weight int);

-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;
```