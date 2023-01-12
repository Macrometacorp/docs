"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[14149],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>p});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=u(n),p=r,g=d["".concat(o,".").concat(p)]||d[p]||c[p]||l;return n?a.createElement(g,i(i({ref:t},m),{},{components:n})):a.createElement(g,i({ref:t},m))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=d;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},95848:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>s,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const l={title:"kMeansIncremental (Stream Processor)"},i=void 0,s={unversionedId:"cep/query-guide/functions/streaming-ml/kmeansincremental",id:"cep/query-guide/functions/streaming-ml/kmeansincremental",title:"kMeansIncremental (Stream Processor)",description:"Performs K-Means clustering on a streaming data set. Data points can be",source:"@site/docs/cep/query-guide/functions/streaming-ml/kmeansincremental.md",sourceDirName:"cep/query-guide/functions/streaming-ml",slug:"/cep/query-guide/functions/streaming-ml/kmeansincremental",permalink:"/docs/cep/query-guide/functions/streaming-ml/kmeansincremental",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/streaming-ml/kmeansincremental.md",tags:[],version:"current",frontMatter:{title:"kMeansIncremental (Stream Processor)"},sidebar:"defaultSidebar",previous:{title:"bayesianRegression (Stream Processor)",permalink:"/docs/cep/query-guide/functions/streaming-ml/bayesianregression"},next:{title:"kMeansMiniBatch (Stream Processor)",permalink:"/docs/cep/query-guide/functions/streaming-ml/kmeansminibatch"}},o={},u=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Extra Return Attributes",id:"extra-return-attributes",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],m={toc:u};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Performs K-Means clustering on a streaming data set. Data points can be\nof any dimension and the dimensionality is calculated from number of\nparameters. All data points to be processed by a query should be of the\nsame dimensionality. The Euclidean distance is taken as the distance metric. The algorithm resembles ",(0,r.kt)("a",{parentName:"p",href:"https://www.cs.princeton.edu/courses/archive/fall08/cos436/Duda/C/sk_means.htm"},"Sequential K-Means Clustering"),"."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"streamingml:kMeansIncremental(<INT> no.of.clusters, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)\nstreamingml:kMeansIncremental(<INT> no.of.clusters, <DOUBLE> decay.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)\n")),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"no.of.clusters"),(0,r.kt)("td",{parentName:"tr",align:null},"The assumed number of natural clusters in the data set."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"INT"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"No")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"decay.rate"),(0,r.kt)("td",{parentName:"tr",align:null},"this is the decay rate of old data compared to new data. Value of this will be in ","[0,1]",". 0 means only old data used and1 will mean that only new data is used"),(0,r.kt)("td",{parentName:"tr",align:null},"0.01"),(0,r.kt)("td",{parentName:"tr",align:null},"DOUBLE"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"No")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.feature"),(0,r.kt)("td",{parentName:"tr",align:null},"This is a variable length argument. Depending on the dimensionality of data points we will receive coordinates as features along each axis."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"DOUBLE FLOAT INT LONG"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,r.kt)("h2",{id:"extra-return-attributes"},"Extra Return Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Types"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"euclideanDistanceToClosestCentroid"),(0,r.kt)("td",{parentName:"tr",align:null},"Represents the Euclidean distance between the current data point and the closest centroid."),(0,r.kt)("td",{parentName:"tr",align:null},"DOUBLE")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"closestCentroidCoordinate"),(0,r.kt)("td",{parentName:"tr",align:null},"This is a variable length attribute. Depending on the dimensionality(D) we will return closestCentroidCoordinate1, closestCentroidCoordinate2,... closestCentroidCoordinateD which are the d dimensional coordinates of the closest centroid from the model to the current event. This is the prediction result and this represents the cluster to which the current event belongs to."),(0,r.kt)("td",{parentName:"tr",align:null},"DOUBLE")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE STREAM InputStream (x double, y double);\n@info(name = 'query1')\ninsert into OutputStream\nselect closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    \nfrom InputStream#streamingml:kMeansIncremental(2, 0.2, x, y);\n")),(0,r.kt)("p",null,"This is an example where user provides the decay rate. First two events\nwill be used to initiate the model since the required number of clusters\nis specified as 2. After the first event itself prediction would start."),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE STREAM InputStream (x double, y double);\n@info(name = 'query1')\ninsert into OutputStream\nselect closestCentroidCoordinate1, closestCentroidCoordinate2, x, y    \nfrom InputStream#streamingml:kMeansIncremental(2, x, y);\n")),(0,r.kt)("p",null,"This is an example where the user doesn't give the decay rate, so the default value is used."))}c.isMDXComponent=!0}}]);