---
sidebar_position: 1
title: Fulltext Search Examples
---

This page provides detailed examples of possible fulltext search query patterns. All examples use the GDN web console and HTTP REST API.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.
- A fabric named `Hotels` with a document collection named `hotel_reviews`. Refer to [Create a Fabric](../../../geofabrics/create-geofabric.md) and [Create a Collection](../../../collections/types-collections/documents/create-document-store.md).
- A search view named `sample_view`. Refer to [Create a Fulltext Search View](../tasks/create-search-views.md).

## Sample Data

The [dataset](https://raw.githubusercontent.com/Macrometacorp/datasets/master/hotel-reviews/hotels.json) is a JSON file containing 10,000 reviews for hotels in London. Download the JSON file and save it on your local computer.

To import the data into your GDN environment, run the following cURL command with the JSON contents pasted into the `data` array:

```bash
curl --location --request POST 'https://<HOST>/_fabric/Hotels/_api/import/hotel_reviews' \
--header 'accept: application/json' \
--header 'Authorization: <JSON WEB TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "data": [<PASTE JSON DATA HERE>],
  "details": false,
  "primaryKey": "",
  "replace": false
}'
```

Each review has the following attributes used for indexing:

- Property name
- Review rating
- Review title
- Review text
- Location of the reviewer
- Date of review
