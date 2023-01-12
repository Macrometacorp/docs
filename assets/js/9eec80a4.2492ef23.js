"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[11256],{3905:(e,t,n)=>{n.d(t,{Zo:()=>o,kt:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),m=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},o=function(e){var t=m(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,o=d(e,["components","mdxType","originalType","parentName"]),s=m(n),c=r,f=s["".concat(p,".").concat(c)]||s[c]||u[c]||l;return n?a.createElement(f,i(i({ref:t},o),{},{components:n})):a.createElement(f,i({ref:t},o))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=s;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d.mdxType="string"==typeof e?e:r,i[1]=d;for(var m=2;m<l;m++)i[m]=n[m];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},85850:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>m});var a=n(87462),r=(n(67294),n(3905));const l={title:"dateDiff (Function)"},i=void 0,d={unversionedId:"cep/query-guide/functions/time/dateDiff",id:"cep/query-guide/functions/time/dateDiff",title:"dateDiff (Function)",description:"Returns difference between two dates in days.",source:"@site/docs/cep/query-guide/functions/time/dateDiff.md",sourceDirName:"cep/query-guide/functions/time",slug:"/cep/query-guide/functions/time/dateDiff",permalink:"/docs/cep/query-guide/functions/time/dateDiff",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/time/dateDiff.md",tags:[],version:"current",frontMatter:{title:"dateDiff (Function)"},sidebar:"defaultSidebar",previous:{title:"dateAdd (Function)",permalink:"/docs/cep/query-guide/functions/time/dateAdd"},next:{title:"dateFormat (Function)",permalink:"/docs/cep/query-guide/functions/time/dateFormat"}},p={},m=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2}],o={toc:m};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Returns difference between two dates in days."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2, <STRING> date.format1, <STRING> date.format2)\n<INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2)\n<INT> time:dateDiff(<LONG> timestamp.in.milliseconds1, <LONG> timestamp.in.milliseconds2)\n")),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"date.value1"),(0,r.kt)("td",{parentName:"tr",align:null},"The value of the first date parameter. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"2014-11-11 13:23:44.657"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"2014-11-11"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"13:23:44.657"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"date.value2"),(0,r.kt)("td",{parentName:"tr",align:null},"The value of the second date parameter. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"2014-11-11 13:23:44.657"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"2014-11-11"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"13:23:44.657"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"date.format1"),(0,r.kt)("td",{parentName:"tr",align:null},"The format of the first date value provided. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"yyyy-MM-dd HH:mm:ss.SSS"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"yyyy-MM-dd HH:mm:ss.SSS")),(0,r.kt)("td",{parentName:"tr",align:null},"STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"date.format2"),(0,r.kt)("td",{parentName:"tr",align:null},"The format of the second date value provided. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"yyyy-MM-dd HH:mm:ss.SSS"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"yyyy-MM-dd HH:mm:ss.SSS")),(0,r.kt)("td",{parentName:"tr",align:null},"STRING"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"timestamp.in.milliseconds1"),(0,r.kt)("td",{parentName:"tr",align:null},"The first date value in milliseconds from the epoch. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"1415712224000L"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"LONG"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"timestamp.in.milliseconds2"),(0,r.kt)("td",{parentName:"tr",align:null},"The second date value in milliseconds from the epoch. For example, ",(0,r.kt)("inlineCode",{parentName:"td"},"1415712224000L"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"LONG"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"time:dateDiff('2014-11-11 13:23:44', '2014-11-9 13:23:44', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm:ss')\n")),(0,r.kt)("p",null,"Returns the date difference between the two given dates as ",(0,r.kt)("inlineCode",{parentName:"p"},"2"),"."),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"time:dateDiff('2014-11-13 13:23:44', '2014-11-9 13:23:44')\n")),(0,r.kt)("p",null,"Returns the date difference between the two given dates as ",(0,r.kt)("inlineCode",{parentName:"p"},"4"),"."),(0,r.kt)("h2",{id:"example-3"},"Example 3"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"time:dateDiff(1415692424000L, 1412841224000L)\n")),(0,r.kt)("p",null,"Returns the date difference between the two given dates as ",(0,r.kt)("inlineCode",{parentName:"p"},"33"),"."))}u.isMDXComponent=!0}}]);