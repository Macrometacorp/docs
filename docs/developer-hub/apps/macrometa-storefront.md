---
sidebar_position: 100
title: Macrometa Storefront
---

`Macrometa Storefront` App is a full-stack e-commerce web application that creates a storefront (and backend) for customers to shop for fictitious fashion items. You can `browse` and `search` for books, look at `recommendations` and `best sellers`, `manage` your cart, `checkout`, `view` your orders, and more.

### On GDN

![Macrometa Storefront](/img/mm-storefront.png)

The goal of this Demo is to provide a fully-functional web application that utilizes multi-model Macrometa GDN. Increasingly, modern web apps are built using a multitude of different data models. Developers break their large applications into individual components and select the best data model for each job.

Let's consider this `Macrometa Storefront` Demo App as an example. The app contains multiple experiences such a `shopping cart`, `product search`, and a `best sellers` list. For each of these use cases, the app makes use of a purpose-built data model so the developer never has to compromise on functionality, performance, or scale.

This demo includes the following components:

* **Product catalog/shopping cart** - Macrometa GDN Docs offers fast, predictable performance for the key-value lookups needed in the product catalog, as well as the shopping cart and order history.
* **Search** - Macrometa GDN Search service enables full-text search for our storefront, enabling users to find products based on a variety of terms including product name, and category.
* **Best sellers list** - Macrometa Stream Workers read order information from a Collection Stream, creating a leaderboard of the "Top 20" purchased products.
* **Serverless backend** – Macrometa Query Workers provides an interface between the web app and the backend, providing ultra-low latency data and compute.
