---
title: Best Practices for using HTML Selecctors
---

HTML selectors play an essential role in configuring rendering behavior like setting up synthetic interactions to improve content rendering when serving up pages to bots. These best practices ensure your selectors are reliable, maintainable, and effective in driving the intended synthetic interactions:

## Prioritize Stability in Selectors

Choose selectors that are less likely to change. Avoid using dynamically generated classes or IDs that might vary between sessions or deployments. Opt for selectors based on stable structural elements or attributes that are consistent across different states of the application.

### Use Data Attributes

Consider using custom data attributes (for example, `data-test-id="submit-button"`) for critical elements that are interacted with during synthetic interactions. This approach isolates the selector from style and structural changes, making your tests more resilient to changes in the design.

### Minimize Dependency on DOM Structure

Avoid selectors that are overly dependent on the DOM hierarchy, such as descendant selectors that traverse multiple layers (such as `div > ul > li > a`). These can break if there are changes in the structure of the DOM. Instead, use direct child selectors (such as `div > a`) or even better, selectors that target elements directly.

### Incorporate Robustness to Dynamic Content

For elements that might appear as part of dynamic content loading, ensure your selectors are robust. This might involve waiting for elements to become visible or checking for the presence of an element before interacting with it in your scripts.

### Explicit State Selectors

For interactions like hover or focus, explicitly define selectors that mimic these states. For example, using `:hover` or `:focus` within your CSS or when scripting interactions to ensure it considers the state during the rendering process.

### Testing and Validation

Regularly test your selectors as part of your rendering process. Ensure they not only find the elements but also trigger the intended interactions correctly across all scenarios and edge cases.

### Document Selector Intent

Clearly document the target for each selector and why, especially for those involved in synthetic interactions. This documentation is invaluable for maintenance and when the need for modifications arises as the application evolves.

### Cross-Browser Compatibility

Verify that your selectors and their synthetic interactions work consistently across all targeted browsers. This ensures that the prerendered content behaves as expected, regardless of the user's browser.

### Feedback Loops

Implement mechanisms to capture and review the success rate of interactions triggered by your selectors. Use this feedback to refine and improve the selector strategy continuously.

### Accessibility Considerations

Ensure that the elements targeted for synthetic interactions are also accessible. This not only improves the quality of your prerendered pages but also ensures compliance with web accessibility standards.
