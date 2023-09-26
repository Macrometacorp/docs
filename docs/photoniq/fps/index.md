---
sidebar_position: 1
title: Digital Fingerprinting
---

PhotonIQ Fingerprinting Service (FPS) is a managed service that generates persistent browser fingerprints and visitor IDs for your website users.

## Overview

FPS uses advanced fingerprinting techniques to create a unique signature of a user's device. This allows recognizing users across sessions and devices without relying only on cookies.

Some key techniques used:

- Collecting browser signals such as user agent, resolution, fonts, etc.
- Leveraging Canvas and AudioContext APIs.
- Fingerprinting using CPU and Memory.
- Applying proprietary algorithms and ML models.

When a new user visits your site, FPS will:

- Generate a **Visitor ID (VID)** to identify that user uniquely.
- Create a **Signature** to fingerprint the user's device.

The same Visitor ID is recognized using the fingerprint and persists on subsequent visits. The signature is updated to capture any new browser/device attributes. FPS uses proprietary fuzzy logic and ML models to match fingerprints with high confidence, even if some attributes change. A match score indicates this confidence level.
