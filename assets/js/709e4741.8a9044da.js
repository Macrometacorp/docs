"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[54788],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(h,i(i({ref:t},u),{},{components:n})):a.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},30876:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=n(87462),r=(n(67294),n(3905));const o={sidebar_position:60,title:"Part 6 - Geospatial Queries"},i=void 0,l={unversionedId:"queryworkers/c8ql/got-tutorial/geospatial-queries",id:"queryworkers/c8ql/got-tutorial/geospatial-queries",title:"Part 6 - Geospatial Queries",description:"Geospatial coordinates consisting of a latitude and longitude value can be stored either as two separate attributes, or as a single attribute in the form of an array with both numeric values. Macrometa can index such coordinates for fast geospatial queries.",source:"@site/docs/queryworkers/c8ql/got-tutorial/geospatial-queries.md",sourceDirName:"queryworkers/c8ql/got-tutorial",slug:"/queryworkers/c8ql/got-tutorial/geospatial-queries",permalink:"/docs/queryworkers/c8ql/got-tutorial/geospatial-queries",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/c8ql/got-tutorial/geospatial-queries.md",tags:[],version:"current",sidebarPosition:60,frontMatter:{sidebar_position:60,title:"Part 6 - Geospatial Queries"},sidebar:"defaultSidebar",previous:{title:"Part 5 - Graph Traversal",permalink:"/docs/queryworkers/c8ql/got-tutorial/graph-traversal"},next:{title:"Coming from SQL",permalink:"/docs/queryworkers/c8ql/coming-from-sql"}},s={},c=[{value:"Create Locations Collection",id:"create-locations-collection",level:2},{value:"Geospatial Index",id:"geospatial-index",level:2},{value:"Find Nearby Locations",id:"find-nearby-locations",level:2},{value:"Find Locations Within a Radius",id:"find-locations-within-a-radius",level:2},{value:"Return the Distance",id:"return-the-distance",level:2},{value:"Next Steps",id:"next-steps",level:2}],u={toc:c};function p(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Geospatial coordinates consisting of a latitude and longitude value can be stored either as two separate attributes, or as a single attribute in the form of an array with both numeric values. Macrometa can ",(0,r.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/functions/geo"},"index such coordinates")," for fast geospatial queries."),(0,r.kt)("h2",{id:"create-locations-collection"},"Create Locations Collection"),(0,r.kt)("p",null,"Let's insert some filming locations into a new collection ",(0,r.kt)("em",{parentName:"p"},"Locations"),"."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/collections/documents/create-document-store"},"Create a Document Store collection")," called ",(0,r.kt)("strong",{parentName:"p"},"Locations"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Copy and paste the following query in the Query Editor:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},'LET places = [\n    { "name": "Dragonstone", "coordinate": [ 55.167801, -6.815096 ] },\n    { "name": "King\'s Landing", "coordinate": [ 42.639752, 18.110189 ] },\n    { "name": "The Red Keep", "coordinate": [ 35.896447, 14.446442 ] },\n    { "name": "Yunkai", "coordinate": [ 31.046642, -7.129532 ] },\n    { "name": "Astapor", "coordinate": [ 31.50974, -9.774249 ] },\n    { "name": "Winterfell", "coordinate": [ 54.368321, -5.581312 ] },\n    { "name": "Vaes Dothrak", "coordinate": [ 54.16776, -6.096125 ] },\n    { "name": "Beyond the wall", "coordinate": [ 64.265473, -21.094093 ] }\n]\n\nFOR place IN places\n    INSERT place INTO Locations\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Run the query."))),(0,r.kt)("p",null,"Macrometa returns an empty list in the results, but the records with the locations and coordinates are added to the collection."),(0,r.kt)("p",null,"For your reference, here is a visualization of the relative locations overlaid on a map of Europe:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Locations_Map",src:n(24665).Z,width:"601",height:"677"})),(0,r.kt)("h2",{id:"geospatial-index"},"Geospatial Index"),(0,r.kt)("p",null,"To query based on coordinates, you must create a ",(0,r.kt)("a",{parentName:"p",href:"../../../collections/documents/geospatial/geojson#geojson-supported-index"},"geo index"),". It determines which fields contain the latitude and longitude values."),(0,r.kt)("p",null,"To create a geo index:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Data > Collections"),"."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Locations"),"."),(0,r.kt)("li",{parentName:"ol"},"Click the ",(0,r.kt)("strong",{parentName:"li"},"Indexes")," tab."),(0,r.kt)("li",{parentName:"ol"},"Click the plus icon to add a new index."),(0,r.kt)("li",{parentName:"ol"},"In ",(0,r.kt)("strong",{parentName:"li"},"Type")," select ",(0,r.kt)("strong",{parentName:"li"},"Geo Index"),"."),(0,r.kt)("li",{parentName:"ol"},"In ",(0,r.kt)("strong",{parentName:"li"},"Fields"),", enter ",(0,r.kt)("strong",{parentName:"li"},"coordinate"),"."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Create"))),(0,r.kt)("p",null,"Macrometa returns a success message and your new index appears in the Indexes list. For more information, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/collections/documents/document-store-indexes"},"Document Store Indexes"),"."),(0,r.kt)("h2",{id:"find-nearby-locations"},"Find Nearby Locations"),(0,r.kt)("p",null,"A ",(0,r.kt)("inlineCode",{parentName:"p"},"FOR")," loop is used again, but this time to iterate over the results of a function call to ",(0,r.kt)("inlineCode",{parentName:"p"},"NEAR()")," to find the ",(0,r.kt)("em",{parentName:"p"},"n")," closest coordinates to a reference point, and return the documents with the nearby locations. The default for ",(0,r.kt)("em",{parentName:"p"},"n")," is 100, which means 100 documents are returned at most, the closest matches first."),(0,r.kt)("p",null,"In below example, the limit is set to 3. The origin (the reference point) is a coordinate somewhere downtown in Dublin, Ireland."),(0,r.kt)("p",null,"If you enter the following query in the Query Editor:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"FOR loc IN NEAR(Locations, 53.35, -6.26, 3)\n    RETURN {\n        name: loc.name,\n        latitude: loc.coordinate[0],\n        longitude: loc.coordinate[1]\n    }\n")),(0,r.kt)("p",null,"Macrometa returns the following data. It might look different if you are viewing query results as a table."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "name": "Vaes Dothrak",\n    "latitude": 54.16776,\n    "longitude": -6.096125\n  },\n  {\n    "name": "Winterfell",\n    "latitude": 54.368321,\n    "longitude": -5.581312\n  },\n  {\n    "name": "Dragonstone",\n    "latitude": 55.167801,\n    "longitude": -6.815096\n  }\n]\n')),(0,r.kt)("p",null,"The query returns the location name, as well as the coordinates. The coordinates are returned as two separate attributes. You can use a simpler ",(0,r.kt)("inlineCode",{parentName:"p"},"RETURN loc")," instead if you want. Try replacing the RETURN statement in the query above with ",(0,r.kt)("inlineCode",{parentName:"p"},"RETURN loc")," and compare the results."),(0,r.kt)("h2",{id:"find-locations-within-a-radius"},"Find Locations Within a Radius"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"NEAR()")," can be swapped out with ",(0,r.kt)("inlineCode",{parentName:"p"},"WITHIN()"),", to search for locations within a given radius from a reference point. The syntax is the same as for ",(0,r.kt)("inlineCode",{parentName:"p"},"NEAR()"),", except for the fourth parameter, which specifies the radius instead of a limit. The unit for the radius is meters. "),(0,r.kt)("p",null,"This example uses a radius of 200,000 meters (200 kilometers):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"FOR loc IN WITHIN(Locations, 53.35, -6.26, 200 * 1000)\n    RETURN {\n        name: loc.name,\n        latitude: loc.coordinate[0],\n        longitude: loc.coordinate[1]\n    }\n")),(0,r.kt)("p",null,"Returns two locations:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "name": "Vaes Dothrak",\n    "latitude": 54.16776,\n    "longitude": -6.096125\n  },\n  {\n    "name": "Winterfell",\n    "latitude": 54.368321,\n    "longitude": -5.581312\n  }\n]\n')),(0,r.kt)("h2",{id:"return-the-distance"},"Return the Distance"),(0,r.kt)("p",null,"Both ",(0,r.kt)("inlineCode",{parentName:"p"},"NEAR()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"WITHIN()")," can return the distance to the reference point by adding an optional fifth parameter. It has to be a string, which will be used as the attribute name for an additional attribute with the distance in meters:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'FOR loc IN NEAR(Locations, 53.35, -6.26, 3, "distance")\n    RETURN {\n        name: loc.name,\n        latitude: loc.coordinate[0],\n        longitude: loc.coordinate[1],\n        distance: loc.distance / 1000\n    }\n')),(0,r.kt)("p",null,"The query returns:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "name": "Vaes Dothrak",\n    "latitude": 54.16776,\n    "longitude": -6.096125,\n    "distance": 91.56658640314431\n  },\n  {\n    "name": "Winterfell",\n    "latitude": 54.368321,\n    "longitude": -5.581312,\n    "distance": 121.66399816395028\n  },\n  {\n    "name": "Dragonstone",\n    "latitude": 55.167801,\n    "longitude": -6.815096,\n    "distance": 205.31879386198324\n  }\n]\n')),(0,r.kt)("p",null,"The extra attribute, here called ",(0,r.kt)("em",{parentName:"p"},"distance"),", is returned as part of the ",(0,r.kt)("em",{parentName:"p"},"loc")," variable, as if it was part of the location document. The value is divided by 1,000 in the example query, to convert the unit to kilometers, to make it better readable."),(0,r.kt)("h2",{id:"next-steps"},"Next Steps"),(0,r.kt)("p",null,"Great job! You can now use C8QL queries to enter, sort, and manipulate various kinds of data in interesting ways. Here is what you might do next:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Learn how to turn queries into endpoints with ",(0,r.kt)("a",{parentName:"li",href:"/docs/queryworkers/query-workers"},"Query Workers"),"."),(0,r.kt)("li",{parentName:"ul"},"Read through ",(0,r.kt)("a",{parentName:"li",href:"/docs/queryworkers/c8ql/examples/"},"C8QL Examples")," for more ideas about what to do with C8QL."),(0,r.kt)("li",{parentName:"ul"},"Dig deeper into C8QL ",(0,r.kt)("a",{parentName:"li",href:"/docs/queryworkers/c8ql/functions/"},"Functions")," and ",(0,r.kt)("a",{parentName:"li",href:"/docs/queryworkers/c8ql/operations/"},"Operations"),".")),(0,r.kt)("p",null,"Have fun!"))}p.isMDXComponent=!0},24665:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/Locations_Map-9dded4f3018cff0d29b14b46a80c118c.png"}}]);