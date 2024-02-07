---
sidebar_position: 1
title: Fingerprint
---

PhotonIQ Fingerprint is a sophisticated AI/ML-powered solution tailored for enterprises requiring accurate visitor identification, boasting a 99.5% accuracy rate. This advanced system effectively links browser fingerprints to individual devices, identifying anonymous traffic with precision. It's crucial for business strategies focused on combating fraud, enhancing security, and improving user experiences to drive higher conversion rates.

The solution operates with a dual-component approach: a client-side agent in the user's browser and server-side code, ensuring reliable identification across diverse devices and browsers. Fingerprint prioritizes visitor privacy and adheres to regional data regulations, integrating seamlessly with existing systems. By providing a secure, privacy-conscious alternative to conventional tracking, it enables businesses to convert anonymous traffic into valuable, actionable insights without compromising on compliance or visitor privacy.

### How It Works

Fingerprint uses advanced fingerprinting techniques to create a unique signature of a user's device. This allows recognizing users (visitors) across sessions and devices without relying only on cookies.

For a more detailed explanation, refer to [How Fingerprint Works](how-fingerprinting-works.md).

## Benefits of Fingerprint

Fingerprint, powered by a patented AI/ML pipeline, provides a comprehensive solution for e-commerce platforms, enhancing customer experience, security, and overall business efficiency. Here's an updated list of benefits, integrating the new content while maintaining the essence of the original list:

- **Advanced Accuracy with AI/ML Technology:** Utilizes an advanced AI/ML pipeline, achieving a p95 accuracy of 99.5%, ensuring highly reliable visitor identification.
- **Enhanced Personalization:** Combines with other PhotonIQ services for smart visitor signals, enabling personalized customer experiences beyond cohort-level generalizations.
- **Privacy-First Identification:** Offers a privacy-preserving alternative to cookies, identifying visitors in-region and maintaining compliance with data privacy regulations.
- **Comprehensive Fraud Detection and Prevention:** Effectively addresses various fraudulent activities like coupon abuse, subscription misuse, payment fraud, account sharing, and fake account creation. This proactive approach enhances customer trust and reduces financial losses.
- **Web Scraping and Credential Stuffing Prevention:** Helps prevent unauthorized data extraction and credential abuse, safeguarding your digital assets and customer information.
- **Anonymous Visitor Identification and Tracking:** Identifies and tracks anonymous visitors, transforming them into valuable data points for targeted marketing and insight generation.
- **Seamless Integration with Other Services:** Fingerprint can be seamlessly combined with other services for a holistic approach to visitor management and personalization.
- **Actionable Insights on User Behavior:** Offers deep insights into user and visitor behavior, aiding in the detection of threats and unusual activities, and improving decision-making processes.
- **Device-Level Identification for Security:** Pinpoints individual devices, aiding in the prevention of multiple sign-ups from the same device and enhancing overall security measures.

By leveraging these benefits, PhotonIQ Fingerprint not only fortifies security measures but also significantly improves user engagement and business operations, making it a vital tool for e-commerce platforms seeking to excel in a competitive digital landscape.

## Features​

Key capabilities of Fingerprint include:

### Resilient Fingerprinting​

Fingerprint generates fingerprints that persist even when visitors take actions to avoid tracking, including:

- Using incognito/private browsing modes
- Clearing cookies
- Upgrading browser version

### Browser-Side Agent

A browser-side JavaScript library (an 'agent') is automatically loaded when visitors access the webpage. This library is responsible for collecting various pieces of information about the visitor's browser. Once gathered, this data is transmitted to the Fingerprint service. The information is processed, allowing visitors to be identified using proprietary algorithms and advanced machine-learning models. The data types collected include but are not limited to, user agents, screen resolutions, and CPU counts.

These signals, along with server signals, bot detection, and spoof detection, are used to identify each visitor uniquely. A history is kept of when the visitors visited the website and their signals changed. But while the signals change, they are always identified as the same visitor.

### Server-Side Detection

Among the techniques the Fingerprint server uses to identify visitors is determining if a visitor is accessing your website via a VPN. It compares the visitor's browser time zone with the source address's time zone and a list of well-known public VPN servers to identify if the visitor uses a VPN.

The server compares the visitor's IP address with their ISP's Autonomous System Numbers (ASN) and detects the visitor’s location has changed. With this location, Fingerprint offers geolocation services to determine the visitor's location, including city, state, and zip code.

### Spoof Detection

Spoof detection is where Dynamic Fingerprinting attempt to detect unusual activity. It analyzes the signals to see if there are any unusual combinations.

For example, if a user-agent indicates it is coming running on a Windows Operating System, but the browser is reporting it is Safari. Another instance of unusual activity is if the screen resolution is desktop, but the user-agent indicates it is a mobile device.

These are indications of someone attempting to change the appearance of the person connecting to your website. Any signs that suggest the possibility of spoofing indicate a bot trying to hide its appearance. Therefore, Dynamic Fingerprinting labels this visitor as an unknown bot.

### Bot Detection

The process of identifying automated activity on a website is known as bot detection. This technique distinguishes between human and bot traffic on a website. Bot detection helps maintain a website's security and integrity by preventing spam, fraud, and other malicious activities. It analyzes a variety of browser attributes and gives a bot detection signal with one of three values:

- Good bot - An example of a good bot is a bot belonging to a well-known search engine (Google, Amazon, Bing). Or a bot that monitors uptime. These are non-harmful bots.
- Bad bot - Some bots connect to networks using IP addresses that are widely known and have been marked as banned on the internet. This ban list combines well-known industry-curated IP ban lists and our ban list.
- Unknown bot - usually an automation tool like Selenium, Puppeteer, Playwright, or anything that pretends to be a good search bot.

## Support for All Major Browsers

Fingerprint works consistently across modern browsers, including:

- Google Chrome (Version 57+)
- Mozilla Firefox (Version 67+)
- Microsoft Edge (Version 105+)
- Apple Safari (Version 11.0+)

Browser-independent device signals are leveraged so fingerprints are not tied to any specific browser.
