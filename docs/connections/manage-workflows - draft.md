---
title: Manage ETL Workflows - DRAFT
sidebar_position: 30
---



Create data source workflow
Add data target workflow

- When you attach targets to a collection, only the data that is available in the current region is used for the target workflow. However, if the current region becomes unreachable, the workflow will stop copying data. To ensure uninterrupted data copying, you should enable streams for the source collection in other regions as a backup. This way, data copying will automatically switch to one of those regions when the current region becomes unavailable.
- DFP Note - Ask Koshy how to do this. From Grainier: They have to switch the region (from top left region selector in GUI), and from each region they have to open the collection settings and enable stream using the toggle.

View ETL workflows
Delete workflow
Reload collection - It initially truncates the current collection and then only re-starts the Source connection.

This page shows you how to manage your ETL connections.

## Create a Data Source Workflow

You can only create a source workflow when you create a collection. You cannot add a source to a collection post-creation.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Collections**.
3. Click **New Collection**.
4. Click **Document Store**.
5. Click **Add data source**.
6. Select an existing source connection or click **Add connection**, select the connection that you want to create, and then follow the guidance on the screen.
7. Enter a source collection or source table. You might also have optional fields, depending on your connector type.
8. Click **Validate**.
   
   Macrometa validates the connection and displays a preview of information in the data source.

9. (Optional) If you want to transform the data, then click **Add Transformation**. For more information about supported Stream QL, refer to [Transformations](./transformations).
10.  Enter information about the collection:

   - **Collection Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
   - **Distribution -** Required. Select whether to store data globally or locally. Default is **Global**.

11. Click **Create**. If you are missing required information or have an incomplete connection, then you cannot complete this step.

## View a Connection

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.

   Macrometa displays a list of existing connections.

3. To view the settings of a specific connection, click the connection name.

## Edit a Connection

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.
3. Click the name of the connection that you want to edit.
4. In the **Edit Connection** screen, make any changes you want to and then click **Update**.

## Duplicate a Connection

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.
3. Click the stacked dots next to the connection that you want to duplicate, then click **Duplicate**.

   Macrometa opens a **New Connection** screen with all the settings entered from the original connection except the name.

4. Enter a name and make any other changes you want, then click **Create**.

## Delete a Connection

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Connections**.
3. Click the stacked dots next to the connection that you want to delete, then click **Delete**.
4. Click **Delete** to confirm your decision and permanently delete the connection.