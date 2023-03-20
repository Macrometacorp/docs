---
sidebar_position: 10
title: Getting Started with Search
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page guides you through creating your first search view.

## Prerequisites

- An address collection created during the [Quickstart tutorial](https://www.macrometa.com/docs/quickstart).
- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.

## Create a Search View

Refer to the [Search Views](/search/views/index.md) section for an explanation of how search views function.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Search Views**.
1. Click **New View**.
1. In the **Name** field, enter `addresses_view`.
1. Click the **plus** under Mapping Definition.
1. Select the `addresses` collection from the COLLECTION list. 
1. Enter `lastName` in `field` and select **text_en** in the ANALYZER list. 
1. Perform the previous three steps again for `firstName` and `email`.
1. Click **Create**.

Macrometa distributes this view index to every location in the global fabrics. If you're curious about the locations, click **Dashboard** to see the default [GeoFabric](geofabrics/index.md) locations.

Our view is now accessible worldwide, and your three address collection key values are indexed and ready to query.

## Query the View



1. On the side menu, click **Query Workers**.
1. The code block below is a search query that will allow you to pass in a query parameter to search you index. Copy and paste it in the code editor on line 1.

  ```sql
    FOR contact IN addresses_view
        SEARCH ANALYZER(
                BOOST(STARTS_WITH(contact.firstName, @searchTerm), 3) OR
                BOOST(STARTS_WITH(contact.lastName, @searchTerm), 2) OR 
                BOOST(STARTS_WITH(contact.email, @searchTerm), 1),
                "text_en"
            )
        SORT BM25(contact) DESC
        RETURN UNSET(contact, ["_id", "_rev"])
  ```

1. Add the word `nemo` to the searchTerm value to the right of the query editor window.
1. Click **Run Query**. You will see your results show up below the Run Query button.
1. (Optional) Click **Query Info** in the Query Result to see what the query did and how long each step took. Pretty cool if you're into performance metrics.

## Save the Query as an API Endpoint



Macrometa allows you to save a query as a [Query Worker](../queryworkers/index.md).

1. Click **Save Query**.
1. Name the query **getContactBySearchTerm** and then click **Save**. This saves the query so you can use it again.
1. Click **Run Query**.
1. Click **API Endpoint**.

Macrometa displays a cURL command that you can use to access this endpoint from anywhere in the world in under 50ms.

This query requires a value to be passed with each request, so you must enter one in the bind parameters or else the query will fail with an error.

![Create a Query Worker](/img/quickstart/create-query-worker.png)

You have created your first view and made it a RESTful endpoint with a query worker. [We made a front-end for you to take your new backend for a spin](https://github.com/Macrometacorp/tutorial-addressbook-streams).
