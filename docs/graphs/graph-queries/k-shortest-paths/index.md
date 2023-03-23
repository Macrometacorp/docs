---
sidebar_position: 30
title: k Shortest Paths Query
---




This type of query is supposed to find the first _k_ paths in order of length (or weight) between two given documents, _startVertex_ and _targetVertex_ in your graph.

Every such path will be returned as a JSON object with three components:

- an array containing the `vertices` on the path
- an array containing the `edges` on the path
- the `weight` of the path, that is the sum of all edge weights

If no _weightAttribute_ is given, the weight of the path is just its length.




## K Shortest Path Query in Action

Let us take a look at a simple example to explain how it works. This is the graph that we are going to find some shortest path on:

![Train Connection Map](/img/train_map.png)

Each ellipse stands for a train station with the name of the city written inside of it. They are the vertices of the graph. Arrows represent train connections between cities and are the edges of the graph. The numbers near the arrows describe how long it takes to get from one station to another. They are used as edge weights.

Let us assume that we want to go from **Aberdeen** to **London** by train.

We expect to see the following vertices on _the_ shortest path, in this order:

1. Aberdeen
2. Leuchars
3. Edinburgh
4. York
5. London

By the way, the weight of the path is: 1.5 + 1.5 + 3.5 + 1.8 = **8.3**.

Let us look at alternative paths next, for example because we know that the direct connection between York and London does not operate currently.

An alternative path, which is slightly longer, goes like this:

1. Aberdeen
2. Leuchars
3. Edinburgh
4. York
5. **Carlisle**
6. **Birmingham**
7. London

Its weight is: 1.5 + 1.5 + 3.5 + 2.0 + 1.5 = **10.0**.

Another route goes via Glasgow. There are seven stations on the path as well, however, it is quicker if we compare the edge weights:

1. Aberdeen
2. Leuchars
3. Edinburgh
4. **Glasgow**
5. Carlisle
6. Birmingham
7. London

The path weight is lower: 1.5 + 1.5 + 1.0 + 1.0 + 2.0 + 1.5 = **8.5**.