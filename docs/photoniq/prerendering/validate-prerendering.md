---
sidebar_position: 60
title: Validate Prerendering
---

In order to confirm Dynamic Prerendering is running, you can check the the health endpoint or view a prerendered page as if you were a bot and see what the bot sees. Understanding what a web crawler sees when it visits your site can help you fine-tune your prerendering settings.

## Check Dynamic Prerendering Health

To see if Dynamic Prerendering is currently running, you can use the [Service Health Status](prerendering-tasks-api.md#service-health-status) API endpoint.

## View Prerendered Pages

Here are ways to view the prerendered pages:

1. **Use Developer Tools**: Many modern browsers have developer tools that allow you to emulate different user agents, including web crawlers. Switch to a crawler user agent and reload the page to see the prerendered version.

2. **API Endpoints**: Use the [Fetch Prerendered Page Content](prerendering-tasks-api#fetch-prerendered-page-content) endpoint to view the prerendered page.

3. **Third-Party Tools**: There are online services that allow you to view your site from the perspective of a search engine bot. These tools fetch the prerendered page and display it, giving you a clear idea of what is being served to the crawlers.
