"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[44763],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),l=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,f=m["".concat(u,".").concat(d)]||m[d]||p[d]||a;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},36501:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var r=n(87462),o=(n(67294),n(3905));const a={title:"e (Function)"},i=void 0,c={unversionedId:"cep/query-guide/functions/math/e",id:"cep/query-guide/functions/math/e",title:"e (Function)",description:"This function returns the java.lang.Math.E constant, which is the closest double value to e, where e is the base of the natural logarithms.",source:"@site/docs/cep/query-guide/functions/math/e.md",sourceDirName:"cep/query-guide/functions/math",slug:"/cep/query-guide/functions/math/e",permalink:"/docs/cep/query-guide/functions/math/e",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/math/e.md",tags:[],version:"current",frontMatter:{title:"e (Function)"},sidebar:"defaultSidebar",previous:{title:"cosh (Function)",permalink:"/docs/cep/query-guide/functions/math/cosh"},next:{title:"exp (Function)",permalink:"/docs/cep/query-guide/functions/math/exp"}},u={},l=[{value:"Syntax",id:"syntax",level:2},{value:"Example 1",id:"example-1",level:2}],s={toc:l};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This function returns the ",(0,o.kt)("inlineCode",{parentName:"p"},"java.lang.Math.E")," constant, which is the closest double value to e, where e is the base of the natural logarithms."),(0,o.kt)("h2",{id:"syntax"},"Syntax"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"<DOUBLE> math:e()\n")),(0,o.kt)("h2",{id:"example-1"},"Example 1"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"CREATE STREAM InValueStream (inValue double);\n\ninsert into OutMediationStream\nselect math:e() as eValue\nfrom InValueStream;\n")),(0,o.kt)("p",null,"This function returns the constant, 2.7182818284590452354, which is then closest double value to e and directs the output to ",(0,o.kt)("inlineCode",{parentName:"p"},"OutMediationStream")," output stream."))}p.isMDXComponent=!0}}]);