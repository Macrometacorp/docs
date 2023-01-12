"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[78268],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,h=d["".concat(u,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(h,l(l({ref:t},c),{},{components:n})):r.createElement(h,l({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},40534:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const i={title:"firstTimeBatch (Window)"},l=void 0,o={unversionedId:"cep/query-guide/functions/unique/firstTimeBatch",id:"cep/query-guide/functions/unique/firstTimeBatch",title:"firstTimeBatch (Window)",description:"A batch-time or tumbling window that holds the unique events according to the unique key parameters that have arrived within the time period of that window and gets updated for each such time window. When a new event arrives with a key which is already in the window, that event is not processed by the window.",source:"@site/docs/cep/query-guide/functions/unique/firstTimeBatch.md",sourceDirName:"cep/query-guide/functions/unique",slug:"/cep/query-guide/functions/unique/firstTimeBatch",permalink:"/docs/cep/query-guide/functions/unique/firstTimeBatch",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/unique/firstTimeBatch.md",tags:[],version:"current",frontMatter:{title:"firstTimeBatch (Window)"},sidebar:"defaultSidebar",previous:{title:"firstLengthBatch (Window)",permalink:"/docs/cep/query-guide/functions/unique/firstLengthBatch"},next:{title:"length (Window)",permalink:"/docs/cep/query-guide/functions/unique/length"}},u={},s=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A batch-time or tumbling window that holds the unique events according to the unique key parameters that have arrived within the time period of that window and gets updated for each such time window. When a new event arrives with a key which is already in the window, that event is not processed by the window."),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"unique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)\nunique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)\n")),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"unique.key"),(0,a.kt)("td",{parentName:"tr",align:null},"The attribute that should be checked for uniqueness."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"INT LONG FLOAT BOOL DOUBLE STRING"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"window.time"),(0,a.kt)("td",{parentName:"tr",align:null},"The sliding time period for which the window should hold events."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"INT LONG"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"No")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"start.time"),(0,a.kt)("td",{parentName:"tr",align:null},"This specifies an offset in milliseconds in order to start the window at a time different to the standard time."),(0,a.kt)("td",{parentName:"tr",align:null},"Timestamp of the first event."),(0,a.kt)("td",{parentName:"tr",align:null},"INT LONG"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"No")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE STREAM CseEventStream (symbol string, price float, volume int)\n\nfrom CseEventStream WINDOW UNIQUE:firstTimeBatch(symbol,1 sec)\n select symbol, price, volume\ninsert all events into OutputStream ;\n")),(0,a.kt)("p",null,"This holds the first unique events that arrive from the ",(0,a.kt)("inlineCode",{parentName:"p"},"cseEventStream")," input stream during each second, based on the symbol,as a batch, and returns all the events to the ",(0,a.kt)("inlineCode",{parentName:"p"},"OutputStream"),"."))}p.isMDXComponent=!0}}]);