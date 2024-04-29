---
sidebar_position: 20
title: Synthetic Interactions
---

# Synthetic Interactions in Prerendering

Synthetic interactions are automated actions that Prerendering performs on your web page to simulate real user behavior. These actions can include scrolling, hovering over elements, and clicking buttons or tabs. The purpose of synthetic interactions is to fully render dynamic content on the page so that it's accessible to search engine bots or other web crawlers.

With synthetic interactions, Prerendering enables you to maximize the visibility of your dynamically generated content, ensuring a more effective indexing by web crawlers.

A set of rules that govern a synthetic interaction is called a _policy_. The policy governs which pages the interaction is executed on, the HTML selector acted upon, and so on.

:::note
Although synthetic interactions might make your UI appear odd during the rendering process, it doesn't impact how bots interpret the page.
:::

## Why Synthetic Interactions Are Important

Web crawlers, such as search engine bots, only see the content that is rendered on a page. Without synthetic interactions, any dynamically loaded information remains hidden from these bots. Implementing synthetic interactions ensures that all your page's content gets crawled, making it more visible and accessible on search engines.

## Supported Interactions

Prerendering supports a variety of synthetic interactions. You can create as many policies for each type of interaction as you need.

### Scroll

Some web content, particularly footers, might not load until the user scrolls down to it. Prerendering automatically scrolls to ensure all such content is rendered. Many web pages load content dynamically based on what's visible in the viewport. By automatically scrolling during prerendering, more content is loaded and captured, enhancing the completeness of the prerendered page.

### Click

Click events, such as tab switching, can be defined by the user to reveal additional links or content to bots. For example, clicking to switch tabs or expand sections. By simulating these clicks during prerendering, we can ensure that all necessary content is visible and indexed by bots.

### Hover

Especially useful for menu bars, hovering can reveal additional links or content that the bot should find and index. Hovering over elements such as menus often reveals additional content. By simulating these hover actions during prerendering, hidden content is exposed and accessible for indexing by search engines.

## Global and Specific Policies

Synthetic interactions can be _global_ or _specific_.

- A _global_ policy applies to all sites in the origin.
- A _specific_ policy applies only to selected URL paths.

## Customization

You can specify the HTML tags where these interactions should occur, providing you with control over what content is exposed to bots. Additionally, you can configure multiple interactions per page to cater to complex dynamic sites.

## HTML Selector

To set up a synthetic interaction, you must enter the correct `htmlSelector` string so that Prerender knows which page element to interact with. For information about how to find this string, refer to [Find HTML Selector](find-htmlselector.md).
