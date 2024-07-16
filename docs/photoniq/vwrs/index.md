---
sidebar_position: 1
title: Virtual Waiting Rooms (VWRs)
---

PhotonIQ Virtual Waiting Rooms (VWRs) are designed to control and manage website traffic, especially during peak traffic, like those encountered during discount sales and holidays. 

These virtual waiting rooms are fully programable, allowing [customization based on various parameters such as origin load, visitor thresholds, regional traffic, and behavior analysis](./04-explore-waiting-room/customize-waitroom.md). 
VWRs serve as a dynamic buffer for your origin server and offer key functionalities like:

- **Advanced routing capabilities:** This feature identifies returning customers, diverts suspected bots, and serves cached content to SEO crawlers, thereby ensuring the stability of the origin server. By evenly distributing incoming requests, VWRs optimize the use of server resources, preventing any single component from becoming a bottleneck, maintaining system performance during high-traffic periods, and reducing the need for immediate scaling, such as in the case of EC2.
- **Dynamic Wait Time Updates:** VWRs offer users a controlled, informed waiting experience with real-time queue time updates, enhancing user anticipation. Furthermore, the customizable display showcases vital queue data like position and queue size while offering further customization options.
- **Queue Activation Control:** The service engages a queue system once traffic exceeds a set threshold, allowing for smoother traffic handling and reducing server strain during peak periods. 

    This queuing system effectively manages sudden spikes in legitimate traffic, shielding your origin server from potential overload and ensuring continuous operation, service availability, and reliability, even during unexpected traffic surges. This reliability ensures a consistent visitor experience, crucial for preventing future brand risks and protecting your reputation.
- **Lasting Place Reservation:** VWRs reduces user frustration and improves convenience with its position retention. This lasting place reservation ensures visitors retain their place in the queue even while navigating away from the queue page, thus removing the need to stay on it. 
- **Enhanced Service Tiers:** One of the [queues offered by VWRs](./queue-types.md) is the priority queue, which allows you to dequeue users based on a defined level of priority. This queue type enables you to tailor waiting experiences based on user personas, providing instant value and a more personalized approach that resonates with different visitor segments.

Some other features include its Duplicate Visitor Identification, which merges multiple attempts by a user into a single position, ensuring queue integrity and order, and Post-queue Access Management, which manages post-queue access to the site, depending on user engagement and duration of visit.

You can get started with the service by [configuring and creating your first virtual waiting room](./02-get-started-vwrs/index.md). 
