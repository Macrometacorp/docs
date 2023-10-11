---
sidebar_position: 50
title: Confirm Prerendering is Running
---

To confirm that the prerendering service is operational and functioning as expected, do the following:

1. **Visit the Page**: Open a browser and navigate to a page on your site that you've set to be prerendered.
  
2. **View the Page Source**: Right-click on the page and then click **View Page Source** to examine the HTML. Check if the prerendering-specific meta tags or scripts are present.

3. **Check Console Logs**: Open the browser's developer tools and go to the Console tab. Look for any logs or errors related to prerendering.

4. **Use a Curl Command**: From your command line, run a `curl` command mimicking a crawler's user-agent string to fetch the page. The page source should show the prerendered content.

    ```bash
    curl -A "Googlebot" https://yourwebsite.com/yourpage
    ```
  
5. **Monitor Analytics**: If you have analytics set up, look for a spike in load times for prerendered pages or increased crawler activity, which can be indicative of successful prerendering.
