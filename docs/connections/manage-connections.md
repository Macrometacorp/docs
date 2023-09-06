---
title: Manage Connections
sidebar_position: 20
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you how to manage your connections in the Macrometa Connections section.

## Create a Connection

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new connection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.
3. Click **New Connection**.
4. Select the connection type. Every connector in the list has a data source type and is either a source or a target.
5. Enter specific information in the fields for the connection and then click **Create**. For prerequisites and additional notes, refer to the documentation for the specific [connector type](./connector-types/).

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get Available Connectors](https://www.macrometa.com/docs/api#/operations/getConnectors)
- [Create a Connection](https://www.macrometa.com/docs/api#/operations/createConnection).
- [Validate a Connection](https://www.macrometa.com/docs/api#/operations/validateConnection).

</TabItem>
</Tabs>

## View a Connection

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view connections using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.

   Macrometa displays a list of existing connections.

3. To view the settings of a specific connection, click the connection name.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [List All Connections](https://www.macrometa.com/docs/api#/operations/getConnections)
- [Get Connection Details](https://www.macrometa.com/docs/api#/operations/getConnection)

</TabItem>
</Tabs>

## Edit a Connection

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to edit a connection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.
3. Click the name of the connection that you want to edit.
4. In the **Edit Connection** screen, make any changes you want to and then click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Update a Connection](https://www.macrometa.com/docs/api#/operations/updateConnection).

</TabItem>
</Tabs>

## Duplicate a Connection

Follow these instructions to duplicate a connection using the GDN console web UI. You can only perform this task in the web console.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.
3. Click the stacked dots next to the connection that you want to duplicate, then click **Duplicate**.

   Macrometa opens a **New Connection** screen with all the settings entered from the original connection except the name.

4. Enter a name and make any other changes you want, then click **Create**.

## Delete a Connection

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a connection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.
3. Click the stacked dots next to the connection that you want to delete, then click **Delete**.
4. Click **Delete** to confirm your decision and permanently delete the connection.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Delete a Connection](https://www.macrometa.com/docs/api#/operations/deleteConnection).

</TabItem>
</Tabs>
