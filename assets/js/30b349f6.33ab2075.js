"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2241],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>d});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function u(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),s=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),p=s(a),d=r,h=p["".concat(l,".").concat(d)]||p[d]||m[d]||o;return a?n.createElement(h,i(i({ref:t},c),{},{components:a})):n.createElement(h,i({ref:t},c))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=p;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:r,i[1]=u;for(var s=2;s<o;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}p.displayName="MDXCreateElement"},85162:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(67294),r=a(34334);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:a,className:i}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,i),hidden:a},t)}},65488:(e,t,a)=>{a.d(t,{Z:()=>d});var n=a(87462),r=a(67294),o=a(34334),i=a(72389),u=a(67392),l=a(7094),s=a(12466);const c="tabList__CuJ",m="tabItem_LNqP";function p(e){const{lazy:t,block:a,defaultValue:i,values:p,groupId:d,className:h}=e,f=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=p??f.map((e=>{let{props:{value:t,label:a,attributes:n}}=e;return{value:t,label:a,attributes:n}})),y=(0,u.l)(b,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const k=null===i?i:i??f.find((e=>e.props.default))?.props.value??f[0].props.value;if(null!==k&&!b.some((e=>e.value===k)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${k}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:v,setTabGroupChoices:g}=(0,l.U)(),[w,N]=(0,r.useState)(k),T=[],{blockElementScrollPositionUntilNextRender:O}=(0,s.o5)();if(null!=d){const e=v[d];null!=e&&e!==w&&b.some((t=>t.value===e))&&N(e)}const P=e=>{const t=e.currentTarget,a=T.indexOf(t),n=b[a].value;n!==w&&(O(t),N(n),null!=d&&g(d,String(n)))},A=e=>{let t=null;switch(e.key){case"ArrowRight":{const a=T.indexOf(e.currentTarget)+1;t=T[a]??T[0];break}case"ArrowLeft":{const a=T.indexOf(e.currentTarget)-1;t=T[a]??T[T.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",c)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},h)},b.map((e=>{let{value:t,label:a,attributes:i}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>T.push(e),onKeyDown:A,onFocus:P,onClick:P},i,{className:(0,o.Z)("tabs__item",m,i?.className,{"tabs__item--active":w===t})}),a??t)}))),t?(0,r.cloneElement)(f.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function d(e){const t=(0,i.Z)();return r.createElement(p,(0,n.Z)({key:String(t)},e))}},79732:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>u,toc:()=>s});var n=a(87462),r=(a(67294),a(3905));a(65488),a(85162);const o={sidebar_position:60,title:"Authentication"},i=void 0,u={unversionedId:"account-management/auth/index",id:"account-management/auth/index",title:"Authentication",description:"You can access your Macrometa GDN account using several methods. They are described below.",source:"@site/docs/account-management/auth/index.md",sourceDirName:"account-management/auth",slug:"/account-management/auth/",permalink:"/docs/account-management/auth/",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/account-management/auth/index.md",tags:[],version:"current",sidebarPosition:60,frontMatter:{sidebar_position:60,title:"Authentication"},sidebar:"defaultSidebar",previous:{title:"Account Management",permalink:"/docs/account-management/"},next:{title:"API Key Authentication",permalink:"/docs/account-management/auth/api-key-auth"}},l={},s=[{value:"API Keys",id:"api-keys",level:2},{value:"User Authentication",id:"user-authentication",level:2},{value:"Token-Based Authentication",id:"token-based-authentication",level:2}],c={toc:s};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"You can access your Macrometa GDN account using several methods. They are described below."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/account-management/api-keys/"},"API keys")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/account-management/auth/user-auth"},"User authentication")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/account-management/auth/jwts"},"Token-based authentication (JWT)"))),(0,r.kt)("p",null,"The methods are described below. For a more robust code example, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/account-management/auth/connect-to-gdn"},"Auth Example - Connect to GDN"),"."),(0,r.kt)("h2",{id:"api-keys"},"API Keys"),(0,r.kt)("p",null,"API keys are the recommended authentication method for access by apps and APIs."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"You can apply granular permissions to API keys. For more information, refer to ",(0,r.kt)("a",{parentName:"li",href:"/docs/account-management/permissions/"},"Permissions"),"."),(0,r.kt)("li",{parentName:"ul"},"You can manage API keys in multiple ways, including the web console.")),(0,r.kt)("p",null,"For more information about API keys, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/account-management/api-keys/"},"API Keys"),"."),(0,r.kt)("h2",{id:"user-authentication"},"User Authentication"),(0,r.kt)("p",null,"User authentication is the familiar email and password pair. This is the default authentication method for users signing in to Macrometa accounts."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"You can apply granular permissions to user accounts. For more information, refer to ",(0,r.kt)("a",{parentName:"li",href:"/docs/account-management/permissions/"},"Permissions"),"."),(0,r.kt)("li",{parentName:"ul"},"You can manage users in multiple ways, including the web console.")),(0,r.kt)("p",null,"For more information about user authentication, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/account-management/auth/user-auth"},"User Authentication"),"."),(0,r.kt)("h2",{id:"token-based-authentication"},"Token-Based Authentication"),(0,r.kt)("p",null,"You can authenticate with Macrometa GDN via JSON web tokens (JWTs). The JWTs in GDN expire after 12 hours unless renewed."),(0,r.kt)("p",null,"For more information about JWTs, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/account-management/auth/jwts"},"JWTs"),"."))}m.isMDXComponent=!0}}]);