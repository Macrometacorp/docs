---
sidebar_position: 60
title: See What the Bot Sees
---

Understanding what a web crawler sees when it visits your site can help you fine-tune your prerendering settings. Here are ways to view the prerendered pages:

1. **Use Developer Tools**: Many modern browsers have developer tools that allow you to emulate different user agents, including web crawlers. Switch to a crawler user agent and reload the page to see the prerendered version.

2. **API Endpoints**: If the prerendering service provides API endpoints for fetching prerendered content, then you can use these to view what is stored in the cache.

    ```bash
    curl https://api.prerender.io/recache?url=https://yourwebsite.com/yourpage
    ```
  
3. **Service Dashboard**: Some prerendering services come with a dashboard where you can preview what a crawler will see. Navigate to the relevant section and enter the URL you want to check.

4. **Third-Party Tools**: There are online services that allow you to view your site from the perspective of a search engine bot. These tools fetch the prerendered page and display it, giving you a clear idea of what is being served to the crawlers.
