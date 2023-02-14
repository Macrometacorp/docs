---
sidebar_position: 5
title: Getting Started with Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page guides you through creating your first stream worker. Once published, the stream worker will listen for new data to be written to a collection, and subsequently write that data to a stream. There's no need to create the dependencies beforehand, in this case the collection and the stream, as the stream worker will create them for you at run time.

After you create the stream worker, there are instructions for testing it. 

## Create a Stream Worker

Refer to the [Stream Workers](/cep/index.md) section for an explanation of how stream workers function.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Stream Workers**.
1. In the Editor tab, define the stream worker. Copy and paste the following code block in the code editor on the Editor tab.

    ```sql
    @App:name('sample-cargo-app')
    @App:description('Basic stream worker to demonstrate reading data from a collection and sending it to a stream. The stream and collection are created automatically if they do not already exist.')
    @App:qlVersion('2')

    /**
    Testing the stream worker:
        1. Open stream `SampleCargoAppDestStream` in console. The output can be monitored here.

        2. Navigate to Query Workers and run the following query:
        
            LET data = [
                {"weight":1},
                {"weight":2},
                {"weight":3},
                {"weight":4},
                {"weight":5}
            ]

            FOR d IN data
                INSERT d INTO SampleCargoAppInputTable

        3. Following messages would be shown on the `SampleCargoAppDestStream` stream console.
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
1. Click **Publish** to publish your stream worker. When you do this, it will begin to run the code as defined and continue until you unpublish it.

## Test the Stream Worker

Use the following procedure to verify that the stream worker functions as expected.

### 1. Open a Stream Window

The Macrometa Streams console does not persist messages, so to see them, you must have the console open before you send.

1. In a new tab or window, open the Macrometa console.
1. Click **Streams**.
1. Click **c8locals.SampleCargoAppDestStream**.

### 2. Add Data to Collection and View Stream Updates

1. In the non-stream tab or window, navigate to **Query Workers**.
1. Copy and paste this sample into the editor:

    ```C8QL
    LET data = [
        {"weight":1},
        {"weight":2},
        {"weight":3},
        {"weight":4},
        {"weight":5}
    ]

    FOR d IN data
        INSERT d INTO SampleCargoAppInputTable
    ```

1. Click **Run Query** to add the five weight records to the collection.
1. Return to the stream tab or window. The results will be similar to the following:

    ```sql
    [2021-08-27T14:12:15.795Z] {"weight":1}
    [2021-08-27T14:12:15.799Z] {"weight":2}
    [2021-08-27T14:12:15.805Z] {"weight":3}
    [2021-08-27T14:12:15.809Z] {"weight":4}
    [2021-08-27T14:12:15.814Z] {"weight":5}
    ```

The stream worker has pulled the weight information and sent it to the stream.

## Next Steps

For an additional challenge, you could extend this stream worker to transform stream data for use cases such as finding an average over a number of events, writing it to a new collection, or triggering a different downstream event or action.
