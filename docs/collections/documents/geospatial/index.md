---
sidebar_position: 1
title: GeoSpatial
---

Starting with the mass-market availability of smartphones and continuing with IoT devices, self-driving cars ever more data is generated with geo information attached to it. Analyzing this data in real-time requires the use of clever indexing data-structures.

The GeoJSON functionalities in GDN are based on Google’s S2 geospatial index. We support indexing on a subset of the GeoJSON standard, as well as simple latitude-longitude pairs (Non-GeoJSON mode). 

Calculating e.g. the distance between two coordinate tuples or checking whether a coordinate pair is located inside a polygon was possible, but those functions could not benefit by using the geo index optimizations. Those operations need to be as fast as possible to prevent them from being a show stopper.

Of course, speed is not everything, so we also want to provide a broader set of geo functionality by integrating full GeoJSON support including `Polygons`, `Multi-Polygons` and other geometry primitives.

With these functionalities, one can do more complex queries and build e.g. location-aware recommendation engines by combining the graph data model with geo-location aspects or use multiple data models. 

For instance, in the age of self-driving cars, one can find the nearest available maintenance team (geo query) with the right permission (graph model) to repair a given problem (sent automatically to the DB as e.g. a JSON document or key/value pair).

Geospatial coordinates consisting of a latitude and longitude value can be stored either as two separate attributes, or as a single attribute in the form of an array with both numeric values. C8 can [index such coordinates](../../indexing/working-with-indexes#geo-spatial-indexes) for fast geospatial queries.
