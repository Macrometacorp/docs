---
sidebar_position: 40
title: Manage Performance Proxy Metrics Jobs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Performance Proxy Metrics (PPM) service records web vitals on a certain schedule, such as every 30 minutes. You can view the metrics and jobs and manage PPM jobs in the Performance Proxy dashboard.

## View Web Vital Metrics

Perform the following steps to view the most recent web vital metrics returned by PPM jobs:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **PPM**.
3. (Optional) Select a time range by adjusting the values in the **From** and **To** fields.

![View Web Vital Metrics](/img/photoniq/p3/p3-web-vital-metrics.png)

The Web Vitals: 75th Percentile Analysis table displays the following fields:

- **URL** - The URL of the site that has been analyzed.
- **Device** - The device for which the site was analyzed, either desktop or mobile.
- **Score** - A composite score that reflects the overall performance of the page, calculated based on various performance metrics. Higher scores indicate better performance.
- **CLS (Cumulative Layout Shift)** - Measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page. It quantifies how often users experience unexpected content shifts.
- **FCP (First Contentful Paint)** - The time from when the page starts loading to when any part of the page's content is rendered on the screen. It marks the point when users first see a visual response from the page.
- **FMP (First Meaningful Paint)** - Measures the time it takes for the primary content of a page to become visible. It aims to capture the first moment the page's main content is loaded and likely to catch the user's attention.
- **TTI (Time to Interactive)** - The amount of time it takes for the page to become fully interactive. It measures the time from when the page starts loading to when it has consistently responded to user inputs in a timely manner.
- **LCP (Largest Contentful Paint)** - Records the time at which the largest text or image is painted, marking the point in the page load timeline where the page's main content has likely loaded.
- **SP (Speed Index)** - Measures how quickly the contents of a page are visibly populated. It's an index showing how quickly the contents of a page are visibly displayed during the page load.
- **TBT (Total Blocking Time)** - Quantifies the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses. It measures the severity of how non-interactive a page is before it becomes reliably interactive.

## View Web Vitals Jobs

Perform the following steps to view existing PPM jobs:

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

Perform the following steps to create a new PPM job:

## Delete PPM Jobs

Perform the following steps to delete an existing PPM job:

1. Log in to your PhotonIQ Performance Proxy dashboard.
2. Click **PPM**.
3. Click **Show Jobs**.
4. Click the three stacked dots next to the job that you want to delete, and then click **Delete**.
