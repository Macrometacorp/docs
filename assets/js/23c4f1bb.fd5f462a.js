"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[38233],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),m=u(r),f=i,d=m["".concat(l,".").concat(f)]||m[f]||p[f]||o;return r?n.createElement(d,c(c({ref:t},s),{},{components:r})):n.createElement(d,c({ref:t},s))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,c=new Array(o);c[0]=m;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,c[1]=a;for(var u=2;u<o;u++)c[u]=r[u];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},82350:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>u});var n=r(87462),i=(r(67294),r(3905));const o={title:"currentTimeMillis (Function)"},c=void 0,a={unversionedId:"cep/query-guide/functions/core/currentTimeMillis",id:"cep/query-guide/functions/core/currentTimeMillis",title:"currentTimeMillis (Function)",description:"Returns the current timestamp of stream processor application in milliseconds.",source:"@site/docs/cep/query-guide/functions/core/currentTimeMillis.md",sourceDirName:"cep/query-guide/functions/core",slug:"/cep/query-guide/functions/core/currentTimeMillis",permalink:"/docs/cep/query-guide/functions/core/currentTimeMillis",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/core/currentTimeMillis.md",tags:[],version:"current",frontMatter:{title:"currentTimeMillis (Function)"},sidebar:"defaultSidebar",previous:{title:"cron (Window)",permalink:"/docs/cep/query-guide/functions/core/cron"},next:{title:"default (Function)",permalink:"/docs/cep/query-guide/functions/core/default"}},l={},u=[{value:"Syntax",id:"syntax",level:2},{value:"Example",id:"example",level:2}],s={toc:u};function p(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Returns the current timestamp of stream processor application in milliseconds."),(0,i.kt)("h2",{id:"syntax"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"    <LONG> currentTimeMillis()\n")),(0,i.kt)("h2",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"    insert into barStream\n    select symbol as name, currentTimeMillis() as eventTimestamp\n    from fooStream;\n")),(0,i.kt)("p",null,"This extracts current stream processor application timestamp."))}p.isMDXComponent=!0}}]);