---
sidebar_position: 90
title: Data Privacy User Management Portal
---

Macrometa User Management Portal is a fullstack `admin` and `user` portal to showcase the data privacy capabilities of GDN.


## Setup (Regular)

| **Federation**                                        | **Email**                              | **Passsword** | **GUI**|
| ----------------------------------------------------- | -------------------------------------- | ------------- |--------------|
| [Global Data Network](https://play.paas.macrometa.io/) | demo-pii@macrometa.io | `xxxx`    | [User Management Portal](https://pii.macrometa.io/) |

**Dataset: [pii-users.csv](/datasets/pii-users.csv)**


## Solution

* Fabrics
    * `pii_eu` -- EU Fabric
    * `pii_global` - Global Fabric

* Stream Workers
    * `DataAnonymizer`
    * `DataAnonymizerUpdate`

* Collections
    * EU - `pii_users`
    * EU - `sharedrecords`
    * EU - `audit`
    * Global - `users`
    * Global - `locations`

**GitHub**

* Regular - https://github.com/Macrometacorp/demo-pii
