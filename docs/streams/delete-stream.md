---
sidebar_position: 80
title: Delete Streams
---

This page explains how you can delete streams.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Delete a stream.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Streams**.

   Macrometa displays a list of streams and their attributes.

1. Click the trash can icon next to the stream that you want to delete.
1. Confirm your choice.

    Macrometa permanently deletes the stream. You can re-create the stream, but you cannot undo the deletion.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove a stream](https://macrometa.com/docs/api#/operations/DeleteStream).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl streams delete](../cli/streams-cli.md#gdnsl-streams-delete) CLI commands to delete existing streams.

</TabItem>
</Tabs>
