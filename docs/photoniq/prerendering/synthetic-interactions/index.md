---
sidebar_position: 20
title: Synthetic Interactions
---

# Synthetic Interactions in Prerendering

Synthetic interactions are automated actions that Prerendering performs on your web page to simulate real user behavior. These actions can include scrolling, hovering over elements, and clicking buttons or tabs. The purpose of synthetic interactions is to fully render dynamic content on the page so that it's accessible to search engine bots or other web crawlers.

With synthetic interactions, Prerendering enables you to maximize the visibility of your dynamically generated content, ensuring a more effective indexing by web crawlers.

:::note
Although synthetic interactions might make your UI appear odd during the rendering process, it doesn't impact how bots interpret the page.
:::

## Why Synthetic Interactions Are Important

Web crawlers, such as search engine bots, only see the content that is rendered on a page. Without synthetic interactions, any dynamically loaded information remains hidden from these bots. Implementing synthetic interactions ensures that all your page's content gets crawled, making it more visible and accessible on search engines.

## Supported Interactions

Prerendering supports a variety of synthetic interactions:

- **Scrolling**: Some web content, particularly footers, might not load until the user scrolls down to it. Prerendering automatically scrolls to ensure all such content is rendered.
  
- **Hovering**: Especially useful for menu bars, hovering can reveal additional pages or content that the bot should find and index.
  
- **Click Events**: Click events, such as tab switching, can be defined by the user to expose specific content to bots.

## Customization

You can specify the HTML tags where these interactions should occur, providing you with control over what content is exposed to bots. Additionally, you can configure multiple interactions per page to cater to complex dynamic sites.

## Setup

As of now, the setup for synthetic interactions is performed by Macrometa engineers. If you require customized interactions, please contact our support team.
