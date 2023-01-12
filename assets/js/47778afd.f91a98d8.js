"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[46933],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(r),m=a,f=u["".concat(l,".").concat(m)]||u[m]||p[m]||s;return r?n.createElement(f,o(o({ref:t},d),{},{components:r})):n.createElement(f,o({ref:t},d))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var c=2;c<s;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},85162:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(67294),a=r(34334);const s="tabItem_Ymn6";function o(e){let{children:t,hidden:r,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(s,o),hidden:r},t)}},65488:(e,t,r)=>{r.d(t,{Z:()=>m});var n=r(87462),a=r(67294),s=r(34334),o=r(72389),i=r(67392),l=r(7094),c=r(12466);const d="tabList__CuJ",p="tabItem_LNqP";function u(e){const{lazy:t,block:r,defaultValue:o,values:u,groupId:m,className:f}=e,b=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),y=u??b.map((e=>{let{props:{value:t,label:r,attributes:n}}=e;return{value:t,label:r,attributes:n}})),h=(0,i.l)(y,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===o?o:o??b.find((e=>e.props.default))?.props.value??b[0].props.value;if(null!==g&&!y.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${y.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:v,setTabGroupChoices:k}=(0,l.U)(),[O,E]=(0,a.useState)(g),C=[],{blockElementScrollPositionUntilNextRender:w}=(0,c.o5)();if(null!=m){const e=v[m];null!=e&&e!==O&&y.some((t=>t.value===e))&&E(e)}const I=e=>{const t=e.currentTarget,r=C.indexOf(t),n=y[r].value;n!==O&&(w(t),E(n),null!=m&&k(m,String(n)))},T=e=>{let t=null;switch(e.key){case"ArrowRight":{const r=C.indexOf(e.currentTarget)+1;t=C[r]??C[0];break}case"ArrowLeft":{const r=C.indexOf(e.currentTarget)-1;t=C[r]??C[C.length-1];break}}t?.focus()};return a.createElement("div",{className:(0,s.Z)("tabs-container",d)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":r},f)},y.map((e=>{let{value:t,label:r,attributes:o}=e;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:O===t?0:-1,"aria-selected":O===t,key:t,ref:e=>C.push(e),onKeyDown:T,onFocus:I,onClick:I},o,{className:(0,s.Z)("tabs__item",p,o?.className,{"tabs__item--active":O===t})}),r??t)}))),t?(0,a.cloneElement)(b.filter((e=>e.props.value===O))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==O})))))}function m(e){const t=(0,o.Z)();return a.createElement(u,(0,n.Z)({key:String(t)},e))}},40977:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var n=r(87462),a=(r(67294),r(3905)),s=r(65488),o=r(85162);const i={sidebar_position:20,title:"Redis SDK and API Commands"},l=void 0,c={unversionedId:"queryworkers/redis/redis-sdks",id:"queryworkers/redis/redis-sdks",title:"Redis SDK and API Commands",description:"You can access all the familiar Redis commands using the Macrometa SDK or API.",source:"@site/docs/queryworkers/redis/redis-sdks.md",sourceDirName:"queryworkers/redis",slug:"/queryworkers/redis/redis-sdks",permalink:"/docs/queryworkers/redis/redis-sdks",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/redis/redis-sdks.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_position:20,title:"Redis SDK and API Commands"},sidebar:"defaultSidebar",previous:{title:"Getting Started with Redis",permalink:"/docs/queryworkers/redis/getting-started-redis"},next:{title:"Redis Data Formats",permalink:"/docs/queryworkers/redis/data-type-format"}},d={},p=[],u={toc:p};function m(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"You can access all the familiar Redis commands using the Macrometa SDK or API."),(0,a.kt)(s.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Step 1. ",(0,a.kt)("a",{parentName:"li",href:"/docs/sdks/install-sdks"},"Install the SDK"),"."),(0,a.kt)("li",{parentName:"ul"},"Step 2. Create an instance of the C8Client"),(0,a.kt)("li",{parentName:"ul"},"Step 3. Access Redis commands ",(0,a.kt)("inlineCode",{parentName:"li"},"client.redis.<Redis command>"),".")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-py"},'from c8 import C8Client\n\n# Create a connection to GDN\nclient = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n                        email=\'nemo@nautilus.com\', password=\'xxxxx\',\n                        geofabric=\'_system\')\n\n# String data type example\n# Set string\nclient.redis.set("test", "1", REDIS_COLLECTION)\n# Get string\nresponse = client.redis.get("test", REDIS_COLLECTION)\n# Response from platform\nprint(response)\n\n# Sorted set data type example\n# Add sorted set\nclient.redis.zadd("testZadd", [1, "test"], REDIS_COLLECTION)\n# Return range of elements\nresponse = client.redis.zrange("testZadd", 0, 1, REDIS_COLLECTION)\n# Response from platform\nprint(response)\n\n# List data type example\nlist_data = ["iron", "gold", "copper"]\nclient.redis.lpush("list", list_data, REDIS_COLLECTION)\n# Return range of list elements\nresponse = client.redis.lrange("list", 0, 1, REDIS_COLLECTION)\n# Response from platform\nprint(response)\n\n# Hash data type example\n# Set hash\nclient.redis.hset(\n        "games",\n        {"action": "elden", "driving": "GT7"},\n        REDIS_COLLECTION\n    )\n# Get hash\nresponse = client.redis.hget("games", "action", REDIS_COLLECTION)\n# Response from platform\nprint(response)\n\n# Sets data type example\nclient.redis.sadd("animals", ["dog"], REDIS_COLLECTION)\n# Pop sets data\nresponse = client.redis.spop("animals", 1, REDIS_COLLECTION)\n# Response from platform\nprint(response)\n'))),(0,a.kt)(o.Z,{value:"api",label:"REST API",mdxType:"TabItem"},(0,a.kt)("p",null,"Use our interactive API Reference with code generation in 18 programming languages:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://macrometa.com/docs/api#/operations/RedisPost"},"RedisPost")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://macrometa.com/docs/api#/operations/RedisGet"},"RedisGet"))))))}m.isMDXComponent=!0}}]);