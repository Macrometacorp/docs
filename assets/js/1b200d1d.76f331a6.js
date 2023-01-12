"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[99200],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),d=a,f=p["".concat(l,".").concat(d)]||p[d]||m[d]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},2884:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const o={sidebar_position:1,title:"Attributes"},i=void 0,s={unversionedId:"account-management/attributes/index",id:"account-management/attributes/index",title:"Attributes",description:"Administrators can assign attributes to users and API keys which limit document access. You can use attributes to assign read or write permissions at the document level or collection level. For more information about permissions, refer to Permissions.",source:"@site/docs/account-management/attributes/index.md",sourceDirName:"account-management/attributes",slug:"/account-management/attributes/",permalink:"/docs/account-management/attributes/",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/account-management/attributes/index.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Attributes"},sidebar:"defaultSidebar",previous:{title:"Clear Access Levels",permalink:"/docs/account-management/permissions/clear-access-levels"},next:{title:"View User Attributes",permalink:"/docs/account-management/attributes/view-attributes-user"}},l={},c=[],u={toc:c};function m(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Administrators can assign attributes to users and API keys which limit document access. You can use attributes to assign read or write permissions at the document level or collection level. For more information about permissions, refer to ",(0,a.kt)("a",{parentName:"p",href:"/docs/account-management/permissions/"},"Permissions"),"."),(0,a.kt)("p",null,"In this example, imagine a fulfillment company with documents and collections that must be accessed by partners and employees. The partners request items for the fulfillment company to provide, and the company employees fulfill the orders of the partners' items."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Fulfillment company example",src:n(74451).Z,width:"715",height:"339"})),(0,a.kt)("p",null,"The fulfillment company has three collections in Macrometa:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Items -")," The requested goods that the fulfillment company must supply."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Orders -")," The orders that the fulfillment company must fill."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Employees -")," List of user accounts for employees of the fulfillment company.")),(0,a.kt)("p",null,"The company wants to provide restricted queries that partners and employees can use:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Partners can only see their own items, but cannot update them."),(0,a.kt)("li",{parentName:"ul"},"Partners can only see their own orders, and can also update the order when fulfilled."),(0,a.kt)("li",{parentName:"ul"},"Partners cannot see employees."),(0,a.kt)("li",{parentName:"ul"},"Employees can see all items and orders, but cannot update them.")),(0,a.kt)("p",null,"To enforce these restrictions, the fulfillment company can add ",(0,a.kt)("em",{parentName:"p"},"attributes")," to API keys and user accounts. In this example, each partner is given a unique API key which they use to access their order information. On the other hand, employees have user accounts with their company login credentials."),(0,a.kt)("p",null,"When you assign an attribute, you can also assign a value to further restrict permissions. For example, an ",(0,a.kt)("inlineCode",{parentName:"p"},"employee")," attribute can have a ",(0,a.kt)("inlineCode",{parentName:"p"},"staff")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"admin")," value to signify levels of permission."))}m.isMDXComponent=!0},74451:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/attribute-example-09ba150ada7d8e0655dd45d46743e074.png"}}]);