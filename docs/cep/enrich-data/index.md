---
sidebar_position: 1
title: Join and Enrich Data
---

Enriching data involves integrating the data received in the stream with data from Macrometa or another data stream, or an external service to derive an expected result. To understand the different ways in which this is done, refer to the topics in this section.

## Joining Data vs. Enriching Data

Joining data is combining data from two or more sources to create a composite of the data.

Enriching data is taking a data source and adding additional fields to that data by referencing other data sources or through computation.

For example, you might have a name and address in a data source, and perhaps you have a reference database that has phone numbers for every address. You could enrich the record in the data source with the associated phone number by joining it to the phone reference data.

Enrichment is inherently either joining data or doing calculations, but not all joining is done to enrich the data.

## Additional Resources

Aside from the topics in this section, here are some additional resources for joining and enriching data.

- [Stream Joins](../examples/data-pipelines.md#stream-joins) - An example showing how to join two streams based on a condition.
- [Functions](../query-guide/functions/index.md) - Built-in functions provide many options for enriching your data.
