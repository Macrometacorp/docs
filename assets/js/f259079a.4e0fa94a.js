"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[71344],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),u=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=u(r),d=n,b=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return r?a.createElement(b,i(i({ref:t},c),{},{components:r})):a.createElement(b,i({ref:t},c))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var u=2;u<o;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},85162:(e,t,r)=>{r.d(t,{Z:()=>i});var a=r(67294),n=r(34334);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:r,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,n.Z)(o,i),hidden:r},t)}},65488:(e,t,r)=>{r.d(t,{Z:()=>d});var a=r(87462),n=r(67294),o=r(34334),i=r(72389),s=r(67392),l=r(7094),u=r(12466);const c="tabList__CuJ",p="tabItem_LNqP";function m(e){const{lazy:t,block:r,defaultValue:i,values:m,groupId:d,className:b}=e,f=n.Children.map(e.children,(e=>{if((0,n.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),h=m??f.map((e=>{let{props:{value:t,label:r,attributes:a}}=e;return{value:t,label:r,attributes:a}})),v=(0,s.l)(h,((e,t)=>e.value===t.value));if(v.length>0)throw new Error(`Docusaurus error: Duplicate values "${v.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const y=null===i?i:i??f.find((e=>e.props.default))?.props.value??f[0].props.value;if(null!==y&&!h.some((e=>e.value===y)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${y}" but none of its children has the corresponding value. Available values are: ${h.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:g,setTabGroupChoices:k}=(0,l.U)(),[w,N]=(0,n.useState)(y),O=[],{blockElementScrollPositionUntilNextRender:T}=(0,u.o5)();if(null!=d){const e=g[d];null!=e&&e!==w&&h.some((t=>t.value===e))&&N(e)}const E=e=>{const t=e.currentTarget,r=O.indexOf(t),a=h[r].value;a!==w&&(T(t),N(a),null!=d&&k(d,String(a)))},A=e=>{let t=null;switch(e.key){case"ArrowRight":{const r=O.indexOf(e.currentTarget)+1;t=O[r]??O[0];break}case"ArrowLeft":{const r=O.indexOf(e.currentTarget)-1;t=O[r]??O[O.length-1];break}}t?.focus()};return n.createElement("div",{className:(0,o.Z)("tabs-container",c)},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":r},b)},h.map((e=>{let{value:t,label:r,attributes:i}=e;return n.createElement("li",(0,a.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>O.push(e),onKeyDown:A,onFocus:E,onClick:E},i,{className:(0,o.Z)("tabs__item",p,i?.className,{"tabs__item--active":w===t})}),r??t)}))),t?(0,n.cloneElement)(f.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):n.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function d(e){const t=(0,i.Z)();return n.createElement(m,(0,a.Z)({key:String(t)},e))}},8521:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>u,toc:()=>p});var a=r(87462),n=(r(67294),r(3905)),o=r(65488),i=r(85162);const s={sidebar_position:20,title:"Add Attributes to Users"},l=void 0,u={unversionedId:"account-management/attributes/add-attributes-user",id:"account-management/attributes/add-attributes-user",title:"Add Attributes to Users",description:"This page shows you different methods to add attributes to users on your Macrometa GDN account. You must have appropriate admin permissions to perform this task.",source:"@site/docs/account-management/attributes/add-attributes-user.md",sourceDirName:"account-management/attributes",slug:"/account-management/attributes/add-attributes-user",permalink:"/docs/account-management/attributes/add-attributes-user",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/account-management/attributes/add-attributes-user.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_position:20,title:"Add Attributes to Users"},sidebar:"defaultSidebar",previous:{title:"View API Key Attributes",permalink:"/docs/account-management/attributes/view-attributes-api"},next:{title:"Add Attributes to API Keys",permalink:"/docs/account-management/attributes/add-attributes-api"}},c={},p=[],m={toc:p};function d(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This page shows you different methods to add attributes to users on your Macrometa GDN account. You must have appropriate admin permissions to perform this task."),(0,n.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,n.kt)(i.Z,{value:"console",label:"Web Console",mdxType:"TabItem"},(0,n.kt)("p",null,"Follow these instructions to add attributes to users using the GDN console web UI."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://auth-play.macrometa.io/"},"Log in to your Macrometa account"),"."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"Access > Users"),"."),(0,n.kt)("li",{parentName:"ol"},"Click the stacked dots next to the user for which you want to limit permissions."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"Edit User"),"."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"Attributes")," and provide the following details:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Attribute -")," First level of permission. For example, ",(0,n.kt)("inlineCode",{parentName:"li"},"employee"),"."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Value -")," Second level of permission. For example, ",(0,n.kt)("inlineCode",{parentName:"li"},"staff")," or ",(0,n.kt)("inlineCode",{parentName:"li"},"admin"),"."))),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"Add Attribute")," if you want to add more attributes."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"Update"),"."))),(0,n.kt)(i.Z,{value:"api",label:"REST API",mdxType:"TabItem"},(0,n.kt)("p",null,"Use our interactive API Reference with code generation in 18 programming languages to ",(0,n.kt)("a",{parentName:"p",href:"https://macrometa.com/docs/api#/operations/CreateTheAttributesForUser"},"Update User Attributes"),"."))))}d.isMDXComponent=!0}}]);