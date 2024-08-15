---
sidebar_position: 10
title: How Fingerprint Works
---

Fingerprint uses advanced fingerprinting techniques to create a unique signature of a user's device. 

These key techniques include:

- Collecting browser signals such as user agent, resolution, and fonts.
- Leveraging Canvas and AudioContext APIs.
- Identifying individual visitors using CPU and memory stats, among other things.
- Proprietary algorithms and machine learning (ML) models.

Applying a combination of these techniques helps websites and applications recognize users (visitors) across sessions and devices without relying only on cookies, thus ensuring user privacy. 

**Here's how the service works:**

1. A user visits your site
1. The Fingerprint service generates a unique **Visitor ID (VID)** to identify the user.
1. The service also creates a **Signature** to fingerprint the user's device.

Fingerprint uses the generated visitor ID to recognize and identify users on subsequent visits and updates the signature to capture any new browser/device attributes. 

:::note
Fingerprint uses proprietary algorithms and ML models to match fingerprints with high confidence, even with changing attributes. A score indicates this confidence level.
:::
