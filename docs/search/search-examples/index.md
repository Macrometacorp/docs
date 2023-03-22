---
sidebar_position: 1
title: Search Examples
---

This page provides detailed examples of possible search query patterns. All examples use the GDN Web console and HTTP REST API.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.
- A fabric named `Hotels` with a document collection named `hotel_reviews`.

## Sample Data

The [dataset](https://raw.githubusercontent.com/Macrometacorp/datasets/master/hotel-reviews/hotels.json) is a JSON file containing 10,000 reviews for hotels in London. Download the JSON file

Each review has the following attributes used for indexing:

- Property name.
- Review rating.
- Review title.
- Review text.
- Location of the reviewer.
- Date of review.

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