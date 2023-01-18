---
sidebar_position: 10
title: Getting Started with Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a stream worker that reads data from a stream and automatically adds it to a collection.

## Create a Stream Worker

Refer to the [Stream Workers](/cep/index.md) section for an explanation of how stream workers function.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Stream Worker**.
1. In the Editor tab, you must define the stream worker. Copy and paste the following code block in the code editor on the Editor tab.

```sql
@App:name('sample-cargo-app')
@App:description('Basic Stream application to demonstrate reading data from a collection and sending it to a stream.  The stream & collection will be created automatically if they do not already exist.')
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

## Test the Stream Worker

Use the following procedure to verify that the stream worker functions as expected.

### 1. Load Collection with Data

Run the following query using one of the methods described in [Running Queries](../../queryworkers/running-queries.md) to add the records to the collection. Each line is a separate record.

```sql
LET data = [
    {"weight":1},
    {"weight":2},
    {"weight":3},
    {"weight":4},
    {"weight":5},
   ]

FOR d IN data
    INSERT d INTO SampleCargoAppInputTable
```

### 2. Open a Stream Window

The Macrometa Streams console does not persist messages, so to see them, you must have the console open before you send.

1. In a new tab or window, open the Macrometa console.
1. Click **Streams**.
1. Click **c8locals.SampleCargoAppDestStream**.


### 3. Publish Events and Observe Output

There are several ways to [publish messages to streams](../../streams/stream-tasks/publish-messages.md), this page shows you how to do it in the Macrometa console API reference.

1. In the original tab or window (not the one with the stream open), click **API Reference**.
1. In the API Reference pane, click to expand **Streams** and then click the POST command **Publish message**.
1. Click **Try it out**.
1. In **fabric**, enter the fabric your stream worker is associated with. This is the fabric you were logged in to when you created the stream worker, probably `_system`.
1. In **stream**, enter `c8locals.SampleCargoAppDestStream`.
1. Copy and paste the following transaction code block into **Message**, between the curly brackets:

    ```json
    [
        {
            "weight": "1"
        },
        {
            "weight": "2"
        },
        {
            "weight": "3"
        },
        {
            "weight": "4"
        },
        {
            "weight": "5"
        }
    ]
    ```

    The stream worker pulls the transaction information and sends it to the stream. You will see results similar to the following:

    ```sql
    [2021-08-27T14:12:15.795Z] {"weight":1}
    [2021-08-27T14:12:15.799Z] {"weight":2}
    [2021-08-27T14:12:15.805Z] {"weight":3}
    [2021-08-27T14:12:15.809Z] {"weight":4}
    [2021-08-27T14:12:15.814Z] {"weight":5}
    ```