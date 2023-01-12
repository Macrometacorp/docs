"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[25774],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||l;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var u=2;u<l;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},74177:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const l={title:"Type and Value Order"},o=void 0,i={unversionedId:"queryworkers/c8ql/type-and-value-order",id:"queryworkers/c8ql/type-and-value-order",title:"Type and Value Order",description:"When checking for equality or inequality or when determining the sort order of values, C8QL uses a deterministic algorithm that takes both the data types and the actual values into account.",source:"@site/docs/queryworkers/c8ql/type-and-value-order.md",sourceDirName:"queryworkers/c8ql",slug:"/queryworkers/c8ql/type-and-value-order",permalink:"/docs/queryworkers/c8ql/type-and-value-order",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/c8ql/type-and-value-order.md",tags:[],version:"current",frontMatter:{title:"Type and Value Order"},sidebar:"defaultSidebar",previous:{title:"Queries and Null Attributes",permalink:"/docs/queryworkers/c8ql/queries-null-attributes"},next:{title:"Streams",permalink:"/docs/streams/"}},s={},u=[],p={toc:u};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"When checking for equality or inequality or when determining the sort order of values, C8QL uses a deterministic algorithm that takes both the data types and the actual values into account."),(0,r.kt)("p",null,"The compared operands are first compared by their data types, and only by their data values if the operands have the same data types."),(0,r.kt)("p",null,"The following type order is used when comparing data types:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"    null < bool < number < string < array/list < object/document\n")),(0,r.kt)("p",null,"This means ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," is the smallest type in C8QL and ",(0,r.kt)("inlineCode",{parentName:"p"},"document")," is the type with the highest order. If the compared operands have a different type, then the comparison result is determined and the comparison is finished."),(0,r.kt)("p",null,"For example, the boolean ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," value will always be less than any numeric or string value, any array (even an empty array) or any object / document. Additionally, any string value (even an empty string) will always be greater than any numeric value, a boolean value, ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"    null < false\n    null < true\n    null < 0\n    null < ''\n    null < ' '\n    null < '0'\n    null < 'abc'\n    null < [ ]\n    null < { }\n\n    false < true\n    false < 0\n    false < ''\n    false < ' '\n    false < '0'\n    false < 'abc'\n    false < [ ]\n    false < { }\n\n    true < 0\n    true < ''\n    true < ' '\n    true < '0'\n    true < 'abc'\n    true < [ ]\n    true < { }\n\n    0 < ''\n    0 < ' '\n    0 < '0'\n    0 < 'abc'\n    0 < [ ]\n    0 < { }\n\n    '' < ' '\n    '' < '0'\n    '' < 'abc'\n    '' < [ ]\n    '' < { }\n\n    [ ] < { }\n")),(0,r.kt)("p",null,"If the two compared operands have the same data types, then the operands values are compared. For the primitive types (null, boolean, number, and string), the result is defined as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"null"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"null")," is equal to ",(0,r.kt)("inlineCode",{parentName:"li"},"null")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"boolean"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"false")," is less than ",(0,r.kt)("inlineCode",{parentName:"li"},"true")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"number"),": numeric values are ordered by their cardinal value"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"string"),": string values are ordered using a localized comparison")),(0,r.kt)("p",null,"@(Info)(Note)(Unlike in SQL, ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," can be compared to any value, including ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),"  itself, without the result being converted into ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," automatically.)"),(0,r.kt)("p",null,"For compound, types the following special rules are applied:"),(0,r.kt)("p",null,"Two array values are compared by comparing their individual elements position by position, starting at the first element. For each position, the element types are compared first."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If the types are not equal, the comparison result is determined, and the comparison is finished."),(0,r.kt)("li",{parentName:"ul"},"If the types are equal, then the values of the two elements are compared.  If one of the arrays is finished and the other array still has an element at a compared position, then ",(0,r.kt)("em",{parentName:"li"},"null")," will be used as the element value of the fully traversed array.")),(0,r.kt)("p",null,"If an array element is itself a compound value (an array or an object / document), then the comparison algorithm will check the element's sub values recursively. The element's sub-elements are compared recursively."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"    [ ] < [ 0 ]\n    [ 1 ] < [ 2 ]\n    [ 1, 2 ] < [ 2 ]\n    [ 99, 99 ] < [ 100 ]\n    [ false ] < [ true ]\n    [ false, 1 ] < [ false, '' ]\n")),(0,r.kt)("p",null,"Two object / documents operands are compared by checking attribute names and value. The attribute names are compared first. Before attribute names are compared, a combined array of all attribute names from both operands is created and sorted lexicographically.  This means that the order in which attributes are declared in an object / document is not relevant when comparing two objects / documents."),(0,r.kt)("p",null,"The combined and sorted array of attribute names is then traversed, and the respective attributes from the two compared operands are then looked up. If one of the objects / documents does not have an attribute with the sought name, its attribute value is considered to be ",(0,r.kt)("em",{parentName:"p"},"null"),".  "),(0,r.kt)("p",null,"Finally, the attribute value of both objects / documents is compared using the before mentioned data type and value comparison. The comparisons are performed for all object / document attributes until there is an unambiguous comparison result. If an unambiguous comparison result is found, the comparison is finished. If there is no unambiguous comparison result, the two compared objects / documents are considered equal."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'    { } < { "a" : 1 }\n    { } < { "a" : null }\n    { "a" : 1 } < { "a" : 2 }\n    { "b" : 1 } < { "a" : 0 }\n    { "a" : { "c" : true } } < { "a" : { "c" : 0 } }\n    { "a" : { "c" : true, "a" : 0 } } < { "a" : { "c" : false, "a" : 1 } }\n    { "a" : 1, "b" : 2 } == { "b" : 2, "a" : 1 }\n')))}c.isMDXComponent=!0}}]);