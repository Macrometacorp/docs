"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5512],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,f=p["".concat(s,".").concat(m)]||p[m]||u[m]||a;return n?o.createElement(f,i(i({ref:t},d),{},{components:n})):o.createElement(f,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},85162:(e,t,n)=>{n.d(t,{Z:()=>i});var o=n(67294),r=n(34334);const a="tabItem_Ymn6";function i(e){let{children:t,hidden:n,className:i}=e;return o.createElement("div",{role:"tabpanel",className:(0,r.Z)(a,i),hidden:n},t)}},65488:(e,t,n)=>{n.d(t,{Z:()=>m});var o=n(87462),r=n(67294),a=n(34334),i=n(72389),l=n(67392),s=n(7094),c=n(12466);const d="tabList__CuJ",u="tabItem_LNqP";function p(e){const{lazy:t,block:n,defaultValue:i,values:p,groupId:m,className:f}=e,b=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=p??b.map((e=>{let{props:{value:t,label:n,attributes:o}}=e;return{value:t,label:n,attributes:o}})),h=(0,l.l)(g,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const v=null===i?i:i??b.find((e=>e.props.default))?.props.value??b[0].props.value;if(null!==v&&!g.some((e=>e.value===v)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${v}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:k}=(0,s.U)(),[w,N]=(0,r.useState)(v),O=[],{blockElementScrollPositionUntilNextRender:T}=(0,c.o5)();if(null!=m){const e=y[m];null!=e&&e!==w&&g.some((t=>t.value===e))&&N(e)}const C=e=>{const t=e.currentTarget,n=O.indexOf(t),o=g[n].value;o!==w&&(T(t),N(o),null!=m&&k(m,String(o)))},E=e=>{let t=null;switch(e.key){case"ArrowRight":{const n=O.indexOf(e.currentTarget)+1;t=O[n]??O[0];break}case"ArrowLeft":{const n=O.indexOf(e.currentTarget)-1;t=O[n]??O[O.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,a.Z)("tabs-container",d)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},f)},g.map((e=>{let{value:t,label:n,attributes:i}=e;return r.createElement("li",(0,o.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>O.push(e),onKeyDown:E,onFocus:C,onClick:C},i,{className:(0,a.Z)("tabs__item",u,i?.className,{"tabs__item--active":w===t})}),n??t)}))),t?(0,r.cloneElement)(b.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function m(e){const t=(0,i.Z)();return r.createElement(p,(0,o.Z)({key:String(t)},e))}},83295:(e,t,n)=>{n.d(t,{ZP:()=>i});var o=n(87462),r=(n(67294),n(3905));const a={toc:[]};function i(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"For information about API calls, refer to ",(0,r.kt)("a",{parentName:"p",href:"https://macrometa.com/docs/api#/operations/handleCommandGet:collectionGetProperties"},"Get information about collection")," and ",(0,r.kt)("a",{parentName:"p",href:"https://macrometa.com/docs/api#/operations/handleCommandPut:modifyProperties"},"Update collection properties"),"."))}i.isMDXComponent=!0},23158:(e,t,n)=>{n.d(t,{ZP:()=>i});var o=n(87462),r=(n(67294),n(3905));const a={toc:[{value:"View Collection Settings",id:"view-collection-settings",level:2}]};function i(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"view-collection-settings"},"View Collection Settings"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Log in to your ",(0,r.kt)("a",{parentName:"li",href:"https://auth-play.macrometa.io/"},"Macrometa account"),"."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Data > Collections"),"."),(0,r.kt)("li",{parentName:"ol"},"Click the collection for which you want to view the settings."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Settings")," to view the Settings tab.")))}i.isMDXComponent=!0},25583:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var o=n(87462),r=(n(67294),n(3905)),a=(n(65488),n(85162),n(23158));n(83295);const i={title:"Redis Mode Settings",sidebar_position:50},l=void 0,s={unversionedId:"collections/redis-mode/redis-mode-settings",id:"collections/redis-mode/redis-mode-settings",title:"Redis Mode Settings",description:"You can view and update Redis mode collection settings in the Settings tab.",source:"@site/docs/collections/redis-mode/redis-mode-settings.md",sourceDirName:"collections/redis-mode",slug:"/collections/redis-mode/redis-mode-settings",permalink:"/docs/collections/redis-mode/redis-mode-settings",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/collections/redis-mode/redis-mode-settings.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{title:"Redis Mode Settings",sidebar_position:50},sidebar:"defaultSidebar",previous:{title:"Redis Mode Indexes",permalink:"/docs/collections/redis-mode/redis-mode-indexes"},next:{title:"Create a Dynamo Table",permalink:"/docs/collections/dynamo/create-dynamo-table"}},c={},d=[{value:"Redis Mode Settings",id:"redis-mode-settings",level:2}],u={toc:d};function p(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,o.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"You can view and update Redis mode collection settings in the Settings tab."),(0,r.kt)(a.ZP,{mdxType:"ViewCollectionSettings"}),(0,r.kt)("h2",{id:"redis-mode-settings"},"Redis Mode Settings"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"ID -")," System-generated ID of the selected collection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Type -")," The data model type of the selected collection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Status -")," Current status of the selected collection.")),(0,r.kt)("p",null,"You can also ",(0,r.kt)("a",{parentName:"p",href:"/docs/collections/delete-collection"},"Delete")," or ",(0,r.kt)("a",{parentName:"p",href:"/docs/collections/truncate-collection"},"Truncate")," the collection."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Redis Mode Settings Tab",src:n(94463).Z,width:"2000",height:"628"})))}p.isMDXComponent=!0},94463:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/redis-mode-settings-259b622bbb56617d529d0c7f0dd4ab7f.png"}}]);