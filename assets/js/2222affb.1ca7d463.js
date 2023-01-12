"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[24676],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>s});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),o=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=o(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,u=d(e,["components","mdxType","originalType","parentName"]),c=o(n),s=r,y=c["".concat(p,".").concat(s)]||c[s]||m[s]||l;return n?a.createElement(y,i(i({ref:t},u),{},{components:n})):a.createElement(y,i({ref:t},u))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=c;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d.mdxType="string"==typeof e?e:r,i[1]=d;for(var o=2;o<l;o++)i[o]=n[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},23666:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>d,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const l={title:"date (Function)"},i=void 0,d={unversionedId:"cep/query-guide/functions/time/date",id:"cep/query-guide/functions/time/date",title:"date (Function)",description:"Extracts the date part of a date or date-time and return it in yyyy-MM-dd format.",source:"@site/docs/cep/query-guide/functions/time/date.md",sourceDirName:"cep/query-guide/functions/time",slug:"/cep/query-guide/functions/time/date",permalink:"/docs/cep/query-guide/functions/time/date",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/time/date.md",tags:[],version:"current",frontMatter:{title:"date (Function)"},sidebar:"defaultSidebar",previous:{title:"currentTimestamp (Function)",permalink:"/docs/cep/query-guide/functions/time/currentTimestamp"},next:{title:"dateAdd (Function)",permalink:"/docs/cep/query-guide/functions/time/dateAdd"}},p={},o=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2}],u={toc:o};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Extracts the date part of a date or date-time and return it in ",(0,r.kt)("inlineCode",{parentName:"p"},"yyyy-MM-dd")," format."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<STRING> time:date(<STRING> date.value, <STRING> date.format)\n<STRING> time:date(<STRING> date.value)\n")),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"date.value"),(0,r.kt)("td",{parentName:"tr",align:null},"The value of the date. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"2014-11-11 13:23:44.657"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"2014-11-11"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"13:23:44.657"),"."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"date.format"),(0,r.kt)("td",{parentName:"tr",align:null},"The format of the date value provided. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"yyyy/MM/dd HH:mm:ss.SSS"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"yyyy-MM-dd HH:mm:ss.SSS")),(0,r.kt)("td",{parentName:"tr",align:null},"STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"time:date('2014/11/11 13:23:44', 'yyyy/MM/dd HH:mm:ss')\n")),(0,r.kt)("p",null,"Extracts the date and returns ",(0,r.kt)("inlineCode",{parentName:"p"},"2022-10-11"),"."),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"time:date('2014-11-23 13:23:44.345')\n")),(0,r.kt)("p",null,"Extracts the date and returns ",(0,r.kt)("inlineCode",{parentName:"p"},"2022-10-13"),"."),(0,r.kt)("h2",{id:"example-3"},"Example 3"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"time:date('13:23:44', 'HH:mm:ss')\n")),(0,r.kt)("p",null,"Extracts the date and returns ",(0,r.kt)("inlineCode",{parentName:"p"},"1970-01-01"),"."))}m.isMDXComponent=!0}}]);