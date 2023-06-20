---
sidebar_position: 1
title: Macrometa Sole Factory
---

## Macrometa GDN

| **Platform**                       | **Tenat**                      | **Geo Fabric** |
| ---------------------------------- | ------------------------------ | -------------- |
| [Play](https://play.macrometa.io/) | `demo@macrometa.com` | `e-commerce-search-flow` |

## Deployment

| **Source Code**                       | **Deployment**                      | 
| ---------------------------------- | ------------------------------ | 
| [GitHub](https://github.com/Macrometacorp/e-commerce) | [Deployment](https://macrometacorp.github.io/e-commerce/) |

## Solution

Experience the full potential of Macrometa's advanced full-stack capabilities with our innovative e-commerce demo. This sample application is a fully functional e-commerce website that offers personalized experiences to every visitor. Using the Macrometa platform, it tracks and analyzes visitor actions to provide tailored recommendations based on their preferences. The e-commerce store has real-time stock updates and features a sophisticated search engine, ensuring a seamless and efficient shopping experience.

## Components

This demo includes the following components:

- Personalized recommendations - Macrometa [stream workers](../cep/) read visitor actions from a collection stream, creating a list of recommended products for each visitor.
- Real-time stock updates - Macrometa stream workers read product updates from a collection stream, updating the product stock in real-time.
- Search - The Macrometa GDN search service enables full-text search for our storefront, enabling users to find products based on a variety of terms including product name, brand, and category.
- Serverless backend – Macrometa [query workers](../queryworkers/) provide an interface between the web app and the backend, providing ultra-low latency data and compute.

## Visitor Personalization

Macrometa streams and query workers enable real-time visitor personalization, including recommendations and real-time stock updates.

- **Tailored Product Recommendations**
- **Social Proof (Top Rated Items)**
- **Item Viewers (Currently in carts or viewing)**
- **Personalized Search Results**
- **Recently Viewed Items**
- **Customers Who Bought This Also Bought**
- **Similar Items**
- **In-Store Pickup Options**
- **Real-Time Stock Information**
- **Best sellers**
- **Complementary items**