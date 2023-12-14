---
sidebar_position: 1
title: Digital Fingerprinting
---

The PhotonIQ digital fingerprinting solution aims to generate a robust and reliable Visitor Identifier (VisitorID) for website users, maintaining stability across operating system upgrades, browser updates, and multi-browser usage. This process uses a client-side agent within the user's browser and server-side code to recognize and distinguish between different devices and users.

## Benefits of Digital Fingerprinting

In the dynamic world of e-commerce, leveraging advanced strategies and technologies is crucial for staying competitive and maximizing business success. The following areas represent pivotal aspects where innovative approaches can significantly enhance online retail operations. From personalized marketing to sophisticated fraud detection, these strategies focus on optimizing customer experience, ensuring security, and boosting overall business efficiency. Each element is vital in attracting and retaining customers, driving revenue growth, and maintaining a solid market presence.

- **Personalized Marketing and Recommendations:** Enhance the relevance of product suggestions, leading to increased click-through and conversion rates.
- **Fraud Detection and Prevention:** Implement measures to reduce fraud, resulting in fewer chargebacks and refunds and enhancing customer trust.
- **Shopping Cart Abandonment Analysis:** Identify and address issues that lead to cart abandonment to boost the conversion rate and enhance customer retention.
- **Customer Lifetime Value Prediction**: Concentrate on high-value customers to maximize revenue, leading to more efficient marketing and improved profit margins.
- **A/B Testing:** Conduct precise A/B testing to inform better site design and pricing strategy decisions, improving conversion rates and overall revenue.

## Features​

Key capabilities of Digital Fingerprinting include:

### Resilient Fingerprinting​

Digital Fingerprinting generates fingerprints that persist even when visitors take actions to avoid tracking, including:

- Using incognito/private browsing modes
- Clearing cookies
- Upgrading browser version

### Browser-Side Agent

A browser-side JavaScript library (an 'agent') is automatically loaded when visitors access the webpage. This library is responsible for collecting various pieces of information about the visitor's browser. Once gathered, this data is transmitted to the Digital Fingerprinting service. The information is processed, allowing visitors to be identified using proprietary algorithms and advanced machine-learning models. The data types collected include but are not limited to, user agents, screen resolutions, and CPU counts.

These signals, along with server signals, bot detection, and spoof detection, are used to identify each visitor uniquely. A history is kept of when the visitors visited the website and their signals changed. But while the signals change, they are always identified as the same visitor.

### Server-Side Detection

Among the techniques the Digital Fingerprinting server uses to identify visitors is determining if a visitor is accessing your website via a VPN. It compares the visitor's browser time zone with the source address's time zone and a list of well-known public VPN servers to identify if the visitor uses a VPN.

The server compares the visitor's IP address with their ISP's Autonomous System Numbers (ASN) and detects the visitor’s location has changed. With this location, Digital Fingerprinting offers geolocation services to determine the visitor's location, including city, state, and zip code.

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

Digital Fingerprinting works consistently across modern browsers, including:

- Google Chrome (Version 57+)
- Mozilla Firefox (Version 67+)
- Microsoft Edge (Version 105+)
- Apple Safari (Version 11.0+)

Browser-independent device signals are leveraged so fingerprints are not tied to any specific browser.
