---
sidebar_position: 10
title: Getting Started with Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page guides you through creating a stream worker and updating it.

<Steps />

If you want to skip the explanation and just run the code, then go directly to the [Full Demo File](#full-demo-file).

### Step 1. Define Query Name

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Stream Worker**.
1. In the Editor tab, you must define the stream worker. Copy and paste the following code block in the code editor on the Editor tab. An explanation is below if you want more information than is available in the code comments.

```sql
@App:name('sample-cargo-app')
@App:description('Basic Stream application to demonstrate reading data from input stream and store it in the collection. The stream & collection will be created automatically if they do not already exist.')
@App:qlVersion('2')
```

1. Click **Validate**. Macrometa checks to see that your code is valid.
1. Click **Save**.
1. Select edge locations, and then click **Save**. The locations that you select represent where the data for this stream worker will live.
1. Click **Publish** to publish your stream worker. When you do this, it will begin to run the code as defined and will continue until you unpublish it.

:::note
The default`qlVersion` is `2`. Version 1 is only used for backwards compatibility with deprecated stream workers.
:::

### Step 2. Create Source



```sql
-- Defines `SampleCargoAppInputTable` Source.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);
```

### Step 3. Create Sink



```sql
-- Defines `SampleCargoAppDestStream` Stream.
CREATE SINK STREAM SampleCargoAppDestStream (weight int);
```

### Step 4. Write and Save Query



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