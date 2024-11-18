---
title: Getting started with pCDN
sidebar_label: Getting started
---

As an API gateway, the pCDN uses routes to route all incoming traffic to different destinations depending on your upstream configuration. Routes are the gateway/entry point for all these requests, This guide will walk you through the following tasks to get you started using pCDN:

- Configuring a route
- Validating the route

## Prerequisite(s)

- A Stargate instance. Contact the Macrometa team for your Stargate server and login details. 

## Step 1: Configuring a route

To create a route:

1. Login to your Stargate instance.
![stargate](/img/pcdn/login-stargate.jpg)

2. Navigate to **Routes** from the **Dashboard.**
![routes](/img/pcdn/dashboard-routes.png)
1. Click **+Create** . Follow these four-step process to configure a route:

    1. **Define API request:**  Enter a name for your route. Other fields in this step are optional. Click **Next.**
    ![config-route](/img/pcdn/config-route-1.png)
    ![config-route](/img/pcdn/config-route-2.png)
    The path `/*` matches against all available paths from the host address.
    ![config-route](/img/pcdn/config-route-3.png)
    1. **Define API Backend server:** Here, you define your upstream configuration. This is the target address for your route. Enter a Target **host** and **port** and leave every other field as it is. 
    Our upstream uses the round robin algorithm and nodes. You can [add more nodes to help with load balancing](./01-set-up-load-bal.md). Click **Next**
    ![config-route-step-2](/img/pcdn/route-2.png)
     You can enable health check and configure settings for your health check.
    ![route-health](/img/pcdn/route-2-health.png)

    1. **Plugin Config:** Here, you can enable your desired plugins. The platform offers numerous plugins catering to areas like authentication, security, traffic control, serverless, and observability. 
    ![plugins](/img/pcdn/plugins-enable.png)
    To enable a plugin, navigate to the desired plugin and toggle the slider bar to enable/disable the plugin. Some plugins require configuration, while others, like basic auth, do not. 
    1. **Preview:** This step allows you go through your configuration from steps 1-3.  **Click Submit**.

## Step 2: Validate the Route  
 
You can test the validity of your route by sending a request to the configured route. 
