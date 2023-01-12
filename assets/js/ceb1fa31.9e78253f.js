"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[72512],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>w});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),m=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=m(e.components);return a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=m(n),w=r,c=u["".concat(l,".").concat(w)]||u[w]||s[w]||i;return n?a.createElement(c,o(o({ref:t},d),{},{components:n})):a.createElement(c,o({ref:t},d))}));function w(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,o[1]=p;for(var m=2;m<i;m++)o[m]=n[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},30739:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>p,toc:()=>m});var a=n(87462),r=(n(67294),n(3905));const i={sidebar_position:60,title:"Named Window"},o=void 0,p={unversionedId:"cep/query-guide/named-window",id:"cep/query-guide/named-window",title:"Named Window",description:"A named window is a window that can be shared across multiple queries. Events can be inserted to a named window from one or more queries and it can produce output events based on the named window type.",source:"@site/docs/cep/query-guide/named-window.md",sourceDirName:"cep/query-guide",slug:"/cep/query-guide/named-window",permalink:"/docs/cep/query-guide/named-window",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/named-window.md",tags:[],version:"current",sidebarPosition:60,frontMatter:{sidebar_position:60,title:"Named Window"},sidebar:"defaultSidebar",previous:{title:"Named Aggregation",permalink:"/docs/cep/query-guide/named-aggregation"},next:{title:"Trigger",permalink:"/docs/cep/query-guide/trigger"}},l={},m=[{value:"Insert",id:"insert",level:3},{value:"Join (Window)",id:"join-window",level:3},{value:"From",id:"from",level:3}],d={toc:m};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"A named window is a window that can be shared across multiple queries. Events can be inserted to a named window from one or more queries and it can produce output events based on the named window type."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Syntax")),(0,r.kt)("p",null,"The syntax for a named window is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE WINDOW <window name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... ) <window type>(<parameter>, <parameter>, \u2026) <event type>;\n")),(0,r.kt)("p",null,"The following parameters are configured in a table definition:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"window name")),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the window defined. (",(0,r.kt)("inlineCode",{parentName:"td"},"PascalCase")," is used for window names as a convention.)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"attribute name")),(0,r.kt)("td",{parentName:"tr",align:null},"The schema of the window is defined by its attributes with uniquely identifiable attribute names (",(0,r.kt)("inlineCode",{parentName:"td"},"camelCase")," is used for attribute names as a convention.)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"attribute type")),(0,r.kt)("td",{parentName:"tr",align:null},"The type of each attribute defined in the schema.  This can be ",(0,r.kt)("inlineCode",{parentName:"td"},"STRING"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"INT"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"LONG"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"DOUBLE"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"FLOAT"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"BOOL")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"OBJECT"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"<window type>(<parameter>, ...)")),(0,r.kt)("td",{parentName:"tr",align:null},"The window type associated with the window and its parameters.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"output <event type>")),(0,r.kt)("td",{parentName:"tr",align:null},"This is optional. Keywords such as ",(0,r.kt)("inlineCode",{parentName:"td"},"current events"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"expired events")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"all events")," (the default) can be used to specify when the window output should be exposed. For more information, see ",(0,r.kt)("a",{parentName:"td",href:"#event-type"},"Event Type"),".")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Examples")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Returning all output when events arrive and when events expire from the window."),(0,r.kt)("p",{parentName:"li"},"  In this query, the event type is not specified. Therefore, it returns both current and expired events as the output."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second);\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Returning an output only when events expire from the window."),(0,r.kt)("p",{parentName:"li"},"  In this query, the event type of the window is ",(0,r.kt)("inlineCode",{parentName:"p"},"expired events"),". Therefore, it only returns the events that have expired from the window as the output."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second) output expired events;\n")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Operators on Named Windows")),(0,r.kt)("p",null,"The following operators can be performed on named windows."),(0,r.kt)("h3",{id:"insert"},"Insert"),(0,r.kt)("p",null,"This allows events to be inserted into windows. This is similar to inserting events into streams."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Syntax")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"insert into <window>\nselect <attribute name>, <attribute name>, ...\nfrom <input stream>\n")),(0,r.kt)("p",null,"To insert only events of a specific event type, add the ",(0,r.kt)("inlineCode",{parentName:"p"},"current events"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"expired events")," or the ",(0,r.kt)("inlineCode",{parentName:"p"},"all events")," keyword between ",(0,r.kt)("inlineCode",{parentName:"p"},"insert")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"into")," keywords (similar to how it is done for streams)."),(0,r.kt)("p",null,"For more information, see ",(0,r.kt)("a",{parentName:"p",href:"#event-type"},"Event Type"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example")),(0,r.kt)("p",null,"This query inserts all events from the ",(0,r.kt)("inlineCode",{parentName:"p"},"TempStream")," stream to the ",(0,r.kt)("inlineCode",{parentName:"p"},"OneMinTempWindow")," window."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE STREAM TempStream(tempId string, temp double);\nCREATE WINDOW OneMinTempWindow(tempId string, temp double) time(1 min);\n\ninsert into OneMinTempWindow\nselect *\nfrom TempStream;\n")),(0,r.kt)("h3",{id:"join-window"},"Join (Window)"),(0,r.kt)("p",null,"To allow a stream to retrieve information from a window based on a condition."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"A join can also be performed with ",(0,r.kt)("a",{parentName:"p",href:"#join-stream"},"two streams"),", ",(0,r.kt)("a",{parentName:"p",href:"#join-aggregation"},"aggregation")," or with tables ",(0,r.kt)("a",{parentName:"p",href:"#join-table"},"tables"),".")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Syntax")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"insert into <output stream>\nselect (<input stream>|<window>).<attribute name>, (<input stream>|<window>).<attribute name>, ...\nfrom <input stream> join <window>\n    on <condition>\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example")),(0,r.kt)("p",null,"This Stream Application performs a join count the number of temperature events having more then 40 degrees within the last 2 minutes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE WINDOW TwoMinTempWindow (roomNo int, temp double) time(2 min);\nCREATE STREAM CheckStream (requestId string);\n\ninsert into HighTempCountStream\nselect requestId, count(T.temp) as count\nfrom CheckStream as C join TwoMinTempWindow as T\n    on T.temp > 40;\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Supported join types")),(0,r.kt)("p",null,"Window join supports following operations of a join clause."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Inner join (join)")),(0,r.kt)("p",{parentName:"li"},"  This is the default behaviour of a join operation. ",(0,r.kt)("inlineCode",{parentName:"p"},"join")," is used as the keyword to join two windows or a stream with a window. The output is generated only if there is a matching event in both stream/window.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Left outer join")),(0,r.kt)("p",{parentName:"li"},"  The ",(0,r.kt)("inlineCode",{parentName:"p"},"left outer join")," operation allows you to join two windows or a stream with a window to be merged based on a condition.\nHere, it returns all the events of left stream/window even if there are no matching events in the right stream/window by\nhaving null values for the attributes of the right stream/window.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Right outer join")),(0,r.kt)("p",{parentName:"li"},"  This is similar to a left outer join. ",(0,r.kt)("inlineCode",{parentName:"p"},"Right outer join")," is used as the keyword to join two windows or a stream with a window.\nIt returns all the events of the right stream/window even if there are no matching events in the left stream/window.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Full outer join")),(0,r.kt)("p",{parentName:"li"},"  The full outer join combines the results of ",(0,r.kt)("inlineCode",{parentName:"p"},"left outer join")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"right outer join"),". ",(0,r.kt)("inlineCode",{parentName:"p"},"full outer join")," is used as the keyword to join two windows or a stream with a window.\nHere, output event are generated for each incoming event even if there are no matching events in the other stream/window."))),(0,r.kt)("h3",{id:"from"},"From"),(0,r.kt)("p",null,"A window can be an input to a query, similar to streams."),(0,r.kt)("p",null,"Note !!!\nWhen window is used as an input to a query, another window cannot be applied on top of this."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Syntax")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"insert into <output stream>\nselect <attribute name>, <attribute name>, ...\nfrom <window>\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example")),(0,r.kt)("p",null,"This Stream Application calculates the maximum temperature within the last 5 minutes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE WINDOW FiveMinTempWindow (roomNo int, temp double) time(5 min);\n\ninsert into MaxSensorReadingStream\nselect max(temp) as maxValue, roomNo\nfrom FiveMinTempWindow;\n")))}s.isMDXComponent=!0}}]);