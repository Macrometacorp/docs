"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[31348],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(n),d=a,f=m["".concat(c,".").concat(d)]||m[d]||s[d]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},19497:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var r=n(87462),a=(n(67294),n(3905));const i={title:"time (Window)"},o=void 0,l={unversionedId:"cep/query-guide/functions/core/time",id:"cep/query-guide/functions/core/time",title:"time (Window)",description:"A sliding time window that holds events that arrived during the last windowTime period at a given time, and gets updated for each event arrival and expiration.",source:"@site/docs/cep/query-guide/functions/core/time.md",sourceDirName:"cep/query-guide/functions/core",slug:"/cep/query-guide/functions/core/time",permalink:"/docs/cep/query-guide/functions/core/time",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/core/time.md",tags:[],version:"current",frontMatter:{title:"time (Window)"},sidebar:"defaultSidebar",previous:{title:"sum (Aggregate Function)",permalink:"/docs/cep/query-guide/functions/core/sum"},next:{title:"timeBatch (Window)",permalink:"/docs/cep/query-guide/functions/core/timeBatch"}},c={},u=[{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],p={toc:u};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A sliding time window that holds events that arrived during the last windowTime period at a given time, and gets updated for each event arrival and expiration."),(0,a.kt)("p",null,"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"time(<INT|LONG|TIME> window.time)\n")),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"window.time"),(0,a.kt)("td",{parentName:"tr",align:null},"The sliding time period for which the window should hold events."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"INT LONG TIME"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"No")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE WINDOW cseEventWindow (symbol string, price float, volume int) time(20) output all events;\n\n@info(name = 'query0')\ninsert into cseEventWindow\nfrom cseEventStream;\n\n@info(name = 'query1')\ninsert all events into outputStream \nselect symbol, sum(price) as price\nfrom cseEventWindow;\n")),(0,a.kt)("p",null,"This processes events that arrived within the last 20 milliseconds."))}s.isMDXComponent=!0}}]);