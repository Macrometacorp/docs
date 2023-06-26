---
title: Manage ETL Workflows
sidebar_position: 30
---

This page shows you how to manage your ETL connections.

## Create a Data Source Workflow

You can only create a source workflow when you create a Macrometa document collection. You cannot add a source to a collection post-creation.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Collections**.
3. Click **New Collection**.
4. Click **Document Store**.
5. Click **Add data source**.
6. Select an existing source connection or click **Add connection**, select the connection that you want to create, and then follow the guidance on the screen.
7. Enter a source collection or source table. You might also have optional advanced fields, depending on your connector type.
8. Click **Validate**.

   Macrometa validates the connection and displays a preview of information in the data source.

9. (Optional) If you want to transform the data, then click **Add Transformation**. For more information about supported Stream QL, refer to [Transformations](./transformations).
10. Enter information about the collection:

    - **Collection Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
    - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
    - **Distribution -** Required. Select whether to store data globally or locally. Default is **Global**.

11. Click **Create**. If you are missing required information or have an incomplete connection, then you cannot complete this step.

## Add a Target Workflow

You can only add a target workflow to a Macrometa document collection that contains records.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Collections**.
3. Click the collection to which you want to add the target workflow.
4. Click **Settings**.
5. In the ETL Workflows section, click **Add data target**.
6. Select an existing target connection or click **Add connection**, select the connection that you want to create, and then follow the guidance on the screen.
7. Enter a target collection or target table. You might also have optional advanced fields, depending on your connector type.
8. (Optional) If you want to transform the data, then click **Add Transformation**. For more information about supported Stream QL, refer to [Transformations](./transformations).
9. Click **Create**.

:::note
When you add a target workflow to a collection, only the data that is available in the current region is used for the target workflow. However, if the current region becomes unreachable, then the workflow will stop copying data. To ensure uninterrupted data copying, you should enable streams for the source collection in other regions as a backup. This way, data copying will automatically switch to one of those regions when the current region becomes unavailable.
:::

## View Collection Workflows

You can view workflows attached to a collection in the Collection Settings tab.

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Collections**.
1. Click the collection for which you want to view the settings.
1. Click **Settings** to view the Settings tab.

![ETL Workflows Section](/img/connections/etl-workflows.png)

## Reload Collection

Reloading the collection truncates the collection and then only restarts the source connection. This can only be done on collections that have a source workflow.

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Collections**.
1. Click the collection for which you want to view the settings.
1. Click **Settings** to view the Settings tab.
1. Click **Reload Collection**.

## Delete Workflow

Deleting a workflow does not delete the data within the collection. If you delete a source workflow, then you will have to create a new collection in order to re-create the workflow.

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Collections**.
1. Click the collection for which you want to view the settings.
1. Click **Settings** to view the Settings tab.
1. In ETL Workflows, click the three stacked dots next to the workflow that you want to delete.
1. Depending on the workflow, click **Delete data source** or **Delete data target**.
