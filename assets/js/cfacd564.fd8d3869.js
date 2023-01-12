"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1223],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>c});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=s(n),c=a,b=d["".concat(u,".").concat(c)]||d[c]||p[c]||i;return n?r.createElement(b,l(l({ref:t},m),{},{components:n})):r.createElement(b,l({ref:t},m))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},82488:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const i={title:"bayesianRegression (Stream Processor)"},l=void 0,o={unversionedId:"cep/query-guide/functions/streaming-ml/bayesianregression",id:"cep/query-guide/functions/streaming-ml/bayesianregression",title:"bayesianRegression (Stream Processor)",description:"This function predicts using a Bayesian linear regression",source:"@site/docs/cep/query-guide/functions/streaming-ml/bayesianregression.md",sourceDirName:"cep/query-guide/functions/streaming-ml",slug:"/cep/query-guide/functions/streaming-ml/bayesianregression",permalink:"/docs/cep/query-guide/functions/streaming-ml/bayesianregression",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/streaming-ml/bayesianregression.md",tags:[],version:"current",frontMatter:{title:"bayesianRegression (Stream Processor)"},sidebar:"defaultSidebar",previous:{title:"Streaming ML",permalink:"/docs/cep/query-guide/functions/streaming-ml/"},next:{title:"kMeansIncremental (Stream Processor)",permalink:"/docs/cep/query-guide/functions/streaming-ml/kmeansincremental"}},u={},s=[{value:"Syntax",id:"syntax",level:2},{value:"Query Parameters",id:"query-parameters",level:2},{value:"Extra Return Attributes",id:"extra-return-attributes",level:2},{value:"Example 1",id:"example-1",level:2}],m={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This function predicts using a Bayesian linear regression\nmodel.Bayesian linear regression allows determining the uncertainty of\neach prediction by estimating the full-predictive distribution"),(0,a.kt)("h2",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"streamingml:bayesianRegression(<STRING> model.name, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)\nstreamingml:bayesianRegression(<STRING> model.name, <INT> prediction.samples, <DOUBLE|FLOAT|INT|LONG> model.feature, <DOUBLE|FLOAT|INT|LONG> ...)\n")),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"model.name"),(0,a.kt)("td",{parentName:"tr",align:null},"The name of the model to be used."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"STRING"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"No")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"prediction.samples"),(0,a.kt)("td",{parentName:"tr",align:null},"The number of samples to be drawn to estimate the prediction."),(0,a.kt)("td",{parentName:"tr",align:null},"1000"),(0,a.kt)("td",{parentName:"tr",align:null},"INT"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"No")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"model.feature"),(0,a.kt)("td",{parentName:"tr",align:null},"The features of the model that need to be attributes of the stream."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"DOUBLE FLOAT INT LONG"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,a.kt)("h2",{id:"extra-return-attributes"},"Extra Return Attributes"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Types"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"prediction"),(0,a.kt)("td",{parentName:"tr",align:null},"The predicted value (double)."),(0,a.kt)("td",{parentName:"tr",align:null},"DOUBLE")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"confidence"),(0,a.kt)("td",{parentName:"tr",align:null},"Inverse of the standard deviation of the predictive distribution."),(0,a.kt)("td",{parentName:"tr",align:null},"DOUBLE")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"CREATE STREAM StreamA (attribute_0 double, attribute_1 double, attribute_2 double, attribute_3 double);\n\nfrom StreamA#streamingml:bayesianRegression('model1', attribute_0, attribute_1, attribute_2, attribute_3)\ninsert all events into OutputStream;\n")),(0,a.kt)("p",null,"This query uses a Bayesian regression model named ",(0,a.kt)("inlineCode",{parentName:"p"},"model1")," to predict\nthe label of the feature vector represented by ",(0,a.kt)("inlineCode",{parentName:"p"},"attribute_0"),",\n",(0,a.kt)("inlineCode",{parentName:"p"},"attribute_1"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"attribute_2"),", and ",(0,a.kt)("inlineCode",{parentName:"p"},"attribute_3"),". The predicted value is\nemitted to the ",(0,a.kt)("inlineCode",{parentName:"p"},"OutputStream")," streamalong with the prediction confidence\n(std of predictive distribution) and the feature vector. As a result,\nthe OutputStream stream is defined as follows: (attribute_0 double,\nattribute_1 double, attribute_2 double, attribute_3 double,\nprediction double, confidence double)."))}p.isMDXComponent=!0}}]);