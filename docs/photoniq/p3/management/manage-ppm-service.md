---
sidebar_position: 55
title: Manage Performance Proxy Metrics Jobs
sidebar_label: Manage PPM Jobs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Performance Proxy Metrics (PPM) service records web vitals on a defined schedule. This schedule varies, and could be every 30 minutes, or an hour. 

You can view and manage PPM jobs in the P3 dashboard.

## View Web Vital Metrics

To view the most recent web vital metrics returned by PPM jobs:

1. Log in to your P3 dashboard.
2. Click **PPM**.
3. (Optional) Select a time range by adjusting the values in the **From** and **To** fields.

![View Web Vital Metrics](/img/photoniq/p3/p3-web-vital-metrics.png)

The Web Vitals: 75th Percentile Analysis table displays the following fields:

- **URL** - The site URL of the site for analysis.
- **Device** - The device for which the site was analyzed, either desktop or mobile.
- **Score** - A composite score that reflects the overall performance of the page, calculated based on various performance metrics. Higher scores indicate better performance.
    - **CLS (Cumulative Layout Shift)** - Measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page. It quantifies how often users experience unexpected content shifts.
    - **FCP (First Contentful Paint)** - The time from when the page starts loading to when any part of the page's content is rendered on the screen. It marks the point when users first see a visual response from the page.
    - **FMP (First Meaningful Paint)** - Measures the time taken for the primary content of a page to become visible. It aims to capture the first moment the page's main content is loaded and likely to catch the user's attention.
    - **TTI (Time to Interactive)** - The amount of time taken for the page to become fully interactive. It measures the time from when the page starts loading to when it consistently responds to user inputs in a timely manner.
    - **LCP (Largest Contentful Paint)** - Records the time at which the largest text or image is painted, marking the point in the page load timeline where the page's main content has likely loaded.
    - **SP (Speed Index)** - Measures how quickly the contents of a page are visibly populated. It's an index showing how quickly the contents of a page are visibly displayed during the page load.
    - **TBT (Total Blocking Time)** - Quantifies the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses. It measures the severity of how non-interactive a page is before it becomes reliably interactive.
    
## View Web Vitals Jobs

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **PPM**.
3. Click **Show Jobs**.

The Web Vitals Jobs table displays the following fields:

- **Job ID** - The randomly-generated job ID.
- **URL** - The URL that the job analyzes.
- **Device** - Whether the analysis is based on desktop or mobile devices.
- **Cron** - The formula that defines how often the job runs.

![View PPM Jobs](/img/photoniq/p3/view-ppm-jobs.png)

## Create a PPM Job

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **PPM**.
3. Click **Show Jobs**.
4. Click **New Job**.
5. In the **URL** field, enter the URL you want PPM to analyze.
6. In the **Cron Expression** field, you can accept the default cron expression to set the job to run every 30 minutes, or you can customize the expression.
7. Select the **Device Type** that you want PPM to analyze the site for: **Desktop** or **Mobile**.
8. (Optional) Enter values in the Advanced Settings:
   - **Viewport** - Define the height and resolution width for which you want the PPM job to run. The default is 1024*1366.
     - **Width** - Viewport width.
     - **Height** - Viewport height.
   - **Headers** - If you want PPM to pass headers when it accesses the page, add them here. Click **Add** to add additional headers.
9. Click **Submit**.

    The job appears in the Web Vitals Jobs table, results appear in the Web Vitals table after the job runs for the first time.

## Delete PPM Jobs

To delete an existing PPM job:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **PPM**.
3. Click **Show Jobs**.
4. Click the three stacked dots next to the job that you want to delete, and then click **Delete**.
