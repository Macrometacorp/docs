---
title: Synthetic Interactions
---

Synthetic interactions are automated actions that Prerender performs on your web page to simulate real user behavior. These actions include scrolling, hovering over elements, and clicking buttons or tabs. Synthetic interactions fully renders dynamic content on the page for easier and faster accessibility by search engine bots or other web crawlers.

With synthetic interactions, Prerender enables you to maximize the visibility of your dynamically generated content, ensuring more effective indexing by web crawlers.

## Supported Interactions

Prerender supports a variety of synthetic interactions. You can create as many policies for each type of interaction as you need.

### Scroll

Loading a webpage leaves some parts of it, like the footer, unloaded, until a user scrolls to it. With a [scroll synthetic interaction](../01-synthetic-interactions/03-managing-synthetic-interaction-policies/manage-scroll-interactions.md) enabled, Prerender automatically scrolls to ensure the rendering of such content. This automatic scrolling loads and captures more content, enhancing the completeness of the rendered page for scanning by bots and web crawlers.

### Click

Click events, such as tab switching, can be defined by the user to reveal additional links or content to bots. For example, clicking to switch tabs or expand sections. Simulating these clicks during rendering ensures content visibility during indexing by bots.

### Hover

Hovering is especially useful for menu bars as it reveals additional links or content for bots to find and index. By simulating these hover actions during rendering, these hidden content becomes findable and accessible for indexing by search engines.


## Importance of Synthetic Interactions

Web crawlers like search engine bots only see content rendered on a page. Without synthetic interactions, any dynamically loaded information remains hidden from these bots. Implementing synthetic interactions ensures that all your page's content gets crawled, making it more visible and accessible on search engines, and thus improving SEO performance.
