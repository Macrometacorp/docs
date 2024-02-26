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

- (Recommended) Set up a reverse proxy using a tool such as Akamai, Cloudflare, or Nginx.
- Set up a subdomain

Either strategy requires coordination with your Macrometa partner, because there needs to be an administrator on both sides in order to map the URLs for first-party integration.





In Getting Started, this will work without first-party integration steps, but accuracy will be lower and some browsers will block the functionality.


### Reverse Proxy Setup
### Akamai Proxy Integration
If your plan supports then add property so that calls to the path “{your-website}/api/ds/*” are forwarded to "fps.photoniq.macrometa.io”. With this simple setup, the requests to FPS will now be considered as coming from the “same-site”.

Below are the steps that could be taken to add a simple request forward path:
Login to https://control.akamai.com/
Go to the “Properties” section and search for the property of the required URL. Add one if it doesn't exist already.
Now for the selected property, go to the “Property Configuration Settings” and add a new rule named “FPS Forward Rule”
Add a new “Criteria” in the Rules as “IF Path matches one of /api/ds/*”.
In the “Behaviors” section add the “Origin Server Hostname” as the photoniq url, like "fps.photoniq.macrometa.io”.
Enable the  True Client IP Header option in the property configuration for the above-configured rule. 
Name the True Client IP Header option as True-Client-IP.

### Subdomain Setup
Note: With the release of Safari 16.4, cookie lifetime in Safari is reduced to 7 days when using the custom subdomain setup. We recommend using a cloud proxy integration (e.g. Akamai Proxy Integration) to have cookies last up to one year in Safari.

This process requires adding DNS records to your site. Make sure you have the following access:
Need necessary access permission to the DNS service to be able to create the DNS record under that subdomain
Need a valid SSL certificate for the domain. If using Let’sEncrypt, need to do the DNS challenge
STRICTLY INTERNAL: Need access to the PhotonIQ cluster & create the corresponding K8s secret under the K8s namespace “kyv”, and update the FPS ArgoCD application resource to include the new hostname in the ingress TLS hostname field
