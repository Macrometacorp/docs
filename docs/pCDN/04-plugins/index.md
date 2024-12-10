---
title: Plugins
---

Macrometa API platform offers numerous customizable plugins that further improve the functionality and performance of your APIs

## Caching

<grid cols={2}>
  <card
    heading="Distributed Cache"
    description="Store and access frequently accessed data for improved latency and performance"
    href="/pCDN/plugins/caching/distributed-cache/"
  />
    <card
    heading="Graphql Cache"
    description="Normalize and cache Graphql responses while access metrics for better observation and monitoring."
    href="/pCDN/plugins/caching/graphql/"
  />
</grid>

## Security

<grid cols={3}>
  <card
    heading="Consumer Restriction"
    description="Define specific rules to manage access to consumers, routes, services and consumer groups"
    href="/pCDN/plugins/security/consumer-restriction/"
  />
    <card
    heading="CORS"
    description="Enable CORS for seamless apps integration."
    href="/pCDN/plugins/security/cors/"
  />
    <card
    heading="IP Restriction"
    description="Limit access to a route or service by whitelisting or blacklisting IP addresses."
    href="/pCDN/plugins/security/ip-restriction/"
  />
    <card
    heading="Referer Restriction"
    description="Restrict access to routes and services by applying rules to the referer header"
    href="/pCDN/plugins/security/referer-restriction/"
  />
    <card
    heading="Request Validation"
    description="Validate all incoming requests before forwarding them upstream."
    href="/pCDN/plugins/security/request-validation/"
  />
    <card
    heading="UA Restriction"
    description="Filter requests with the User-Agent header to control access to routes and services."
    href="/pCDN/plugins/security/ua-restriction/"
    />
    <card
    heading="URI Blocker"
    description="Block requests based on predefined block-rules."
    href="/pCDN/plugins/security/uri-blocker/"
  />
</grid>

## Serverless

<grid cols={2}>
  <card
    heading="Serverless functions"
    description="Execute plugins pre or post a specified phase"
    href="/pCDN/plugins/serverless/"
  />
    <card
    heading="Workflow"
    description="Perform complex traffic tasks on your API"
    href="/pCDN/plugins/serverless/workflow/"
  />
</grid>

## Traffic handling

<grid cols={4}>
  <card
    heading="Limit connection"
    description="Prevent the occurrence of downtime by limiting the number of concurrent requests to your service"
    href="/pCDN/plugins/traffic/limit-conn/"
  />
    <card
    heading="Limit count"
    description="Implement request limits within a specified time on your routes and service."
    href="//pCDN/plugins/traffic/limit-count/"
  />
<card
    heading="Limit request"
    description="Control the number of requests to your service with the leaky-bucket algorithm"
    href="/pCDN/plugins/traffic/limit-req/"
  />
    <card
    heading="Traffic Split"
    description="Configure matches based on rules to help assign portions of traffic to different upstream destinations"
    href="/pCDN/plugins/traffic/traffic-split/"
  />
</grid>

## Transformation

<grid cols={2}>
  <card
    heading="gzip"
    description="Execute plugins pre or post a specified phase"
    href="/pCDN/plugins/transformation/gzip/"
  />
    <card
    heading="Proxy rewrite"
    description="Rewrite plugin configuration attributes like scheme, uri, and host"
    href="/pCDN/plugins/transformation/proxy-rewrite/"
  />
</grid>

## Observability

<grid cols={2}>
  <card
    heading="HTTP Logger"
    description="Collate and push low data into monitoring tools for better and informed monitoring"
    href="/pCDN/plugins/observability/"
  />
    <card
    heading="Prometheus"
    description="Easily access and analyze API log metrics "
    href="/pCDN/plugins/observability/"
  />
</grid>