---
sidebar_position: 50
title: View Streams
---

This page explains how you can see existing streams and view their details.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

View existing streams.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Streams**.

   Macrometa displays a list of streams and their attributes.

1. To see more details and stream statistics, click a stream name.

When you view a stream in the console, you will not see a backlog of messages. This screen does not persist, which means that when it is open, you will see new messages as they are sent. If you close the screen, any messages displayed will not be visible the next time that you open it.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get a list of streams](https://www.macrometa.com/docs/api#/operations/ListOfStreams)
- [Get stats for a stream](https://www.macrometa.com/docs/api#/operations/Stats)
- [Get stream backlog](https://www.macrometa.com/docs/api#/operations/Backlog)

</TabItem>
<TabItem value="cli" label="CLI">

Use the following CLI commands to view existing streams:

- [gdnsl streams list](../../cli/streams-cli#gdnsl-streams-list)
- [gdnsl streams describe](../../cli/streams-cli#gdnsl-streams-describe)

</TabItem>
</Tabs>
