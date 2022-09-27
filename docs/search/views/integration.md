---
sidebar_position: 40
title: Integration
---

To use collections as a data source, you must _link_ them to a search view. A link is a one-way data flow from a GDN collection to a search view that determines how incoming data is made available to the user. A search view can have multiple links that are each connected to a different collection, and each collection can be linked to multiple search views.

To minimize performance reduction, we do not constantly synchronize search views as the linked collections change. You can change the consolidation policy to increase or decrease the rate at which search views synchronize with linked collections.

You can link documents and edge collections to search views so your graphs can be treated as both flat and interconnected data structures. For example, you can find the most relevant vertices by searching and sorting with a search view, then perform a regular tree search on each vertex.

Edit the [object definition](/index.md#object-definition) to manage links between search views and collections. You can index any attribute at any depth, including nested attributes, and define Analyzers to process values for each field. To produce results, Analyzers you specify in the query must be defined in the search view.

By default, array elements are indexed individually as if each element is the value of the source attribute. You can use Analyzers to transform strings into multiple tokens that are handled similarly to an array of strings. Refer to [C8QL SEARCH operation](../c8ql/operations/search.md) for details. Primitive values other than strings (`null`, `true`, `false`, numbers) are indexed unchanged. You can choose to index nested object values under the respective attribute path, including objects in arrays.

You can manage search views by using:

- [The Web UI](https://auth.paas.macrometa.io/)
- [An HTTP API](https://macrometa.com/docs/api/)
- [JavaScript API](https://github.com/Macrometacorp/jsC8)

You can query views with C8QL using the [SEARCH operation](../c8ql/operations/search).
