---
sidebar_position: 50
title: Use of Stream Worker for optimization of reporting-related jobs
---

For example, there is a scheduled reporting job at the end of the week on a collection with millions of records. In the report, it is expected to have records for each day of the week. It is not efficient to run the query on that big collection to get the data for all seven days.  To tackle this a `Stream Worker` can be used. A `Stream worker` can process data on the `Stream` associated with the collection. It can analyze it and generate the `staged` data and can store data in some `CACHE` collection.
E.g. Get the number of the `GET` requests each day from each `IP Address` Instead of scanning the huge `ACCESS LOG` collections, the `Stream worker` can analyze and store data in `CACHE` collection with `user information`, a number of `GET` requests, `Date`, `User name` As there are fewer records compare to that big `ACCESS LOG` collection in `CACHE` collection, query execution would be faster.