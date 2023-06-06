---
title: Connection Statuses
sidebar_position: 40
---

Here is a list of possible statuses for Macrometa connections. You can [view them in Collection Settings](../collections/view-collection-settings).

- **Succeeded**: The connection completes successfully, it transitions to the Succeeded state. This status means that all the steps and tasks within the connection have been executed without any errors or failures.
- **Running**: The connection is currently being executed and progressing towards completion.
- **Failed**: If any step or task within the connection encounters an error or failure, then the connection transitions to the Failed state. This status indicates that the connection execution was unsuccessful and requires attention to diagnose and resolve the underlying issues.
- **Error**: The Error status is similar to the Failed state, but it represents a broader range of errors that may occur outside of the individual steps or tasks. It could indicate issues with the external data center, connectivity problems, or any other critical errors that prevent proper connection execution.
- **Terminated**: The Terminated status indicates that the connection has been forcefully terminated. This status is the final state after the connection has been stopped, and no further execution or recovery is possible.
- **Expired**: After a connection completes (any state but Running), it releases connection resources back and mark the connection as Expired after a retention period of three days.
