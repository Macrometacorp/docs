---
sidebar_position: 46
title: Set up and manage cache
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Manage how P3 caches and serves your pages with the cache tab in the P3 dashboard. 

## View Purge Cache Requests

Purging the cache removes old content to make room for more relevant and updated content. This cache clearing also helps with troubleshooting and improves performance and page loading time.

To view P3 cache purge requests:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Cache**.

    The Purge Cache Requests table provides the following fields:

    - **URL** - The URL of the cache being purged.
    - **CDN Cache** - Status of the CDN cache purge. Options are:
      - **Accepted** - The cache purge request was accepted.
      - **Unset** - The request did not include a CDN cache purge.
    - **Proxy Cache** - Status of the P3 cache purge. Options are:
      - **Purged** - Cache has been successfully purged.
      - **Rejected** - Cache request was rejected.
    - **Created** - Date and time the request was entered.

![P3 Cache Purge Requests](/img/photoniq/p3/p3-cache-purge-requests.png)

## Purge the Cache

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Cache**.
3. Click **Purge Cache**.
4. Click **Add** and enter the URL, including `https://`, that you want to purge the cache for. Click **Add** and then repeat this step for each URL you want to include in the purge request.
5. (Optional) Click the **Yes, I want to purge CDN cache too.** checkbox if you want to purge your CDN cache as well.
6. When purging the CDN, click the arrow to expand the **CDN Purge Params** and enter information in the fields. For more information about these fields, refer to Akamai's [Welcome to Purge Cache](https://techdocs.akamai.com/purge-cache/docs/welcome-purge).
7. Click **Submit**.
