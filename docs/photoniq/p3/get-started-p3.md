---
sidebar_position: 20
title: Get Started with P3
---

To get started with Macrometa's PhotonIQ Performance Proxy (P3), you need to configure your Akamai CDN as well as set up the optimization policy for your website using the PhotonIQ Proxy dashboard. This guide explains all the steps in that process.

## High-level Steps

At the simplest level, there are steps to setting up P3:

1. Create a P3 policy to define what optimizations are applied to which website. You can create a policy for each group of websites that share a similar structure. For example, some sites might need light optimization, others might need aggressive optimization.
2. Configure Akamai to route some or all traffic to the P3 servers.
3. Test that P3 is configuring the pages.
4. Validate and monitor the service.

## Prerequisites

Before you start, make sure you have:

- An active Akamai account.
- Rights to edit and activate configurations on Akamai properties.
- A complete list of URLs for optimization.
- Access to the Macrometa P3 service, whitelisted on your origin servers.
- Access to Global Traffic Management (GTM) or an Application Load Balancer.

## Get Started with P3

Set up a new policy in the P3 dashboard to tell P3 how to optimize your website. This defines the optimization rules, but P3 will not optimize your pages until you route traffic to the P3 server.

### (Optional) Create PPM Job

If you are interested in checking your web vitals before and after P3 optimizes your sites, then you might want to [create a Performance Proxy Metrics (PPM) job](manage-ppm-service.md#create-a-ppm-job) before you begin. You can then [view the web vitals metrics](manage-ppm-service.md#view-web-vital-metrics) before and after sites are optimized.

For more information about PPM, refer to [Manage Performance Proxy Metrics Jobs](manage-ppm-service.md).

### Create a Policy

A P3 _policy_ is a set of optimization rules applied to one or more origin URLs that you define when you [create a P3 policy](manage-p3-policies#create-a-policy).

For more information about managing policies, refer to [Manage P3 Policies](manage-p3-policies.md).

## Get Started with P3 on Akamai CDN

This part of the guide demonstrates configuring Akamai CDN to direct web traffic through P3.

### Configure GTM

Using Global Traffic Management (GTM) allows you to manage traffic distribution, either for routing all traffic to P3-optimized sites or for A/B testing to measure the impact of optimizations. Follow these steps to set it up:

1. Open the Akamai control panel and click on **Global Traffic Management** from the hamburger menu. If you haven't yet configured a domain, then follow Akamai's setup instructions.
2. Select the domain that you want to use for routing to P3, which opens its configuration page.
3. Click the **Data Centers** tab and then add P3 as a **Data Center**, filling in the necessary details, including the location provided by P3. The system will autofill the geographical coordinates.
4. Navigate to the **Properties** tab, pick the property designated for P3 traffic, and then click **Traffic Distribution Targets**.
5. Click **Add New Target** and choose the P3 data center.
6. Determine the data center weight to decide the traffic percentage directed to P3. Enable the target, enter the P3 server's handout CNAME, and then save your changes.
7. Finish by activating these configurations. ((HOW???))
8. (Optional) Add a CNAME record (e.g., p3Optimizations.macrometa.io) through Edge DNS or another domain manager to balance traffic between two servers.

### Select a Property to Optimize

Effectively routing your web traffic through P3 starts with selecting the appropriate property for optimization, ensuring the changes improve your site's performance.

1. [Log in to the Akamai Control Console](https://control.akamai.com/).
2. In the CDN menu, click **Properties**.
3. Click on the property that you plan to optimize with P3. This action leads you to its detail page.
4. On this page, choose the version you're editing, then right-click on the actions tab and select **Edit New Version**.

### Create a New Rule

Create a new rule to direct traffic to P3:

1. In the **Property Configuration Settings**, click the **Rules** tab to add a new rule.
2. Name your rule, for instance, "Forward To P3 Server."
3. Click **Insert Rule**. If you have previously configured a Conditional Origin Group, then you might have to move your rule above or below it.
4. Click on the **Forward To P3 Server** rule. You will see two blank tabs on the right: Criteria and Behaviors.

### Configure Request Routing

Configure request routing in the Behaviors tab:

1. In the **Behaviors** tab of your rule, then click to add a standard property behavior. A popup will open to search for **Your Origin Server**.
2. Select **Insert Behavior** and then enter the following information in the fields:
   - **Origin Type** - Your origin server
   - **Origin Server Hostname** - The GTM property you set earlier
   - **Forward Host Header** - The origin hostname
   - **Cache Key Hostname** - The origin hostname
   - **IPv6 Origin Support** - IPv4-Only
   - **Supports Gzip Compression** - Yes
   - **Send True Client IP Header** - Yes
   - **True Client IP Header Name** - True-Client-IP
   - **Allow Clients To Set True Client IP Header** - No
   - **Verification Settings** - Choose Your Own
   - **Use SNI TLS Extension** - Yes
   - **Match CN/SAN To** - `{{Origin Hostname}} {{Forward Host Header}} <GTM-Configured-Cname>`

   The other settings in the Origin SSL Certificate Verification depend on your property certificate settings.

   - **Port**
     - **HTTP Port** - 80
     - **HTTPS Port** - 9443
   - **Caching** - Click on +Behavior to add settings for caching P3 optimized pages - ideally matching cache setting of your origin server.
   - **Content Provider Code** - Click on +Behavior for adding the CP code. Creating a new CP code makes it easier to identify content being routed to P3 and purge content, monitor stats, and for Akatec to collect logs should the need arise.
3. Save the property and then go back to the Property Details page.

After configuring your property and rules, activate the changes in the staging environment to confirm their effectiveness. If successful, apply these settings in the production environment to optimize your traffic flow through P3.

### Alternative Without GTM

If GTM isn't available, then directly configuration within your property's criteria.

1. On the Criteria tab, click on **Match**.
2. Click **Match All**.
3. Select the path and give the value of the path for which you are want to use P3.
4. Click **Match** to add one more check. This check will be for [Percentage of Clients](https://techdocs.akamai.com/property-mgr/docs/percentage-clients).
   - Give the value as 50 if you want to divide the traffic 50/50, 100 to send all traffic to P3.
   - We recommend that you do this with the help of your Akamai Technical Partner.

## Validate that P3 is Optimizing Your Site

We recommend that you test P3 on the Akamai Staging network before you activate the configuration on Akamai's Production network. This will allow you to test different levels of optimization and work with your Macrometa partners to fine-tune P3 settings.

You can use the cURL command or a mod header browser extension to test the paths you have configured for optimizing. If the response is coming from P3, then you will see the `x-photoniq-p3` header present.

The P3 dashboard also provides a number of tools for you to monitor the service. You can:

- [View P3 Metrics](view-p3-metrics.md)
- [View P3 Validations](view-p3-validations.md)
- [View P3 Optimizations](view-p3-optimizations.md)
- [View P3 Alerts](view-p3-alerts.md)
- [View P3 Audit Log](view-p3-audit-log.md)
