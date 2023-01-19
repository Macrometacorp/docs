---
title: jms (Sink)
---

JMS Sink allows users to subscribe to a JMS broker and publish JMS messages.

Syntax

    CREATE SINK <NAME> WITH (type="jms", map.type="<STRING>", connection.factory.jndi.name="<STRING>", factory.initial="<STRING>", provider.url="<STRING>", connection.factory.type="<STRING>", connection.username="<STRING>", connection.password="<STRING>", connection.factory.nature="<STRING>")

## Query Parameters

| Name                         | Description                                                                                                                                                                                       | Default Value          | Possible Data Types | Optional | Dynamic |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|---------------------|----------|---------|
| destination                  | Queue/Topic name which JMS Source should subscribe to                                                                                                                                             |                        | STRING              | No       | Yes     |
| connection.factory.jndi.name | JMS Connection Factory JNDI name. This value will be used for the JNDI lookup to find the JMS Connection Factory.                                                                                 | QueueConnectionFactory | STRING              | Yes      | No      |
| factory.initial              | Naming factory initial value                                                                                                                                                                      |                        | STRING              | No       | No      |
| provider.url                 | Java naming provider URL. Property for specifying configuration information for the service provider to use. The value of the property should contain a URL string (e.g. "ldap://somehost:389") |                        | STRING              | No       | No      |
| connection.factory.type      | Type of the connection connection factory. This can be either queue or topic.                                                                                                                     | queue                  | STRING              | Yes      | No      |
| connection.username          | username for the broker.                                                                                                                                                                          | None                   | STRING              | Yes      | No      |
| connection.password          | Password for the broker                                                                                                                                                                           | None                   | STRING              | Yes      | No      |
| connection.factory.nature    | Connection factory nature for the broker(cached/pooled).                                                                                                                                          | default                | STRING              | Yes      | No      |

## Example 1

    CREATE SINK inputStream WITH (type='jms', map.type='xml', factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='vm://localhost', destination='DAS_JMS_OUTPUT_TEST', connection.factory.type='topic', connection.factory.jndi.name='TopicConnectionFactory') (name string, age int, country string);

This example shows how to publish to an ActiveMQ topic.

## Example 2

    CREATE SINK inputStream WITH (type='jms', map.type='xml', factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='vm://localhost',destination='DAS_JMS_OUTPUT_TEST') (name string, age int, country string);

This example shows how to publish to an ActiveMQ queue. Note that we are not providing properties like connection factory type
