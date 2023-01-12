"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2099],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>b});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),u=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=u(a),b=n,d=m["".concat(l,".").concat(b)]||m[b]||p[b]||o;return a?r.createElement(d,i(i({ref:t},c),{},{components:a})):r.createElement(d,i({ref:t},c))}));function b(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var u=2;u<o;u++)i[u]=a[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},85162:(e,t,a)=>{a.d(t,{Z:()=>i});var r=a(67294),n=a(34334);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:a,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,n.Z)(o,i),hidden:a},t)}},65488:(e,t,a)=>{a.d(t,{Z:()=>b});var r=a(87462),n=a(67294),o=a(34334),i=a(72389),s=a(67392),l=a(7094),u=a(12466);const c="tabList__CuJ",p="tabItem_LNqP";function m(e){const{lazy:t,block:a,defaultValue:i,values:m,groupId:b,className:d}=e,f=n.Children.map(e.children,(e=>{if((0,n.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),y=m??f.map((e=>{let{props:{value:t,label:a,attributes:r}}=e;return{value:t,label:a,attributes:r}})),v=(0,s.l)(y,((e,t)=>e.value===t.value));if(v.length>0)throw new Error(`Docusaurus error: Duplicate values "${v.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const h=null===i?i:i??f.find((e=>e.props.default))?.props.value??f[0].props.value;if(null!==h&&!y.some((e=>e.value===h)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${h}" but none of its children has the corresponding value. Available values are: ${y.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:g,setTabGroupChoices:k}=(0,l.U)(),[w,T]=(0,n.useState)(h),I=[],{blockElementScrollPositionUntilNextRender:O}=(0,u.o5)();if(null!=b){const e=g[b];null!=e&&e!==w&&y.some((t=>t.value===e))&&T(e)}const E=e=>{const t=e.currentTarget,a=I.indexOf(t),r=y[a].value;r!==w&&(O(t),T(r),null!=b&&k(b,String(r)))},P=e=>{let t=null;switch(e.key){case"ArrowRight":{const a=I.indexOf(e.currentTarget)+1;t=I[a]??I[0];break}case"ArrowLeft":{const a=I.indexOf(e.currentTarget)-1;t=I[a]??I[I.length-1];break}}t?.focus()};return n.createElement("div",{className:(0,o.Z)("tabs-container",c)},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},d)},y.map((e=>{let{value:t,label:a,attributes:i}=e;return n.createElement("li",(0,r.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>I.push(e),onKeyDown:P,onFocus:E,onClick:E},i,{className:(0,o.Z)("tabs__item",p,i?.className,{"tabs__item--active":w===t})}),a??t)}))),t?(0,n.cloneElement)(f.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):n.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function b(e){const t=(0,i.Z)();return n.createElement(m,(0,r.Z)({key:String(t)},e))}},46709:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>b,frontMatter:()=>s,metadata:()=>u,toc:()=>p});var r=a(87462),n=(a(67294),a(3905)),o=a(65488),i=a(85162);const s={sidebar_position:15,title:"View API Key Attributes"},l=void 0,u={unversionedId:"account-management/attributes/view-attributes-api",id:"account-management/attributes/view-attributes-api",title:"View API Key Attributes",description:"This page shows you different methods to view attributes assigned to Macrometa GDN API keys. You must have appropriate admin permissions to perform this task.",source:"@site/docs/account-management/attributes/view-attributes-api.md",sourceDirName:"account-management/attributes",slug:"/account-management/attributes/view-attributes-api",permalink:"/docs/account-management/attributes/view-attributes-api",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/account-management/attributes/view-attributes-api.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15,title:"View API Key Attributes"},sidebar:"defaultSidebar",previous:{title:"View User Attributes",permalink:"/docs/account-management/attributes/view-attributes-user"},next:{title:"Add Attributes to Users",permalink:"/docs/account-management/attributes/add-attributes-user"}},c={},p=[],m={toc:p};function b(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This page shows you different methods to view attributes assigned to Macrometa GDN API keys. You must have appropriate admin permissions to perform this task."),(0,n.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,n.kt)(i.Z,{value:"console",label:"Web Console",mdxType:"TabItem"},(0,n.kt)("p",null,"Follow these instructions to view API key attributes using the GDN console web UI."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://auth-play.macrometa.io/"},"Log in to your Macrometa account"),"."),(0,n.kt)("li",{parentName:"ol"},"Click ",(0,n.kt)("strong",{parentName:"li"},"*Access > API Keys"),"."),(0,n.kt)("li",{parentName:"ol"},"Click the ID of the API key for which you want to view attributes."))),(0,n.kt)(i.Z,{value:"api",label:"REST API",mdxType:"TabItem"},(0,n.kt)("p",null,"Use our interactive API Reference with code generation in 18 programming languages to ",(0,n.kt)("a",{parentName:"p",href:"https://macrometa.com/docs/api#/operations/GetTheAttributesForApiKey"},"Get API Key Attributes"),".")),(0,n.kt)(i.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,n.kt)("p",null,"Use the ",(0,n.kt)("a",{parentName:"p",href:"/docs/cli/api-key-cli#gdnsl-apikey-set"},"gdnsl apikey get")," CLI command to get user attributes.")),(0,n.kt)(i.Z,{value:"c8ql",label:"C8QL",mdxType:"TabItem"},(0,n.kt)("p",null,"Use the ",(0,n.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/functions/database#current_apikey_attribute"},"CURRENT_APIKEY_ATTRIBUTE")," to return user attributes with a C8QL query."))))}b.isMDXComponent=!0}}]);