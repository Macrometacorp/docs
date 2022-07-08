---
sidebar_position: 1
title: Collections
---

A collection can be empty or contain documents. Macrometa GDN is _schemaless_, so you do not need to define valid document attributes. Documents with completely different structures can be stored in the same collection.

There are two types of collections:

- _Document collections_ can be created as _local_ or _global_ collections. Alternatively, a _vertex_ is a document collection that contains graphs.

  - A _local collection_ stores its data in one region and does not replicate to other regions. You can create a local collection in any specified region. Best practice is to use a region-specific API endpoint when interacting with local collections. If a user sends a request to a local collection without being routed to the appropriate region, the request will fail.

  - A _global collection_ replicates its data and maintains state and consistency across all regions in the GeoFabric.

- _Edge collections_ store _edge documents_ (or _edges_) that define a relationship between other documents with the `_from` and `_to` values.
