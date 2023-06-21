---
sidebar_position: 2
title: Side Cache Demo
---

This demo demonstrates that a Macrometa [key-value store](../collections/keyvalue/), acting as a cache, can drastically reduce response time from cloud databases such as MongoDB.

## Macrometa GDN

| **Platform**                       | **Tenant**                      | **GeoFabric** |
| ---------------------------------- | ------------------------------ | -------------- |
| [Play](https://play.macrometa.io/) | `demo@macrometa.com` | `side_cache` |

## Demo Site

1. Navigate to [Macrometa Side Cache](https://macrometacorp.github.io/demo-mm-sidecache/).
2. Enter a **Value** and then click **Save**.

    Macrometa displays the response from the server, a key value similar to:

    ```bash
    {
    "key": "64921a7bcb32eb7ab90317ec"
    }
    ```

3. Copy the key value and paste it in the **Key** field, then click **Get**.

    In the Request History, Macrometa displays the time it took to get the value from the database. The value is now stored in the cache.

4. Click **Get** several more times to observe the time difference between fetching the response from the DB and getting it from the cache.
5. You can also compare the results to a third-party API call. To do that, toggle **Select Cache Mode (DB/API)** on and then click **Test API Call** several times.

    Results are displayed in Request history alongside the Macrometa DB calls.

![Side Cache](/img/demos/side-cache.png)
