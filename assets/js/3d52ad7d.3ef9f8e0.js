"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[44794],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,y=d["".concat(c,".").concat(m)]||d[m]||s[m]||o;return n?r.createElement(y,i(i({ref:t},p),{},{components:n})):r.createElement(y,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},73538:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=n(87462),a=(n(67294),n(3905));const o={title:"cron (Window)"},i=void 0,l={unversionedId:"cep/query-guide/functions/core/cron",id:"cep/query-guide/functions/core/cron",title:"cron (Window)",description:"This window outputs the arriving events as and when they arrive, and resets (expires) the window periodically based on the given cron expression.",source:"@site/docs/cep/query-guide/functions/core/cron.md",sourceDirName:"cep/query-guide/functions/core",slug:"/cep/query-guide/functions/core/cron",permalink:"/docs/cep/query-guide/functions/core/cron",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/core/cron.md",tags:[],version:"current",frontMatter:{title:"cron (Window)"},sidebar:"defaultSidebar",previous:{title:"createSet (Function)",permalink:"/docs/cep/query-guide/functions/core/createSet"},next:{title:"currentTimeMillis (Function)",permalink:"/docs/cep/query-guide/functions/core/currentTimeMillis"}},c={},u=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],p={toc:u};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This window outputs the arriving events as and when they arrive, and resets (expires) the window periodically based on the given cron expression."),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cron(<STRING> cron.expression)\n")),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"cron.expression"),(0,a.kt)("td",{parentName:"tr",align:null},"The cron expression that resets the window."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"STRING"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"No")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE STREAM  InputEventStream (symbol string, price float, volume int);\n\n@info(name = 'query1')\ninsert into OutputStream\nselect symbol, sum(price) as totalPrice\nfrom InputEventStream#cron('*/5 * * * * ?');\n")),(0,a.kt)("p",null,"This let the ",(0,a.kt)("inlineCode",{parentName:"p"},"totalPrice")," to gradually increase and resets to zero as a batch every five seconds."),(0,a.kt)("h2",{id:"example-2"},"Example 2"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE STREAM StockEventStream (symbol string, price float, volume int)\nCREATE WINDOW StockEventWindow (symbol string, price float, volume int) cron('*/5 * * * * ?');\n\n@info(name = 'query0')\ninsert into StockEventWindow\nfrom StockEventStream;\n\n@info(name = 'query1')\ninsert into OutputStream \nselect symbol, sum(price) as totalPrice\nfrom StockEventWindow;\n")),(0,a.kt)("p",null,"The defined window enables the ",(0,a.kt)("inlineCode",{parentName:"p"},"totalPrice")," to gradually increase and resets to zero as a batch every five seconds."))}s.isMDXComponent=!0}}]);