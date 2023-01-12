"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[21885],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>m});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(t),m=o,y=c["".concat(s,".").concat(m)]||c[m]||u[m]||a;return t?r.createElement(y,i(i({ref:n},d),{},{components:t})):r.createElement(y,i({ref:n},d))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=c;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},67631:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=t(87462),o=(t(67294),t(3905));const a={title:"Ad Hoc Queries"},i=void 0,l={unversionedId:"cep/query-guide/adhoc",id:"cep/query-guide/adhoc",title:"Ad Hoc Queries",description:"Ad hoc queries provide a way of performing ad-hoc operations on tables (stores), named windows, and named aggregations. We can send ad hoc queries and fetch data from stores and named windows.",source:"@site/docs/cep/query-guide/adhoc.md",sourceDirName:"cep/query-guide",slug:"/cep/query-guide/adhoc",permalink:"/docs/cep/query-guide/adhoc",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/adhoc.md",tags:[],version:"current",frontMatter:{title:"Ad Hoc Queries"},sidebar:"defaultSidebar",previous:{title:"Error Handling",permalink:"/docs/cep/query-guide/error-handling"},next:{title:"Sink",permalink:"/docs/cep/sink/"}},s={},p=[{value:"Syntax",id:"syntax",level:2},{value:"Example",id:"example",level:2}],d={toc:p};function u(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Ad hoc queries provide a way of performing ad-hoc operations on tables (stores), named windows, and named aggregations. We can send ad hoc queries and fetch data from stores and named windows."),(0,o.kt)("h2",{id:"syntax"},"Syntax"),(0,o.kt)("p",null,"Ad hoc queries use the following syntax:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"    select * from SampleAdhocQueryInputTableOneMinTimeWindow;\n    \n    SELECT * FROM SampleAdhocQueryTable;\n")),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"-- Defines `SampleAdhocQueryInputTable` collection to process events having `sensorId` and `temperature`(F).\nCREATE SOURCE SampleAdhocQueryInputTable WITH(type = 'database', collection = \"SampleAdhocQueryInputTable\", collection.type=\"doc\" , replication.type=\"global\", map.type='json') (sensorId string, temperature double);\n\n-- Named Window\nCREATE WINDOW SampleAdhocQueryInputTableOneMinTimeWindow (sensorId string, temperature double) SLIDING_TIME(1 min);\n\n-- Table\nCREATE TABLE GLOBAL SampleAdhocQuerySensorA1234DestTable(sensorId string, temperature double);\n\n@info(name = 'Insert-to-window')\nINSERT INTO SampleAdhocQueryInputTableOneMinTimeWindow\nSELECT *\nFROM SampleAdhocQueryInputTable;\n\n@info(name = 'EqualsFilter')\n-- Note: Filter out events with `sensorId` equalling `sensor A1234`\nINSERT INTO SampleAdhocQuerySensorA1234DestTable\nSELECT *\nFROM SampleAdhocQueryInputTable\nWHERE sensorId == 'sensor A1234';\n")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Upload following data into ",(0,o.kt)("inlineCode",{parentName:"p"},"SampleAdhocQueryInputTable"),' C8DB Collection\n{"sensorId":"sensor A1234","temperature":18}\n{"sensorId":"sensor A1234","temperature":-32.2}\n{"sensorId":"sensor FR45","temperature":20.9}\n{"sensorId":"sensor meter1","temperature":49.6}')),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"This application accumulates all the data for one minute in the named window ",(0,o.kt)("inlineCode",{parentName:"p"},"SampleAdhocQueryInputTableOneMinTimeWindow"),"\nNamed window allows other application to query data in realtime.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Run the ad hoc query on the ",(0,o.kt)("inlineCode",{parentName:"p"},"SampleAdhocQueryInputTableOneMinTimeWindow"),"\nQuery:\nselect * from SampleAdhocQueryInputTableOneMinTimeWindow"),(0,o.kt)("p",{parentName:"li"},"Output:\n[\n",'["sensor A1234",18]',",\n",'["sensor A1234",-32.2]',",\n",'["sensor FR45",20.9]',",\n",'["sensor meter1",49.6]',"\n]")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Similar to Named Windows one can run adhoc queries on the stores as well. Running adhoc query on\n",(0,o.kt)("inlineCode",{parentName:"p"},"SampleAdhocQuerySensorA1234DestTable")," Collection should produce below result"),(0,o.kt)("p",{parentName:"li"},'Query: Store the result if sensorId is equal to "sensor A1234"\nSELECT * FROM SampleAdhocQuerySensorA1234DestTable'),(0,o.kt)("p",{parentName:"li"},"Output:\n[\n",'["sensor A1234",18]',",\n",'["sensor A1234",-32.2]',"\n]"))))}u.isMDXComponent=!0}}]);