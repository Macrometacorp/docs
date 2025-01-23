---
title: Using HTML Selectors
---

HTML Selectors are the primary identifier used by Prerender for implementing synthetic interactions like Hover and Click. The `htmlSelector` resides within the DOM or the shadow DOM of the web page.

- **Document Object Model (DOM):** This is the standard model that describes the arrangement of all elements in a web page. The DOM represents the document as a tree of objects, which can be manipulated with languages like JavaScript.
  
- **Shadow DOM:** This forms a part of the web standards that allows developers to create their own encapsulated HTML tags, styles, and scripts, without worrying about them conflicting with other parts of the web page. It effectively shields a part of the page’s HTML from being affected by the main document's CSS and JavaScript. This is particularly useful in complex web applications and components like web components, where you want to keep the component's internal functionality separate and hidden from the rest of the application.

For elements encapsulated within a shadow DOM, prepend the selector with `>>>` to ensure Prerender can accurately target and interact with these elements. The `>>>` notation allows the selector to "pierce" through the shadow boundary, enabling interaction with elements that are otherwise encapsulated.

## Recommendations for Choosing an HTML Selector

Here are some recommendations when choosing a selector:


### Use the ID

The `id` attribute serves as a unique identifier for a html element, and can serve as a straightforward selector. Example: `#login-button`.

### Use a Complex Selector

For elements without an `id`, or in need of a more specific path, use the right-click context menu over the highlighted HTML code in the Developer Tools and select `Copy > Copy selector`. This gives you a string that uniquely identifies the element in CSS terms. This might be a combination of element types, classes, IDs, and pseudo-classes.

### For Shadow DOM Elements

If the element is within a shadow DOM, use `>>>` followed by the specific selector. For example,  `>>> #__next > div > header > div.chakra-container.css-1ichkct > div > div.chakra-stack.css-jojt9m > a.chakra-link.css-i0nad5`.

- You might need to use JavaScript to access the shadowRoot of the custom element. For example: `document.querySelector('custom-element').shadowRoot.querySelector('element')`.
- Some browsers' Developer Tools allow you to inspect elements within Shadow DOM directly. Ensure to enable the option to show user agent shadow DOM from the settings of the Developer Tools.

#### Consider Specificity and Efficiency

Simplify the selected selector if possible, especially for deeply nested selectors. The goal remains to uniquely identify an element, while maintaining simplicity. 

For example, a generated selector is `html > body > div:nth-child(3) > div > p > a`, with a `div` element and id `login-container`, can be simplified to `#login-container > p > a`.