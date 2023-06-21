---
sidebar_position: 1
title: eCommerce - Sole Factory
---

Experience the full potential of Macrometa's advanced full-stack capabilities with our innovative e-commerce demo. This sample application is a fully functional e-commerce website that offers personalized experiences to every visitor.

Using the Macrometa platform, it tracks and analyzes visitor actions to provide tailored recommendations based on their preferences. The e-commerce store has real-time stock updates and features a sophisticated search engine, ensuring a seamless and efficient shopping experience.

## Macrometa GDN

| **Platform**                       | **Tenant**                      | **Geo Fabric** |
| ---------------------------------- | ------------------------------ | -------------- |
| [Play](https://play.macrometa.io/) | `demo@macrometa.com` | `e-commerce-search-flow` |

## Demo Site

1. Navigate to [Macrometa Sole Factory](https://macrometacorp.github.io/e-commerce/).
2. Click **Log in as guest**.
3. Click around like you were shopping at a real online store.

As you click or search, the site tries to anticipate what you want based on your behavior and personalizes the list of items displayed.

## Components

This demo includes the following components:

- Personalized recommendations - Macrometa [stream workers](../cep/) read visitor actions from a collection stream, creating a list of recommended products for each visitor.
- Real-time stock updates - Macrometa stream workers read product updates from a collection stream, updating the product stock in real-time.
- Search - The Macrometa GDN [search views](../search/) enable full-text search for our storefront, allowing users to find products based on a variety of terms including product name, brand, and category.
- Serverless backend – Macrometa [query workers](../queryworkers/) provide an interface between the web app and the backend, providing ultra-low latency data and compute.

## Visitor Personalization

Macrometa streams and query workers enable real-time visitor personalization, including recommendations and real-time stock updates.

- Tailored product recommendations
- Social proof (top-rated items)
- Item viewers (currently in carts or viewing)
- Personalized search results
- Recently viewed items
- Customers who bought this also bought
- Similar items
- In-store pickup options
- Real-time stock information
- Best sellers
- Complementary items

![Sole Factory](/img/demos/sole-factory.png)