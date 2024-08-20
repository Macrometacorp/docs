---
sidebar_position: 25
title: First Party Fingerprint Integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once installed on your website, the Fingerprint agent performs these key actions:

- **Downloads the Latest Device Intelligence Script**: This ensures the agent uses updated device identification methods.
- **Collects and Sends Browser Attributes**: The agent sends collected data to the Fingerprint server and receives a unique visitor ID, facilitating accurate visitor identification.
- **Makes Additional Requests**: These requests further enhance the accuracy of visitor identification by using an advanced identification algorithm on the server side.

:::important
Ensure the web application and cookies are integrated as first-party elements to achieve the best accuracy and results when using PhotonIQ Fingerprint. This first-party integration means their URLs must match the website they're associated with.
:::

## Why integrate Fingerprint as a First-party Element

Privacy is a crucial concern for many web users, so tools like ad-blockers (such as Adblock and uBlock Origin) and privacy-focused browsers (like Brave) designed to block third-party elements might interfere with fingerprinting processes and block requests to Fingerprint servers, potentially preventing the identification of all visitors to your site. 

These tools restrict the Fingerprint service by maintaining a list of Fingerprint domains and blocking browser requests that match these domains. Additionally, some VPN providers might block access to our domains at the DNS level, further complicating the identification process.

To prevent this and minimize Fingerprint service interruptions, you must integrate the PhotonIQ Fingerprint service as a first-party instead of the default third-party element.

:::tip
Learn more about [how first-party and third-party elements affect user privacy and web browsers](first-third-party-cookie.md).
:::


## First-Party Integration Benefits

Integrating the PhotonIQ Fingerprint script as a first-party cookie on your browser offers significant advantages:

- **Accuracy Improves in Privacy-Focused Browsers**: Integration as a first-party dramatically increases accuracy in browsers with strict privacy settings like Safari and Firefox, ensuring the Fingerprint script operates effectively within these environments.
- **Extended Visitor ID Lifespan and Ad Blocker Compatibility**: First-party cookies have a longer lifespan, which helps maintain visitor IDs over time. Additionally, since ad blockers typically allow connections to the same site's URLs, integrating the Fingerprint agent as a first-party prevents it from being blocked, ensuring uninterrupted operation.
- **Increased Security Against Fraudsters**: Making Fingerprint usage harder to detect for fraudsters adds an extra layer of security, safeguarding your data and the integrity of the identification process.

## Integration Options

There are two primary strategies for integrating Fingerprint as a first party. 

- Cloud Proxy Setup (Akamai, Cloudflare)
- Subdomain setup

Each strategy requires coordinating with your Macrometa partner to ensure proper URL mapping for first-party integration.

<Tabs groupId="fingerprint-firstparty-integration">
<TabItem value="cloud proxy" label="Cloud Proxy - Akamai setup">

This is the recommended setup and involves using a cloud proxy service like Akamai, Cloudflare, or Nginx for integrating Fingerprint as a first-party. It involves forwarding traffic to the PhotonIQ server through a proxy hosted on your domain or subdomain, such as `metrics.yourwebsite.com`.

### Benefits of Cloud Proxy

- Cookie lifetime of up to one year (including Safari 16.4+)
- Enhanced control and insight over identification requests
- Secure cookie handling, scalability, and compliance management

### Setting up Akamai Cloud Proxy

:::note
If your plan supports it, add property so that calls to the path `{your-website}/api/ds/*` are forwarded to `fps.photoniq.macrometa.io`.
:::

To set up and Akamai proxy

1. Log in to [Akamai Control Center](https://control.akamai.com/).
2. In **Properties**, find the URL property you're setting up with Fingerprint. Create one if necessary.
3. Select the property, go to **Property Configuration Settings**, and add a new rule named `Fingerprint Forward Rule`.
4. Under **Criteria**, add `IF Path matches one of /api/ds/*`.
5. In **Behaviors**, set **Origin Server Hostname** to the PhotonIQ server.
6. Enable **True Client IP Header** for the `Fingerprint Forward Rule`.
7. Name the **True Client IP Header** option `True-Client-IP`.

</TabItem>
<TabItem value="subdomain" label="Subdomain setup">

This setup method requires adding DNS records to your domain server. Before proceeding, ensure you have the necessary DNS access and a valid TLS certificate for the subdomain.

:::note
This approach, while simpler, may result in a reduced cookie lifetime in Safari 16.4 or higher to just seven days,  a significant reduction from using the Cloud Proxy setup. A cloud proxy integration is recommended for cookies to last up to one year.
:::

To setup your subdomain:

1. Create a subdomain off of your domain that points to the Fingerprint server.
2. Set up the subdomain as an alias record, pointing it to the Fingerprint server.
3. Get a valid TLS certificate for the domain.
4. Adjust your DNS records.
5. Adjust the JavaScript agent configuration on your website.


</TabItem>
</Tabs>