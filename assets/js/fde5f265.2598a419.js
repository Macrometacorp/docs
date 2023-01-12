"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[31282],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=u(n),d=i,f=m["".concat(l,".").concat(d)]||m[d]||s[d]||o;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},95406:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>s,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var r=n(87462),i=(n(67294),n(3905));const o={title:"cmToin (Function)"},a=void 0,c={unversionedId:"cep/query-guide/functions/unitconversion/cmToin",id:"cep/query-guide/functions/unitconversion/cmToin",title:"cmToin (Function)",description:"This converts the input given in centimeters into inches.",source:"@site/docs/cep/query-guide/functions/unitconversion/cmToin.md",sourceDirName:"cep/query-guide/functions/unitconversion",slug:"/cep/query-guide/functions/unitconversion/cmToin",permalink:"/docs/cep/query-guide/functions/unitconversion/cmToin",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/unitconversion/cmToin.md",tags:[],version:"current",frontMatter:{title:"cmToin (Function)"},sidebar:"defaultSidebar",previous:{title:"cmToft (Function)",permalink:"/docs/cep/query-guide/functions/unitconversion/cmToft"},next:{title:"cmTokm (Function)",permalink:"/docs/cep/query-guide/functions/unitconversion/cmTokm"}},l={},u=[{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],p={toc:u};function s(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This converts the input given in centimeters into inches."),(0,i.kt)("p",null,"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"<DOUBLE> unitconversion:cmToin(<INT|LONG|FLOAT|DOUBLE> p1)\n")),(0,i.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"),(0,i.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,i.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,i.kt)("th",{parentName:"tr",align:null},"Optional"),(0,i.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"p1"),(0,i.kt)("td",{parentName:"tr",align:null},"The value that needs to be converted from centimeters into inches."),(0,i.kt)("td",{parentName:"tr",align:null}),(0,i.kt)("td",{parentName:"tr",align:null},"INT LONG FLOAT DOUBLE"),(0,i.kt)("td",{parentName:"tr",align:null},"No"),(0,i.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,i.kt)("h2",{id:"example-1"},"Example 1"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"unitconversion:cmToin(100)\n")),(0,i.kt)("p",null,"Input centimeters value ",(0,i.kt)("inlineCode",{parentName:"p"},"100")," is converted into inches as ",(0,i.kt)("inlineCode",{parentName:"p"},"39.37"),"."))}s.isMDXComponent=!0}}]);