---
sidebar_position: 1
title: Reorder Functions
---

Processing data in real-time often involves handling out-of-order events, which can lead to inconsistencies and inaccurate results when performing operations such as aggregation and windowing. To effectively manage out-of-order events and maintain the accuracy of your stream processing, Macrometa GDN Stream Workers offer reorder functions, specifically `akslack` and `kslack`.

The `akslack` and `kslack` reorder functions are designed to address the challenges associated with out-of-order events in streaming data. They allow you to reorder events based on specified attribute values and apply configurable constraints to ensure that your stream processing pipeline operates efficiently and accurately.

This section, introduces the `akslack `and `kslack` reorder functions and demonstrates how to use them within your stream workers to effectively manage out-of-order events in your streaming data.

<DocCardList />