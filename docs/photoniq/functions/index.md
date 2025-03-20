---
sidebar_position: 1
title: Functions
---

PhotonIQ Functions is an edge-computing service that allows you to run your serverless applications smoothly, eliminating the need for manual infrastructure management. It leverages the distributed [Macrometa Global Data Mesh](https://www.macrometa.com/platform/global-data-mesh) to ensure low-latency and high performance by deploying functions at the nearest point of presence (PoP) to users. 

Additionally, PhotonIQ Functions is designed to handle complex integrations with third-party services via API requests, making it a versatile solution for diverse operational requirements. It allows you to implement your system's logic using event-driven, ready-to-use blocks of code called "functions".

<grid cols={3}>
 <card
    heading="Quickstart"
    description="Create and deploy your first function in minutes."
    href="/photoniq/functions/functions-quickstart"
  />
   <card
    heading="Functions CLI commands"
    description="Explore CLI commands for managing functions."
    href="/photoniq/functions/functions-cli"
  />
   <card
    heading="Functions API"
    description="Integrate functions into your application via API."
    href="https://www.macrometa.com/docs/apiFaas#/"
  />
 </grid>

## Key features

PhotonIQ Functions leverages the  [CLI tool](functions-cli.md) and [API](https://www.macrometa.com/docs/apiFaas#/) to facilitate serverless applications, offering the following key features:

- **Multi-language support**: PhotonIQ Functions offers the flexibility to write functions in popular languages/frameworks like JavaScript, Rust and Next.js.

- **Local to regional to global auto-scaling**: Automatically scales function instances based on workload demands, supporting both zero-to-N and 1-to-N scaling modes. This ensures optimal resource utilization and responsiveness to user and traffic pattern changes.

- **HTTP endpoint and static asset serving integration**: Executes functions in response to HTTP requests, enabling developers to build serverless web applications and APIs. It also supports serving static files alongside functions, streamlining the deployment of comprehensive serverless applications.

- **Seamless third-party integration**: PhotonIQ functions enhance system-system interoperability via API requests, enabling real-time data exchange, automated workflows, and event-driven execution. With native support for RESTful APIs, it facilitates secure and efficient communication between distributed systems, making it an ideal solution for microservices architectures, SaaS integrations, and enterprise automation.

- **Geo-replication**: Distributes function instances across global locations to minimize response times and maximize availability.


## How PhotonIQ Functions work

![How it works](/img/functions/functions-architecture.png)

PhotonIQ Functions operates within a serverless architecture, designed to deploy high-performance functions in response to HTTP requests. This approach ensures that resources are consumed only when functions are triggered, optimizing efficiency. The system supports an on-demand execution model that can handle large volumes of parallel requests while remaining stateless between invocations.

Here is a step-by-step overview of how Functions work:

1. Once deployed, the functions' information is stored in the [Geo Distributed Network (GDN) database](../../database/index.md), enabling geo-replication. This ensures that deployed functions are available from multiple locations, improving speed and reliability for users across the globe.
1. On receiving a request, the function performs geo-routing to find the nearest execution environment, reducing latency by selecting the most optimal node geographically. The request is then routed to the Functions API Gateway, which serves as the core entry point for managing function execution.
1. Within the gateway, the Function Manager Service retrieves the required code and configuration from the functions collections stored in the GDN. This guarantees the function is executed in the appropriate runtime environment—whether JavaScript, Ruby, or another supported language. After execution, the result is sent back to the requester, retracing the same efficient path through the gateway and back to the edge.

This end-to-end process—from geo-routing to execution and response—not only ensures quick function execution but also maximizes resource efficiency on a global scale. PhotonIQ Functions enables developers to create responsive, scalable applications, seamlessly managing distributed environments for high-performance, low-latency execution worldwide.
