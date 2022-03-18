---
sidebar_position: 10
---

# Geo Spatial

This extension provides data related to geographic (geo) functionality. For example, you can verify that a coordinate is within a predefined geo-fence or measure the distance between two coordinates.

For all the following features, you can choose to use coordinates or a `geo.json.geometry` object.

## Features

The following functions, stream functions, and stream processors are available for geo functionality:


* [distance (Function)](#distance)
    
* [intersects (Function)](#intersects)
    
* [contains (Function)](#contains)
    
* [withinDistance (Function)](#withinDistance)
    
* [disjoint (Function)](#disjoint)

* [touches (Function)](#touches)

* [overlaps (Function)](#overlaps)

* [equals (Function)](#equals)
    
* [closestPoints (Stream Function)](#closestPoints)
    
* [locationApproximate (Stream Function)](#locationApproximate)

* [crosses (Stream Processor)](#crosses)
 
* [proximity  (Stream Processor)](#proximity)
   
* [stationary (Stream Processor)](#stationary)
   
   
   
## distance

Returns the distance between two coordinates in meters.


    <DOUBLE> geo:distance(<DOUBLE> location1.latitude, <DOUBLE> location1.longitude, <DOUBLE> location2.latitude, <DOUBLE> location2.longitude)




| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| location1.latitude 	              | Latitude of 1st location.                                                            | DOUBLE       | No       | No     |
| location1.longitude | Longitude of 1st location.                                           | DOUBLE              | No      | No     |
| location2.latitude          | Latitude of 2nd location. | DOUBLE                | No      | No     |
| location2.longitude         | Longitude of 2nd location. | DOUBLE                | No      | No     |


For example:

    geo:distance(10.45, 77.38, 83.98, 59.93)


## intersects

Two available sets of parameters:

* First set returns `true` if the incoming `geo.json.geometry` event intersects the given `geo.json.geometryFence`.
* Second set returns `true` if the specified coordinates intersect the given `geo.json.geometryFence`.

### Syntax

    <BOOL> geo:intersects(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:intersects(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |


Example 1:


    geo:intersects( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]} )

This example returns `true` because `geo.json.geometry` intersects with `geo.json.geometry.fence`.


Example 2:


    geo:intersects(0.5. 0.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
This example returns `true` because the coordinates intersect with `geo.json.geometry.fence`.


       
## contains

Two available sets of parameters:

* First set returns `true` if the specified coordinates are contained within the `geo.json.geometry.fence`.
* Second set returns `true` if the `geo.json.geometry` is contained within the `geo.json.geometry.fence`.


### Syntax


    <BOOL> geo:contains(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:contains(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |


Example 1:


    geo:contains(0.5, 0.5, {'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]} )


This example returns `true` because the coordinates are within the `geo.json.geometry.fence`.


Example 2:


    geo:contains( {'type': 'Circle', 'radius': 110575, 'coordinates':[1.5, 1.5]} , {'type':'Polygon','coordinates':[[[0,0],[0,4],[3,4],[3,0],[0,0]]]} )
    
This example returns `true` because `geo.json.geometry` is within `geo.json.geometry.fence`.
       


## withinDistance

Two available sets of parameters:

* First set returns `true` if the specified coordinates are within a given distance of the `geo.json.geometry.fence`.
* Second set returns `true` if the area specified by `geo.json.geometry` is within a given distance of the `geo.json.geometry.fence`. 


### Syntax


    <BOOL> geo:withinDistance(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)
    <BOOL> geo:withinDistance(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence,  <DOUBLE> radius)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |
| radius        | The distance parameter. | DOUBLE                | No      | Yes     |       


Example 1:


    geo:withinDistance( 0.5 , 0.5, {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)




This example returns `true` because the coordinates are within the specified radius of the `geo.json.geometry.fence`.


Example 2:


    geo:withinDistance( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)
    
This example returns `true` because `geo.json.geometry` is within the specified radius of `geo.json.geometry.fence`.       
       
       
## disjoint

Two available sets of parameters:

* First set returns `true` if the incoming `geo.json.geometry` event is disjointed from the given `geo.json.geometryFence`.
* Second set returns `true` if the specified coordinates are disjointed from the given `geo.json.geometryFence`.


### Syntax


    <BOOL> geo:disjoint(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:disjoint(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |


Example 1:


    geo:disjoint( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
This example returns `true` because `geo.json.geometry` is disjointed from `geo.json.geometry.fence`.


Example 2:


    geo:disjoint(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
This example returns `true` because the coordinates are disjointed from `geo.json.geometry.fence`.
       
      
## touches

Two available sets of parameters:

* First set returns `true` if the incoming `geo.json.geometry` event touches the given `geo.json.geometryFence`.
* Second set returns `true` if the coordinates touch the given `geo.json.geometryFence`.


### Syntax


    <BOOL> geo:touches(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:touches(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |


Example 1:


    geo:touches( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
This example returns `false` because `geo.json.geometry` does not touch `geo.json.geometry.fence`.


Example 2:


    geo:touches(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
This example returns `true` because the coordinates do not touch `geo.json.geometry.fence`.
       
       
## overlaps

Two available sets of parameters:

* First set returns `true` if the incoming `geo.json.geometry` event overlaps the given `geo.json.geometryFence`.
* Second set returns `true` if the specified coordinates overlap the given `geo.json.geometryFence`.


### Syntax


    <BOOL> geo:overlaps(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:overlaps(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |


Example 1:


    geo:overlaps( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
This example returns `false` because `geo.json.geometry` does not overlap with `geo.json.geometry.fence`.


Example 2:


    geo:overlaps(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
This example returns `true` because the coordinates do not overlap with `geo.json.geometry.fence`.       
       
       
## equals

Two available sets of parameters:

* First set returns `true` if the incoming `geo.json.geometry` event equals the given `geo.json.geometryFence`.
* Second set returns `true` if the location pointed by longitude and latitude equals the given geo.json.geometryFence.


### Syntax


    <BOOL> geo:equals(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:equals(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |


Example 1:


    geo:equals( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
This example returns `false` because `geo.json.geometry` is not equal to `geo.json.geometry.fence`.


Example 2:


    geo:equals(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
This example returns `true` because the coordinates are not equal to `geo.json.geometry.fence`.          
       
       
## closestPoints 


Returns the closest coordinate to `geo.json.geometry.fence`.


### Syntax


    geo:closestPoints(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)


### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | No       | No     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | No     |


### Extra Return Attributes
       
| Name              | Description                                                                                              | Possible Data Types | 
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|
| closestPointOf1From2Latitude 	              | closest point's latitude to the fence from the location.                       |   DOUBLE            | 
| closestPointOf1From2Longitude 	          | closest point's longitude to the fence from the location.                       |   DOUBLE            | 
| closestPointOf2From1Latitude 	              | closest point's latitude to the location from the fence.                       |   DOUBLE            | 
| closestPointOf2From1Longitude 	          | closest point's longitude to the location from the fence.                       |   DOUBLE            | 
       
       
For example:


    geo:closestPoints(0.5,0.5,"{'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]}")


This example returns `0.5, 0.5, 0.5, 0.5`.
       
       
## locationApproximate


Calculates the average location of `locationRecorder` using the collection iBeacons in which the location recorder resides. 




### Syntax


    geo:locationApproximate(<STRING> location.recorder, <DOUBLE> latitude, <DOUBLE> longitude, <STRING> sensor.proximity, <STRING> sensor.uuid, <DOUBLE> sensor.weight, <LONG> timestamp)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| location.recorder 	              | Unique ID of the specified object or item.                                                           | STRING       | No       | No     |
| latitude | Latitude of the iBeacon.                                           | DOUBLE              | No      | No     |
| longitude        | Longitude of the iBeacon. | DOUBLE                | No      | No     |
| sensor.proximity        | Proximity given by the iBeacon (eg: ENTER, RANGE, EXIT). | STRING                | No      | No     |
| sensor.uuid        | Unique ID of the iBeacon. | STRING                | No      | No     |
| sensor.weight        | Approximation weight of the iBeacon (e.g. approximate distance from the iBeacon). | DOUBLE                | No      | No     |
| timestamp        | Timestamp of the log you want to use to remove iBeacon from a collection after no new log for 5 minutes. | LONG                | No      | No     |


       
For example:


    geo:geoLocationApproximate("person1", 6.876657, 79.897648, "ENTER", "uuid1", 20.0d, 1452583935L)


This example returns `6.876657000000001` as the approximate location.
       
   
## crosses 

Determines if the specified object or location crosses a geographic location specified by `geo.json.geometry.fence`.


### Syntax


    <BOOL> geo:crosses(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:crosses(<STRING> id, <STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| id 	              | Location ID.                                                           | STRING       | No       | No     |
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | Yes       | No     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | Yes      | No     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING                | No      | No     |


For example:


    geo:crosses(km-4354, -0.5, 0.5, {'type':'Polygon','coordinates':[[[0, 0],[2, 0],[2, 1],[0, 1],[0, 0]]]} )


This example returns `true` because the coordinates cross the `geo.json.geometry.fence`.
  
       
## proximity 

Determines if the specified object or location is within the radius of another object. Returns false when the object moves out of the specified radius.




### Syntax


    <BOOL> geo:proximity(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)


### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| id 	              | ID of the specified object.                                                           | STRING       | No       | No     |
| longitude 	              | Longitude of the geo location.                                                           | DOUBLE       | No       | No     |
| latitude | Latitude of the geo location.                                           | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING                | No      | No     |
| radius          | Proximity distance (radial). | DOUBLE                | No      | No     |
       
For example:


    geo:proximity(1, 0, 0, 110574.61087757687)




This example returns `true` because the coordinates are within the given radius.
       
       
## stationary 

Determines if the specified object or location becomes stationary within a specified radius. Returns false when the object moves out of the specified radius.
       
This function will Return true when the object (defined in terms of longitude and latitude) becomes stationary within the specified radius. Returns false when the object moves out of the specified radius.


### Syntax


    <BOOL> geo:stationary(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)




### Query Parameters


| Name              | Description                                                                                              | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| id 	              | ID of the specified object.                                                           | STRING       | No       | No     |
| longitude 	              | Longitude value of the geo location.                                                           | DOUBLE       | No       | No     |
| latitude | Latitude value of the geo location.                                           | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING                | No      | No     |
| radius          | Proximity distance (radial). | DOUBLE                | No      | No     |
       
For example:


    geo:stationary(km-4354,0,0, 110574.61087757687)


This example returns true.