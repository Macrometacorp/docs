---
sidebar_position: 25
title: VWRs Queues
---

The waiting room service employs a queuing and dequeuing system to admit users into the waiting room. This system operates the **FIFO** (first in, first out) queue on a "first come, first served" basis. Older requests get closer to the front with new requests added to the queue. When the system removes a request from the front of the queue, all subsequent elements move up one position.

Apart from the FIFO queue, you can configure your waiting room to admit users based on the following:

- **Setting Priorities:** Configuring priorities for your waiting room allows you to create different service levels by assigning every request a priority or weight representing its probability of being selected for processing. This approach requires you to prioritize specific requests by giving them a higher priority, increasing their likelihood of being selected for processing.
- **Random picks:** This approach releases users from the waiting room and admits them into the origin service indiscriminately, without preference or priority. Each request in the queue possesses an equal likelihood of being selected for processing. This method is beneficial when prioritizing requests based on their arrival time or other criteria, as introducing a random element can disperse the processing load.


