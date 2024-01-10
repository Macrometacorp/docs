---
sidebar_position: 1
title: Virtual Waiting Rooms
---

Macrometa PhotonIQ Virtual Waiting Rooms (VWRs) are an advanced prioritization service that manages visitors entering a site. VWRs are fully programmable and can be generated based on origin loads, suspicious behavior, visitor thresholds, regions, or traffic-based alerts, to name a few. Advanced routing can recognize previous customers, send suspected bots to honeypots or looping queues, or deliver cached versions of a site to SEO crawlers without hitting the origin.

### How It Works

When traffic is high, VWRs makes a new page separate from your origin to organize visitors. This keeps your origin from being overwhelmed. What customers see is their place in queue along with how much longer they have to wait. They keep their line even if they accidentally navigate away from the site or close the tab.

For a more detailed explanation, refer to [How VWRs Works](how-vwrs-works.md).

## Benefits of Virtual Waiting Rooms

VWRs serves as a dynamic buffer for your origin server, adeptly handling elevated traffic volumes. This capability not only prevents server overload but also maintains a seamless user experience. Key benefits include:

### Server Protection

- **Traffic Management:** VWRs effectively manage sudden spikes in legitimate traffic, shielding your origin server from potential overload. This feature ensures continuous operation and service availability, even during unexpected traffic surges.
- **Resource Optimization:** By evenly distributing incoming requests, VWRs optimize the use of server resources. This prevents any single component from becoming a bottleneck, thus maintaining overall system performance during high-traffic periods.

### Enhanced User Experience

- **Reliability:** By keeping your application consistently online, VWRs reduce the likelihood of visitors encountering error pages. This reliability translates to a smoother, more satisfying user experience, fostering trust and engagement.
  
- **Waiting Room Experience:** The VWR system offers a controlled, informed waiting experience for users. This approach minimizes frustration and keeps users engaged while they wait for access to your application.

### Service Tiers

- **Behavioral Insights:** Offering various service tiers allows for a deeper understanding of user behavior. These insights can be instrumental in optimizing service delivery and tailoring user experiences.
  
- **Customization Options:** Different tiers can provide customized experiences or priorities, enabling you to cater to diverse user needs and preferences, thus enhancing overall satisfaction.

By implementing these measures, VWRs not only safeguards the technical infrastructure but also elevates the user experience, making them a vital component in managing web applications effectively.

## Key Features

Key capabilities of VWRs include:

### Dynamic Wait Time Updates

- **Real-Time Predictions:** Offers continually updated forecasts for wait times, enhancing user anticipation management.
- **Customizable Display:** Showcases queue data, including position and queue size, on the waiting room page with full customization options.

### Queue Activation Control

- **Automatic Activation:** Engages the queue system only when incoming traffic exceeds a set threshold, optimizing resource utilization.
- **Traffic Management:** Allows for smoother handling of website traffic, reducing server strain during peak periods.

### Lasting Place Reservation

- **Position Retention:** Ensures visitors retain their specific place in the queue, even when navigating away from the queue page.
- **User Convenience:** Enhances user experience by removing the need to stay on the queue page, reducing frustration and inconvenience.

### Duplicate Visitor Identification

- **Single Entry Enforcement:** Limits users to one active position in the queue, ensuring fairness in the waiting process.
- **Entry Merging:** Automatically merges multiple attempts by the same user, maintaining queue integrity and order.

### Enhanced Service Tiers

- **Priority Queueing:** Allows for the establishment of priority queues, offering different levels of service to various user groups.
- **Service Optimization:** Tailors user experiences based on service tiers, enhancing overall satisfaction and efficiency.

### Access Management Post-Queue

- **Regulated Site Access:** Manages post-queue access to the site, depending on user engagement and duration of visit.
- **Time-Based Access Control:** Sets limits for uninterrupted access post-queue and re-queueing protocols after a period of inactivity, balancing server load and user access.
