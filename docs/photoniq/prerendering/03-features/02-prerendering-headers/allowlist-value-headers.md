---
sidebar_position: 30
title: Allowlist-Based Header Values
---

Allowlist-based header values confirms the legitimacy of requests coming from the Prerender service to your origin server, ensuring both security and integrity.

### What Are Allowlist-Based Header Values?

Allowlist-based header values are custom headers that act as a security mechanism during the prerender process. They allow you to validate that incoming requests to your origin server are legitimate and are indeed coming from the Prerendering service.

### Why Use Allowlist-Based Header Values?

- **Security Measures**: These header values are primarily used as a security measure to protect against potential threats like DDOS attacks by filtering out illegitimate requests.
- **Request Verification**: They can contain customer-specific secret values, serving as a secure handshake between your system and the prerender service.
- **Resource Allocation**: Knowing that a request is valid allows your server to allocate resources more efficiently, ensuring a smoother rendering process.

### How Do Allowlist-Based Header Values Work?

When rendering a page—either on-demand or during prefetching, the Prerender service attaches an allowlist-based header value to the request sent to your origin server. Your server, configured to recognize this header, validates the request before proceeding with the rendering process.

