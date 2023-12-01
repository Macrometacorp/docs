---
sidebar_position: 10
title: How Digital Fingerprinting Works
---

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
