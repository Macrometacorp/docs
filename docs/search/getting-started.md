---
sidebar_position: 10
title: Getting started with Search
---

In this getting started guide, you will add search functionality to the Address Book app that you build in the [Macrometa Quickstart](https://www.macrometa.com/docs/quickstart).

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/sign-up).
- Completion of our [quickstart guide](https://www.macrometa.com/docs/quickstart).

## Step 1. Create a View

 A _search view_ is an inverted index that contains the search configuration and all document attributes across one or many collections.

1. On the side menu, click **Search Views**.
2. Click **New View**.
3. In **Name**, enter `addresses_view`.
4. Click the **plus** under Mapping Definition.
5. Select the `addresses` collection from the COLLECTION list. 
6. Enter `lastName` in `field` and select **text_en** in the ANALYZER list. 
7. Follow steps 5 and 6 two more times, but add `firstName` in the second Mapping Definition and `email` in the third Mapping Definition.
8. Click **Create**.

Macrometa distributes this view index to every location in the global fabrics. If you're curious about the locations, click **Dashboard** to see the default [GeoFabric](geofabrics/index.md) locations.

Our view is now accessible worldwide, and your three address collection key values are indexed and ready to query!

## Step 2. Query your View

1. On the side menu, click **Query Workers**.
2. The code block below is a search query that will allow you to pass in a query parameter to search you index. Copy and paste it in the code editor on line 1.

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

3. Add the word `nemo` to the searchTerm value to the right of the query editor window.
4. Click **Run Query**. You will see your results show up below the Run Query button.
5. (Optional) Click **Query Info** in the Query Result to see what the query did and how long each step took. Pretty cool if you're into performance metrics.

## Step 3. Save the Query as an API Endpoint

Macrometa allows you to save a query as a [Query Worker](../queryworkers/index.md).

1. Click **Save Query**.
2. Name the query **getContactBySearchTerm** and then click **Save**. This saves the query so you can use it again.
3. Click **Run Query**.
4. Click **API Endpoint**.

Macrometa displays a cURL command that you can use to access this endpoint from anywhere in the world in under 50ms.

:::note
This query requires a value to be passed with each request, so you must enter one in the bind parameters or else the query will fail with an error.
:::

![Create a Query Worker](/img/quickstart/create-query-worker.png)

You have created your first view and made it a RESTful endpoint with a query worker. [We made a front-end for you to take your new backend for a spin](https://github.com/Macrometacorp/tutorial-addressbook-streams).
