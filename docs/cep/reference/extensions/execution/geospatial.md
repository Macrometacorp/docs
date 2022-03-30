# Geo Spatial
This extension provides geo data related functionality such as checking whether a given geo coordinate is within a predefined geo-fence, finding distance between 2 geo coordinates etc.

## Features

* **[distance (Function)](#distance)**

    This method gives the distance between two geo locations in meters.
    
* **[intersects (Function)](#intersects)**

    This function can be called using two sets of parameters.
    First method will return true if the incoming event geo.json.geometry intersects the given geo.json.geometryFence else false.
    Second method will return true if the location pointed by longitude and latitude intersects the given geo.json.geometryFence else false 
    
* **[contains (Function)](#contains)**

    This function can be call using two sets of parameters.
    This will returns true if the location specified in terms of longitude and latitude is within the geo.json.geometry.fence.
    Or returns true if the geo.json.geometry is within the geo.json.geometry.fence.Returns false otherwise 
    
* **[withinDistance (Function)](#withinDistance)**

    This function can be call using two sets of parameters.
    First method will returns true if the location specified in terms of longitude and latitude is within distance of the geo.json.geometry.fence. Returns false otherwise.
    Second method will return true if the area given by geo.json.geometry is within distance of the geo.json.geometry.fence. 
    
* **[disjoint (Function)](#disjoint)**

    This function can be call using two sets of parameters.
    First method will returns true if the incoming event geo.json.geometry is disjoint from the given geo.json.geometryFence. Returns false otherwise.
    Second method will return true if the location pointed by longitude and latitude is disjoint from the given geo.json.geometryFence. Returns false otherwise.

* **[touches (Function)](#touches)**

    This function can be call using two sets of parameters.
    First method will returns true if the incoming event geo.json.geometry touches the given geo.json.geometryFence. Returns false otherwise.
    Second method will return true if the location pointed by longitude and latitude touches the given geo.json.geometryFence. Returns false otherwise.

* **[overlaps (Function)](#overlaps)**

    This function can be call using two sets of parameters.
    First method will returns true if the incoming event geo.json.geometry overlaps the given geo.json.geometryFence. Returns false otherwise.
    Second method will return true if the location pointed by longitude and latitude overlaps the given geo.json.geometryFence. Returns false otherwise.


* **[equals (Function)](#equals)**

    This function can be call using two sets of parameters.
    First method will returns true if the incoming event geo.json.geometry equals the given geo.json.geometryFence. Returns false otherwise.
    Second method will return true if the location pointed by longitude and latitude equals the given geo.json.geometryFence. Returns false otherwise.
    
* **[closestPoints (Stream Function)](#closestPoints)**

    This will return the closest geo point to the geo.json.geometry.fence 
    
* **[locationApproximate (Stream Function)](#locationApproximate)**

    Geo Location Approximation compute the average location of the locationRecorder using the collection iBeacons which the location recorder resides. 

* **[crosses (Stream Processor)](#crosses)**

    This will return true when the the specified object of which the location is specified in terms of longitude and latitude crosses the geographic location specified in         geo.json.geometry.fence. Returns false when the object crosses out of the location specified in geo.json.geometry.fence
 Or Returns true when the object (i.e. geo.json.geometry) crosses the specified geographic location (i.e. geo.json.geometry.fence). Returns false when the object crosses out of  geo.json.geometry.fence. 
 
 * **[proximity  (Stream Processor)](#proximity)**

   This will return true when two objects (specified in terms of longitude and latitude) are within the specified radius to another object. Returns false when the specified object moves out of the specified radius. The proximityWith optional attribute indicates the ID of the object that the object specified is in close proximity with. proximityID is a unique ID for the two objects in close proximity. 
   
 * **[stationary (Stream Processor)](#stationary)**

   This will return true when the object (defined in terms of longitude and latitude) becomes stationary within the specified radius. Returns false when the object moves out of the specified radius.
   
   
   
## distance

This method gives the distance between two geo locations in meters

Syntax

    <DOUBLE> geo:distance(<DOUBLE> location1.latitude, <DOUBLE> location1.longitude, <DOUBLE> location2.latitude, <DOUBLE> location2.longitude)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| location1.latitude 	              | latitude value of 1st location.                                                            |               | DOUBLE       | No       | No     |
| location1.longitude | longitude value of 1st location.                                           | | DOUBLE              | No      | No     |
| location2.latitude          | latitude value of 2nd location. |          | DOUBLE                | No      | No     |
| location2.longitude         | longitude value of 2nd location. |          | DOUBLE                | No      | No     |

EXAMPLE 1

    geo:distance(10.45, 77.38, 83.98, 59.93)

It will return the distance in meters.


## intersects

This function can be called using two sets of parameters.
First method will return true if the incoming event geo.json.geometry intersects the given geo.json.geometryFence else false.
Second method will return true if the location pointed by longitude and latitude intersects the given geo.json.geometryFence else false 

Syntax

    <BOOL> geo:intersects(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:intersects(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | Yes     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | Yes     |

EXAMPLE 1

    geo:intersects( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]} )
It will return true because geo.json.geometry intersects geo.json.geometry.fence.

EXAMPLE 2

    geo:intersects(0.5. 0.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
It will return true because location pointed by longitude and latitude intersects geo.json.geometry.fence.

       
## contains

This function can be call using two sets of parameters.
This will returns true if the location specified in terms of longitude and latitude is within the geo.json.geometry.fence.
Or returns true if the geo.json.geometry is within the geo.json.geometry.fence.Returns false otherwise 

Syntax

    <BOOL> geo:contains(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:contains(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | Yes     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | Yes     |

EXAMPLE 1

    geo:contains(0.5, 0.5, {'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]} )

This will return true since given longitude and latitude values are within the geo.json.geometry.fence.

EXAMPLE 2

    geo:contains( {'type': 'Circle', 'radius': 110575, 'coordinates':[1.5, 1.5]} , {'type':'Polygon','coordinates':[[[0,0],[0,4],[3,4],[3,0],[0,0]]]} )
    
This will return true since geo.json.geometry is within the geo.json.geometry.fence.
       

## withinDistance

This function can be call using two sets of parameters.
First method will returns true if the location specified in terms of longitude and latitude is within distance of the geo.json.geometry.fence. Returns false otherwise.
Second method will return true if the area given by geo.json.geometry is within distance of the geo.json.geometry.fence. 

Syntax

    <BOOL> geo:withinDistance(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)
    <BOOL> geo:withinDistance(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence,  <DOUBLE> radius)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | Yes     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | Yes     |
| radius        | The distance parameter. |          | DOUBLE                | No      | Yes     |       

EXAMPLE 1

    geo:withinDistance( 0.5 , 0.5, {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)


This will return true because the location specified in terms of longitude and latitude is within the distance of the geo.json.geometry.fence.

EXAMPLE 2

    geo:withinDistance( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)
    
This will return true because geo.json.geometry is within the distance of geo.json.geometry.fence.       
       
       
## disjoint

This function can be call using two sets of parameters.
First method will returns true if the incoming event geo.json.geometry is disjoint from the given geo.json.geometryFence. Returns false otherwise.
Second method will return true if the location pointed by longitude and latitude is disjoint from the given geo.json.geometryFence. Returns false otherwise. 

Syntax

    <BOOL> geo:disjoint(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:disjoint(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | Yes     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | Yes     |

EXAMPLE 1

    geo:disjoint( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
It will return true because geo.json.geometry is disjoint from geo.json.geometry.fence.

EXAMPLE 2

    geo:disjoint(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
It will return true because location pointed by longitude and latitude is disjoint from geo.json.geometry.fence.
       
      
## touches

This function can be call using two sets of parameters.
First method will returns true if the incoming event geo.json.geometry touches the given geo.json.geometryFence. Returns false otherwise.
Second method will return true if the location pointed by longitude and latitude touches the given geo.json.geometryFence. Returns false otherwise. 

Syntax

    <BOOL> geo:touches(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:touches(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | Yes     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | Yes     |

EXAMPLE 1

    geo:touches( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
It will return false because geo.json.geometry doesn't touches geo.json.geometry.fence.

EXAMPLE 2

    geo:touches(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
It will return true because location pointed by longitude and latitude doesn't touches geo.json.geometry.fence.
       
       
## overlaps

This function can be call using two sets of parameters.
First method will returns true if the incoming event geo.json.geometry overlaps the given geo.json.geometryFence. Returns false otherwise.
Second method will return true if the location pointed by longitude and latitude overlaps the given geo.json.geometryFence. Returns false otherwise. 

Syntax

    <BOOL> geo:overlaps(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:overlaps(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | Yes     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | Yes     |

EXAMPLE 1

    geo:overlaps( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
It will return false because geo.json.geometry doesn't overlaps geo.json.geometry.fence.

EXAMPLE 2

    geo:overlaps(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
It will return true because location pointed by longitude and latitude doesn't overlaps geo.json.geometry.fence.       
       
       
## equals

This function can be call using two sets of parameters.
First method will returns true if the incoming event geo.json.geometry equals the given geo.json.geometryFence. Returns false otherwise.
Second method will return true if the location pointed by longitude and latitude equals the given geo.json.geometryFence. Returns false otherwise. 

Syntax

    <BOOL> geo:equals(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:equals(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | Yes     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | Yes     |

EXAMPLE 1

    geo:equals( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
It will return false because geo.json.geometry is not equal to geo.json.geometry.fence.

EXAMPLE 2

    geo:equals(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
    
It will return true because location pointed by longitude and latitude is not equal to geo.json.geometry.fence.          
       
       
## closestPoints 

This will return the closest geo point to the geo.json.geometry.fence. 

Syntax

    geo:closestPoints(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | No       | No     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | String                | No      | No     |

Extra Return Attributes
       
| Name              | Description                                                                                              | Possible Data Types | 
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|
| closestPointOf1From2Latitude 	              | closest point's latitude to the fence from the location.                       |   DOUBLE            | 
| closestPointOf1From2Longitude 	          | closest point's longitude to the fence from the location.                       |   DOUBLE            | 
| closestPointOf2From1Latitude 	              | closest point's latitude to the location from the fence.                       |   DOUBLE            | 
| closestPointOf2From1Longitude 	          | closest point's longitude to the location from the fence.                       |   DOUBLE            | 
       
       
EXAMPLE 1

    geo:closestPoints(0.5,0.5,"{'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]}")

This will return 0.5, 0.5, 0.5, 0.5.
       
       
## locationApproximate

Geo Location Approximation compute the average location of the locationRecorder using the collection iBeacons which the location recorder resides. 


Syntax

    geo:locationApproximate(<STRING> location.recorder, <DOUBLE> latitude, <DOUBLE> longitude, <STRING> sensor.proximity, <STRING> sensor.uuid, <DOUBLE> sensor.weight, <LONG> timestamp)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| location.recorder 	              | unique id of the object or item.                                                           |               | STRING       | No       | No     |
| latitude | latitude value of the iBeacon.                                           | | DOUBLE              | No      | No     |
| longitude        | longitude value of the iBeacon. |          | DOUBLE                | No      | No     |
| sensor.proximity        | proximity which will be given by the iBeacon (eg: ENTER, RANGE, EXIT). |          | STRING                | No      | No     |
| sensor.uuid        | unique id of the iBeacon. |          | STRING                | No      | No     |
| sensor.weight        | weight of the iBeacon which influence the averaging of the location (eg: approximate distance from the iBeacon. |          | DOUBLE                | No      | No     |
| timestamp        | timestamp of the log which will be used to remove iBeacon from one's collection when there is no new log for 5 minutes. |          | LONG                | No      | No     |

       
EXAMPLE 1

    geo:geoLocationApproximate("person1", 6.876657, 79.897648, "ENTER", "uuid1", 20.0d, 1452583935L)

This will return 6.876657000000001 as the approximated location.
       
   
## crosses 

This function returns true when the the specified object of which the location is specified in terms of longitude and latitude crosses the geographic location specified in geo.json.geometry.fence. Returns false when the object crosses out of the location specified in geo.json.geometry.fence.
Or Returns true when the object (i.e. geo.json.geometry) crosses the specified geographic location (i.e. geo.json.geometry.fence). Returns false when the object crosses out of geo.json.geometry.fence. 

Syntax

    <BOOL> geo:crosses(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:crosses(<STRING> id, <STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| id 	              | The Location id.                                                           |               | STRING       | No       | No     |
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | Yes       | No     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | Yes      | No     |
| geo.json.geometry          | This will accept a json as a string which contains the geometry type and coordinates of a geo geometry. This can be given instead of the longitude and latitude values . |          | STRING                | Yes      | No     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | STRING                | No      | No     |

EXAMPLE 1

    geo:crosses(km-4354, -0.5, 0.5, {'type':'Polygon','coordinates':[[[0, 0],[2, 0],[2, 1],[0, 1],[0, 0]]]} )

This will return true since the specified location crosses the geo.json.geometry.fence.
  
       
## proximity 

This function returns true when two objects (specified in terms of longitude and latitude) are within the specified radius to another object. Returns false when the specified object moves out of the specified radius. 
The proximityWith optional attribute indicates the ID of the object that the object specified is in close proximity with. proximityID is a unique ID for the two objects in close proximity.

Syntax

    <BOOL> geo:proximity(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| id 	              | id of the object.                                                           |               | STRING       | No       | No     |
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | No       | No     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | STRING                | No      | No     |
| radius          | specific radius as a double value. |          | DOUBLE                | No      | No     |
       
EXAMPLE 1

    geo:proximity(1, 0, 0, 110574.61087757687)


This will return true since given longitude and latitude is within the radius
       
       
## stationary 
       
This function will Return true when the object (defined in terms of longitude and latitude) becomes stationary within the specified radius. Returns false when the object moves out of the specified radius.

Syntax

    <BOOL> geo:stationary(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)


QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| id 	              | object id which is defined in terms of longitude and latitude.                                                           |               | STRING       | No       | No     |
| longitude 	              | The longitude value of the geo location as a double.                                                           |               | DOUBLE       | No       | No     |
| latitude | The longitude value of the geo location as a double.                                           | | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | This will accepts a json as a string which contains the geometry type and coordinates of a geo geometry fence. |          | STRING                | No      | No     |
| radius          | specific radius as a double value. |          | DOUBLE                | No      | No     |
       
EXAMPLE 1

    geo:stationary(km-4354,0,0, 110574.61087757687)

This will return true.
