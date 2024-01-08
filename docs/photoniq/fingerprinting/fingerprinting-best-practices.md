---
sidebar_position: 80
title: Best Practices
---

This page describes best practices to adopt in order to get the most out of Dynamic Fingerprinting.

### First-Party vs. Third-Party Cookies

The Digital Fingerprint service uses [third-party cookies](first-third-party-cookie) by default, which may affect the accuracy of the identification process. To ensure high levels of identification accuracy, it is recommended to use a customer subdomain or a cloud proxy (such as Akamai). By employing this approach, the cookies set by the Digital Fingerprint service will be treated as [first-party cookies](first-third-party-cookie), which will enhance the identification precision.

### Fingerprint Browser Agent on Page Load

The JavaScript agent is loaded at page load time, and the function to get the visitor ID is run right away. For more information, refer to [Fingerprint on Page Load](get-started-fingerprinting.md#fingerprint-on-page-load).

### Visitor Identifier to Third-Party Services

The Digital Fingerprint Visitor Identification (VisitorID) can be passed to a third-party service, like a web advertisement or coupon service. This service can use the visitor ID to customize its service without the user being strongly identified via a login mechanism.
