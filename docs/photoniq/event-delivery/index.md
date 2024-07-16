---
sidebar_position: 1
title: Event Delivery
---

PhotonIQ Event Delivery Service (EDS) provides a robust solution for the timely delivery of real-time event data to your applications. This enables developers to incorporate event-driven functionalities to thier applications, ensuring real-time updates that enhance data-driven decision-making. EDS achieves this through two distinct methods:

- **WebSockets**: EDS uses WebSockets as a communication protocol that enables full-duplex communication between a client (such as a web browser) and a server over a single, long-lived connection. This allows both the client and server to send and receive messages concurrently, enabling real-time, bidirectional communication.

- **Server-Sent Events**: EDS uses Server-Sent Events (SSE) as a communication protocol that allows a server to send updates to the client over a single, long-lived HTTP connection. Unlike WebSockets, SSE is unidirectional, meaning the server can push data to the client, but the client cannot send data to the server through the same connection.

<grid cols={3}>
 <card
    heading="Getting Started"
    description="Learn how to set up and use the Event Delivery Service"
    href="getting-started-event-delivery"
  />
   <card
    heading="EDS API"
    description="Interact with the Event Delivery Service API"
    href="https://www.macrometa.com/docs/apiEds#"
  />
   <card
    heading="EDS SDK"
    description="Integrate the Event Delivery Service SDK into your applications"
    href="./clients"
  />
 </grid> 

## Key features of EDS

The PhotonIQ EDS offers comprehensive features to support real-time data delivery and customization to fit different organizational use cases.

- **Real-time event delivery**: EDS provides two methods for delivering events in real-time as they occur: WebSockets and SSE. It also includes event de-duplication to minimize noise and irrelevant data in your data stream.
- **Event subscription and publishing**: Users can subscribe to specific events that are relevant to them and can publish data to the event stream, enabling dynamic data exchange.
- **Advanced filtering**: EDS features SQL-like filtering, giving users precise control over their event subscriptions to ensure relevance and minimize noise.
- **Metric and analytics**: EDS offers comprehensive insights into health, performance, and event trends, enabling users to optimize their applications and make data-driven decisions based on analytics.
- **Scalability and security**: EDS is designed to support large user bases, incorporating robust security measures such as data encryption and user authentication to ensure secure and scalable operations.

## Challenges addressed by EDS

Event Delivery is designed to solve specific problems related to data management and delivery in modern applications:

- **Information overload:** EDS filters out irrelevant data, delivering only the information users need.
- **Data reception latency:** Real-time event delivery minimizes delays, ensuring decisions are made using the most current information.
- **Integration complexity:** Event Delivery uses standard SQL-like querying for easy integration with existing systems.


