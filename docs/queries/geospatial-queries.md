---
sidebar_position: 55
title: GeoSpatial Queries
---

A geospatial query involves searching for information based on its physical location or proximity to a given point of reference. This type of query is commonly used in applications that require location-based services, such as ride-sharing apps, delivery services, and real estate websites.

With Macrometa's geospatial query capabilities, you can search and filter data based on geographic location, allowing for more targeted and efficient data analysis. This can be particularly useful for businesses that need to analyze customer behavior, track inventory, or optimize delivery routes.

This page presents a dataset and some examples of geospatial queries that could be used against it.

## Dataset

The dataset is stored in [food-restaurants.json](food-restaurants.json), which is a list of restaurants in the US with geospatial details. Here is a sample:

```json
"id": "AWrSh_KgsVYjT2BJAzaH",
"dateAdded": "2019-05-19T23:58:05Z",
"dateUpdated": "2019-05-19T23:58:05Z",
"address": "2555 11th Avenue",
"categories": "Fast Food Restaurants,Hamburgers and Hot Dogs,Restaurants",
"primaryCategories": "Accommodation & Food Services",
"city": "Greeley",
"country": "US",
"keys": "us/co/greeley/255511thavenue/554191587",
"latitude": 40.39629,
"longitude": -104.69699,
"name": "Carl's Jr.",
"postalCode": "80631",
"province": "CO",
"sourceURLs": "https://www.yellowpages.com/greeley-co/mip/carls-jr-7001402",
"websites": "https://www.carlsjr.com/?utm_source=Yextandutm_medium=Visit%20Websiteandutm_campaign=Homepage"
```

## Create Collection

To get the documents into a collection called `restaurants`:

1. Create a document collection called `restaurants`.
follow the instructions in [Add Documents from a File](../collections/documents/add-document#add-documents-from-a-file). If desired, you can set `id` as the primary key, but it doesn't matter for the following examples.

## Query Examples

After you import the dataset into the 

Many of the following examples use [bind parameter](bind-parameters). They are indicated by the `@` prefix, such as `@distance`. You can replace them with numbers such as 5000, 10000, or other values to see different results.

## Locate Restaurants Within a Radius

```sql
LET statueOfLiberty = GEO_POINT(-74.044500, 40.689306)
FOR doc IN restaurants
  LET distance = GEO_DISTANCE(statueOfLiberty, GEO_POINT(doc.longitude, doc.latitude))
  FILTER distance <= @distance // in meters
  // SORT doc.city
  SORT distance ASC
  RETURN doc
```

This query demonstrates how to locate all restaurants within a given radius of a specified location, in this case, within a number of meters of the Statue of Liberty.

## Locate Restaurants Within a Range of Distances

```sql
LET statueOfLiberty = GEO_POINT(-74.044500, 40.689306)
FOR doc IN restaurants
  LET distance = GEO_DISTANCE(statueOfLiberty, GEO_POINT(doc.longitude, doc.latitude))
  FILTER distance >= @minDistance // in meters
  FILTER distance <= @maxDistance // in meters
  // SORT doc.city
  SORT distance ASC
  RETURN doc
```

This query demonstrates how to locate all restaurants within a range of distances from a specified location, in this case, between a minimum and maximum number of meters from the Statue of Liberty.

Locate the Nearest Restaurants
sql
Copy code
LET statueOfLiberty = GEO_POINT(-74.044500, 40.689306)
 FOR restaurant IN restaurants
    LET location = GEO_POINT(restaurant.longitude, restaurant.latitude)
   SORT GEO_DISTANCE(statueOfLiberty, location) ASC
   LIMIT @limit
   RETURN restaurant
This code block demonstrates how to locate the nearest restaurants to a specified location, in this case, the 5 restaurants nearest to the Statue of Liberty.

Locate Restaurants Within a Polygon
sql
Copy code
// Find restaurants contained with a given polygon. 
// The polygon covers a 10 miles radius around the Statue of Liberty.
LET polygon = GEO_POLYGON([
        [ -74.1172, 40.7577 ],
        [ -74.1172, 40.6206 ],
        [ -73.9719, 40.6206 ],
        [ -73.9719, 40.7577 ],
        [ -74.1172, 40.7577 ]])
FOR restaurant IN restaurants
  LET location = GEO_POINT(restaurant.longitude, restaurant.latitude) 
  FILTER GEO_CONTAINS(polygon, location)
  RETURN restaurant
This code block demonstrates how to locate restaurants within a given polygon, in this case, restaurants within a 10-mile radius around the Statue of Liberty.

Locate Restaurants by Keyword and Proximity
sql
Copy code
LET statueOfLiberty = GEO_POINT(-74.044500, 40.689306)
FOR doc IN restaurant_view
  SEARCH ANALYZER(doc.categories IN TOKENS("Taco Burrito Ice Cream", "text_en"), "text_en")
  LET location = GEO_POINT(doc.longitude, doc.latitude)
  SORT GEO_DISTANCE(statueOfLiberty, location) ASC
  LIMIT 10
  RETURN doc
This code block demonstrates how to locate restaurants based on keyword search and proximity to a specified location, in this case, the 5 restaurants that serve either Taco, Burrito, or Ice Cream and are close to the Statue of Liberty.