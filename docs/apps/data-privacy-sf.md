---
sidebar_position: 16
title: Salesforce - Edge Caching and Data Privacy
---

Macrometa Lead Management Portal is a lead management `admin` and `user` portal to showcase the edge caching and data privacy capabilities of GDN.

## Setup

* **Dashboard: https://sf-pii.macrometa.io/**
* **Dataset: [sf-pii-users.csv](/datasets/sf-pii-users.csv)**


| **Federation**                                        | **Email**                              | **Passsword** |
| ----------------------------------------------------- | -------------------------------------- | ------------- |
| [Global Data Network](https://play.paas.macrometa.io/) | demo-pii@macrometa.io | `dexxxxxxx`    |

| **Salesforce Web Console URL**                                        | **Email**                              | **Passsword** |
| ----------------------------------------------------- | -------------------------------------- | ------------- |
| [Salesforce web console](https://macrometa-dev-ed.lightning.force.com/) | salesforce@macrometa.com | `Welxxxxx3!`    |



## Solution Architecture

![Solution Architecture](/img/sf-pii-architecture.png)

* Fabrics
    * `pii_eu_sf` -- EU Fabric
    * `pii_global_sf` - Global Fabric

* Stream Workers
    * `DataAnonymizer`
    * `DataAnonymizerUpdate`

* Collections
    * EU - `pii_users`
    * EU - `sharedrecords`
    * EU - `audit`
    * Global - `users`
    * Global - `user_lead_info`

**GitHub**

* Regular - https://github.com/Macrometacorp/demo-salesforce-pii
