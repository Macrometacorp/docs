"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9829],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,k=d["".concat(p,".").concat(m)]||d[m]||s[m]||l;return n?r.createElement(k,i(i({ref:t},u),{},{components:n})):r.createElement(k,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var c=2;c<l;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},31548:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const l={title:"tcp (Source)"},i=void 0,o={unversionedId:"cep/source/tcp",id:"cep/source/tcp",title:"tcp (Source)",description:"A Stream App application can be configured to receive events via the TCP",source:"@site/docs/cep/source/tcp.md",sourceDirName:"cep/source",slug:"/cep/source/tcp",permalink:"/docs/cep/source/tcp",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/source/tcp.md",tags:[],version:"current",frontMatter:{title:"tcp (Source)"},sidebar:"defaultSidebar",previous:{title:"SSE Source",permalink:"/docs/cep/source/sse"},next:{title:"Create Stream Workers",permalink:"/docs/cep/tutorials/create-stream-app"}},p={},c=[{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],u={toc:c};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A Stream App application can be configured to receive events via the TCP\ntransport by adding the ",(0,a.kt)("inlineCode",{parentName:"p"},"type='tcp'")," annotation at the top\nof an event stream definition. When this is defined the associated\nstream will receive events from the TCP transport on the host and port\ndefined in the system."),(0,a.kt)("p",null,"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'CREATE SOURCE <NAME> WITH (type="tcp", map.type="<STRING>", context="<STRING>")\n')),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"context"),(0,a.kt)("td",{parentName:"tr",align:null},"The URL ",(0,a.kt)("inlineCode",{parentName:"td"},"context")," that should be used to receive the events."),(0,a.kt)("td",{parentName:"tr",align:null},"/"),(0,a.kt)("td",{parentName:"tr",align:null},"STRING"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"No")))),(0,a.kt)("p",null,"System Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Parameters"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"host"),(0,a.kt)("td",{parentName:"tr",align:null},"Tcp server host."),(0,a.kt)("td",{parentName:"tr",align:null},"0.0.0.0"),(0,a.kt)("td",{parentName:"tr",align:null},"Any valid host or IP")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"port"),(0,a.kt)("td",{parentName:"tr",align:null},"Tcp server port."),(0,a.kt)("td",{parentName:"tr",align:null},"9892"),(0,a.kt)("td",{parentName:"tr",align:null},"Any integer representing valid port")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"receiver.threads"),(0,a.kt)("td",{parentName:"tr",align:null},"Number of threads to receive connections."),(0,a.kt)("td",{parentName:"tr",align:null},"10"),(0,a.kt)("td",{parentName:"tr",align:null},"Any positive integer")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"worker.threads"),(0,a.kt)("td",{parentName:"tr",align:null},"Number of threads to serve events."),(0,a.kt)("td",{parentName:"tr",align:null},"10"),(0,a.kt)("td",{parentName:"tr",align:null},"Any positive integer")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"tcp.no.delay"),(0,a.kt)("td",{parentName:"tr",align:null},"This is to specify whether to disable Nagle algorithm during message passing. If tcp.no.delay = ",(0,a.kt)("inlineCode",{parentName:"td"},"true"),", the execution of Nagle algorithm will be disabled in the underlying TCP logic. Hence there will be no delay between two successive writes to the TCP connection. Else there can be a constant ack delay."),(0,a.kt)("td",{parentName:"tr",align:null},"true"),(0,a.kt)("td",{parentName:"tr",align:null},"true false")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"keep.alive"),(0,a.kt)("td",{parentName:"tr",align:null},"This property defines whether the server should be kept alive when there are no connections available."),(0,a.kt)("td",{parentName:"tr",align:null},"true"),(0,a.kt)("td",{parentName:"tr",align:null},"true false")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE SOURCE Foo WITH (type = 'tcp', context='abc', map.type='binary') (attribute1 string, attribute2 int );\n")),(0,a.kt)("p",null,"Under this configuration, events are received via the TCP transport on\ndefault host,port, ",(0,a.kt)("inlineCode",{parentName:"p"},"abc")," context, and they are passed to ",(0,a.kt)("inlineCode",{parentName:"p"},"Foo")," stream\nfor processing."))}s.isMDXComponent=!0}}]);