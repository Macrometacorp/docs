---
sidebar_position: 110
title: Stream Workers for Reporting
---

When scheduling a reporting job it is common to encounter large datasets, millions of records or more. Running a query against such a large volume of data is an inefficient way to create these reports. Instead, we can employ a [Stream Worker](/docs/cep/) to aggregate the report data in real-time using complex event processing.

For example, there is a weekly reporting job scheduled on an `ACCESS LOG` collection with millions of records. The report is expected to have aggregated data for each day of the week. It is not efficient to run a query on the collection to get the data for all seven days. 

A `Stream worker` can process data on the `Stream` associated with the collection. This requires the collection stream to be enabled. It can analyze it and generate the data and can "stage", or store, that data in a `CACHE` collection.

To return the number of the `GET` requests each day from each `IP Address`, the `Stream worker` can analyze the data as it is written to the `ACCESS_LOG` collection. This can include `user information`, the number of `GET` requests, `Date`, `Username` With fewer records compared to the big `ACCESS LOG` collection, the `CACHE` collection can be queried to return the report data efficiently.

## Example Stream Worker for Report Processing

```

#################################
#################################
#################################

Example Stream Worker Placeholder

#################################
#################################
#################################

```