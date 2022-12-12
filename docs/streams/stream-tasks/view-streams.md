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

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get a list of streams](https://macrometa.com/docs/api#/operations/ListOfStreams)
- [Get stats for a stream](https://macrometa.com/docs/api#/operations/Stats)
- [Get stream backlog](https://macrometa.com/docs/api#/operations/Backlog)

</TabItem>
<TabItem value="cli" label="CLI">

Use the following CLI commands to view existing streams:

- [gdnsl streams list](../../cli/streams-cli.md#gdnsl-streams-list)
- [gdnsl streams describe](../../cli/streams-cli.md#gdnsl-streams-describe)

</TabItem>
</Tabs>
