---
sidebar_position: 1
title: Functions
---

PhotonIQ functions is an edge-computing service that allows you to run your applications smoothly without the hassle of managing infrastructure, server and resources. Utilizing the highly distributed [Global Data Mesh](https://www.macrometa.com/platform/global-data-mesh) to deploy and execute functions from the closest point of presence (PoP) to customers, it ensures low-latency and high-performance. PhotonIQ functions allow you to implement your system's logic using event-driven, ready-to-use blocks of code called "functions".

## Key features

PhotonIQ functions leverages [CLI](./04-faas-commands/index.md) and [API](https://www.macrometa.com/docs/apiFaas#/) to facilitate serverless applications, offering the following key features:

- **Local to regional to global auto-scaling**: Automatically scales function instances based on workload demands, supporting both zero-to-N and 1-to-N scaling modes. This ensures optimal resource utilization and responsiveness to user and traffic pattern changes.

- **HTTP endpoint and static asset serving integration**: Executes functions in response to HTTP requests, enabling developers to build serverless web applications and APIs. It also supports serving static files alongside functions, streamlining the deployment of comprehensive serverless applications.

- **Geo-replication**: Distributes function instances across global locations to minimize response times and maximize availability.



<grid cols={3}>
 <card
    heading="Quickstart"
    description="Create and deploy your first Function in minutes."
    href="functions-quickstart"
  />
   <card
    heading="Functions CLI commands"
    description="Explore CLI commands for managing functions."
    href="faas-commands"
  />
   <card
    heading="Functions API"
    description="Integrate functions into your application via API."
    href="https://www.macrometa.com/docs/apiFaas#/"
  />
 </grid> 

## How PhotonIQ Functions works

PhotonIQ FaaS employs an event-driven model to trigger and deploy lightweight, high-performance functions in the form of [WebAssembly](https://webassembly.org/) modules in response to an HTTP request made to a specific endpoint. 
This event-driven model helps with effective resource consumption as FaaS only utilizes resources when necessary. Furthermore, the stateless nature of FaaS functions ensures their ability to independently handle multiple requests in parallel, thus improving performance. 