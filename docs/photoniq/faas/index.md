---
sidebar_position: 1
title: Function as a Service (FaaS)
---

## Overview

PhotonIQ FaaS (Function as a Service) is an edge-computing service that allows you to create and run functions without the extra burden of infrastructure management. Thus, IT teams have the time and flexibility to do more tasks, improving operational efficiency and business growth. 
PhotonIQ FaaS uses the highly distributed [Global Data Mesh](https://www.macrometa.com/platform/global-data-mesh) to deploy and execute functions from the closest point of presence(PoP) to customers, thus reducing latency and improving performance. This makes it an ideal solution for developing and managing high-performing, scalable, and low-latency cloud-native applications. 
Currently, FaaS supports Rust and JavaScript, empowering developers with flexibility and eliminating vendor lock-in during development. 
From data processing to application development, the PhotonIQ FaaS revolutionizes application development by removing the complexities of managing infrastructure, thus improving business agility for deploying fast and scalable global serverless functions for your various business needs.

## How PhotonIQ FaaS Works

PhotonIQ FaaS employs an event-driven model to trigger and deploy lightweight, high-performance functions in the form of [WebAssembly](https://webassembly.org/) modules in response to an HTTP request made to a specific endpoint. 
This event-driven model helps with effective resource consumption as FaaS only utilizes resources when necessary. Furthermore, the stateless nature of FaaS functions ensures their ability to independently handle multiple requests in parallel, thus improving performance. 

## Benefits of PhotonIQ FaaS

- **High Performance**: Leverages the near-native execution speed of WebAssembly, enhancing application responsiveness and efficiency.
- **Reliability**: With built-in geo-replication, functions are replicated across multiple regions to reduce latency and improve the reliability of your applications.
- **Developer Flexibility**: Supports multiple languages, providing a broad spectrum of tools and libraries to suit your development needs.
- **Cost Efficiency**: Only charges for the actual compute time and resources used, which optimizes spending and reduces waste.
- **Simplified Management**: Automates many operational tasks such as scaling, deployments, and maintenance, freeing up your time and resources.
- **Enhanced Security**: Executes functions in a sandboxed environment, ensuring isolation and protecting against unauthorized access and attacks.
