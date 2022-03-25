---
sidebar_position: 8
title: Credits
---
# Credits & Acknowledgements

Building something as audacious as Macrometa’s GDN cloud would not have been possible without the extraordinary contributions of many people. We are deeply indebted to the following people for the extraordinary body of research work and publications that have enabled us to build Macrometa.

## Conflict Free Replicated Data Types (CRDTs)

**Christopher Meiklejohn** - Christopher is consulting scientist for Macrometa. Christopher’s research into state and operational Conflict Free Replicated Data Types & implementations such as LASP, Partisan and work on AntidoteDB, enabled us to bring the best ideas from CRDTs to our vision for a geo distributed database. In addition, Chris is just one of the most humble and great people we have had the good fortune of collaborating with.
[http://christophermeiklejohn.com](http://christophermeiklejohn.com)

**Marc Shapiro**’s research at INRIA, France lead to the creation of CRDTs, Strong Eventual Consistency, and its applications in wide area and disconnected applications. His papers and videos helped us several years back with our initial investigation of replicated data types. [https://dl.acm.org/author_page.cfm?id=81100431017](https://dl.acm.org/author_page.cfm?id=81100431017)

**Carlos Baquero**’s “Pure Operation-Based Replicated Data Types” paper enabled us to think about the right approach to multi master replication and causal broadcast. 
[https://arxiv.org/pdf/1710.04469.pdf](https://arxiv.org/pdf/1710.04469.pdf)

**Martin Klepmann**’s ground breaking book “Designing Data-Intensive Applications” opened up many exciting approaches and techniques for us to consider when building our geo-distributed cloud service at scale. We continues to source inspiration from his work, presentations and papers on streams and consistency. 
[http://dataintensive.net/](http://dataintensive.net/)

**Leslie Lamport** invented Latex, but even more importantly gave the world a way to think about time keeping that results in correctness, performance and reliability in geo distributed systems. His paper “Time, Clocks, and the Ordering of Events in a Distributed System” helped us create our logical clock and causal ordering implementations.
[https://lamport.azurewebsites.net/pubs/time-clocks.pdf](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)

## Open Sources

We leverage following open sources in our geo-distributed platform. 

Macrometa utilizes [**ArangoDB**](https://github.com/arangodb/arangodb) query engine and AQL syntax as the foundation for our database query functionality. 

Macrometa utilizes [**Apache Siddhi**](https://siddhi.io/) library internally for pipelines processing, [**Apache Bookkeeper**](http://bookkeeper.apache.org/) & [**ZooKeeper**](http://zookeeper.apache.org/) for low-latency append-only log optimized for real-time messaging.