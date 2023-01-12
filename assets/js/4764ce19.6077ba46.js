"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[16397],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),i=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=i(e.components);return o.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),m=i(n),d=r,f=m["".concat(s,".").concat(d)]||m[d]||p[d]||a;return n?o.createElement(f,l(l({ref:t},u),{},{components:n})):o.createElement(f,l({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var i=2;i<a;i++)l[i]=n[i];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},85162:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(67294),r=n(34334);const a="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return o.createElement("div",{role:"tabpanel",className:(0,r.Z)(a,l),hidden:n},t)}},65488:(e,t,n)=>{n.d(t,{Z:()=>d});var o=n(87462),r=n(67294),a=n(34334),l=n(72389),c=n(67392),s=n(7094),i=n(12466);const u="tabList__CuJ",p="tabItem_LNqP";function m(e){const{lazy:t,block:n,defaultValue:l,values:m,groupId:d,className:f}=e,b=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=m??b.map((e=>{let{props:{value:t,label:n,attributes:o}}=e;return{value:t,label:n,attributes:o}})),h=(0,c.l)(g,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const y=null===l?l:l??b.find((e=>e.props.default))?.props.value??b[0].props.value;if(null!==y&&!g.some((e=>e.value===y)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${y}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:v}=(0,s.U)(),[w,N]=(0,r.useState)(y),S=[],{blockElementScrollPositionUntilNextRender:T}=(0,i.o5)();if(null!=d){const e=k[d];null!=e&&e!==w&&g.some((t=>t.value===e))&&N(e)}const D=e=>{const t=e.currentTarget,n=S.indexOf(t),o=g[n].value;o!==w&&(T(t),N(o),null!=d&&v(d,String(o)))},O=e=>{let t=null;switch(e.key){case"ArrowRight":{const n=S.indexOf(e.currentTarget)+1;t=S[n]??S[0];break}case"ArrowLeft":{const n=S.indexOf(e.currentTarget)-1;t=S[n]??S[S.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,a.Z)("tabs-container",u)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},f)},g.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,o.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>S.push(e),onKeyDown:O,onFocus:D,onClick:D},l,{className:(0,a.Z)("tabs__item",p,l?.className,{"tabs__item--active":w===t})}),n??t)}))),t?(0,r.cloneElement)(b.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function d(e){const t=(0,l.Z)();return r.createElement(m,(0,o.Z)({key:String(t)},e))}},83295:(e,t,n)=>{n.d(t,{ZP:()=>l});var o=n(87462),r=(n(67294),n(3905));const a={toc:[]};function l(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"For information about API calls, refer to ",(0,r.kt)("a",{parentName:"p",href:"https://macrometa.com/docs/api#/operations/handleCommandGet:collectionGetProperties"},"Get information about collection")," and ",(0,r.kt)("a",{parentName:"p",href:"https://macrometa.com/docs/api#/operations/handleCommandPut:modifyProperties"},"Update collection properties"),"."))}l.isMDXComponent=!0},45:(e,t,n)=>{n.d(t,{ZP:()=>l});var o=n(87462),r=(n(67294),n(3905));const a={toc:[]};function l(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,n.collection," collections have the following settings:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"ID -")," System-generated ID of the selected collection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Type -")," The data model type of the selected collection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Status -")," Current status of the selected collection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Synchronous Writes -")," Select the checkbox to enable synchronous writes.")),(0,r.kt)("p",null,"You can also ",(0,r.kt)("a",{parentName:"p",href:"/docs/collections/delete-collection"},"Delete")," or ",(0,r.kt)("a",{parentName:"p",href:"/docs/collections/truncate-collection"},"Truncate")," the collection."))}l.isMDXComponent=!0},23158:(e,t,n)=>{n.d(t,{ZP:()=>l});var o=n(87462),r=(n(67294),n(3905));const a={toc:[{value:"View Collection Settings",id:"view-collection-settings",level:2}]};function l(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"view-collection-settings"},"View Collection Settings"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Log in to your ",(0,r.kt)("a",{parentName:"li",href:"https://auth-play.macrometa.io/"},"Macrometa account"),"."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Data > Collections"),"."),(0,r.kt)("li",{parentName:"ol"},"Click the collection for which you want to view the settings."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Settings")," to view the Settings tab.")))}l.isMDXComponent=!0},41071:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>p,default:()=>g,frontMatter:()=>u,metadata:()=>m,toc:()=>f});var o=n(87462),r=(n(67294),n(3905)),a=n(65488),l=n(85162),c=n(23158),s=n(45),i=n(83295);const u={title:"Document Store Settings",sidebar_position:50},p=void 0,m={unversionedId:"collections/documents/document-store-settings",id:"collections/documents/document-store-settings",title:"Document Store Settings",description:"You can view and update document store collection settings in the Settings tab.",source:"@site/docs/collections/documents/document-store-settings.md",sourceDirName:"collections/documents",slug:"/collections/documents/document-store-settings",permalink:"/docs/collections/documents/document-store-settings",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/collections/documents/document-store-settings.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{title:"Document Store Settings",sidebar_position:50},sidebar:"defaultSidebar",previous:{title:"Document Store Indexes",permalink:"/docs/collections/documents/document-store-indexes"},next:{title:"Document Store Stream",permalink:"/docs/collections/documents/document-store-stream"}},d={},f=[],b={toc:f};function g(e){let{components:t,...u}=e;return(0,r.kt)("wrapper",(0,o.Z)({},b,u,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(a.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"ui",label:"UI",mdxType:"TabItem"},(0,r.kt)("p",null,"You can view and update document store collection settings in the Settings tab."),(0,r.kt)(c.ZP,{mdxType:"ViewCollectionSettings"}),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Document Store Settings")),(0,r.kt)(s.ZP,{collection:"Document store",mdxType:"DocAndGraphSettings"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Document Store Settings Tab",src:n(1937).Z,width:"778",height:"366"}))),(0,r.kt)(l.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,r.kt)("p",null,"Use ",(0,r.kt)("a",{parentName:"p",href:"/docs/cli/collections-cli#gdnsl-collection-describe"},"gdnsl collection describe")," to view information about a collection."),(0,r.kt)("p",null,"Results will be similar to this code block:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "error": false,\n  "code": 200,\n  "waitForSync": true,\n  "name": "docs",\n  "isSystem": false,\n  "isSpot": false,\n  "isLocal": false,\n  "status": 3,\n  "searchEnabled": false,\n  "id": "47024645105",\n  "type": 2,\n  "hasStream": true,\n  "globallyUniqueId": "hC835XXBCXX79/27024685109",\n  "collectionModel": "DOC"\n}\n')),(0,r.kt)("p",null,"Use ",(0,r.kt)("a",{parentName:"p",href:"/docs/cli/collections-cli#gdnsl-collection-update"},"gdnsl collection update")," to change collection settings.")),(0,r.kt)(l.Z,{value:"api",label:"API",mdxType:"TabItem"},(0,r.kt)(i.ZP,{mdxType:"CollectionSettingsApi"}))))}g.isMDXComponent=!0},1937:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/doc-store-settings-ac6b2090569d66170d21570f005a9032.png"}}]);