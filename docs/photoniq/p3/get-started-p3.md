---
sidebar_position: 20
title: Get Started with P3
---

To get started with Macrometa's PhotonIQ Performance Proxy (P3), you need to configure your Akamai CDN as well as set up your PhotonIQ Proxy dashboard. This guide explains all the steps in that process.

## Getting Started with P3 on Akamai CDN


This guide demonstrates configuring Akamai CDN to direct web traffic through Macrometa's PhotonIQ Performance Proxy (P3), enhancing your site's speed and reliability. Suitable for A/B testing and live production scenarios, this document ensures optimal utilization of Akamai's Production network, with the Staging network reserved exclusively for functionality tests.

## Prerequisites

Before you start, make sure you have:

- An active Akamai account.
- Rights to edit and activate configurations on Akamai properties.
- A compiled list of URLs for optimization.
- Access to Macrometa P3 service, whitelisted on your origin servers.
- Access to Global Traffic Management (GTM) or an Application Load Balancer.

## Configure GTM

Using Global Traffic Management (GTM) for A/B testing allows for efficient traffic distribution, making it essential for evaluating the performance impact of P3 optimizations.

### Introduction to GTM Configuration

Configuring GTM in your Akamai account enables precise traffic management to P3, enhancing site performance through targeted optimizations. Here's how to set it up:

1. Open the Akamai control panel and click on **Global Traffic Management** from the hamburger menu. If you haven't yet configured a domain, follow Akamai's setup instructions.
2. Select the domain you wish to use for routing to P3, which opens its configuration page.
3. Under the **Data Centers** tab, add P3 as a Data Center, filling in the necessary details, including the location provided by P3. The system will autofill the geographical coordinates.
4. Navigate to the **Properties** tab, pick the property designated for P3 traffic, and click on **Traffic Distribution Targets**. Then, click **Add New Target** and choose the P3 data center.
5. Determine the data center weight to decide the traffic percentage directed to P3. Enable the target, enter the P3 server's handout CNAME, and save your changes.
6. Conclude by activating these configurations. Optionally, add a CNAME record (e.g., p3Optimizations.macrometa.io) through Edge DNS or another domain manager to balance traffic between two servers.

## Select Property

Effectively routing your web traffic through P3 starts with selecting the appropriate property for optimization, ensuring the changes improve your site's performance.

### How to Select Your Property for Optimization

1. Log into the Akamai Control Console and navigate to **Properties** under the CDN menu from the hamburger menu.
2. Click on the property you plan to optimize with P3. This action leads you to its detail page.
3. On this page, choose the version you're editing, then right-click on the actions tab and select **Edit New Version**.

## Create Rule

A new rule dedicated to directing traffic to P3 simplifies the optimization process, directly benefiting your website's performance.

### Steps to Create a New Forwarding Rule

1. Access the **Property Configuration Settings** and tap on the **Rules** tab to introduce a new rule.
2. Name your rule, for instance, "Forward To P3 Server," ensuring it is positioned correctly within the rule hierarchy.
3. In your new rule, focus on defining the **Behaviors** tab with specific details for accurate traffic routing to your P3 optimized content.

## Requests Routing

Correctly routing requests to P3 is vital for leveraging its full optimization capabilities, directly influencing your website's user experience and performance.

### Configuring Request Routing

1. In the **Behaviors** tab of your rule, add a standard property behavior by searching for **Your Origin Server**, then select **Insert Behavior** and fill in the required details:
    - The origin type should be your origin server.
    - **Origin Server Hostname** should correspond to the GTM property you set earlier.
    - **Forward Host Header** and **Cache Key Hostname** should match the origin hostname.
2. Incorporate additional behaviors as needed for IPv6 support, client IP headers, and SSL certificate specifics to align with your site's security and traffic management requirements.
3. Add caching behaviors that mirror your origin server's caching configuration and include a CP code for simplified management of P3-routed content.

## Activate and Test

Testing your configuration in Akamai's staging environment before going live ensures the setup functions as intended, safeguarding your live traffic from potential disruptions.

### Activation and Testing Procedure

After configuring your property and rules, activate the changes in the staging environment to confirm their effectiveness. If successful, apply these settings in the production environment to optimize your traffic flow through P3.

## Alternative Without GTM

If GTM isn't available, direct configuration within your property's criteria


## Get Started with P3

After you have your Akamai rules configured, you need to set up a new policy in the P3 dashboard.

1. log in
2. (optional) PPM job
3. create policy
4. Check PPM before and after policy
5. test
6. validate
   