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

You are going to create a search view on the document collection that you created in the [Quickstart](https://www.macrometa.com/docs/quickstart). For an explanation of how search views function, refer to the [Fulltext Search Tasks](tasks/index.md) section.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Search Views**.
3. Click **New View**.
4. In the **Search View Name** field, enter `addresses_view`.
5. In **View Type**, select **Fulltext Search**.
6. In the **Collection** list, select **addresses**.
7. Enter `lastName` in `field` and select **text_en** in the ANALYZER list.
8. Click **Add Collection** twice.
9. Perform steps 6 and 7 again for the `firstName` and `email` fields in the `addresses` collection.
10. Click **Create**.

Your three address collection key values are indexed in the search view and ready to query. Macrometa distributes this search view to every location in the global fabrics. If you're curious about the locations, click **Dashboard** to see the default [GeoFabric](geofabrics/index.md) locations.

![New Search View](/img/search/getting-started-new-fulltext.png)

## 2. Query the Search View

To query the search view, you can create a query in Macrometa to run it as needed or save it as a [query worker](../../queryworkers/index.md).

1. On the side menu, click **Compute > Query Workers**.
2. If the code editor is not empty, then click **New Query**.
3. The code block below is a search query that will allow you to pass in a query parameter to search the search view. Copy and paste it in the code editor on line 1.

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

4. Add the word `nemo` to the searchTerm value to the right of the query editor window.
5. Click **Run Query**. You will see your results show up below the Run Query button.
6. (Optional) Click **Query Info** in the Query Result to see what the query did and how long each step took. Pretty cool if you're into performance metrics.

## 3. (Optional) Save the Query as an API Endpoint

When you save a query worker, you can access it via REST API from anywhere in the world in under 50ms.

1. Click **Save Query**.
2. Name the query **getContactBySearchTerm** and then click **Save**. This saves the query so you can use it again.
3. Click **Run Query**.
4. Click **API Endpoint**.

This query requires a value to be passed with each request, so you must enter one in the bind parameters or else the query will fail with an error.

![Save as API Endpoint](/img/search/save-query-as-endpoint.png)
