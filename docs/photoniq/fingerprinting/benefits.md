---
sidebar_position: 2
title: Features and Benefits
---

For businesses with customers worldwide, Fingerprint provides a comprehensive solution that empowers privacy-first identification for enhanced personalization and customization in developing business strategies.  
Some of these features include: 

### Resilient Fingerprinting​

The Fingerprint service generates fingerprints that persist even after visitors take actions to avoid tracking. These actions include:

- Using incognito/private browsing modes
- Clearing cookies
- Upgrading browser version

### Browser-Side Agent

Fingerprint uses a browser-side agent. This agent (a browser-side JavaScript library) automatically loads, collects, and transmits information about a visitor's browser to the Fingerprint service. Fingerprint processes this information using proprietary algorithms and advanced machine-learning models to identify web visitors. Some data types collected include user agents, screen resolutions, CPU counts, and others.

### Server-Side Detection

Fingerprint also uses server-side detection for its geolocation service to determine the visitor's location, including city, state, and zip code. It determines if users access your website via a VPN and compares the visitor's browser time zone with the source address's time zone and a list of well-known public VPN servers to identify the VPN used.

The server compares the visitor's IP address with their ISP's Autonomous System Numbers (ASN) to detect any change in the visitor's location. 

### Spoof Detection
Fingerprint employs a dynamic approach for spoof detection, analyzing and labeling signals for unusual combinations to detect threats to a webpage and thereby prevent access to confidential user information. 

Here are two instances of such unusual activity:

- A user-agent running on a Windows OS, but the browser reports it as Safari.
- The screen resolution is desktop, but the user-agent reports it is a mobile device.

This unusual behavior often indicates spoofing—an attempt to change the appearance of the user connecting to your website and signals a bot trying to hide its appearance. 

### Bot Detection
Web traffic includes human and automated traffic. Bot detection distinguishes between human and bot traffic on a website by identifying automated activity. 
On analyzing a variety of browser attributes, the Fingerprint service gives a bot detection signal with one of three values: 
- **Good bot:** Non-harmful bots. Examples include bots belonging to a well-known search engine (Google, Amazon, Bing) or those monitoring uptime. 
- **Bad bot:** These bots connect to networks using widely-known and banned IP addresses on the internet. This ban list combines well-known industry-curated IP ban lists and our ban list.
- **Unknown bot:** Includes automation tools like Selenium, Puppeteer, Playwright, or anything posing as a good search bot.

By accurately identifying these bots, Fingerprint helps maintain a website's security and integrity by preventing spam, fraud, and other malicious activities.

### Support for All Major Browsers

Fingerprint leverages browser-independent device signals for its operations, making it practical for use across different modern browsers like:

- Google Chrome (Version 57+)
- Mozilla Firefox (Version 67+)
- Microsoft Edge (Version 105+)
- Apple Safari (Version 11.0+)

## Benefits

- **Advanced Accuracy with AI/ML Technology:** Utilizes an advanced AI/ML pipeline, achieving a p95 accuracy of 99.5%, ensuring highly reliable visitor identification.
- **Enhanced Personalization:** Works with other PhotonIQ services for smart visitor signals, enabling personalized customer experiences beyond cohort-level generalizations.
- **Privacy-First Identification:** Offers a privacy-preserving alternative to cookies, identifying visitors in-region and maintaining compliance with data privacy regulations.
- **Comprehensive Fraud Detection and Prevention:** Effectively prevents fraudulent activities like coupon abuse, subscription misuse, payment fraud, account sharing, and fake account creation. This proactive approach enhances customer trust and reduces financial losses.
- **Web Scraping and Credential Stuffing Prevention:** Fingerprint prevents unauthorized data extraction and credential abuse, safeguarding your digital assets and customer information.
- **Anonymous Visitor Identification and Tracking:** Identifies and tracks anonymous visitors, transforming them into valuable data points for targeted marketing and insight generation.
- **Seamless Integration with Other Services:** Fingerprint integrates with other services for a holistic approach to visitor management and personalization.
- **Actionable Insights on User Behavior:** Offers deep insights into visitor behavior, aiding in the detection of threats and unusual activities and improving decision-making processes.
- **Device-Level Identification for Security:** Pinpoints individual devices, aiding in the prevention of multiple sign-ups from the same device and enhancing overall security measures.