---
sidebar_position: 1
title: Search Example
---

This page provides detailed examples of possible search query patterns. All examples use the GDN Web console and HTTP REST API.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.
- A fabric named _Hotels_ with a document collection named _hotel\_reviews_.

## Sample Data

The [dataset](https://raw.githubusercontent.com/Macrometacorp/datasets/master/hotel-reviews/hotels.json) is a JSON file containing 10,000 reviews for hotels in London. Download the JSON file

Each review has the following attributes used for indexing:

- Property name.
- Review rating.
- Review title.
- Review text.
- Location of the reviewer.
- Date of review.

To import the data into your GDN environment, you can copy of the contents of the JSON file into the `data` array of the following cURL command:

```bash
curl --location --request POST 'https://<HOST>/_fabric/Hotels/_api/import/hotel_reviews' \
--header 'accept: application/json' \
--header 'Authorization: <BEARER TOKEN>' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "data": [<PASTE DATA HERE>],
  "details": false,
  "primaryKey": "",
  "replace": false
}'
```