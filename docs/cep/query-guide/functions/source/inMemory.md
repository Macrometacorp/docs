---
title: inMemory (Source)
---

In-memory source subscribes to a topic to consume events which are
published on the same topic by In-memory sinks. This provides a way to
connect multiple Stream App Apps deployed under the same Stream App Manager
(JVM). Here both the publisher and subscriber should have the same event
schema (stream definition) for successful data transfer.

Syntax

    CREATE SOURCE <NAME> WITH (type="inMemory", map.type="<STRING>", topic="<STRING>")


## Query Parameters

| Name  | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------------------------------------------|---------------|---------------------|----------|---------|
| topic | Subscribes to the events sent on the given topic. |               | STRING              | No       | No      |

## Example 1

    CREATE SOURCE StocksStream WITH (type='inMemory', topic='Stocks', map.type='passThrough') (symbol string, price float, volume long);

Here the `StocksStream` uses inMemory source to consume events published
on the topic `Stocks` by the inMemory sinks deployed in the same JVM.

###### jms (Source)

JMS Source allows users to subscribe to a JMS broker and receive JMS
messages. It has the ability to receive Map messages and Text messages.

Syntax

    CREATE SOURCE <NAME> WITH (type="jms", map.type="<STRING>", destination="<STRING>", connection.factory.jndi.name="<STRING>", factory.initial="<STRING>", provider.url="<STRING>", connection.factory.type="<STRING>", worker.count="<INT>", connection.username="<STRING>", connection.password="<STRING>", retry.interval="<INT>", retry.count="<INT>", use.receiver="<BOOL>", subscription.durable="<BOOL>", connection.factory.nature="<STRING>")


## Query Parameters

| Name                         | Description                                                                                                                                                                                       | Default Value          | Possible Data Types | Optional | Dynamic |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|---------------------|----------|---------|
| destination                  | Queue/Topic name which JMS Source should subscribe to                                                                                                                                             |                        | STRING              | No       | No      |
| connection.factory.jndi.name | JMS Connection Factory JNDI name. This value will be used for the JNDI lookup to find the JMS Connection Factory.                                                                                 | QueueConnectionFactory | STRING              | Yes      | No      |
| factory.initial              | Naming factory initial value                                                                                                                                                                      |                        | STRING              | No       | No      |
| provider.url                 | Java naming provider URL. Property for specifying configuration information for the service provider to use. The value of the property should contain a URL string (e.g. "ldap://somehost:389") |                        | STRING              | No       | No      |
| connection.factory.type      | Type of the connection connection factory. This can be either queue or topic.                                                                                                                     | queue                  | STRING              | Yes      | No      |
| worker.count                 | Number of worker threads listening on the given queue/topic.                                                                                                                                      | 1                      | INT                 | Yes      | No      |
| connection.username          | username for the broker.                                                                                                                                                                          | None                   | STRING              | Yes      | No      |
| connection.password          | Password for the broker                                                                                                                                                                           | None                   | STRING              | Yes      | No      |
| retry.interval               | Interval between each retry attempt in case of connection failure in milliseconds.                                                                                                                | 10000                  | INT                 | Yes      | No      |
| retry.count                  | Number of maximum reties that will be attempted in case of connection failure with broker.                                                                                                        | 5                      | INT                 | Yes      | No      |
| use.receiver                 | Implementation to be used when consuming JMS messages. By default transport will use MessageListener and tweaking this property will make make use of MessageReceiver                             | false                  | BOOL                | Yes      | No      |
| subscription.durable         | Property to enable durable subscription.                                                                                                                                                          | false                  | BOOL                | Yes      | No      |
| connection.factory.nature    | Connection factory nature for the broker.                                                                                                                                                         | default                | STRING              | Yes      | No      |

## Example 1

    CREATE SOURCE inputStream WITH (type='jms', map.type='json', factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='tcp://localhost:61616',destination='DAS_JMS_TEST', connection.factory.type='topic',connection.factory.jndi.name='TopicConnectionFactory') (name string, age int, country string);

This example shows how to connect to an ActiveMQ topic and receive
messages.

## Example 2

    CREATE SOURCE inputStream WITH (type='jms', map.type='json', factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='tcp://localhost:61616',destination='DAS_JMS_TEST') (name string, age int, country string);

This example shows how to connect to an ActiveMQ queue and receive
messages. Note that we are not providing properties like connection
factory type
