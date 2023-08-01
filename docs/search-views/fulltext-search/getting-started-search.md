---
sidebar_position: 10
title: Getting Started with Fulltext Search
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page guides you through creating and querying your first fulltext search view.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.
- The address collection created during the first two steps of the [Quickstart](https://www.macrometa.com/docs/quickstart).

## 1. Create a Search View

You are going to create a search view on the document collection that you created in the Quickstart. [Quickstart](https://www.macrometa.com/docs/quickstart)

Refer to the [Fulltext Search Tasks](tasks/index.md) section for an explanation of how search views function.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Search Views**.
3. Click **New View**.
4. In the **Name** field, enter `addresses_view`.
5. Click the **plus** under Mapping Definition.
6. Select the `addresses` collection from the COLLECTION list.
7. Enter `lastName` in `field` and select **text_en** in the ANALYZER list.
8. Perform the previous three steps again for `firstName` and `email`.
9. Click **Create**.

Your three address collection key values are indexed and ready to query. Macrometa distributes this view index to every location in the global fabrics. If you're curious about the locations, click **Dashboard** to see the default [GeoFabric](geofabrics/index.md) locations.

## 2. Query the View

To query the search view, you can create a query in Macrometa to run it as needed or save it as a [query worker](../../queryworkers/index.md).

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

## 3. Save the Query as an API Endpoint

When you save a query worker, you can access it via REST API from anywhere in the world in under 50ms.

1. Click **Save Query**.
1. Name the query **getContactBySearchTerm** and then click **Save**. This saves the query so you can use it again.
1. Click **Run Query**.
1. Click **API Endpoint**.

This query requires a value to be passed with each request, so you must enter one in the bind parameters or else the query will fail with an error.

![Create a Query Worker](/img/quickstart/create-query-worker.png)