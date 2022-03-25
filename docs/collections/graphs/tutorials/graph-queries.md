---
sidebar_position: 1
title: Graph Queries
---

# Graph Queries

## Dataset

Create a document collection named cities. Add a Geo Index to the collection cities with Fields location and Geo JSON set to true. To populate the cities collection, execute the following query:

```JavaScript
LET c = [
	{"_key": "sanfrancisco", "location": [-122.416667, 37.783333]},
	{"_key": "newyork", "location": [-74.0059, 40.7127]},
	{"_key": "detroit", "location": [-83.045833, 42.331389]},
	{"_key": "paris", "location": [2.3508, 48.8567]},
	{"_key": "dublin", "location": [-6.260278, 53.349722]},
	{"_key": "singapore", "location": [103.8, 1.3]},
	{"_key": "houston", "location": [-95.383056, 29.762778]},
	{"_key": "seattle", "location": [-122.333056, 47.609722]}
]
FOR city IN c
    INSERT city IN cities
```

Create an edge collection named flights. To populate the flights collection, execute the following query:

```JavaScript
LET e = [
	{"_from": "cities/sanfrancisco", "_to": "cities/singapore", "distance": 13600},
	{"_from": "cities/sanfrancisco", "_to": "cities/newyork", "distance": 4000},
	{"_from": "cities/sanfrancisco", "_to": "cities/detroit", "distance": 3300},
	{"_from": "cities/sanfrancisco", "_to": "cities/houston", "distance": 2600},
	{"_from": "cities/detroit", "_to": "cities/sanfrancisco", "distance": 3300},
	{"_from": "cities/detroit", "_to": "cities/newyork", "distance": 800},
	{"_from": "cities/newyork", "_to": "cities/sanfrancisco", "distance": 4000},
	{"_from": "cities/newyork", "_to": "cities/detroit", "distance": 800},
	{"_from": "cities/newyork", "_to": "cities/dublin", "distance": 5100},
	{"_from": "cities/newyork", "_to": "cities/paris", "distance": 5800},
	{"_from": "cities/newyork", "_to": "cities/houston", "distance": 2300},
	{"_from": "cities/dublin", "_to": "cities/newyork", "distance": 5100},
	{"_from": "cities/dublin", "_to": "cities/paris", "distance": 800},
	{"_from": "cities/paris", "_to": "cities/newyork", "distance": 5800},
	{"_from": "cities/paris", "_to": "cities/dublin", "distance": 800},
	{"_from": "cities/paris", "_to": "cities/singapore", "distance": 10700},
	{"_from": "cities/singapore", "_to": "cities/sanfrancisco", "distance": 13600},
	{"_from": "cities/singapore", "_to": "cities/paris", "distance": 10700},
	{"_from": "cities/houston", "_to": "cities/sanfrancisco", "distance": 2600},
	{"_from": "cities/houston", "_to": "cities/newyork", "distance": 2300}
]
FOR edge IN e
    INSERT edge IN flights
```

Create a graph named airline with and edges in flights and both from and to vertices in cities.

## Queries

### Breadth-first search

Get all cities with a direct flight to New York:

```JavaScript
WITH cities
     FOR city IN INBOUND "cities/newyork" flights
	 RETURN city
```

### Shortest path

Get the shortest path from San Francisco to Paris:

```JavaScript
WITH cities
     LET path = (
	FOR city IN OUTBOUND SHORTEST_PATH "cities/sanfrancisco" TO "cities/paris"
	    GRAPH "airline"
	    OPTIONS {"weightAttribute": "distance"}
	    RETURN city
     )
     RETURN path
```

### Get the distance on the shortest path from San Francisco to Paris:

```JavaScript
WITH cities
     LET path = (
	FOR city, e IN OUTBOUND SHORTEST_PATH "cities/sanfrancisco" TO "cities/paris"
	    GRAPH "airline"
	    OPTIONS {"weightAttribute": "distance"}
	    RETURN e.distance
	)
	RETURN SUM(path)
```

### Nearest cities

Get the 2 nearest cities to a specified latitude and longitude.

```JavaScript
FOR loc IN NEAR(cities, 53.35, -6.26, 2, "distance")
RETURN {
	name: loc._key,
	latitude: loc.location[1],
	longitude: loc.location[0],
	distance: loc.distance / 1000
    }
```

### Cities within a given distance

Get the cities that are no more than 2500km away from houston.

```JavaScript
LET city = DOCUMENT("cities/houston")
FOR loc IN WITHIN(cities, city.location[1], city.location[0], 2500 * 1000, "distance")
RETURN {
	name: loc._key,
	latitude: loc.location[1],
	longitude: loc.location[0],
	distance: loc.distance / 1000
    }
```
