---
sidebar_position: 1
title: Digital Fingerprinting
---

Digital Fingerprinting tracks anonymous visitors and real-time behaviors across sessions, browsers, and devices without using cookies or PII.

## How It Works

Digital Fingerprinting uses advanced fingerprinting techniques to create a unique signature of a user's device. This allows recognizing users across sessions and devices without relying on cookies.

Some key techniques used:

- Collecting browser signals such as user agent, resolution, fonts, and so on.
- Leveraging Canvas and AudioContext APIs.
- Fingerprinting using CPU and memory.
- Proprietary algorithms and machine learning (ML) models.

When a new user visits your site, Digital Fingerprinting will:

- Generate a **Visitor ID (VID)** to identify that user uniquely.
- Create a **Signature** to fingerprint the user's device.

The same Visitor ID is recognized using the fingerprint and persists on subsequent visits, and the signature is updated to capture any new browser/device attributes. Digital Fingerprinting uses proprietary fuzzy logic and ML models to match fingerprints with high confidence, even if some attributes change. A match score indicates this confidence level.

## Key Features

Key capabilities of Digital Fingerprinting include:

### Resilient Fingerprinting

Digital Fingerprinting generates fingerprints that persist even when users take actions to avoid tracking, including:

- Using incognito/private browsing modes
- Clearing cookies
- Upgrading browser version

This is achieved by combining browser-agnostic techniques like:

- Canvas fingerprinting
- Hardware fingerprinting using CPU cores, memory info, etc.

Such resilient fingerprints ensure reliable user identification and tracking.

### Support for All Major Browsers

Digital Fingerprinting works consistently across modern browsers, including:

- Google Chrome (Version 57+)
- Mozilla Firefox (Version 67+)
- Microsoft Edge (Version 105+)
- Apple Safari (Version 11.0+)

Browser-independent device signals are leveraged so fingerprints are not tied to any specific browser.

### Precise Identification

Advanced matching algorithms match new visits to existing fingerprints to identify returning users, minimizing errors and duplicate identities.
