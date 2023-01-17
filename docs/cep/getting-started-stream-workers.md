---
sidebar_position: 10
title: Getting Started with Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page guides you through creating a stream worker and updating it.

### Create a Stream Worker

In this example, we will create a stream worker that reads data from a stream and automatically adds it to a collection.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Stream Worker**.
1. In the Editor tab, you must define the stream worker. Copy and paste the following code block in the code editor on the Editor tab. An explanation is below if you want more information than is available in the code comments.

```sql
@App:name('sample-cargo-app')
@App:description('Basic stream worker to demonstrate reading data from input stream and store it in the collection. The stream & collection will be created automatically if they do not already exist.')
@App:qlVersion('2')

/**
Testing the Stream Worker:
    1. Open Stream `SampleCargoAppDestStream` in Console. The output can be monitored here.

    2. Upload following data into `SampleCargoAppInputTable` C8DB Collection.
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}

    3. Following messages would be shown on the `SampleCargoAppDestStream` Stream Console.
        [2021-08-27T14:12:15.795Z] {"weight":1}
        [2021-08-27T14:12:15.799Z] {"weight":2}
        [2021-08-27T14:12:15.805Z] {"weight":3}
        [2021-08-27T14:12:15.809Z] {"weight":4}
        [2021-08-27T14:12:15.814Z] {"weight":5}
*/

-- Defines `SampleCargoAppInputTable` Source.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);

-- Define `SampleCargoAppDestStream` Stream.
CREATE SINK STREAM SampleCargoAppDestStream (weight int);

-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;
```

1. Click **Validate**. Macrometa checks to see that your code is valid.
1. Click **Save**.
1. Select edge locations, and then click **Save**. The locations that you select represent where the data for this stream worker will live.
1. Click **Publish** to publish your stream worker. When you do this, it will begin to run the code as defined and will continue until you unpublish it.

:::note
The default`qlVersion` is `2`. Version 1 is only used for backwards compatibility with deprecated stream workers.
:::

### Add Data to the Collection

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

### Test the Stream Worker

