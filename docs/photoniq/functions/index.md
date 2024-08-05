---
sidebar_position: 1
title: Functions
---


PhotonIQ Functions is an edge-computing service that allows you to run your serverless applications smoothly, eliminating the need for manual infrastructure management. It leverages the distributed [Global Data Mesh](https://www.macrometa.com/platform/global-data-mesh) to ensure low-latency and high performance by deploying functions at the nearest point of presence (PoP) to users. Additionally, PhotonIQ Functions is designed to handle complex integrations with third-party services via API requests, making it a versatile solution for diverse operational requirements. It allows you to implement your system's logic using event-driven, ready-to-use blocks of code called "functions".

## Key features

PhotonIQ Functions leverages [CLI](./04-faas-commands/index.md) and [API](https://www.macrometa.com/docs/apiFaas#/) to facilitate serverless applications, offering the following key features:

- **Local to regional to global auto-scaling**: Automatically scales function instances based on workload demands, supporting both zero-to-N and 1-to-N scaling modes. This ensures optimal resource utilization and responsiveness to user and traffic pattern changes.

- **HTTP endpoint and static asset serving integration**: Executes functions in response to HTTP requests, enabling developers to build serverless web applications and APIs. It also supports serving static files alongside functions, streamlining the deployment of comprehensive serverless applications.

- **Geo-replication**: Distributes function instances across global locations to minimize response times and maximize availability.



<grid cols={3}>
 <card
    heading="Quickstart"
    description="Create and deploy your first function in minutes."
    href="https://www.macrometa.com/docs/photoniq/functions/functions-quickstart"
  />
   <card
    heading="Functions CLI commands"
    description="Explore CLI commands for managing functions."
    href="https://www.macrometa.com/docs/photoniq/functions/faas-commands"
  />
   <card
    heading="Functions API"
    description="Integrate functions into your application via API."
    href="https://www.macrometa.com/docs/apiFaas#/"
  />
 </grid>

## How PhotonIQ Functions work
PhotonIQ Functions uses a serverless model to trigger and deploy lightweight, high-performance functions as [WebAssembly](https://webassembly.org/) modules in response to HTTP requests. This model ensures efficient resource consumption, as the Functions service only utilizes resources when needed. Additionally, the stateless nature of the service allows it to handle multiple requests independently and in parallel, thereby enhancing performance.

