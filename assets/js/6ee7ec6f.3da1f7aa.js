"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[26209],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),u=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=u(n),m=r,f=c["".concat(p,".").concat(m)]||c[m]||s[m]||l;return n?a.createElement(f,i(i({ref:t},d),{},{components:n})):a.createElement(f,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},56595:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const l={title:"addAll (Function)"},i=void 0,o={unversionedId:"cep/query-guide/functions/list/addAll",id:"cep/query-guide/functions/list/addAll",title:"addAll (Function)",description:"Function returns the updated list after adding all the values from the given list.",source:"@site/docs/cep/query-guide/functions/list/addAll.md",sourceDirName:"cep/query-guide/functions/list",slug:"/cep/query-guide/functions/list/addAll",permalink:"/docs/cep/query-guide/functions/list/addAll",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/list/addAll.md",tags:[],version:"current",frontMatter:{title:"addAll (Function)"},sidebar:"defaultSidebar",previous:{title:"add (Function)",permalink:"/docs/cep/query-guide/functions/list/add"},next:{title:"clear (Function)",permalink:"/docs/cep/query-guide/functions/list/clear"}},p={},u=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],d={toc:u};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Function returns the updated list after adding all the values from the given list."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list)\n<OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list, <BOOL> is.distinct)\n")),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"to.list"),(0,r.kt)("td",{parentName:"tr",align:null},"The list into which the values need to copied."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"OBJECT"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"from.list"),(0,r.kt)("td",{parentName:"tr",align:null},"The list from which the values are copied."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"OBJECT"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"is.distinct"),(0,r.kt)("td",{parentName:"tr",align:null},"If ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," returns list with distinct values"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null},"BOOL"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"list:putAll(toList, fromList)\n")),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"toList")," contains values (",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"gdn"),"), and if ",(0,r.kt)("inlineCode",{parentName:"p"},"fromList")," contains values (",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"XYZ"),"), then the function returns updated ",(0,r.kt)("inlineCode",{parentName:"p"},"toList")," with values (",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"gdn"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"XYZ"),")."),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"list:putAll(toList, fromList, true)\n")),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"toList")," contains values (",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"gdn"),"), and if ",(0,r.kt)("inlineCode",{parentName:"p"},"fromList")," contains values (",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"XYZ"),"), then the function returns updated ",(0,r.kt)("inlineCode",{parentName:"p"},"toList")," with values (",(0,r.kt)("inlineCode",{parentName:"p"},"IBM"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"gdn"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"XYZ"),")."))}s.isMDXComponent=!0}}]);