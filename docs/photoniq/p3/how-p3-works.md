---
sidebar_position: 2
title: How P3 Works
---

PhotonIQ Performance Proxy (P3) revolutionizes web performance optimization by intercepting and enhancing web requests through a sophisticated, server-side processing environment located at the network edge. This innovative approach enables dynamic optimization of web content, ensuring faster page loads and improved user experience across different devices and networks.

This page explains how P3 processes and optimizes web requests using detailed architecture diagrams and descriptions, providing a clear view of its operational workflow and the technologies that make it an effective tool for modern web optimization.

## P3 Architecture Overview

The PhotonIQ Performance Proxy (P3) architecture is designed to optimize website performance by dynamically applying predefined optimization rules to web requests.

![P3 Architecture Overview](/img/photoniq/p3/p3-architecture-overview.png)

Here’s a high-level breakdown of how the system processes a request:

1. **Initial Request Handling**:
   - A user accesses a URL through a desktop or mobile browser, sending a request to the Content Delivery Network (CDN).
   - The CDN, configured with specific URLs for P3 optimization, redirects eligible requests to the P3 system.

2. **Request Routing to P3**:
   - Requests are first received by the PhotonIQ API Gateway.
   - The API Gateway forwards the request to P3.

3. **Optimization Process**:
   - The first component to process the request within the P3 system is the HTML ReWriter, which checks for applicable optimization rules stored in its memory cache based on the URL pattern.
   - If rules are available and match the request, then they are immediately applied, and the optimized response is sent back to the user.

4. **Handling Missing Optimizations**:
   - If the HTML ReWriter lacks the rules for a request, then it sends a query to the Controller.
   - The Controller checks configured policies to see if the URL matches any existing patterns.
   - If no matching policies are found, then the request is processed without P3 optimizations and passed through as is from the origin.

5. **Job and Policy Handling**:
   - When a matching policy exists but no current job covers the request, the Controller initiates a new job.
   - This job is handled by the Analyzer and Validator to ensure the new rules are effective and do not break page functionality or aesthetics.

6. **Optimization Rule Validation**:
   - The Analyzer uses machine learning to assess the page against the configured optimizers and formulates a set of rules.
   - The Validator then checks these rules using computer vision techniques to ensure they do not visually or functionally disrupt the page. It tests across various device resolutions to ensure broad compatibility.

7. **Finalizing Optimizations**:
   - Once validated, the optimization rules are stored in a collection accessed by the HTML ReWriter.
   - The HTML ReWriter then applies these rules to incoming requests matching the criteria, optimizing them before delivery to the end user.

## P3 Control Flows Diagram

The control flow diagram illustrates the detailed interactions within the P3 architecture.

![P3 Control Flows](/img/photoniq/p3/p3-control-flows.png)

- The process begins when a request reaches the Controller, which determines the necessity for creating a job based on the incoming URL and associated policies.
- Components subscribe to updates from this job, processing the request as outlined:
  - **Analyzer**: Takes the job and policy details, including policy ID and URL pattern, and determines safe optimizations.
  - **Validator**: Runs validations against the Analyzer’s suggestions on the specified device types and optimization levels.
  - **HTML ReWriter**: Updates its cache with new rules post-validation and applies them to future matching requests.
