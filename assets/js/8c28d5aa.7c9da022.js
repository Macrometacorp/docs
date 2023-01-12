"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[12782],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>c});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function u(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),p=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,m=u(e,["components","mdxType","originalType","parentName"]),s=p(a),c=n,b=s["".concat(o,".").concat(c)]||s[c]||d[c]||l;return a?r.createElement(b,i(i({ref:t},m),{},{components:a})):r.createElement(b,i({ref:t},m))}));function c(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,i=new Array(l);i[0]=s;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u.mdxType="string"==typeof e?e:n,i[1]=u;for(var p=2;p<l;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}s.displayName="MDXCreateElement"},22544:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var r=a(87462),n=(a(67294),a(3905));const l={title:"updatePerceptronClassifier (Stream Processor)"},i=void 0,u={unversionedId:"cep/query-guide/functions/streaming-ml/updateperceptronclassifier",id:"cep/query-guide/functions/streaming-ml/updateperceptronclassifier",title:"updatePerceptronClassifier (Stream Processor)",description:"This extension builds/updates a linear binary classification Perceptron model.",source:"@site/docs/cep/query-guide/functions/streaming-ml/updateperceptronclassifier.md",sourceDirName:"cep/query-guide/functions/streaming-ml",slug:"/cep/query-guide/functions/streaming-ml/updateperceptronclassifier",permalink:"/docs/cep/query-guide/functions/streaming-ml/updateperceptronclassifier",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/streaming-ml/updateperceptronclassifier.md",tags:[],version:"current",frontMatter:{title:"updatePerceptronClassifier (Stream Processor)"},sidebar:"defaultSidebar",previous:{title:"updateBayesianRegression (Stream Processor)",permalink:"/docs/cep/query-guide/functions/streaming-ml/updatebayesianregression"},next:{title:"currentDate (Function)",permalink:"/docs/cep/query-guide/functions/time/currentDate"}},o={},p=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Extra Return Attributes",id:"extra-return-attributes",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],m={toc:p};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This extension builds/updates a linear binary classification Perceptron model."),(0,n.kt)("h2",{id:"syntax"},"Syntax"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"streamingml:updatePerceptronClassifier(<STRING> model.name, <BOOL|STRING> model.label, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)\nstreamingml:updatePerceptronClassifier(<STRING> model.name, <BOOL|STRING> model.label, <DOUBLE> learning.rate, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)\n")),(0,n.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Name"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"),(0,n.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,n.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,n.kt)("th",{parentName:"tr",align:null},"Optional"),(0,n.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"model.name"),(0,n.kt)("td",{parentName:"tr",align:null},"The name of the model to be built/updated."),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"STRING"),(0,n.kt)("td",{parentName:"tr",align:null},"No"),(0,n.kt)("td",{parentName:"tr",align:null},"No")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"model.label"),(0,n.kt)("td",{parentName:"tr",align:null},"The attribute of the label or the class of the dataset."),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"BOOL STRING"),(0,n.kt)("td",{parentName:"tr",align:null},"No"),(0,n.kt)("td",{parentName:"tr",align:null},"Yes")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"learning.rate"),(0,n.kt)("td",{parentName:"tr",align:null},"The learning rate of the Perceptron algorithm."),(0,n.kt)("td",{parentName:"tr",align:null},"0.1"),(0,n.kt)("td",{parentName:"tr",align:null},"DOUBLE"),(0,n.kt)("td",{parentName:"tr",align:null},"Yes"),(0,n.kt)("td",{parentName:"tr",align:null},"No")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"model.feature"),(0,n.kt)("td",{parentName:"tr",align:null},"Features of the model that need to be attributes of the stream."),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"DOUBLE FLOAT INT LONG"),(0,n.kt)("td",{parentName:"tr",align:null},"No"),(0,n.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,n.kt)("h2",{id:"extra-return-attributes"},"Extra Return Attributes"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Name"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"),(0,n.kt)("th",{parentName:"tr",align:null},"Possible Types"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"featureWeight"),(0,n.kt)("td",{parentName:"tr",align:null},"Weight of the ",(0,n.kt)("inlineCode",{parentName:"td"},"feature.name")," of the model."),(0,n.kt)("td",{parentName:"tr",align:null},"DOUBLE")))),(0,n.kt)("h2",{id:"example-1"},"Example 1"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double, attribute_4 string );\n\ninsert all events into outputStream\nfrom StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, 0.01, attribute_0, attribute_1, attribute_2, attribute_3);\n")),(0,n.kt)("p",null,"This query builds/updates a Perceptron model named ",(0,n.kt)("inlineCode",{parentName:"p"},"model1")," with a\n",(0,n.kt)("inlineCode",{parentName:"p"},"0.01")," learning rate using ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_0"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_1"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_2"),",\nand ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_3")," as features, and ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_4")," as the label. Updated\nweights of the model are emitted to the OutputStream stream."),(0,n.kt)("h2",{id:"example-2"},"Example 2"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double,attribute_3 double, attribute_4 string );\n\ninsert all events into outputStream\nfrom StreamA#streamingml:updatePerceptronClassifier('model1', attribute_4, attribute_0, attribute_1, attribute_2, attribute_3);\n")),(0,n.kt)("p",null,"This query builds/updates a Perceptron model named ",(0,n.kt)("inlineCode",{parentName:"p"},"model1")," with a\ndefault ",(0,n.kt)("inlineCode",{parentName:"p"},"0.1")," learning rate using ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_0"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_1"),",\n",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_2"),", and ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_3")," as features, and ",(0,n.kt)("inlineCode",{parentName:"p"},"attribute_4")," as the\nlabel. The updated weights of the model are appended to the outputStream."))}d.isMDXComponent=!0}}]);