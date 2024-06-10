---
sidebar_position: 25
title: Understanding VWRs Queues
---

This page describes the different types of queues supported by Virtual Waiting Rooms.

## FIFO

This FIFO (first in, first out) queue operates on a "first come, first served" basis. Every new request pushes older requests to the front of the queue, closer to the origin server. Thus, when the system removes a request from the front, all subsequent elements move up one position.

### Use cases for FIFO Queues

## Random

The random queuing approach selects requests at random, without a criteria, preference or priority. Here, every request in the queue has an equal possibility for processing. This method is beneficial when prioritizing requests based on their arrival time or other criteria. Introducing a random element can disperse the processing load.

### Use cases for Random Queues

## Lottery

The lottery queuing approach uses assigned priorities and is an advanced method of selecting requests from a queue. This method gives each request a priority or weight, representing its probability of selection for processing. When removing a request, the system conducts a "lottery" to choose the winning request based on its assigned priority. This approach enables you to prioritize specific requests by giving them a higher priority, increasing their likelihood of being selected for processing.

### Use cases for Lottery Queues
