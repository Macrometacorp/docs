"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[89047],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(n),d=r,g=c["".concat(s,".").concat(d)]||c[d]||m[d]||o;return n?a.createElement(g,l(l({ref:t},u),{},{components:n})):a.createElement(g,l({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},12958:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const o={title:"json (Sink Mapper)"},l=void 0,i={unversionedId:"cep/query-guide/functions/sinkmapper/json",id:"cep/query-guide/functions/sinkmapper/json",title:"json (Sink Mapper)",description:"This extension is an Event to JSON output mapper. Transports that publish messages can utilize this extension to convert Stream App events to JSON messages. You can either send a pre-defined JSON format or a custom JSON message.",source:"@site/docs/cep/query-guide/functions/sinkmapper/json.md",sourceDirName:"cep/query-guide/functions/sinkmapper",slug:"/cep/query-guide/functions/sinkmapper/json",permalink:"/docs/cep/query-guide/functions/sinkmapper/json",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/sinkmapper/json.md",tags:[],version:"current",frontMatter:{title:"json (Sink Mapper)"},sidebar:"defaultSidebar",previous:{title:"csv (Sink Mapper)",permalink:"/docs/cep/query-guide/functions/sinkmapper/csv"},next:{title:"key-value (Sink Mapper)",permalink:"/docs/cep/query-guide/functions/sinkmapper/keyvalue"}},s={},p=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],u={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This extension is an Event to JSON output mapper. Transports that publish messages can utilize this extension to convert Stream App events to JSON messages. You can either send a pre-defined JSON format or a custom JSON message."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'    CREATE SINK <NAME> WITH (map.type="json", map.validate.json="<BOOL>", map.enclosing.element="<STRING>")\n')),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"validate.json"),(0,r.kt)("td",{parentName:"tr",align:null},"If this property is set to ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),", it enables JSON validation for the JSON messages generated. When validation is carried out, messages that do not adhere to proper JSON standards are dropped. This property is set to ",(0,r.kt)("inlineCode",{parentName:"td"},"false")," by default."),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null},"BOOL"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"No")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"enclosing.element"),(0,r.kt)("td",{parentName:"tr",align:null},"This specifies the enclosing element to be used if multiple events are sent in the same JSON message. Stream App treats the child elements of the given enclosing element as events and executes JSON expressions on them. If an ",(0,r.kt)("inlineCode",{parentName:"td"},"enclosing.element")," is not provided, the multiple event scenario is disregarded and JSON path is evaluated based on the root element."),(0,r.kt)("td",{parentName:"tr",align:null},"\\$"),(0,r.kt)("td",{parentName:"tr",align:null},"STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"No")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"CREATE SINK FooStream WITH (type='stream', topic='stock', map.type='json') (symbol string, price float, volume long);\n")),(0,r.kt)("p",null,"Above configuration does a default JSON input mapping that generates the\noutput given\nbelow."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\xa0\xa0\xa0\xa0\n"event":{\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\n    "symbol":GDN,\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\n    "price":55.6,\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\n    "volume":100\xa0\xa0\xa0\xa0\n    }\n}\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'    CREATE SINK BarStream WITH (type=\'stream\', topic=\'{{symbol}}\', map.type=\'json\', map.enclosing.element=\'$.portfolio\', map.validate.json=\'true\', map.payload="""{"StockData":{"Symbol":"{{symbol}}","Price":{{price}}}}""") (symbol string, price float, volume long);\n')),(0,r.kt)("p",null,"The above configuration performs a custom JSON mapping that generates\nthe following JSON message as the\noutput."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'    {\n        "portfolio":{\xa0\xa0\xa0\xa0\n            "StockData":{\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\n                "Symbol":GDN,\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\n                "Price":55.6\xa0\xa0\xa0\xa0\xa0\xa0\n            }\n        }\n    }\n')))}m.isMDXComponent=!0}}]);