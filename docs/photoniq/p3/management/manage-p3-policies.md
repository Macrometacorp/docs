---
sidebar_position: 40
title: Work with P3 policies
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A P3 policy is a set of optimization rules applied to a set of origin URLs. You can create different policies depending on your optimization needs.

## Policy Fields

P3 provides the following fields for configuring your policies:

- **Policy Name** - The name of the policy.
- **Device Type** - Icons indicating whether the policy applies to mobile devices, desktop devices, or both.
- **Optimization Level** - The selected optimization level: **Light**, **Moderate**, or **Aggressive**.
- **Page Type** - Whether the type of optimization is for page type **Home**, **Category**, or **Product Detail Page**.
- **Last Updated** - The day and time this policy was last updated.

![P3 Policy Fields](/img/photoniq/p3/p3-view-policies.png)

## Create a Policy

To create a new P3 policy:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Policies**.
3. Click **New Policy**.

![click new policy](/img/photoniq/p3/click-new-policy.png)

4. Enter information in the following fields. All fields are required.

![create policy](/img/photoniq/p3/create-p3-policy.png)

   - **Name** - The name of the policy.
   - **Domain Name** - The name of the domain.
   - **Origin** - The URL the policy should be applied to.
   - **URL Pattern** - Provide an absolute URL or a regex pattern in order to group pages that have the same structure. Click the **?** icon next to **Matching rule** to learn how to match patterns.
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
   - **Enable Prefetch** - Enable/disable prefetching to load web resources or pages ahead of time
     -  **URL Regex** - URL pattern for pages who need prefetching
     -  **Mode**
     -  **Dynamic Resources URL** 
   - **Enable Resource Versioning**
   - **Enable Policy** - Turn the policy on or off. Enabling the policy applies the optimization rules to incoming requests.
    The remaining fields cannot be manually edited. Visit [optimizations](./optimizations/) to learn more about these optimizations.
5. Click **Submit**

## View Policies

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Policies**.
3. (Optional) To view details of a policy, click the stacked dots next to the policy that you want to view and then click **Edit**.

## Edit a Policy

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
