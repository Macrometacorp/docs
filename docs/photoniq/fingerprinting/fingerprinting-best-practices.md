---
sidebar_position: 80
title: Fingerprint Best Practices
---


Follow these best practices to maximize the benefits offered by the dynamic fingerprinting service.

### First-Party vs. Third-Party Cookies

The Digital Fingerprint service uses [third-party cookies](first-third-party-cookie) by default, which may affect the accuracy of the identification process. To ensure high levels of identification accuracy, we recommend using a customer subdomain or a cloud proxy (such as Akamai). This approach treats the Fingerprint service cookies as [first-party cookies](first-third-party-cookie), enhancing identification precision.

### Fingerprint Browser Agent on Page Load

The script used to activate the agent affects the performance of the Fingerprint service. For example, activating the Javascript agents at page load time also runs a function that generates the `visitorId`, improving the speed and performance, unlike the script that activates the agent after clicking on a button, which takes longer. 

### Visitor Identifier to Third-Party Services

Passing the Digital Fingerprint Visitor Identification (VisitorID) into a third-party service, like a web advertisement or coupon service, allows these third parties to customize their service without the user being strongly identified via a login mechanism.