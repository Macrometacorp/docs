---
sidebar_position: 40
title: View P3 Optimizations
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After you have created one or more policies, you can view the progress of optimizations applied to URLs.

## View P3 Optimizations

Perform the following steps to view P3 policy optimizations:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **Optimizations**.

For more information about each optimization, refer to [P3 Optimizations](p3-optimizations.md).

![View P3 Optimizations](/img/photoniq/p3/p3-view-optimizations.png)

## Optimization Fields

- **Policy Name** - Name of the policy setting the optimizations.
- **URL Pattern** - URL pattern associated with the policy.
- **URL** - Specific URL being optimized.
- **Progress** - Shows where in the optimization process the optimization is.
  - **A** - Analysis. P3 is analyzing the page.
  - **V** - Validation. P3 is validating the page. For more information about validation, refer to [View P3 Validations](view-p3-validations.md).
  - **R** - 
  The color of the letter indicates its status:
  - Green indicates the stage has successfully completed.
  - Gray indicates the stage has not begun.
  - Red indicates the stage has stopped with an error.
- **Last Updated** - The day and time the progress was last updated.
