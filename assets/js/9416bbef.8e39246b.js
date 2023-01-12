"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[90462],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>m});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),d=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=d(e.components);return r.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=d(t),m=o,y=p["".concat(c,".").concat(m)]||p[m]||u[m]||a;return t?r.createElement(y,i(i({ref:n},l),{},{components:t})):r.createElement(y,i({ref:n},l))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=p;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var d=2;d<a;d++)i[d]=t[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},8848:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var r=t(87462),o=(t(67294),t(3905));const a={sidebar_position:4,title:"Diffing Two Documents"},i=void 0,s={unversionedId:"queryworkers/c8ql/examples/diffing-documents",id:"queryworkers/c8ql/examples/diffing-documents",title:"Diffing Two Documents",description:"There is no built-in C8QL function to compare the attributes of two documents, but it is easily possible to build a query that does:",source:"@site/docs/queryworkers/c8ql/examples/diffing-documents.md",sourceDirName:"queryworkers/c8ql/examples",slug:"/queryworkers/c8ql/examples/diffing-documents",permalink:"/docs/queryworkers/c8ql/examples/diffing-documents",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/c8ql/examples/diffing-documents.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Diffing Two Documents"},sidebar:"defaultSidebar",previous:{title:"Data Modification Queries",permalink:"/docs/queryworkers/c8ql/examples/data-modification-queries"},next:{title:"Dynamic Attribute Names",permalink:"/docs/queryworkers/c8ql/examples/dynamic-attribute-names"}},c={},d=[],l={toc:d};function u(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"There is no built-in C8QL function to compare the attributes of two documents, but it is easily possible to build a query that does:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// input document 1\nLET doc1 = {\n  "foo": "bar",\n  "a": 1,\n  "b": 2\n}\n\n// input document 2\nLET doc2 = {\n  "foo": "baz",\n  "a": 2,\n  "c": 3\n}\n\n// collect attributes present in doc1, but missing in doc2\nLET missing = (\n  FOR key IN ATTRIBUTES(doc1)\n  FILTER ! HAS(doc2, key)\n  RETURN {\n    [ key ]: doc1[key]\n  }\n)\n\n// collect attributes present in both docs, but that have different values\nLET changed = (\n  FOR key IN ATTRIBUTES(doc1)\n    FILTER HAS(doc2, key) && doc1[key] != doc2[key]\n    RETURN {\n      [ key ] : {\n        old: doc1[key],\n        new: doc2[key]\n      }\n    }\n)\n\n// collect attributes present in doc2, but missing in doc1\nLET added = (\n  FOR key IN ATTRIBUTES(doc2)\n    FILTER ! HAS(doc1, key)\n    RETURN {\n      [ key ]: doc2[key]\n    }\n)\n\n// return final result\nRETURN {\n  "missing": missing,\n  "changed": changed,\n  "added": added\n}\n')),(0,o.kt)("p",null,"The query may look a bit lengthy, but much of that is due to formatting. A more terse version can be found below."),(0,o.kt)("p",null,"The above query will return a document with three attributes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"missing"),":\nContains all attributes only present in first document\n(i.e. missing in second document)")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"changed"),":\nContains all attributes present in both documents that have different values")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"added"),":\nContains all attributes only present in second document\n(i.e. missing in first document)"))),(0,o.kt)("p",null,"For the two example documents it will return:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'[\n {\n   "missing" : [\n     {\n       "b" : 2\n     }\n   ],\n   "changed" : [\n     {\n       "foo" : {\n         "old" : "bar",\n         "new" : "baz"\n       }\n      },\n     {\n       "a" : {\n         "old" : 1,\n         "new" : 2\n       }\n     }\n   ],\n   "added" : [\n     {\n       "c" : 3\n     }\n   ]\n }\n]\n')),(0,o.kt)("p",null,"You may adjust the query to produce a different output format."),(0,o.kt)("p",null,"Following is a version of the same query that can be invoked from JavaScript easily. It passes the two documents as bind parameters and calls ",(0,o.kt)("inlineCode",{parentName:"p"},"db._query"),"."),(0,o.kt)("p",null,"The query is now an one-liner (less readable but easier to copy & paste):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'bindVariables = {\n  doc1 : { "foo" : "bar", "a" : 1, "b" : 2 },\n  doc2 : { "foo" : "baz", "a" : 2, "c" : 3 }\n};\n\nquery = "LET doc1 = @doc1, doc2 = @doc2, missing = (FOR key IN ATTRIBUTES(doc1) FILTER ! HAS(doc2, key) RETURN { [ key ]: doc1[key] }), changed = (FOR key IN ATTRIBUTES(doc1) FILTER HAS(doc2, key) && doc1[key] != doc2[key] RETURN { [ key ] : { old: doc1[key], new: doc2[key] } }), added = (FOR key IN ATTRIBUTES(doc2) FILTER ! HAS(doc1, key) RETURN { [ key ] : doc2[key] }) RETURN { missing : missing, changed : changed, added : added }";\n\nresult = db._query(query, bindVariables).toArray();\n')))}u.isMDXComponent=!0}}]);