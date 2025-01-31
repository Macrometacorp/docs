---
sidebar_position: 40
title: Manage P3 Policies
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A PhotonIQ Performance Proxy (P3) _policy_ is a set of optimization rules applied to a set of origin URLs. This page explains how to perform tasks pertaining to P3 policies.

## Policy Fields

P3 provides the following policy fields:

- **Policy Name** - The name of the policy.
- **Device Type** - Icons indicate whether the policy applies to mobile devices, desktop devices, or both.
- **Optimization Level** - The selected optimization level: **Light**, **Moderate**, or **Aggressive**.
- **Page Type** - Whether the type of optimization is for page type **Home**, **Category**, or **Product Detail Page**.
- **Last Updated** - The day and time this policy was last updated.

![P3 Policy Fields](/img/photoniq/p3/p3-view-policies.png)

## View Policies

Perform the following steps to view existing P3 policies on your account:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Policies**.
3. (Optional) To view details of a policy, click the stacked dots next to the policy that you want to view and then click **Edit**.

## Create a Policy

Perform the following steps to create a new P3 policy:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Policies**.
3. Click **New Policy**.
4. Enter information in the following fields. All fields are required.

   - **Name** - The name of the policy.
   - **Domain Name** - The name of the domain.
   - **Origin** - The URL the policy should be applied to.
   - **URL Pattern** - Provide an absolute URL or a regex pattern in order to group pages that have the same structure.
     - For example, you could list each page:
        - /us/category/boys
        - /us/category/girls
        - /us/product/shoes
        - /us/product/jeans
      or provide regex:
        - ^/us/category/.*$
        - ^/us/product/.*$
   - **Sample Path** - An example of a path that matches the URL pattern.
   - **Target Region** - The region to which the content from the origin will be served.
     - **Is Region-Specific Content?** - Select **Yes** or **No**.
     - **Is Origin Content Compressed?** - Indicate whether the origin content is compressed or not.
   - **Headers** - If you want to pass headers to the origin, add as many headers as necessary.
     - **Send headers to origin** - Select the checkbox to send the headers to the origin along with the request.
     - **Key** - Header key.
     - **Value** - Header value.
   - **mPulse Variable** - Variable for tracking the policy in the mPulse dashboard.
   - **Device Type** - Select what type of devices the policy should apply to.
     - **All** (default)
     - **Desktop**
     - **Tablet**
     - **Mobile**
   - **Optimization Level** - Select what level of optimization P3 applies to the URLs in the policy. Each selection selects different optimizations:
     - **Light** (default)
     - **Moderate**
     - **Aggressive**
   - **Page Type** - Select what type of pages are being optimized. This affects which optimization rules that P3 applies:
     - **Home**
     - **Category**
     - **Product Detail Page**
     - **Other**
   - **Enable Policy** - Turn the policy on or off. If the policy is enabled, then optimization rules are applied to incoming requests.
    The remainder of the fields cannot be manually edited. For more information about what each optimization does, refer to [P3 Optimizations](p3-optimizations.md).

## Edit a Policy

Perform the following steps to edit a P3 policy:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Policies**.
3. Click the stacked dots next to the policy that you want to edit and then click **Edit**.
4. Make any desired changes and then click **Update**.

## Delete a Policy

Deleting a policy cannot be undone.

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Policies**.
3. Click the stacked dots next to the policy that you want to edit and then click **Delete**.
4. To confirm your choice, click **Remove**.
