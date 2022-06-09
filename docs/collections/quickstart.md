---
sidebar_position: 1
title: Quickstart
---

A collection can be empty or contain documents. Macrometa GDN is *schemaless*, so you do not need to define valid document attributes. Documents with completely different structures can be stored in the same collection.

There are two types of collections: 

 * *Document collections* can be created as *local* or *global* collections. Alternatively, a *vertex* is a document collection that contains graphs.

    * A *local collection* stores its data in one region and does not replicate to other regions. You can create a local collection in any specified region. Best practice is to use a region-specific API endpoint when interacting with local collections. If a user sends a request to a local collection without being routed to the appropriate region, the request will fail.

    * A *global collection* replicates its data and maintains state and consistency across all regions in the GeoFabric.

 * *Edge collections* store *edge documents* (or *edges*) that define a relationship between other documents with the `_from` and `_to` values.