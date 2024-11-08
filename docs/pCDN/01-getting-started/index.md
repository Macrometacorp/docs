---
title: Getting started
---

Macrometa offers you two ways to interact with pCDN: the GUI and REST API

This guide acts as a guide for using pCDN and will help you achieve the following:

- Create a route
- Creating an upstream
- Test the route

## Prerequisite(s)

- Stargate instance. Contact the Macrometa team for your Stargate server and login details.

## Step 1: Create a route

You need to configure a route to use the pCDN to manage your APIs. A route is the entry point for requests and forwards incoming requests to an upstream target address. To create a route:

1. Login to your Stargate instance and navigate to **Routes** from the **Dashboard.**
2. Click **+Create** to create a route following these steps**:**

    1. **Define API request:**  Enter a name for your route. Other fields in this step are optional. Click **Next.**
    1. **Define API Backend server:** Here, you define your upstream configuration. This is the target address for your route. Enter a Target host and port and leave every other field as it is. Click **Next**
    1. **Plugin Config:** Here, you can enable your desired plugins. The platform offers numerous plugins catering to areas like authentication, security, traffic control, serverless, and observability. 
    To enable a plugin, navigate to the desired plugin and toggle the slider bar to enable/disable the plugin. Some plugins require configuration, while others, like basic auth, do not. 
    1. **Preview:** This step allows you go through your configuration from steps 1-3.  **Click Submit**.

## Step 2: Add an Upstream

An upstream acts as the target for routes and provide multiple nodes for load balancing routed requests. To add an upstream:

1. Click **Upstream** from your dashboard
2. Click **+Create** 
3. Enter a name for the upstream and the target **host** and **port**. 
4. Choose an **Algorithm** and **Upstream type**. This guide uses the round robin algorithm and a node for the upstream type. Leave other fields empty. 
5. Click **Next**. Preview your configurations and click **Submit**

## Step 3: Validate route
