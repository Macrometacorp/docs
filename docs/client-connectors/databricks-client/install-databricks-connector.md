---
sidebar_position: 10
title: Install Databricks Client Connector
---

This page explains how to install the Databricks Client Connector.

## Prerequisites

- Databricks Runtime 11.3 LTS(with Apache Spark 3.3.0)
- Scala 2.12 or later
- A Macrometa account with write permissions for streams. For more information about permissions, refer to [Permissions](../../account-management/permissions/).

## Install the Macrometa Databricks Client Connector

Do not start until all prerequisites are fulfilled.

1. Obtain the JAR file for the connector using one of the following methods:
   1. **Using the official GitHub package (Recommended for production)**: Download the pre-built JAR file from the [official GitHub package](https://github.com/Macrometacorp/macrometa-connector-databricks/packages/1908628).
   2. **Build from source**:
      1. Clone this repository by running `git clone https://github.com/Macrometacorp/macrometa-connector-databricks.git`.
      2. Build the JAR file using Gradle. Open a terminal in the root folder of the project and execute the command: `./gradlew clean shadowJar`. The generated JAR file, named 'macrometa-connector-databricks.jar', will be located in the `app/build/libs` directory.

        This method provides the latest code, but it might not be officially released, so it's not recommended for production environments.

2. Upload the JAR file to your Databricks workspace using the [Databricks CLI](https://docs.databricks.com/dev-tools/cli/index.html) or the Databricks UI.
3. Attach the JAR file to your Databricks cluster by following the instructions in the Databricks documentation topic [Install Workspace Libraries](https://docs.databricks.com/en/libraries/workspace-libraries.html#install-workspace-libraries).
