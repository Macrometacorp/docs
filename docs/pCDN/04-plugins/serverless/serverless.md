---
title: Serverless
---

There are two serverless plugins available on our gateway service:

- `serverless-pre-function`: This plugin runs at the start of a specified phase.
- `serverless-post-function`: This plugin runs at the ending of a specified phase.

## Attributes

| **Name**  | **Type**      | **Required** | **Default** | **Valid values**                                                             | **Description**                                                      |
|-----------|---------------|--------------|-------------|------------------------------------------------------------------------------|------------------------------------------------------------------|
| phase     | string        | No        | ["access"]  | ["rewrite", "access", "header_filter", "body_filter", "log", "before_proxy"] | Phase before or after which the serverless function is executed. |
| functions | array[string] | Yes         |             |                                                                              | Functions list executed sequentially.                |

## Enable the plugin

