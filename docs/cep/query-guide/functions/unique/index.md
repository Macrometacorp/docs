---
sidebar_position: 12
title: Unique (window)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This window is used with namespace i.e. `unique:windowName` This window retains and process unique events based on the given parameters.

| Function                                                         | Description                                                                                                                                                                  |
|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [deduplicate (Stream Processor)](unique/deduplicate)          | Duplicate events are removed based on the `unique.key` arriving in `time.interval`.                                                                                          |
| [ever (Window)](unique/ever)                                  | Retains latest events based on the `unique keys`.                                                                                                                            |
| [externalTimeBatch (Window)](unique/externalTimeBatch)         | Tumbling time window holds the latest events based on `unique.key` and various parameters for time.                                                                          |
| [first (Window)](unique/first)                  | Retain first set of unique events based on `unique.key`.                                                                                                                     |
| [firstLengthBatch (Window)](unique/firstLengthBatch)             | Tumbling window holds `window.length` unique events based on `unique.key`                                                                                                    |
| [firstTimeBatch (Window)](unique/firstTimeBatch)               | A batch-time or tumbling window that holds the unique events based on `unique.key` and sliding time period `window.time` with time offset defined by parameter `start.time`	 |
| [length (Window)](unique/length)                    | A sliding length window that holds the latest unique events base in `unique.key`.                                                                                            |
| [lengthBatch (Window)](unique/lengthBatch)              | This is a batch (tumbling) window that holds `window.length` number of latest unique events.                                                                                 |
| [time (Window)](unique/time)                      | This is a sliding time window that holds the latest unique events that arrived during `window.time` .                                                                        |
| [timeBatch (Window)](unique/timeBatch)                 | This is a batch (tumbling) time window that is updated with the latest events based on `unique.key` tumbling time period `window.time` and time offset `start.time`.         |
| [timeLengthBatch (Window)](unique/timeLengthBatch) | The window tumbles upon the elapse of the time window `window.time`, or when a number of unique events have arrived i.e. `window.length`.                                    |

## Example

```js
@App:name("unique")
@App:qlVersion("2")

CREATE STREAM DriverChangeStream (trainID STRING, driver STRING);

INSERT expired events INTO PreviousDriverChangeStream
SELECT trainID, driver
FROM DriverChangeStream WINDOW UNIQUE:EVER(trainID);
```
