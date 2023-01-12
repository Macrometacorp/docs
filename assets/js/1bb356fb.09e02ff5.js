"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[69077],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>c});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=s(r),c=a,k=d["".concat(u,".").concat(c)]||d[c]||p[c]||l;return r?n.createElement(k,i(i({ref:t},m),{},{components:r})):n.createElement(k,i({ref:t},m))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,i=new Array(l);i[0]=d;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},27691:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const l={title:"kslack (Stream Processor)"},i=void 0,o={unversionedId:"cep/query-guide/functions/reorder/kslack",id:"cep/query-guide/functions/reorder/kslack",title:"kslack (Stream Processor)",description:"Stream processor performs reordering of out-of-order events using K-Slack algorithm.",source:"@site/docs/cep/query-guide/functions/reorder/kslack.md",sourceDirName:"cep/query-guide/functions/reorder",slug:"/cep/query-guide/functions/reorder/kslack",permalink:"/docs/cep/query-guide/functions/reorder/kslack",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/reorder/kslack.md",tags:[],version:"current",frontMatter:{title:"kslack (Stream Processor)"},sidebar:"defaultSidebar",previous:{title:"akslack (Stream Processor)",permalink:"/docs/cep/query-guide/functions/reorder/akslack"},next:{title:"javascript (Script)",permalink:"/docs/cep/query-guide/functions/script/javascript"}},u={},s=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],m={toc:s};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Stream processor performs reordering of out-of-order events using K-Slack algorithm."),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"reorder:kslack(<LONG> timestamp)\nreorder:kslack(<LONG> timestamp, <LONG> timeout)\nreorder:kslack(<LONG> timestamp, <BOOL> discard.late.arrival)\nreorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k)\nreorder:kslack(<LONG> timestamp, <LONG> timeout, <BOOL> discard.late.arrival)\nreorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival)\n")),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"timestamp"),(0,a.kt)("td",{parentName:"tr",align:null},"The event timestamp on which the events should be ordered."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"LONG"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"timeout"),(0,a.kt)("td",{parentName:"tr",align:null},"A timeout value in milliseconds, where the buffered events who are older than the given timeout period get flushed every second."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"-1")," (timeout is infinite)"),(0,a.kt)("td",{parentName:"tr",align:null},"LONG"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"No")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"max.k"),(0,a.kt)("td",{parentName:"tr",align:null},"The maximum K-Slack window threshold (",(0,a.kt)("inlineCode",{parentName:"td"},"K")," parameter)."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"9,223,372,036,854,775,807")," (The maximum Long value)"),(0,a.kt)("td",{parentName:"tr",align:null},"LONG"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"No")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"discard.late.arrival"),(0,a.kt)("td",{parentName:"tr",align:null},"If set to ",(0,a.kt)("inlineCode",{parentName:"td"},"true")," the processor would discarded the out-of-order events arriving later than the K-Slack window, and in otherwise it allows the late arrivals to proceed."),(0,a.kt)("td",{parentName:"tr",align:null},"false"),(0,a.kt)("td",{parentName:"tr",align:null},"BOOL"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"No")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE STREAM StockStream (eventTime long, symbol string, volume long);\n\n@info(name = 'query1')\ninsert into OutputStream\nselect eventTime, symbol, volume\nfrom StockStream#reorder:kslack(eventTime, 5000);\n")),(0,a.kt)("p",null,"The query reorders events based on the ",(0,a.kt)("inlineCode",{parentName:"p"},"eventTime")," attribute value, and it forcefully flushes all the events who have arrived older than the given ",(0,a.kt)("inlineCode",{parentName:"p"},"timeout")," value (",(0,a.kt)("inlineCode",{parentName:"p"},"5000")," milliseconds) every second."))}p.isMDXComponent=!0}}]);