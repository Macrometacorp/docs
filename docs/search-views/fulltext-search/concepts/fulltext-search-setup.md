---
sidebar_position: 10
title: Fulltext Search View Setup
---

Fulltext search views in Macrometa's Global Data Network (GDN) provide a powerful tool for carrying out efficient, text-based searches on your collections. To get the most from fulltext search views, it's essential to correctly set up your collections and define how you want your data to be indexed and searched.

## Linking Collections

When you create a search view, you choose which collections to link it to. A link transforms your collections into searchable data sources, creating a one-way data flow from a collection to a search view. By establishing multiple links from different collections to a single search view, you can perform a single search across multiple collections.

You can also link more than one search view to a particular collection. Linking one collection to multiple search views allows you to apply different search strategies to the same data set. This flexibility is invaluable when dealing with complex applications with varied search requirements.

## Handling Data Structures

You can link key-value stores, document stores, and graph edge collections to search views. This setup allows your data to be treated as both flat and interconnected structures, supporting both straightforward attribute-based searches and more complex searches involving relationships between data entities.

For example, in a social network scenario, a flat structure might be useful for searching users based on profile details, like name or location. In contrast, an interconnected structure would allow searches based on relationships, like friends or followers.

## Object Definition and Analyzers

Modifying the object definition gives you control over how your data is indexed, enabling you to determine what attributes of your data are searchable, and to what depth. Analyzers process the values for each field during a search. To get the results you want, any analyzer used in a query must be pre-defined in the search view.

For more information about analyzers, refer to [Analyzers](../analyzers/).

## Data Indexing

In Macrometa, array elements are indexed individually, treated as separate values. You can tokenize strings with analyzers for more detailed searches. All other primitive values (like `null`, `true`, `false`, numbers) are indexed in their original form. You also have the option to index nested object values under their respective attribute paths. This can be particularly useful when dealing with complex data structures, like objects within arrays.
