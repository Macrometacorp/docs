"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[76579],{3905:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>d});var n=t(67294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),i=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},p=function(e){var r=i(e.components);return n.createElement(c.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=i(t),d=a,g=m["".concat(c,".").concat(d)]||m[d]||u[d]||s;return t?n.createElement(g,l(l({ref:r},p),{},{components:t})):n.createElement(g,l({ref:r},p))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var s=t.length,l=new Array(s);l[0]=m;var o={};for(var c in r)hasOwnProperty.call(r,c)&&(o[c]=r[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var i=2;i<s;i++)l[i]=t[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},92604:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>i});var n=t(87462),a=(t(67294),t(3905));const s={title:"grpc-call-response (Source)"},l=void 0,o={unversionedId:"cep/source/grpc-call-response",id:"cep/source/grpc-call-response",title:"grpc-call-response (Source)",description:"This grpc source receives responses received from gRPC server for",source:"@site/docs/cep/source/grpc-call-response.md",sourceDirName:"cep/source",slug:"/cep/source/grpc-call-response",permalink:"/docs/cep/source/grpc-call-response",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/source/grpc-call-response.md",tags:[],version:"current",frontMatter:{title:"grpc-call-response (Source)"},sidebar:"defaultSidebar",previous:{title:"Google Pubsub (Source)",permalink:"/docs/cep/source/gcp-pubsub"},next:{title:"grpc-service (Source)",permalink:"/docs/cep/source/grpc-service"}},c={},i=[{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2}],p={toc:i};function u(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This grpc source receives responses received from gRPC server for\nrequests sent from a grpc-call sink. The source will receive responses\nfor sink with the same sink.id. For example if you have a gRPC sink with\nsink.id 15 then we need to set the sink.id as 15 in the source to\nreceives responses. Sinks and sources have 1:1 mapping"),(0,a.kt)("p",null,"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'CREATE SOURCE <NAME> WITH (type="grpc-call-response", map.type="<STRING>", sink.id="<INT>")\n')),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"sink.id"),(0,a.kt)("td",{parentName:"tr",align:null},"a unique ID that should be set for each grpc-call source. There is a 1:1 mapping between grpc-call sinks and grpc-call-response sources. Each sink has one particular source listening to the responses to requests published from that sink. So the same sink.id should be given when writing the sink also."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"INT"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"No")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE SOURCE BarStream WITH (type='grpc-call-response', sink.id= '1') (message String);\n\nCREATE SINK FooStream WITH (type='grpc-call', publisher.url = 'grpc://194.23.98.100:8080/EventService/process', sink.id= '1', map.type='json') (message String);\n")),(0,a.kt)("p",null,"Here we are listening to responses for requests sent from the sink with\nsink.id 1 will be received here. The results will be injected into\nBarStream"))}u.isMDXComponent=!0}}]);