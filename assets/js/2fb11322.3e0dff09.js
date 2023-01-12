"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[69722],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=n.createContext({}),p=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,c=e.originalType,u=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),m=p(r),d=i,y=m["".concat(u,".").concat(d)]||m[d]||s[d]||c;return r?n.createElement(y,o(o({ref:t},l),{},{components:r})):n.createElement(y,o({ref:t},l))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var c=r.length,o=new Array(c);o[0]=m;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:i,o[1]=a;for(var p=2;p<c;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1575:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>s,frontMatter:()=>c,metadata:()=>a,toc:()=>p});var n=r(87462),i=(r(67294),r(3905));const c={title:"currentDate (Function)"},o=void 0,a={unversionedId:"cep/query-guide/functions/time/currentDate",id:"cep/query-guide/functions/time/currentDate",title:"currentDate (Function)",description:"Function returns the system time in yyyy-MM-dd format.",source:"@site/docs/cep/query-guide/functions/time/currentDate.md",sourceDirName:"cep/query-guide/functions/time",slug:"/cep/query-guide/functions/time/currentDate",permalink:"/docs/cep/query-guide/functions/time/currentDate",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/time/currentDate.md",tags:[],version:"current",frontMatter:{title:"currentDate (Function)"},sidebar:"defaultSidebar",previous:{title:"updatePerceptronClassifier (Stream Processor)",permalink:"/docs/cep/query-guide/functions/streaming-ml/updateperceptronclassifier"},next:{title:"currentTime (Function)",permalink:"/docs/cep/query-guide/functions/time/currentTime"}},u={},p=[{value:"Syntax",id:"syntax",level:2},{value:"Example 1",id:"example-1",level:2}],l={toc:p};function s(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Function returns the system time in ",(0,i.kt)("inlineCode",{parentName:"p"},"yyyy-MM-dd")," format."),(0,i.kt)("h2",{id:"syntax"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"<STRING> time:currentDate()\n")),(0,i.kt)("h2",{id:"example-1"},"Example 1"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"time:currentDate()\n")),(0,i.kt)("p",null,"Returns the current date in the ",(0,i.kt)("inlineCode",{parentName:"p"},"yyyy-MM-dd")," format, such as ",(0,i.kt)("inlineCode",{parentName:"p"},"2022-06-28"),"."))}s.isMDXComponent=!0}}]);