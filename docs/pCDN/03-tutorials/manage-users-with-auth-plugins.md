---
title: Manage API Consumers
sidebar_label: Manage API Consumers
---

Apart from acting as a entry gateway for your host of APIs, the multi-deployed pCDN provides you with consumer objects, a way for API users to access and interact with the APIs offered via the gateway.

This tutorial acts as a guide to help you work with consumers, and provides actionable steps to perform the following consumer management tasks:

- Manage a consumer: This involves creating, authenticating, and implementing rate-limiting on this consumer.
- Create consumer groups and restrict/provide access to certain APIs.
- Obtain API monitoring metrics from your consumers. 

### Manage a single consumer

You can create a consumer via the GUI or via the REST API. 

The following command does the following:

- creates a consumer(`sample-consumer`), 
- enables the `key-auth` and `limit-count` plugin.

The `limit-count` plugin configuration allows a maximum of 5requests within 60seconds for this consumer. Any subsequent requests returns a `403` error. 

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/route -H "X-API-KEY: $admin_key" -X PUT -d '
{
   "username":"consumer1",
   "plugins":{
      "key-auth":{
         "key":"auth-one"
      },
      "limit-count":{
         "count":5,
         "time_window":60,
         "rejected_code":403,
         "rejected_msg":"Rate limit exceeded for this user, please try again later or upgrade your subscription plan.",
         "key":"remote_addr"
      }
   }
}'
```

## Consumer groups

While consumers offers a way to manage users, creating different plugin and route configurations becomes tedious, especially with numerous users. Consumer groups offer an easier way to manage groups of users, with each consumer group containing the same plugin or service configurations.
As an example, consider a service with different subscription tiers:

- Group A users are on a free plan, and so have a rate limit of 5 requests every 60seconds
- Group B users have a premium plan and have a much higher rate limit of 100 requests within 60secs. 

To do this, let's create two consumer groups ; free_plan and premium_plan

- For the first group, `free_plan`

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/consumer_groups/free_plan -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "plugins": {
        "limit-count": {
            "count": 5,
            "time_window": 60,
            "rejected_code": 403,
            "group": "basic_plan"
        }
    }
}'
```

We can add a consumer (Ann) to this `free_plan` group with the following command:

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/consumers -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "username": "Ann",
    "plugins": {
        "key-auth": {
            "key": "auth-one"
        }
    },
    "group_id": "free_plan"
}'
```


- To create the second consumer group, `premium_plan`:

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/consumer_groups/premium_plan -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "plugins": {
        "limit-count": {
            "count": 100,
            "time_window": 60,
            "rejected_code": 403,
            "group": "basic_plan"
        }
    }
}'
```

Adding a consumer to this group with this cURL command:

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/consumers -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "username": "Funke",
    "plugins": {
        "key-auth": {
            "key": "auth-two"
        }
    },
    "group_id": "premium_plan"
}'
```

### Testing consumer groups

When `Ann` runs 6 subsequent requests within a minute, the 6th request returns a `403 status code` error. This is unlike the case for Funke, who can send many requests within the same period. 
