---
sidebar_position: 1
title: Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Macrometa GDN allows you to integrate streaming data and take appropriate actions. Most stream processing use cases involve collecting, analyzing, and integrating or acting on data generated during business activities by various sources.

:::note

Stream Workers are currently an Enterprise-only feature.

Contact support@macrometa.com if you have any questions.

:::

 
| Stage | Description |
|-------|-------------|
| *Collect* | Receive or capture data from various data sources. |
| *Analyze* | Analyze data to identify interesting patterns and extract information. |
| *Act* | Take actions based on the findings. For example, running simple code, calling an external service, or triggering a complex integration. |
| *Integrate* | Provide processed data for consumer consumption. |

![GDN Essentials](/img/gdn-cep-overview.png)

You can process streams to perform the following actions with your data:

* Transform data from one format to another. For example, from XML to JSON.
* Enrich data received from a specific source by combining it with databases and services.
* Correlate data by joining multiple streams to create an aggregate stream.
* Clean data by filtering it and by modifying the content in messages. For example, obfuscating sensitive information.
* Derive insights by identifying event patterns in data streams.
* Summarize data with time windows and incremental aggregations.
* Extract, transform, and load (ETL) collections, tailing files, and scraping HTTP endpoints.
* Integrating stream data and trigger actions based on the data. This can be a single service request or a complex enterprise integration flow.
