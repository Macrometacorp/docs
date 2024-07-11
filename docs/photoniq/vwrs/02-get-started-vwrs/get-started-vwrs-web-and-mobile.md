---
sidebar_position: 10
title: Integrating VWRs on Web and Mobile
---

Different types of applications require distinct approaches for integrating with Virtual Waiting Rooms (VWRs) as the applications' platform and user interaction models determine the integration process. 

Let's demonstrate how web and mobile applications can effectively integrate and use VWRs to manage traffic and enhance user experiences.


## Prerequisites

Before proceeding, ensure to have the following tasks completed:

- **Get Credentials and Access**: Creating a waiting room requires authentication with an API key. Contact and work with Macrometa personnel to obtain the necessary credentials to proceed.
- **Determine waiting room needs**: The PhotonIQ VWRs offers numerous features to customize your waiting room needs:
    - **Queue types**: Depending on your particular business use case, VWR offers different [queue types](https://www.macrometa.com/docs/photoniq/vwrs/queue-types). For example, the FIFO type queues and dequeues users based on their order of arrival, while the random queue admits users randomly. 
    - **Required URLs**: Determine the URLs to incorporate the waiting rooms.
- **Gather information**: Gather all the required information, like waiting room details and traffic expectations, to simplify the setup process.

## Integrating on Web and Mobile

<Tabs groupId="waiting-room-integration">
<TabItem value="web" label="Integrate on Web">

Web apps, also called non-native or browser-based apps, are typically web-based and use standard web technologies such as HTML, CSS, and JavaScript. These applications run within web browsers and are the most common types integrated with VWRs. Integrating your web applications with VWRs occurs through web-based configurations, making it easier to implement an effective traffic management solution like VWR.

This guide explains the steps to connect your web app to VWRs, enhancing your ability to manage high traffic efficiently and maintain a seamless user experience.

### Steps

To integrate your virtual waiting room with your web application:

1. [Create an API Key](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey): An API key grants you access to the virtual waiting room service and is essential for all subsequent operations. You can create an API key with the VWRs GUI or via the VWRS API.

2. [Configure a VWRs EdgeWorker](../03-configuration-and-setup/01-configuring-edgeworkers.md): EdgeWorkers helps manage the waiting room functionality on the Akamai side by directing traffic to the waiting room. This configuration is crucial for handling incoming traffic and directing it appropriately.

3. [Create and configure your waiting room](index.md): This step allows you to fine-tune how the waiting room operates and integrates with your site.

</TabItem>
<TabItem value="mobile" label="Integrate on Mobile">

Mobile apps, also called native apps or system-specific apps, are developed for specific platforms using platform-specific programming languages. Unlike web-based apps, mobile apps are developed for specific platforms using platform-specific UI frameworks and the application takes on a greater role in managing the user experience during high-traffic periods, including handling the display of waiting times and managing user expectations. Mobile apps require direct API interactions to manage user experiences effectively during high traffic periods.

### Steps

1. [Create your API Key](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey): Start by creating an API key to access the VWRs system, as this key is essential for all API interactions.

2. Create and Configure your waiting room

3. Use the [VWRs API](https://www.macrometa.com/docs/apiVwrs#/) to observe and manage the user's position in the waiting room. This involves making periodic API calls to check the queue status and manage the user experience accordingly.

  - [Get initial position in waiting room](https://www.macrometa.com/docs/apiVwrs#/paths/api-vwr-v1-position-domain_key/get)
  - [Get current position in waiting room](https://www.macrometa.com/docs/apiVwrs#/paths/api-vwr-v1-position-domain_key---request_id/get)

### Pseudo-Code Example

Here is a pseudo-code example illustrating how a mobile app interacts with the VWR API to manage a user's waiting experience:

```javascript
// Initial request specifying the waiting room.
let waitingRoom = "shopping";
let result = GET("/api/vwr/v1/position/" + waitingRoom);

// Loop while the user is still in the waiting room.
while (result.position > 0) {
    // Notify the user of their current position and expected wait time.
    notifyUser(result.position, result.waiting_time);

    // Wait for the specified refresh interval before checking the position again.
    sleep(result.refresh_interval);

    // Re-check the user's position using the visitor_id received from the initial call.
    result = GET("/api/vwr/v1/position/" + waiting_room + "/" + result.visitor_id);
}

// Proceed with accessing the protected resource once the user is out of the waiting room.
accessResource();
```

</TabItem>
</Tabs>  


## Monitoring your Virtual Waiting Room

Once your virtual waiting room is operational, consider monitoring and managing its performance to ensure optimal functionality:

- **Metrics and Analytics:** Regularly check the [VWRs metrics](../05-monitoring-vwrs/index.md) to assess the performance and effectiveness of your waiting room.
- **Review Usage Patterns:** Analyze usage data to optimize settings and improve user experiences. You can customize your settings to analyze usage statistics at different time intervals:
  - [Hourly Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getHourlyUsage)
  - [Daily Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getDailyUsage)
  - [Monthly Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getMonthlyUsage)
