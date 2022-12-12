---
sidebar_position: 10
title: Getting Started with Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../_partials/_prerequisites-sdk-api-key.md';
import Steps from '../_partials/_get-started-steps.md';
import ConnectToGDN from '../_partials/_connect-to-gdn-code-block.md';

This article is an introduction to using stream workers with the Macrometa GDN console.

<Prerequisites />

## Get Started with Stream Workers

This page guides you through creating a stream worker and updating it.

<Steps />

If you want to skip the explanation and just run the code, then go directly to the [Full Demo File](#full-demo-file).

### Step 1. Connect to GDN

To use streams with Macrometa Global Data Network (GDN), you must first establish a connection to a local region.

<ConnectToGDN />

### Step 2. Define Query Name



```sql
@App:name('sample-cargo-app')
@App:description('Basic Stream application to demonstrate reading data from input stream and store it in the collection. The stream & collection will be created automatically if they do not already exist.')
@App:qlVersion('2')
```

### Step 3. Define Source



```sql
-- Defines `SampleCargoAppInputTable` Source.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);
```

### Step 4. Define Stream



```sql
-- Define `SampleCargoAppDestStream` Stream.
CREATE SINK STREAM SampleCargoAppDestStream (weight int);
```

### Step 5. Write and Save Query



```sql
-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;
```


## Full Demo File

The following example uses the code snippets provided in this tutorial.



