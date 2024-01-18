---
sidebar_position: 10
title: How EST Works
---

PhotonIQ Edge Side Tagging (EST) relocates the execution of resource-demanding third-party scripts, typically utilized for advertising, analytics, and tracking, from the user's browser to a server-side environment at the network edge. This strategic shift significantly improves web performance and bolsters data privacy by minimizing client-side processing.

By executing third-party scripts server-side, EST dramatically reduces the load on the end user’s browser. This not only speeds up the website but also enhances user privacy by limiting the amount of data processed client-side. Moreover, EST's architecture aligns with modern web standards, offering a robust solution for website owners seeking to optimize performance and comply with evolving privacy regulations

## EST Architecture Diagram

![EST Architecture](/img/photoniq/est/est-architecture.png)

## How It Works

The operation of EST involves a few key steps:

1. **Initial Configuration**:
   - Configure your full domain address.
   - Set cookies in PhotonIQ EST settings via the web console.
   - Tailor third-party component behavior to your website's needs.

2. **Integration Script Embedding**:
   - Embed the PhotonIQ EST integration script on your website.
   - The script is lightweight, ensuring minimal impact on page load times.

3. **Cookie Management and Tracking**:
   - The integration script activates PhotonIQ EST tracker APIs during page visits.
   - These APIs generate specialized cookies for each third-party component, optimizing EST's tracking.
   - The cookies balance user interaction tracking with performance and privacy.

4. **Event Generation and Processing**:
   - User interactions on the site generate events.
   - The tracker API captures these events and relays them to PhotonIQ EST.
   - PhotonIQ EST processes events according to settings for each third-party component.

5. **Data Transmission to Third-Party Services**:
   - Processed data is securely and efficiently sent to third-party services.
   - Transmission complies with user settings, ensuring data handling meets website functionality and compliance standards.
