---
sidebar_position: 3
---

# GeoFabrics

GeoFabrics enable you to create region-based subsets within your tenants. Each GeoFabric represents a group of collections, processes, and data that cannot be accessed from other GeoFabrics. You must log into the `_system` GeoFabric to create, modify, or delete GeoFabrics. Each GeoFabric has a unique URL that enables access to permissed users.

Refer to the [glossary](../docs/documents/appendix/glossary#geofabric) or [Introducing Geofabrics](https://www.macrometa.com/blog/introducing-geofabrics) for more details.

## Prerequisites

* You must be logged into the `_system` GeoFabric to create, modify, or delete GeoFabrics.

## Create or Delete GeoFabrics

To create a GeoFabric:

1. Log into an administrator account in the `_system` GeoFabric.
2. Click **GEO FABRICS** to navigate to the GeoFabrics management page.
3. Click **New Geo Fabric**.
4. Enter a GeoFabric name.
5. Select at least two Edge Locations across which you want the GeoFabric distributed.
6. Select the **Username** of the account for which you want to own the GeoFabric. Default is `root`.
7. Select the **Spot Primary Region**.

After creating the GeoFabric, click the GeoFabric name on the list to view its unique URL. The owning user can also select their GeoFabric and log in normally.

To modify a GeoFabric:

1. Log into an administrator account in the `_system` GeoFabric.
2. Click **GEO FABRICS** to navigate to the GeoFabrics management page.
3. Click the **Status** switch to add or remove regions to or from the GeoFabric.

To delete a GeoFabric:

1. Log into an administrator account in the `_system` GeoFabric.
2. Click **GEO FABRICS** to navigate to the GeoFabrics management page.
3. Click **Delete** on the row of the GeoFabric you want to delete.

You must type the name of the GeoFabric to verify its deletion.

## Enable Unique URLs

To enable unique URLs for each GeoFabric:

1. Log into an administrator account in the `_system` GeoFabric.
2. Click **TENANTS** to navigate to the Tenants management page.
3. On the **Platform Limits** tab, select the **Enable Tenant URLs** check box.