---
title: Manipulating Graph Collections
sidebar_position: 30
---

This page discusses some considerations for working with graph collections.

## Manipulating Graph Collections with Regular Document Functions

The underlying collections of the graphs are still accessible using the standard methods for collections. However GDN graph module adds an additional layer on top of these collections giving you the following guarantees:

- All modifications are executed transactional
- If you delete a `vertex`, all `edges` referring to this vertex will be deleted too.
- If you insert an `edge`, it is checked if the edge matches the edge definitions.
- Your edge collections will only contain valid edges and you will never have loose ends.

:::warning
These guarantees are lost if you access the collections in any other way than the graph module, so if you delete documents from your vertex collections directly, the edges pointing to them will be remain in place.
:::

Existing inconsistencies in your data will not be corrected when you create a graph. Therefore, make sure you start with sound data as otherwise there could be dangling edges after all. The GDN graph module guarantees to not introduce new inconsistencies only.

## FILTERs on Edge Document Attributes or Multiple Edge Collections?

If you want to only `traverse` edges of a specific type, there are two ways to achieve this.

- The first would be an attribute in the edge document i.e. `type`, where you specify a differentiator for the edge like "friends", "family", "married" or "workmates", so you can later `FILTER e.type = "friends"` if you only want to follow the friend edges.

- Another way, which may be more efficient in some cases, is to use different `edge` collections for different types of edges, so you have `friend_edges`, `family_edges`, `married_edges` and `workmate_edges` as collection names. You can then configure several graphs including a subset of the available edge and vertex collections. To only follow `friend` edges, you would specify `friend_edges` as sole edge collection.

Both approaches have advantages and disadvantages. `FILTER` operations on edge attributes will do comparisons on each `traversed edge`, which may become CPU-intense. When not finding the edges in the first place because of the collection containing them is not traversed at all, there will never be a reason to actually check for their type attribute with FILTER.

The multiple edge collections approach is limited by the number of collections that can be used simultaneously in one query. Every collection used in a query requires some resources inside GDN and the number is therefore limited (max: 10 collections) to cap the resource requirements. You may also have constraints on other edge attributes, such as a `hash index` with a unique constraint, which requires the documents to be in a single collection for the uniqueness guarantee, and it may thus not be possible to store the different types of edges in multiple edge collections.

So, if your edges have about a dozen different types, it’s okay to choose the `collection` approach, otherwise the `FILTER` approach is preferred. You can still use `FILTER` operations on edges of course. You can get rid of a `FILTER` on the type with the former approach, everything else can stay the same.