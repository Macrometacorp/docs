---
sidebar_position: 4
title: Manage On-demand Validations
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After you create a policy and PhotonIQ Performance Proxy (P3) gets a request for an optimized page, P3 validates the page by running visual and functional tests. You can perform additional validations on-demand in the PhotonIQ Performance Proxy dashboard.

## View On-demand Validations

Perform the following steps to view on-demand validations:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **On-demand Validations**.

![On-demand Validations](/img/photoniq/p3/on-demand-validations.png)

## On-demand Validations Table Fields

The On-demand Validations table provides the following fields:

- **Policy Name** - Name of the policy setting the optimizations that are being validated.
- **URL** - Specific URL being optimized that was validated.
- **Status** - Whether the validation passed or failed.
- **Last Updated** - Day and time the validation was last updated.
- **Validation** - Types of validation: **Visual** and **Functional**. Click one to view validation results.

## Create New Validation

Perform the following steps to create a new on-demand validation:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **On-demand Validations**.
3. Click **New Validation**.
4. In the **Policy** field, select a policy.

   The dashboard enters policy values in the **Domain**, **Origin**, **Target Region**, and **URL Pattern** fields.

5. In the **URL** field, enter the specific page that you want to validate. It must contain the policy domain and match the policy URL pattern.
6. In the **Device Type** list, select the type of device that you want to validate against: **Desktop**, **Tablet**, or **Mobile**.
7. (Optional) Enter the **Width** and **Height** of the device that you want to use for validation. Default is 1383 pixels wide and 864 pixels high.
8. Click **Submit**.


- **URL Pattern** - URL pattern associated with the policy.

- **Last Updated** - The day and time the validation was last run.