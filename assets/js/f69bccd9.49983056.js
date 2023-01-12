"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[87244],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>k});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=s(a),k=i,c=d["".concat(p,".").concat(k)]||d[k]||u[k]||r;return a?n.createElement(c,l(l({ref:t},m),{},{components:a})):n.createElement(c,l({ref:t},m))}));function k(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,l=new Array(r);l[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<r;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},55510:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var n=a(87462),i=(a(67294),a(3905));const r={sidebar_position:60,title:"Optional Properties"},l=void 0,o={unversionedId:"search/views/optional-properties",id:"search/views/optional-properties",title:"Optional Properties",description:"Link Properties",source:"@site/docs/search/views/optional-properties.md",sourceDirName:"search/views",slug:"/search/views/optional-properties",permalink:"/docs/search/views/optional-properties",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/search/views/optional-properties.md",tags:[],version:"current",sidebarPosition:60,frontMatter:{sidebar_position:60,title:"Optional Properties"},sidebar:"defaultSidebar",previous:{title:"Primary Sort Order",permalink:"/docs/search/views/primary-sort-order"},next:{title:"Analyzers",permalink:"/docs/search/analyzers"}},p={},s=[{value:"Link Properties",id:"link-properties",level:2},{value:"Search View Properties",id:"search-view-properties",level:2},{value:"Primary Sorting",id:"primary-sorting",level:3},{value:"Commit, Consolidate, Cleanup",id:"commit-consolidate-cleanup",level:3},{value:"Write Buffers",id:"write-buffers",level:3}],m={toc:s};function u(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"link-properties"},"Link Properties"),(0,i.kt)("p",null,"You can set the following optional properties for links:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"analyzers"),": A list of ",(0,i.kt)("a",{parentName:"p",href:"#analyzers"},"Analyzers")," that will apply to values of processed document attributes."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"array")),(0,i.kt)("li",{parentName:"ul"},"Subtype: ",(0,i.kt)("inlineCode",{parentName:"li"},"string")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"[ 'identity' ]")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"fields"),": A list of link properties that will be applied at each document level with each key specifying a document attribute. (For example: ",(0,i.kt)("inlineCode",{parentName:"p"},"{ attribute-name: [Link properties], \u2026 }"),") This data structure is recursive: Each value specifies the ",(0,i.kt)("a",{parentName:"p",href:"#link-properties"},"link property")," directive that the specified field should use. Otherwise, a default value of ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")," indicates inheritance of all directives from the current level except ",(0,i.kt)("inlineCode",{parentName:"p"},"fields"),"."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"object")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"{}")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"includeAllFields"),": When set ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),", process all document attributes with the default link property (",(0,i.kt)("inlineCode",{parentName:"p"},"{}"),") so they inherit all directives from the current level except ",(0,i.kt)("inlineCode",{parentName:"p"},"fields"),". Any attributes specified under ",(0,i.kt)("inlineCode",{parentName:"p"},"fields")," retain the link properties you specified."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"boolean")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"false")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"trackListPositions"),": When set ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),", track value positions in arrays."),(0,i.kt)("p",{parentName:"li"},"For example, if you query the input ",(0,i.kt)("inlineCode",{parentName:"p"},"{ attr: [ 'valueX', 'valueY', 'valueZ' ] }")," and want to give priority weighting to ",(0,i.kt)("inlineCode",{parentName:"p"},"valueY"),", you must specify ",(0,i.kt)("inlineCode",{parentName:"p"},"doc.attr[1] == 'valueY'"),"."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"boolean")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"false")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"storeValues"),": Set ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," if you want to store information about attribute values in the search view and enable the ",(0,i.kt)("inlineCode",{parentName:"p"},"EXISTS()")," function."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: string"),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},'"none"')))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"inBackground"),": When set ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),", search view indexes will be created without an exclusive lock so they remain available."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"boolean")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"false"))))),(0,i.kt)("h2",{id:"search-view-properties"},"Search View Properties"),(0,i.kt)("p",null,"Optional properties for search views are divided into the following categories:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#link-properties"},"Link Properties")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#search-view-properties"},"Search View Properties"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#primary-sorting"},"Primary Sorting")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#commit-consolidate-cleanup"},"Commit, Consolidate, Cleanup")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#write-buffers"},"Write Buffers"))))),(0,i.kt)("h3",{id:"primary-sorting"},"Primary Sorting"),(0,i.kt)("p",null,"You can use the following property to set up a primary sort order to optimize C8QL queries:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"primarySort"),": If the query attempts to retrieve all documents in a search view, and the sorting attributes, fields, and direction match the ",(0,i.kt)("inlineCode",{parentName:"p"},"primarySort")," definition, we ignore this operation for being redundant. This value is immutable once the search view is created."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"array")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"[]"))),(0,i.kt)("h3",{id:"commit-consolidate-cleanup"},"Commit, Consolidate, Cleanup"),(0,i.kt)("p",null,"Each inverted index consists of segments that are each treated as standalone indexes."),(0,i.kt)("p",null,"You can use the following properties to control the frequency at which C8Search commits, consolidates, and cleans up index segments:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"commitIntervalMsec"),": How many milliseconds to wait after committing data changes and before making documents visible to queries. This option accumulates processed data and creates new index segments without deleting cached files. All changes submitted prior to this action will be committed."),(0,i.kt)("p",{parentName:"li"},"To disable, set ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),". If your index frequently has inserts and updates, do not lower the value. If your index rarely has inserts and updates, do not raise the value."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"1000")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"consolidationIntervalMsec"),": How many milliseconds to wait after committing data changes and before making documents visible to queries. This option merges multiple index segments into a larger one and removes deleted and redundant documents. All changes submitted prior to this action will be committed."),(0,i.kt)("p",{parentName:"li"},"To disable, set ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),". If your index frequently has inserts and updates, do not lower the value. If your index rarely has inserts and updates, do not raise the value."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"60000")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"cleanupIntervalStep"),": How many commits to wait before removing unused files from the data directory. You can use this to save space if you frequently commit or consolidate segments."),(0,i.kt)("p",{parentName:"li"},"To disable, set ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),". Do not raise the value above ",(0,i.kt)("inlineCode",{parentName:"p"},"2"),". If you rarely merge segments and want to use cleanup, do not lower the value to ",(0,i.kt)("inlineCode",{parentName:"p"},"1"),"."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"2"))))),(0,i.kt)("p",null,"Whenever C8DB processes new data, C8Search creates internal segments that contain files such as removed documents marked as ",(0,i.kt)("inlineCode",{parentName:"p"},"deleted"),". The consolidate action uses a policy to determine what to consolidate and the size limit of these internal segments. You can set up a consolidation policy to change how C8Search consolidates its caches."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"consolidationPolicy"),":",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"object")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"{}"))))),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"consolidationPolicy")," property has the following optional sub-properties:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"type"),": Choose between ",(0,i.kt)("inlineCode",{parentName:"li"},'"bytes_accum"')," or ",(0,i.kt)("inlineCode",{parentName:"li"},'"tier"'),".",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"string")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},'"bytes_accum"'))))),(0,i.kt)("p",null,"If you choose ",(0,i.kt)("inlineCode",{parentName:"p"},'"bytes_accum"'),", the following optional sub-properties are available:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"threshold"),": Define a number between ",(0,i.kt)("inlineCode",{parentName:"p"},"0.0")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"1.0")," to act as multiplier to determine the threshold for consolidating each segment."),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"float")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"0.1"))),(0,i.kt)("p",{parentName:"li"},"We use the following formula to set the threshold:"),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"t > (s + m) / a")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"t")," is the threshold value."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"s")," is the total bytes of the segment."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"m")," is the byte total of the merge candidate segments."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"a")," is the byte total of all segments.")))),(0,i.kt)("p",null,"If you choose ",(0,i.kt)("inlineCode",{parentName:"p"},'"tier"'),", the following optional sub-properties are available:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"segmentsMin"),": Minimum number of segments considered for consolidation.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"1")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"segmentsMax"),": Maximum number of segments considered for consolidation.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"10")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"segmentsBytesMax"),": Maximum allowed size of all consolidated segments in bytes.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"5368709120")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"segmentsBytesFloor"),": When choosing segments for consolidation, all segments smaller than this value in bytes are automatically rounded up to this number for the purpose of consolidation selection.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"2097152"))))),(0,i.kt)("h3",{id:"write-buffers"},"Write Buffers"),(0,i.kt)("p",null,"A C8Search index contains writer objects that are mapped to processed segments. You can set up a ",(0,i.kt)("em",{parentName:"p"},"pool")," of writers by using ",(0,i.kt)("inlineCode",{parentName:"p"},"writebuffer*")," properties to limit memory usage. These options are immutable once a search view is created."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"writebufferIdle"),": Maximum number of writers cached in the pool. To disable, set ",(0,i.kt)("inlineCode",{parentName:"li"},"0"),".",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"64")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"writebufferActive"),": Maximum number of concurrent active writers performing a transaction. Other writers must wait until current active writers finish.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"0")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"writebufferSizemax"),": Maximum memory size in bytes per writer before triggering writer flush. If set ",(0,i.kt)("inlineCode",{parentName:"li"},"0"),", the limit is removed and this option falls back on the C8DB default flush interval. Disable this option with caution.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Type: ",(0,i.kt)("inlineCode",{parentName:"li"},"integer")),(0,i.kt)("li",{parentName:"ul"},"Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"33554432"))))))}u.isMDXComponent=!0}}]);