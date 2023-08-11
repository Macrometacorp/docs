---
sidebar_position: 10
title: Install Databricks Client Connector
---

## Prerequisites

- Databricks Runtime 11.3 LTS(with Apache Spark 3.3.0)
- Scala 2.12 or later
- Macrometa account with access to streams

## How to install the Macrometa Databricks Connector

1. Obtain the JAR file. You can obtain the JAR file for the connector through either of the following methods:

a. Using the Official GitHub Package: Download the pre-built JAR file from the official GitHub package for this repository. For example: app-0.0.1.jar. This is the recommended way for production usage.

b. Building from Source: Clone this repository by running git clone https://github.com/Macrometacorp/macrometa-connector-databricks.git, and then build the JAR file using Gradle. Open a terminal in the root folder of the project and execute the command: ./gradlew clean shadowJar. This method provides the latest code, but it may not be officially released, so it's not recommended for production environments.


2. The generated JAR file named 'macrometa-connector-databricks.jar' will be located in the `app/build/libs` directory. Upload the JAR file to your Databricks workspace using the [Databricks CLI](https://docs.databricks.com/dev-tools/cli/index.html) or the Databricks UI.

3. Attach the JAR file to your Databricks cluster by following the instructions in the [Databricks documentation](https://docs.databricks.com/libraries/cluster-libraries.html#install-a-library-on-a-cluster).