"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6473],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>s});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),d=u(n),s=r,f=d["".concat(o,".").concat(s)]||d[s]||c[s]||l;return n?a.createElement(f,p(p({ref:t},m),{},{components:n})):a.createElement(f,p({ref:t},m))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,p=new Array(l);p[0]=d;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var u=2;u<l;u++)p[u]=n[u];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2218:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const l={title:"putAll (Function)"},p=void 0,i={unversionedId:"cep/query-guide/functions/map/putAll",id:"cep/query-guide/functions/map/putAll",title:"putAll (Function)",description:"Function returns the updated map after adding all the key-value pairs from another map. If there are duplicate keys, the key will be assigned new values from the map that's being copied.",source:"@site/docs/cep/query-guide/functions/map/putAll.md",sourceDirName:"cep/query-guide/functions/map",slug:"/cep/query-guide/functions/map/putAll",permalink:"/docs/cep/query-guide/functions/map/putAll",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/map/putAll.md",tags:[],version:"current",frontMatter:{title:"putAll (Function)"},sidebar:"defaultSidebar",previous:{title:"put (Function)",permalink:"/docs/cep/query-guide/functions/map/put"},next:{title:"putIfAbsent (Function)",permalink:"/docs/cep/query-guide/functions/map/putIfAbsent"}},o={},u=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],m={toc:u};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Function returns the updated map after adding all the key-value pairs from another map. If there are duplicate keys, the key will be assigned new values from the map that's being copied."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<OBJECT> map:putAll(<OBJECT> to.map, <OBJECT> from.map)\n")),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"to.map"),(0,r.kt)("td",{parentName:"tr",align:null},"The map into which the key-values need to copied."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"OBJECT"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"from.map"),(0,r.kt)("td",{parentName:"tr",align:null},"The map from which the key-values are copied."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"OBJECT"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"map:putAll(toMap, fromMap)\n")),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"toMap")," contains key-value pairs (",(0,r.kt)("inlineCode",{parentName:"p"},"symbol"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"gdn"),"), (",(0,r.kt)("inlineCode",{parentName:"p"},"volume"),": 100), and if ",(0,r.kt)("inlineCode",{parentName:"p"},"fromMap")," contains key-value pairs (",(0,r.kt)("inlineCode",{parentName:"p"},"symbol"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),"),(",(0,r.kt)("inlineCode",{parentName:"p"},"price")," : 12), then the function returns updated ",(0,r.kt)("inlineCode",{parentName:"p"},"toMap")," with key-value pairs (",(0,r.kt)("inlineCode",{parentName:"p"},"symbol"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),"), (",(0,r.kt)("inlineCode",{parentName:"p"},"price")," : 12), (",(0,r.kt)("inlineCode",{parentName:"p"},"volume")," :100)."))}c.isMDXComponent=!0}}]);