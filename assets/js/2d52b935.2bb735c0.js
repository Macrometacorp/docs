"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[45321],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>b});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=r.createContext({}),s=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=s(a),b=n,d=m["".concat(c,".").concat(b)]||m[b]||p[b]||o;return a?r.createElement(d,i(i({ref:t},u),{},{components:a})):r.createElement(d,i({ref:t},u))}));function b(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},85162:(e,t,a)=>{a.d(t,{Z:()=>i});var r=a(67294),n=a(34334);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:a,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,n.Z)(o,i),hidden:a},t)}},65488:(e,t,a)=>{a.d(t,{Z:()=>b});var r=a(87462),n=a(67294),o=a(34334),i=a(72389),l=a(67392),c=a(7094),s=a(12466);const u="tabList__CuJ",p="tabItem_LNqP";function m(e){const{lazy:t,block:a,defaultValue:i,values:m,groupId:b,className:d}=e,f=n.Children.map(e.children,(e=>{if((0,n.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=m??f.map((e=>{let{props:{value:t,label:a,attributes:r}}=e;return{value:t,label:a,attributes:r}})),h=(0,l.l)(g,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const y=null===i?i:i??f.find((e=>e.props.default))?.props.value??f[0].props.value;if(null!==y&&!g.some((e=>e.value===y)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${y}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:v,setTabGroupChoices:k}=(0,c.U)(),[w,N]=(0,n.useState)(y),T=[],{blockElementScrollPositionUntilNextRender:O}=(0,s.o5)();if(null!=b){const e=v[b];null!=e&&e!==w&&g.some((t=>t.value===e))&&N(e)}const C=e=>{const t=e.currentTarget,a=T.indexOf(t),r=g[a].value;r!==w&&(O(t),N(r),null!=b&&k(b,String(r)))},E=e=>{let t=null;switch(e.key){case"ArrowRight":{const a=T.indexOf(e.currentTarget)+1;t=T[a]??T[0];break}case"ArrowLeft":{const a=T.indexOf(e.currentTarget)-1;t=T[a]??T[T.length-1];break}}t?.focus()};return n.createElement("div",{className:(0,o.Z)("tabs-container",u)},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},d)},g.map((e=>{let{value:t,label:a,attributes:i}=e;return n.createElement("li",(0,r.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>T.push(e),onKeyDown:E,onFocus:C,onClick:C},i,{className:(0,o.Z)("tabs__item",p,i?.className,{"tabs__item--active":w===t})}),a??t)}))),t?(0,n.cloneElement)(f.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):n.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function b(e){const t=(0,i.Z)();return n.createElement(m,(0,r.Z)({key:String(t)},e))}},81106:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>b,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=a(87462),n=(a(67294),a(3905)),o=a(65488),i=a(85162);const l={sidebar_position:10,title:"Create a GeoFabric"},c=void 0,s={unversionedId:"geofabrics/create-geofabric",id:"geofabrics/create-geofabric",title:"Create a GeoFabric",description:"This page lists several methods for creating GeoFabrics. Whether or not you can create GeoFabrics depends on your assigned Permissions.",source:"@site/docs/geofabrics/create-geofabric.md",sourceDirName:"geofabrics",slug:"/geofabrics/create-geofabric",permalink:"/docs/geofabrics/create-geofabric",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/geofabrics/create-geofabric.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"Create a GeoFabric"},sidebar:"defaultSidebar",previous:{title:"GeoFabrics",permalink:"/docs/geofabrics/"},next:{title:"Update GeoFabrics",permalink:"/docs/geofabrics/update-geofabric"}},u={},p=[],m={toc:p};function b(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This page lists several methods for creating GeoFabrics. Whether or not you can create GeoFabrics depends on your assigned ",(0,n.kt)("a",{parentName:"p",href:"/docs/account-management/permissions/"},"Permissions"),"."),(0,n.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,n.kt)(i.Z,{value:"console",label:"Web Console",mdxType:"TabItem"},(0,n.kt)("p",null,"To create a GeoFabric in the Macrometa web console:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://auth.paas.macrometa.io/"},"Log in to your Macrometa account")," in the ",(0,n.kt)("inlineCode",{parentName:"li"},"_system")," GeoFabric."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"Network > Fabrics")," to navigate to the GeoFabrics management page. If you do not see the ",(0,n.kt)("strong",{parentName:"li"},"Fabrics")," link, then you might not be logged in to the ",(0,n.kt)("inlineCode",{parentName:"li"},"_system")," GeoFabric."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"New Geo Fabric"),"."),(0,n.kt)("li",{parentName:"ol"},"Enter a GeoFabric ",(0,n.kt)("strong",{parentName:"li"},"Name"),"."),(0,n.kt)("li",{parentName:"ol"},"Select at least two Edge Locations across which you want the GeoFabric distributed."),(0,n.kt)("li",{parentName:"ol"},"Select the ",(0,n.kt)("strong",{parentName:"li"},"Username")," of the account for which you want to own the GeoFabric. Default is ",(0,n.kt)("inlineCode",{parentName:"li"},"root"),"."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"Create"),".")),(0,n.kt)("p",null,"After creating the GeoFabric, click the GeoFabric name on the list to view its unique global or regional URLs. The owning user can also select their GeoFabric and log in normally.")),(0,n.kt)(i.Z,{value:"api",label:"REST API",mdxType:"TabItem"},(0,n.kt)("p",null,"Use our interactive API Reference with code generation in 18 programming languages to ",(0,n.kt)("a",{parentName:"p",href:"https://macrometa.com/docs/api#/operations/CreateGeo-fabric"},"Create GeoFabrics"),".")),(0,n.kt)(i.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,n.kt)("p",null,"Use the ",(0,n.kt)("a",{parentName:"p",href:"/docs/cli/fabrics-cli#gdnsl-fabric-create"},"gdnsl fabric create")," CLI command to create GeoFabrics."))))}b.isMDXComponent=!0}}]);