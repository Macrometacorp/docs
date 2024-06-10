---
sidebar_position: 10
title: Set up VWRs on Web and Mobile
---

This guide explains the steps to connect your web and mobile apps to VWRs, enhancing your ability to manage high traffic efficiently and maintain a seamless user experience.

## Prerequisites

Before proceeding, ensure to have the following tasks completed:

- **Get Credentials and Access**: Creating a waiting room requires an API for authentication. Contact and work with Macrometa personnel to obtain the necessary credentials to proceed.
- **Determine waiting room needs**: The PhotonIQ VWRs offers numerous features to customize your waiting room needs:
    - **Queue types**: Depending on your particular business use case, VWR offers different [queue types](https://www.macrometa.com/docs/photoniq/vwrs/queue-types). For example, the FIFO type queues and dequeues users based on their order of arrival, while the random types chooses at random. 
    - **Required URLs**: Determine the URLs to incorporate the waiting rooms.
- **Gather Information**: Gather all the required information like domain details and traffic expectations to simplify the setup process.

## Integrating on Web 

Web apps typically use HTML, CSS, and JavaScript and operate within web browsers. This guide explains the steps to connect your web app to VWRs, enhancing your ability to manage high traffic efficiently and maintain a seamless user experience.

To establish your virtual waiting room:

1. [Create an API Key](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey): An API key grants you access to the VWRs system and is essential for all subsequent operations.

2. [Configure a VWRs EdgeWorker](../03-configuration-and-setup/01-configuring-edgeworkers.md): VWRs EdgeWorker helps manage the waiting room functionality on the Akamai side. This configuration is crucial for handling incoming traffic and directing it appropriately.

3. [Create and configure your waiting room](../03-configuration-and-setup/02-configure-waiting-rooms.md): This step allows you to fine-tune how the waiting room operates and integrates with your site.

## Integrating on Mobile

Unlike web-based apps, mobile apps are developed for specific platforms using platform-specific UI frameworks. Mobile apps require direct API interactions to manage user experiences effectively during high traffic periods.

1. [Create your API Key](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey): Start by creating an API key to access the VWRs system, as this key is essential for all API interactions.

2. Create and Configure your waiting room

3. Use the VWRs API to manage the user's position in the waiting room. This involves making periodic API calls to check the queue status and manage the user experience accordingly.

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

## Next Steps

Once your virtual waiting room is operational, consider monitoring and managing its performance to ensure optimal functionality:

- **Metrics and Analytics:** Regularly check the [VWRs metrics](../05-monitoring-vwrs/index.md) to assess the performance and effectiveness of your waiting room.
- **Review Usage Patterns:** Analyze usage data to optimize settings and improve user experiences. You can customize your settings to analyze usage statistics at different time intervals:
  - [Hourly Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getHourlyUsage)
  - [Daily Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getDailyUsage)
  - [Monthly Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getMonthlyUsage)
