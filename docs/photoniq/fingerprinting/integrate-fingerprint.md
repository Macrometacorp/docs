---
sidebar_position: 25
title: Integrate Fingerprint as First Party
---

For the best accuracy and results when using PhotonIQ Fingerprint, ensure both the application and cookies are integrated as first-party elements. This integration means their URLs must match the website they're associated with.

Privacy is a crucial concern for many users. However, tools designed to protect user privacy, such as ad blockers and privacy-focused browsers, might interfere with Fingerprinting processes. These tools can block requests to Fingerprint servers, potentially preventing the identification of all visitors to your site.

For more information about privacy and cookies, refer to [First- and Third-Party Cookies](first-third-party-cookie.md).

## How the Fingerprint Agent Works on Your Website

The Fingerprint agent, once installed on your website, performs several key actions:

- **Downloads the Latest Device Intelligence Algorithm**: This ensures the most up-to-date method is used for identifying devices.
- **Collects and Sends Browser Attributes**: The agent sends collected data to the Fingerprint server and receives a unique visitor ID in return, facilitating accurate visitor identification.
- **Makes Additional Requests**: These requests further enhance the accuracy of visitor identification.

## Challenges from Ad Blockers and Privacy Browsers

Ad blockers (such as Adblock, uBlock Origin) and browsers with a focus on privacy (like Brave) actively block requests to Fingerprint servers. They do this by maintaining a list of Fingerprint domains and blocking browser requests that match these domains. Additionally, some VPN providers might block access to our domains at the DNS level, further complicating the identification process.

To ensure the best performance and minimize disruptions, consider advising users on configuring their privacy tools to allow your site's Fingerprinting processes. This approach helps balance user privacy with the need for accurate visitor identification.

## First-Party Integration Benefits

Integrating the PhotonIQ Fingerprint script as first-party on your browser offers significant advantages:

- **Accuracy Improves in Privacy-Focused Browsers**: Integration as first-party greatly increases accuracy in browsers with strict privacy settings like Safari and Firefox, ensuring the Fingerprint script operates effectively within these environments.
- **Extended Visitor ID Lifespan and Ad Blocker Compatibility**: First-party cookies have a longer lifespan, which helps maintain visitor IDs over time. Additionally, since ad blockers typically allow connections to the same site's URLs, integrating the Fingerprint agent as first-party prevents it from being blocked, ensuring uninterrupted operation.
- **Increased Security Against Fraudsters**: Making Fingerprint usage harder to detect for fraudsters adds an extra layer of security, safeguarding your data and the integrity of the identification process.

## Integration Options

There are two primary strategies for integrating Fingerprint as a first party, each requiring coordination with your Macrometa partner to ensure proper URL mapping for first-party integration.

### Cloud Proxy Setup (Recommended)

Use a cloud proxy service like Akamai, Cloudflare, or Nginx for first-party integration. This method involves redirecting traffic to the PhotonIQ server through a proxy hosted on your domain or subdomain, such as `metrics.yourwebsite.com`.

Benefits of cloud proxy setup include:

- Cookie lifetime of up to one year (even in Safari 16.4+)
- Enhanced control and insight over identification requests
- Secure cookie handling, scalability, and compliance management

#### Akamai Proxy Integration Steps

As an example, here are the steps to set up an Akamai proxy.

If your plan supports then add property so that calls to the path `{your-website}/api/ds/*` are forwarded to `fps.photoniq.macrometa.io`.

To set up an Akamai proxy:

1. Log in to [Akamai Control Center](https://control.akamai.com/).
2. In **Properties**, find the URL property you're setting up with Fingerprint. Create one if necessary.
3. Select the property, go to **Property Configuration Settings**, and add a new rule named `Fingerprint Forward Rule`.
4. Under **Criteria**, add `IF Path matches one of /api/ds/*`.
5. In **Behaviors**, set **Origin Server Hostname** to the PhotonIQ server.
6. Enable **True Client IP Header** for the `Fingerprint Forward Rule`.
7. Name the **True Client IP Header** option `True-Client-IP`.

### Subdomain Setup

You can set up a subdomain which requires adding DNS records. This approach, while simpler, may result in a reduced cookie lifetime in Safari 16.4 or higher to just seven days. To proceed, ensure you have the necessary DNS access and a valid TLS certificate for the subdomain.

:::note
Safari 16.4+ users may experience reduced cookie lifetime to 7 days with the subdomain setup. A cloud proxy integration is recommended for cookies to last up to one year.
:::

Setting up a subdomain requires adding a DNS records to your domain server. The high-level process will be something like this:

1. Create a subdomain off of your domain that points to the Fingerprint server.
2. Set up the subdomain as an alias record, pointing it to the Fingerprint server.
3. Get a valid TLS certificate for the domain.
4. Adjust your DNS records.
5. Adjust the JavaScript agent configuration on your website.
