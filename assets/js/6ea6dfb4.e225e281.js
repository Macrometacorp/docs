"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[38235],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),s=c(r),d=a,f=s["".concat(l,".").concat(d)]||s[d]||m[d]||i;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=s;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:a,o[1]=u;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},17948:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>u,toc:()=>c});var n=r(87462),a=(r(67294),r(3905));const i={title:"mininum (Aggregate Function)"},o=void 0,u={unversionedId:"cep/query-guide/functions/core/minimum",id:"cep/query-guide/functions/core/minimum",title:"mininum (Aggregate Function)",description:"Returns the minimum value of the input parameters.",source:"@site/docs/cep/query-guide/functions/core/minimum.md",sourceDirName:"cep/query-guide/functions/core",slug:"/cep/query-guide/functions/core/minimum",permalink:"/docs/cep/query-guide/functions/core/minimum",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/core/minimum.md",tags:[],version:"current",frontMatter:{title:"mininum (Aggregate Function)"},sidebar:"defaultSidebar",previous:{title:"minForever (Aggregate Function)",permalink:"/docs/cep/query-guide/functions/core/minForever"},next:{title:"or (Aggregate Function)",permalink:"/docs/cep/query-guide/functions/core/or"}},l={},c=[{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],p={toc:c};function m(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Returns the minimum value of the input parameters."),(0,a.kt)("p",null,"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"<INT|LONG|DOUBLE|FLOAT> minimum(<INT|LONG|DOUBLE|FLOAT> arg, <INT|LONG|DOUBLE|FLOAT> ...)\n")),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"arg"),(0,a.kt)("td",{parentName:"tr",align:null},"This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"INT LONG DOUBLE FLOAT"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"    @info(name = 'query1') from inputStream\n    insert into outputStream\n    select maximum(price1, price2, price3) as max;\n")),(0,a.kt)("p",null,"This returns the minimum value of the input parameters price1, price2, price3."))}m.isMDXComponent=!0}}]);