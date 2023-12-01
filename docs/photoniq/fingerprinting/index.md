---
sidebar_position: 1
title: Digital Fingerprinting
---

The PhotonIQ digital fingerprinting solution aims to generate a robust and reliable Visitor Identififyer (VisitorID) for website users, maintaining stability across operating system upgrades, browser updates, and multi-browser usage. This process uses a client-side agent within the user's browser and server-side code to recognize and distinguish between different devices and users.

## How It Works

Digital Fingerprinting uses advanced fingerprinting techniques to create a unique signature of a user's device. This allows recognizing users (visitors) across sessions and devices without relying only on cookies.

Some key techniques used:

- Collecting browser signals such as user agent, resolution, fonts, and so on.
- Leveraging Canvas and AudioContext APIs.
- Identifying individual visitors using CPU and memory stats, among other things.
- Proprietary algorithms and machine learning (ML) models.

When a new user visits your site, Digital Fingerprinting will:

- Generate a **Visitor ID (VID)** to identify that user uniquely.
- Create a **Signature** to fingerprint the user's device.

The same Visitor ID is recognized using the fingerprint and persists on subsequent visits, and the signature is updated to capture any new browser/device attributes. Digital Fingerprinting uses proprietary algorithms and ML models to match fingerprints with high confidence, even if some attributes change. A score indicates this confidence level.

## Key Features​

Key capabilities of Digital Fingerprinting include:

### Resilient Fingerprinting​

Digital Fingerprinting generates fingerprints that persist even when visitors take actions to avoid tracking, including:

- Using incognito/private browsing modes
- Clearing cookies
- Upgrading browser version

These fingerprints result from combining techniques such as:

- Browser Side Agent
- Server Side Detection
- Spoof Detection
- Bot Detection

### Browser Side Agent

When visitors access the webpage, a browser-side JavaScript library (referred to as an 'agent') is automatically loaded. This library is responsible for collecting various pieces of information about the visitor's browser. Once gathered, this data is transmitted to the Digital Fingerprinting service. There, the information undergoes processing, allowing visitors to be identified using proprietary algorithms and advanced machine-learning models. The data types collected include but are not limited to, user agents, screen resolutions, and CPU counts.

These signals, along with server signals, bot detection, and spoof detection, are used to identify each visitor uniquely. A history is kept of when the visitors visited the website and when their signals changed. But while the signals change, they are always identified as the same visitor.

### Server Side Detection

Among the techniques the Digital Fingerprint server uses to identify visitors is determining if a visitor is accessing your website via a VPN. It compares the visitor's browser time zone with the source address's time zone and a list of well-known public VPN servers to identify if the visitor uses a VPN.

An additional example is that the server compares the visitor's IP address with their ISP's Autonomous System Numbers (ASN) and detects the visitor’s location has changed. With this location, the Digital Fingerprint service offers geolocation services to determine the visitor's location, including city, state, and zip code.

### Spoof Detection

Spoof detection is where we attempt to detect unusual activity. We analyze the signals to see if there are any unusual combinations. For example, if a User-Agent indicates it is coming running on a Windows Operating System, but the browser is reporting it is Safari. Another example of unusual activity is if the screen resolution is desktop, but the User-Agent indicates it is a mobile device. These are all indications of someone attempting to change the appearance of the person connecting to your website. Any signs that suggest the possibility of spoofing indicate a bot trying to hide its appearance. Therefore, we label this visitor as an unknown bot.

### Bot Detection

The process of identifying automated activity on a website is known as bot detection. This technique distinguishes between human and bot traffic on a website. Bot detection helps maintain a website's security and integrity by preventing spam, fraud, and other malicious activities. It analyzes a variety of browser attributes and gives a bot detection signal with one of three values:

- Good bot - An example of a good bot is a bot belonging to a well-known search engine (Google, Amazon, Bing). Or a bot that monitors uptime. These are non-harmful bots.
- Bad bot - Some bots connect to networks using IP addresses that are widely known and have been marked as banned on the internet. This ban list combines well-known industry-curated IP ban lists and our ban list.
- Unknown bot - usually an automation tool like Selenium, Puppeteer, Playwright, or anything that pretends to be a good search bot.

## Fingerprint Metrics

When a visitor accesses your website, the Digital Fingerprint service uniquely identifies them. At the same time, the fingerprint service collects metrics about the individual visitor. These metrics include device types (e.g., desktop, mobile), whether the visitor is a human or a bot, and how often these visitors access your website.

### Fingerprint Metrics Reports

The Digital Fingerprint service has several reports to show how often visitors return to your site, the type of devices that are accessing your site, and what kind of bots are accessing your site.

### Top N Visitors

The top N visitor reports the top n number of visitors that have returned to your website over a given date/time range.

### Device Types

The device types report returns all the different types of devices and how many of them accessed your website.

### Visitor Traffic

The visitor traffic report returns the number of good bots, bad bots, unknown bots, and humans who accessed your website. The report returns data in five-minute intervals over a date/time range of your choosing.

## Best Practices

### 1st Party vs 3rd Party Cookies

The Digital Fingerprint service uses [third-party cookies](first-third-party-cookie) by default, which may affect the accuracy of the identification process. To ensure high levels of identification accuracy, it is recommended to use a customer subdomain or a cloud proxy (such as Akamai). By employing this approach, the cookies set by the Digital Fingerprint service will be treated as [first-party cookies](first-third-party-cookie), which will enhance the identification precision.

### Fingerprint Browser Agent on Page Load

The JavaScript agent is loaded at page load time, and the function to get the visitor ID is run right away. For more information, click [here]().

### Visitor Identifier to third-party services

The Digital Fingerprint Visitor Identification (VisitorID) can be passed to a third-party service, like a web advertisement or coupon service. This service can use the visitor ID to customize its service without the user being strongly identified via a login mechanism.

## Support for All Major Browsers

Digital Fingerprinting works consistently across modern browsers, including:

- Google Chrome (Version 57+)
- Mozilla Firefox (Version 67+)
- Microsoft Edge (Version 105+)
- Apple Safari (Version 11.0+)

Browser-independent device signals are leveraged so fingerprints are not tied to any specific browser.
