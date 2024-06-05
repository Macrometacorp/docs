---
sidebar_position: 1
title: Event Delivery
---

PhotonIQ Event Delivery ensures the timely delivery of real-time event data to your applications, allowing developers to integrate event-driven functionality into applications, thus guaranteeing the delivery of real-time updates for making better data-driven. It does this using two methods:

- **Websockets**: WebSockets addresses the limited unidirectional HTTP communication protocol by establishing a persistent, bi-directional communication between clients and servers, making them an ideal choice for building efficient, low-latent, real-time applications. 
- **Server-Sent Events (SSE)**: An alternative to Websockets, SSE is a lightweight, unidirectional HTTP protocol for building communication channels. However, unlike the HTTP protocol, which closes a connection after receiving a response, the SSE keeps this connection open to receiving streaming updates as long as the client, thus enabling it to send real-time updates to clients.

## Benefits of Event Delivery

Event Delivery offers several key advantages that enhance the functionality and responsiveness of applications:

- **Operational Efficiency**: For traffic monitoring, health, delivery, and ride-hailing and communication services, real-time event delivery helps coordinate and organize work efforts, thus improving operational efficiency and productivity.
- **Improved Customer Experiences**: Real-time applications like gaming and chat messaging offer an interactive and engaging experience for users, improving individual experiences. 
- **Risk Management**: Finance, health, and military organizations rely on immediate data updates to assess risks and make informed decisions. For these industries, data is time-sensitive with a short window frame for action and becomes non-relevant or less relevant after time elapses. 
- **Reduces Irrelevant Data**: Event delivery offers SQL-like filters, which help users filter subscribed events, thus reducing the occurrence of irrelevant data for processing and analytics. 
- **Better Decision-making**: Access to real-time, relevant data helps teams respond faster and with better-informed solutions to changes. 

## Challenges Addressed by Event Delivery

Event Delivery aims to solve specific problems related to data management and delivery in modern applications:

- **Information Overload:** Event Delivery filters out irrelevant data, delivering only the information users need.
- **Data Reception Latency:** Real-time event delivery minimizes delays, ensuring decision-making using the most current information.
- **Integration Complexity:** Event Delivery uses standard SQL-like querying for easy integration with existing systems.

## Features of EDS

The PhotonIQ Event Delivery Service has comprehensive features to support real-time data delivery and customization to fit different organizational use cases.

### Real-Time Event Delivery

EDS offers two methods for enabling real-time delivery of events as they occur, utilizing Websockets and including event de-duplication to reduce the occurrence of noise and irrelevant data in your data stream.

### Event Subscription and Publishing

Users can subscribe to specific events that matter to them and can publish data to the event stream, facilitating a dynamic data exchange.

### Advanced Filtering

Event Delivery offers SQL-like filtering capabilities, enabling precise control over users' subscriptions to events, ensuring relevance, and reducing noise.

### Scalability and Security

Designed to accommodate large user bases, Event Delivery provides robust security measures, including data encryption and user authentication, ensuring safe and scalable operations.

### Metrics and Analytics

EDS provides detailed insights into the health, performance, and event trends, helping users optimize their applications and make informed decisions based on analytics.
