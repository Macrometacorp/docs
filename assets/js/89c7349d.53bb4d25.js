"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[37579],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>c});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var d=n.createContext({}),u=function(e){var t=n.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=u(r),c=a,N=m["".concat(d,".").concat(c)]||m[c]||s[c]||i;return r?n.createElement(N,l(l({ref:t},p),{},{components:r})):n.createElement(N,l({ref:t},p))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=m;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var u=2;u<i;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},61311:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var n=r(87462),a=(r(67294),r(3905));const i={title:"query (Stream Processor)"},l=void 0,o={unversionedId:"cep/query-guide/functions/rdbms/query",id:"cep/query-guide/functions/rdbms/query",title:"query (Stream Processor)",description:"This function performs SQL retrieval queries on data sources.",source:"@site/docs/cep/query-guide/functions/rdbms/query.md",sourceDirName:"cep/query-guide/functions/rdbms",slug:"/cep/query-guide/functions/rdbms/query",permalink:"/docs/cep/query-guide/functions/rdbms/query",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cep/query-guide/functions/rdbms/query.md",tags:[],version:"current",frontMatter:{title:"query (Stream Processor)"},sidebar:"defaultSidebar",previous:{title:"cud (Stream Processor)",permalink:"/docs/cep/query-guide/functions/rdbms/cud"},next:{title:"find (Function)",permalink:"/docs/cep/query-guide/functions/regex/find"}},d={},u=[{value:"Query Parameters",id:"query-parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],p={toc:u};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This function performs SQL retrieval queries on data sources."),(0,a.kt)("p",null,"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"rdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query)\nrdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter)\nrdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> ...)\n")),(0,a.kt)("h2",{id:"query-parameters"},"Query Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Data Types"),(0,a.kt)("th",{parentName:"tr",align:null},"Optional"),(0,a.kt)("th",{parentName:"tr",align:null},"Dynamic"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"datasource.name"),(0,a.kt)("td",{parentName:"tr",align:null},"The name of the datasource for which the query should be performed."),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"STRING"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"No")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"attribute.definition.list"),(0,a.kt)("td",{parentName:"tr",align:null},"This is provided as a comma-separated list in the ",(0,a.kt)("inlineCode",{parentName:"td"},"<AttributeName AttributeType>")," format. The SQL query is expected to return the attributes in the given order. e.g., If one attribute is defined here, the SQL query should return one column result set. If more than one column is returned, then the first column is processed. The  data types supported are ",(0,a.kt)("inlineCode",{parentName:"td"},"STRING"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"INT"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"LONG"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"DOUBLE"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"FLOAT"),", and ",(0,a.kt)("inlineCode",{parentName:"td"},"BOOL"),". Mapping of the  data type to the database data type can be done as follows, ","*"," Datatype","*"," -",">"," ","*","Datasource Datatype","*"," ",(0,a.kt)("inlineCode",{parentName:"td"},"STRING")," -",">"," ",(0,a.kt)("inlineCode",{parentName:"td"},"CHAR"),",",(0,a.kt)("inlineCode",{parentName:"td"},"VARCHAR"),",",(0,a.kt)("inlineCode",{parentName:"td"},"LONGVARCHAR")," ",(0,a.kt)("inlineCode",{parentName:"td"},"INT")," -",">"," ",(0,a.kt)("inlineCode",{parentName:"td"},"INTEGER")," ",(0,a.kt)("inlineCode",{parentName:"td"},"LONG")," -",">"," ",(0,a.kt)("inlineCode",{parentName:"td"},"BIGINT")," ",(0,a.kt)("inlineCode",{parentName:"td"},"DOUBLE"),"-",">"," ",(0,a.kt)("inlineCode",{parentName:"td"},"DOUBLE")," ",(0,a.kt)("inlineCode",{parentName:"td"},"FLOAT")," -",">"," ",(0,a.kt)("inlineCode",{parentName:"td"},"REAL")," ",(0,a.kt)("inlineCode",{parentName:"td"},"BOOL")," -",">"," ",(0,a.kt)("inlineCode",{parentName:"td"},"BIT")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"STRING"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"No")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"query"),(0,a.kt)("td",{parentName:"tr",align:null},"The select query(formatted according to the relevant database type) that needs to be performed"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"STRING"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"parameter"),(0,a.kt)("td",{parentName:"tr",align:null},"If the second parameter is a parametrised SQL query, then stream processor attributes can be passed to set the values of the parameters"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"STRING BOOL INT DOUBLE FLOAT LONG"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes")))),(0,a.kt)("p",null,"Extra Return Attributes"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Possible Types"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"attributeName"),(0,a.kt)("td",{parentName:"tr",align:null},"The return attributes will be the ones defined in the parameter",(0,a.kt)("inlineCode",{parentName:"td"},"attribute.definition.list"),"."),(0,a.kt)("td",{parentName:"tr",align:null},"STRING INT LONG DOUBLE FLOAT BOOL")))),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"insert into recordStream\nselect creditcardno, country, transaction, amount\nfrom TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string, transaction string, amount int', 'select * from Transactions_Table');\n")),(0,a.kt)("p",null,"Events inserted into recordStream includes all records matched for the\nquery i.e an event will be generated for each record retrieved from the\ndatasource. The event will include as additional attributes, the\nattributes defined in the ",(0,a.kt)("inlineCode",{parentName:"p"},"attribute.definition.list"),"(creditcardno,\ncountry, transaction, amount)."),(0,a.kt)("h2",{id:"example-2"},"Example 2"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"insert into recordStream\nselect creditcardno, country, transaction, amount\nfrom TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string,transaction string, amount int', 'select * from where country=?', countrySearchWord);\n")),(0,a.kt)("p",null,"Events inserted into recordStream includes all records matched for the\nquery i.e an event will be generated for each record retrieved from the\ndatasource. The event will include as additional attributes, the\nattributes defined in the ",(0,a.kt)("inlineCode",{parentName:"p"},"attribute.definition.list"),"(creditcardno,\ncountry, transaction, amount). countrySearchWord value from the event\nwill be set in the query when querying the datasource."))}s.isMDXComponent=!0}}]);