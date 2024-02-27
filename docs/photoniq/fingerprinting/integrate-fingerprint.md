---
sidebar_position: 25
title: Integrate Fingerprint
---

For maximum accuracy and best results, the PhotonIQ Fingerprint application and cookies must both be integrated as first parties. This means that their URLs match the website that they are attached to.

## First-party Integration Benefits

For the most accurate identification, the browser must consider the Fingerprint script as “first party”. This accrues several benefits:

- Significant increase in accuracy in browsers with strict privacy features such as Safari or Firefox.
- First-party cookies can live longer in the browser and extend the lifetime of visitor IDs. For a more detailed explanation of how this affects cookies, refer to [First- and Third-Party Cookies](first-third-party-cookie.md).
- Ad blockers will not block the Fingerprint agent from loading. Attempts to connect to an external URL will be stopped by most ad blockers while attempts to connect to the same site URL will be allowed.
- Ad blockers will not block Fingerprint identification requests, because they are sent to the specified path or subdomain that belongs to the same site.

## Integration Options

There are two strategies for integrating Fingerprint as a first party:

- (Recommended) Set up a cloud proxy using a tool such as Akamai, Cloudflare, or Nginx.
- Set up a subdomain

Either strategy requires coordination with your Macrometa partner, because there needs to be an administrator on both sides in order to map the URLs for first-party integration.

:::note
With the release of Safari 16.4, cookie lifetime in Safari is reduced to 7 days when using the custom subdomain setup. We recommend using a cloud proxy integration to have cookies last up to one year in Safari.
:::

### Cloud Proxy Setup

For first-party integration, you must ensure all traffic to the PhotonIQ server comes from your company's domain.  This is accomplished by redirecting all traffic to the server using a cloud proxy such as Akamai.

Make sure you have the following permissions:

- x
- x

Perform the following steps:

1. x
2. x
3. x

#### Akamai Proxy Integration

As an example, here are the steps to set up an Akamai proxy.

If your plan supports then add property so that calls to the path `{your-website}/api/ds/*` are forwarded to `fps.photoniq.macrometa.io`.

1. Log in to https://control.akamai.com/.
2. In the **Properties** section, search for the property of the required URL. Add one if it doesn't exist already.
3. For the selected property, navigate to the **Property Configuration Settings** and add a new rule named `Fingerprint Forward Rule`.
4. Add a new **Criteria** in the rules as `IF Path matches one of /api/ds/*`.
5. In the **Behaviors** section, set the **Origin Server Hostname** to be the PhotonIQ server.
6. Enable the **True Client IP Header** option in the property configuration for the Fingerprint Forward Rule.
7. Name the **True Client IP Header** option `True-Client-IP`.

### Subdomain Setup

This process requires adding DNS records to your site. Make sure you have the following permissions:

- Necessary access permission to the DNS service to be able to create the DNS record under that subdomain
- A valid TLS certificate for the subdomain.

If you are integrating Fingerprint outside of a cloud proxy, then you must create subdomain and alias it to the PhotonIQ server. This process requires adding a DNS records to your domain server:

1. Create a subdomain off of your domain that points to the fps server.
2. Set up the subdomain as an alias record, pointing it to the fps server.
3. Get a valid SSL certificate for the domain. If using a product like Let’sEncrypt, then you need to do the DNS challenge.
