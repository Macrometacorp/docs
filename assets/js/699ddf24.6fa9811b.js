"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[43342],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),c=s(n),d=r,h=c["".concat(o,".").concat(d)]||c[d]||m[d]||i;return n?a.createElement(h,l(l({ref:t},p),{},{components:n})):a.createElement(h,l({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u.mdxType="string"==typeof e?e:r,l[1]=u;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},53382:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>u,toc:()=>s});var a=n(87462),r=(n(67294),n(3905));const i={title:"timeBatch (Window)"},l=void 0,u={unversionedId:"cep/query-guide/functions/unique/timeBatch",id:"cep/query-guide/functions/unique/timeBatch",title:"timeBatch (Window)",description:"This is a batch (tumbling) time window that is updated with the latest events based on a unique key parameter. If a new event that arrives within the time period of a window has a value for the key parameter which matches that of an existing event, then the existing event expires and it is replaced by the latest event.",source:"@site/docs/cep/query-guide/functions/unique/timeBatch.md",sourceDirName:"cep/query-guide/functions/unique",slug:"/cep/query-guide/functions/unique/timeBatch",permalink:"/docs/cep/query-guide/functions/unique/timeBatch",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/unique/timeBatch.md",tags:[],version:"current",frontMatter:{title:"timeBatch (Window)"},sidebar:"defaultSidebar",previous:{title:"time (Window)",permalink:"/docs/cep/query-guide/functions/unique/time"},next:{title:"timeLengthBatch (Window)",permalink:"/docs/cep/query-guide/functions/unique/timeLengthBatch"}},o={},s=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],p={toc:s};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This is a batch (tumbling) time window that is updated with the latest events based on a unique key parameter. If a new event that arrives within the time period of a window has a value for the key parameter which matches that of an existing event, then the existing event expires and it is replaced by the latest event."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"unique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)\nunique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)\n")),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"unique.key"),(0,r.kt)("td",{parentName:"tr",align:null},"The attribute that should be checked for uniqueness."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"INT LONG FLOAT BOOL DOUBLE STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"window.time"),(0,r.kt)("td",{parentName:"tr",align:null},"The tumbling time period for which the window should hold events."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"INT LONG"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"No")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"start.time"),(0,r.kt)("td",{parentName:"tr",align:null},"This specifies an offset in milliseconds in order to start the window at a time different to the standard time."),(0,r.kt)("td",{parentName:"tr",align:null},"Timestamp of first event"),(0,r.kt)("td",{parentName:"tr",align:null},"INT LONG"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"No")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE STREAM CseEventStream (symbol string, price float, volume int)\n\nfrom CseEventStream WINDOW UNIQUE:timeBatch(symbol, 1 sec)\nselect symbol, price, volume\ninsert all events into OutputStream ;\n")),(0,r.kt)("p",null,"This window holds the latest unique events that arrive from the ",(0,r.kt)("inlineCode",{parentName:"p"},"CseEventStream")," at a given time, and returns all the events to the ",(0,r.kt)("inlineCode",{parentName:"p"},"OutputStream")," stream. It is updated every second based on the latest values for the ",(0,r.kt)("inlineCode",{parentName:"p"},"symbol")," attribute."))}m.isMDXComponent=!0}}]);