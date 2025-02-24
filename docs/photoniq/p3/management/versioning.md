---
title: Versioning
sidebar_label: Versioning
---

P3 offers resource versioning, a feature that allows you to configure how P3 handles cached content when a new version of cached content is available. 

If you enabled **Resource Versioning** when [creating your policy](manage-p3-policies.md#create-a-policy), you can further configure this versioning behaviour to further enhance how P3 serves cached content.

To do this:

1. Navigate to the **Global Settings** tab on your P3 homepage.
1. Expand the **Resource Versioning** section.
1. Enable any or of the following depending on your web needs
    - **Relative URLs**
    - **JS Resources** - If enabled, configure the behaviour of these resources
        - **TTL**: A TTL for these JS resources to live after a new resource version is available
        - **Cache-control**: More configuration behaviour for your JS resources, like the 
        - **URL Pattern**: URL pattern for resource
        - **Additional Domains**: Specify any additional domains different from those configured when creating a policy
    - **CSS Resources**
        - **TTL**
        - **Cache-control** 
        - **URL Pattern**
        - **Additional Domains**
