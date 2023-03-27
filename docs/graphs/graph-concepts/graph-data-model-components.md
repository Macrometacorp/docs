---
title: Graph Data Model Components
sidebar_position: 20
---

This page discusses the basic components of a graph data model, including edges and their attributes, as well as the concept of document handles.

## Collections and Edges

A graph data model always consists of at least two collections:

- A [Graph Edge](../../collections/graph-edge/create-graph-edge) collection: Stores the relations between the nodes in the graphs.
- A [Document Store](../../collections/documents/create-document-store) collection: Stores the nodes in the graph in documents.

Edges are special documents with additional attributes. Besides the system attributes `_key`, `_id`, and `_rev`, edges also have the attributes `_from` and `_to`, which contain document handles representing the start-point and end-point of the edge.

## Document Handles

Document handles are unique identifiers for documents in the form of the `_id` attribute, which is a combination of the collection name and the document key (`_key`). In the context of edge documents, the `_from` and `_to` attributes are document handles, referring to the starting and ending vertices of the edge.

## Data Model Example

Consider a situation where information about your organization's front desk and reception unit.

- The edge collection stores information, such as a company's reception being a sub-unit to the services unit and the services unit being a sub-unit to the CEO. You would express this relationship using the `_from` and `_to` attributes.
- The document collection stores properties about the reception unit. For example, it could include names and data about the 20 people who are working there, the room number, and so on.

## Edge Attributes

Edge collections are special collections that store edge documents. Edge documents are connection documents that reference other documents. The type of a collection must be specified when a collection is created and cannot be changed afterward.

Edges are normal documents that always contain a `_from` and a `_to` attribute, which serve as document handles.

- `_from` is the document handle of the linked vertex (incoming relation)
- `_to` is the document handle of the linked vertex (outgoing relation)

In queries you can define in which directions the edge relations may be followed i.e.,

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`

To change edge endpoints, you would need to remove the old document/edge and insert a new one. Other fields can be updated as in default collections.

Here is an example of a valid edge document:

```json
{
  "_id": "friends/001",
  "_key": "001",
  "_rev": "_Wm3dyle--_",
  "_from": "students/john",
  "_to": "students/jane",
  "closeness": 9.5
}
```
