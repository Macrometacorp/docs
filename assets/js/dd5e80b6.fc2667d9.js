"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[11381],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),p=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,f=m["".concat(u,".").concat(d)]||m[d]||c[d]||i;return n?a.createElement(f,l(l({ref:t},s),{},{components:n})):a.createElement(f,l({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},31282:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={title:"isNan (Function)"},l=void 0,o={unversionedId:"cep/query-guide/functions/math/isNan",id:"cep/query-guide/functions/math/isNan",title:"isNan (Function)",description:"This function wraps the java.lang.Float.isNaN() and java.lang.Double.isNaN() functions and returns true if p1 is NaN  (Not-a-Number), and returns false if otherwise.",source:"@site/docs/cep/query-guide/functions/math/isNan.md",sourceDirName:"cep/query-guide/functions/math",slug:"/cep/query-guide/functions/math/isNan",permalink:"/docs/cep/query-guide/functions/math/isNan",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/math/isNan.md",tags:[],version:"current",frontMatter:{title:"isNan (Function)"},sidebar:"defaultSidebar",previous:{title:"isInfinite (Function)",permalink:"/docs/cep/query-guide/functions/math/isInfinite"},next:{title:"ln (Function)",permalink:"/docs/cep/query-guide/functions/math/ln"}},u={},p=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],s={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This function wraps the ",(0,r.kt)("inlineCode",{parentName:"p"},"java.lang.Float.isNaN()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"java.lang.Double.isNaN()")," functions and returns ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," if ",(0,r.kt)("inlineCode",{parentName:"p"},"p1")," is NaN  (Not-a-Number), and returns ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," if otherwise."),(0,r.kt)("h2",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<BOOL> math:isNan(<FLOAT|DOUBLE> p1)\n")),(0,r.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Optional"),(0,r.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"p1"),(0,r.kt)("td",{parentName:"tr",align:null},"The value of the parameter which the function determines to be either NaN or a number."),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"FLOAT DOUBLE"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"CREATE STREAM InValueStream (inValue1 double,inValue2 int);\n\ninsert into OutMediationStream\nselect math:isNan(inValue1) as isNaN\nfrom InValueStream;\n")),(0,r.kt)("p",null,"If the ",(0,r.kt)("inlineCode",{parentName:"p"},"inValue1")," in the input stream has a value that is undefined, then the function considers it as an ",(0,r.kt)("inlineCode",{parentName:"p"},"NaN")," value and directs ",(0,r.kt)("inlineCode",{parentName:"p"},"True")," to the output stream, OutMediationStream. For example, ",(0,r.kt)("inlineCode",{parentName:"p"},"isNan(java.lang.Math.log(-12d))")," returns ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),"."))}c.isMDXComponent=!0}}]);