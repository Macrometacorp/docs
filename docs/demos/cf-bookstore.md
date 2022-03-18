---
sidebar_position: 5
---

# Book Store (using CloudFlare Workers)

Bookstore Demo is a full-stack sample web application that creates a storefront (and backend) for customers to shop for fictitious books. You can `browse` and `search` for books, look at `recommendations` and `best sellers`, `manage` your cart, `checkout`, `view` your orders, and more.

:::note
Stream Workers is currently an Enterprise only feature. We will be rolling it out to all users in Q1 of 2022.
Please contact support@macrometa.com if you have any questions.
:::

### On GDN

| **Tenant** | **Fabric** | **Password** | **GUI** | **Source Code**|
|----------- |----------|-----------|--------------|-----------|
| bookstore@macrometa.io | `_system` | `xxxxxxxxxx` | [**Book Store App**](https://bookstore.macrometadev.workers.dev/) |[github](https://github.com/Macrometacorp/tutorial-cloudflare-bookstore)|

### On GDN (Dynamo Mode)

| **Tenant** | **Fabric** | **Password** | **GUI** | **Source Code**|
|----------- |----------|-----------|--------------|-----------|
| bookstore-dynamo@macrometa.io | `_system` | `xxxxxxxxxx` | [**Book Store Dynamo App**](https://bookstore-dynamo.macrometadev.workers.dev/) |[github](https://github.com/Macrometacorp/tutorial-cloudflare-bookstore-dynamo)|

![Bookstore](/img/bookstore.png)

The goal of this Bookstore Demo is to provide a fully-functional web application that utilizes multi-model Macrometa GDN. Increasingly, modern web apps are built using a multitude of different data models. Developers break their large applications into individual components and select the best data model for each job.

Let's consider this Bookstore Demo App as an example. The app contains multiple experiences such a `shopping cart`, `product search`, `recommendations`, and a `top sellers` list. For each of these use cases, the app makes use of a purpose-built data model so the developer never has to compromise on functionality, performance, or scale.

This demo includes the following components:

* **Product catalog/shopping cart** - Macrometa GDN Docs and Dynamo Mode offers fast, predictable performance for the key-value lookups needed in the product catalog, as well as the shopping cart and order history. In this implementation, we have unique identifiers, titles, descriptions, quantities, locations, and price.
* **Search** - Macrometa GDN Search service enables full-text search for our storefront, enabling users to find products based on a variety of terms including author, title, and category.
* **Recommendations** - Macrometa GDN Graphs  provides social recommendations based on what user's friends have purchased, scaling as the storefront grows with more products, pages, and users.
* **Top sellers list** - Macrometa GDN Stream Apps reads order information from GDN Docs Streams, creating a leaderboard of the “Top 20” purchased or rated books.
* **Serverless service backend** – Cloudflare Workers and Macrometa GDN C8QL powers the interface layer between the frontend and backend, and invokes serverless compute with low latency in region closest to the user.
* **Web application blueprint** – We include a React web application pre-integrated out-of-the-box with tools such as React Bootstrap, Redux, React Router, internationalization, and more.

**Credits:** The inspiration for this demo is the AWS demo available at https://github.com/aws-samples/aws-bookstore-demo-app
