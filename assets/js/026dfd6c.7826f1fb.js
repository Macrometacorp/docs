"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[30241],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>p});var o=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=o.createContext({}),s=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=s(e.components);return o.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=s(n),p=a,h=m["".concat(c,".").concat(p)]||m[p]||d[p]||l;return n?o.createElement(h,r(r({ref:t},u),{},{components:n})):o.createElement(h,r({ref:t},u))}));function p(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,r=new Array(l);r[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,r[1]=i;for(var s=2;s<l;s++)r[s]=n[s];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},85162:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(67294),a=n(34334);const l="tabItem_Ymn6";function r(e){let{children:t,hidden:n,className:r}=e;return o.createElement("div",{role:"tabpanel",className:(0,a.Z)(l,r),hidden:n},t)}},65488:(e,t,n)=>{n.d(t,{Z:()=>p});var o=n(87462),a=n(67294),l=n(34334),r=n(72389),i=n(67392),c=n(7094),s=n(12466);const u="tabList__CuJ",d="tabItem_LNqP";function m(e){const{lazy:t,block:n,defaultValue:r,values:m,groupId:p,className:h}=e,k=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),f=m??k.map((e=>{let{props:{value:t,label:n,attributes:o}}=e;return{value:t,label:n,attributes:o}})),y=(0,i.l)(f,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===r?r:r??k.find((e=>e.props.default))?.props.value??k[0].props.value;if(null!==g&&!f.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${f.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:w,setTabGroupChoices:b}=(0,c.U)(),[v,C]=(0,a.useState)(g),N=[],{blockElementScrollPositionUntilNextRender:q}=(0,s.o5)();if(null!=p){const e=w[p];null!=e&&e!==v&&f.some((t=>t.value===e))&&C(e)}const E=e=>{const t=e.currentTarget,n=N.indexOf(t),o=f[n].value;o!==v&&(q(t),C(o),null!=p&&b(p,String(o)))},T=e=>{let t=null;switch(e.key){case"ArrowRight":{const n=N.indexOf(e.currentTarget)+1;t=N[n]??N[0];break}case"ArrowLeft":{const n=N.indexOf(e.currentTarget)-1;t=N[n]??N[N.length-1];break}}t?.focus()};return a.createElement("div",{className:(0,l.Z)("tabs-container",u)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},h)},f.map((e=>{let{value:t,label:n,attributes:r}=e;return a.createElement("li",(0,o.Z)({role:"tab",tabIndex:v===t?0:-1,"aria-selected":v===t,key:t,ref:e=>N.push(e),onKeyDown:T,onFocus:E,onClick:E},r,{className:(0,l.Z)("tabs__item",d,r?.className,{"tabs__item--active":v===t})}),n??t)}))),t?(0,a.cloneElement)(k.filter((e=>e.props.value===v))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},k.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==v})))))}function p(e){const t=(0,r.Z)();return a.createElement(m,(0,o.Z)({key:String(t)},e))}},15554:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var o=n(87462),a=(n(67294),n(3905)),l=n(65488),r=n(85162);const i={sidebar_position:10,title:"Basic Document Tasks"},c=void 0,s={unversionedId:"queryworkers/sql/tutorial/sql-crud",id:"queryworkers/sql/tutorial/sql-crud",title:"Basic Document Tasks",description:"You can perform basic document tasks such as create, read, update, and delete (CRUD) on documents in a collection. This portion of the tutorial guides you through those tasks.",source:"@site/docs/queryworkers/sql/tutorial/sql-crud.md",sourceDirName:"queryworkers/sql/tutorial",slug:"/queryworkers/sql/tutorial/sql-crud",permalink:"/docs/queryworkers/sql/tutorial/sql-crud",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/sql/tutorial/sql-crud.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"Basic Document Tasks"},sidebar:"defaultSidebar",previous:{title:"SQL Tutorial",permalink:"/docs/queryworkers/sql/tutorial/"},next:{title:"Redis in Macrometa",permalink:"/docs/queryworkers/redis/"}},u={},d=[{value:"Create the Characters Collection",id:"create-the-characters-collection",level:2},{value:"Working with Dataset",id:"working-with-dataset",level:2},{value:"Add One Document to the Collection",id:"add-one-document-to-the-collection",level:3},{value:"Add Multiple Documents to the Collection",id:"add-multiple-documents-to-the-collection",level:3},{value:"Update One Document in the Collection",id:"update-one-document-in-the-collection",level:3},{value:"Delete One Document in the Collection",id:"delete-one-document-in-the-collection",level:3},{value:"Get One Document from the Collection",id:"get-one-document-from-the-collection",level:3},{value:"Get all Documents from the Collection",id:"get-all-documents-from-the-collection",level:3},{value:"Send SQL Queries with Macrometa SDKs",id:"send-sql-queries-with-macrometa-sdks",level:3}],m={toc:d};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"You can perform basic document tasks such as create, read, update, and delete (CRUD) on documents in a collection. This portion of the tutorial guides you through those tasks.\nWe will first review the syntax of CRUD commands and then use SDKs to send queries to Macrometa platform."),(0,a.kt)("h2",{id:"create-the-characters-collection"},"Create the Characters Collection"),(0,a.kt)("p",null,"Before we can insert documents with SQL, we need a place to put them in: a collection."),(0,a.kt)("p",null,"For this tutorial, ",(0,a.kt)("a",{parentName:"p",href:"/docs/collections/documents/create-document-store"},"Create a Document Store collection")," in the console. For more information about collections, refer to ",(0,a.kt)("a",{parentName:"p",href:"/docs/collections/"},"Collections"),"."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://auth-play.macrometa.io/"},"Log in to your Macrometa account"),"."),(0,a.kt)("li",{parentName:"ol"},"Click ",(0,a.kt)("strong",{parentName:"li"},"Data > Collections"),"."),(0,a.kt)("li",{parentName:"ol"},"Click ",(0,a.kt)("strong",{parentName:"li"},"New Collection"),"."),(0,a.kt)("li",{parentName:"ol"},"Click ",(0,a.kt)("strong",{parentName:"li"},"Document Store"),"."),(0,a.kt)("li",{parentName:"ol"},"Name the collection ",(0,a.kt)("strong",{parentName:"li"},"categories")," and then click ",(0,a.kt)("strong",{parentName:"li"},"Create"),".")),(0,a.kt)("h2",{id:"working-with-dataset"},"Working with Dataset"),(0,a.kt)("p",null,"Imagine an online store where we need to put all our products in categories.\nInitially, we are adding categories to the empty collection. In some cases, we will need to update existing categories or remove some of them.\nWe are doing all the aforementioned operations so that we could have specific data on request."),(0,a.kt)("h3",{id:"add-one-document-to-the-collection"},"Add One Document to the Collection"),(0,a.kt)("p",null,"Add one document to the collection with a query."),(0,a.kt)("p",null,"Classic SQL syntax:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO categories (_key,name) VALUES('0','Books')\n")),(0,a.kt)("h3",{id:"add-multiple-documents-to-the-collection"},"Add Multiple Documents to the Collection"),(0,a.kt)("p",null,"Add one multiple documents to the collection with a query."),(0,a.kt)("p",null,"We can json strings(we don't specify any columns):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},'INSERT INTO categories VALUES (\'{\\"_key\\":\\"1\\",\\"name\\":\\"Electronics\\"}\'),(\'{\\"_key\\":\\"2\\",\\"name\\":\\"Food\\"}\')\n')),(0,a.kt)("h3",{id:"update-one-document-in-the-collection"},"Update One Document in the Collection"),(0,a.kt)("p",null,"Update one document in the collection with a query."),(0,a.kt)("p",null,"Classic SQL syntax:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"UPDATE categories SET name='Software' WHERE _key = '0'\n")),(0,a.kt)("h3",{id:"delete-one-document-in-the-collection"},"Delete One Document in the Collection"),(0,a.kt)("p",null,"Delete one document in the collection with a query."),(0,a.kt)("p",null,"Classic SQL syntax:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"DELETE FROM categories WHERE _key='0'\n")),(0,a.kt)("h3",{id:"get-one-document-from-the-collection"},"Get One Document from the Collection"),(0,a.kt)("p",null,"Get one document from the collection with a query."),(0,a.kt)("p",null,"Classic SQL syntax:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM categories WHERE _key='0'\n")),(0,a.kt)("h3",{id:"get-all-documents-from-the-collection"},"Get all Documents from the Collection"),(0,a.kt)("p",null,"Get all documents from the collection with a query."),(0,a.kt)("p",null,"Classic SQL syntax:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM categories\n")),(0,a.kt)("h3",{id:"send-sql-queries-with-macrometa-sdks"},"Send SQL Queries with Macrometa SDKs"),(0,a.kt)(l.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,a.kt)(r.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"First we need to add dependency for Macrometa ",(0,a.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/jsc8"},"SDK"),"."),(0,a.kt)("li",{parentName:"ul"},"To create instance of ",(0,a.kt)("inlineCode",{parentName:"li"},"jsc8")," we need to provide URL and fabric name to ",(0,a.kt)("inlineCode",{parentName:"li"},"jsc8")," constructor.\n",(0,a.kt)("inlineCode",{parentName:"li"},"jsc8")," holds all the methods needed to work with Macrometa platform. "),(0,a.kt)("li",{parentName:"ul"},"Function ",(0,a.kt)("inlineCode",{parentName:"li"},"await client.login(email, password)")," will do a login to Macrometa platform."),(0,a.kt)("li",{parentName:"ul"},"Function ",(0,a.kt)("inlineCode",{parentName:"li"},"await client.executeQuery(query, {}, { sql: true })")," with ",(0,a.kt)("inlineCode",{parentName:"li"},"sql")," as a field in object sends SQL query to Macrometa platform.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const jsc8 = require("jsc8");\n\n// Authentication parameters\nconst email = "nemo@nautilus.com";\nconst password = "xxxxxx";\nconst fabric = "_system";\n\n// SQL Query\nconst query = "SELECT * FROM categories";\n\nconst client = new jsc8({\n  url: "https://play.paas.macrometa.io",\n  fabricName: fabric\n});\n\nasync function sqlQueries() {\n    await client.login(email, password);\n    const result = await client.executeQuery(\n         query, {}, { sql: true }\n    );\n    // Test data will be printed in the terminal\n    await console.log(result);\n  }\n  \nsqlQueries();\n\n'))),(0,a.kt)(r.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"First we need to add dependency for Macrometa ",(0,a.kt)("a",{parentName:"li",href:"https://pypi.org/project/pyC8/"},"SDK"),"."),(0,a.kt)("li",{parentName:"ul"},"To create instance of ",(0,a.kt)("inlineCode",{parentName:"li"},"C8Client")," we need to provide credentials, protocol, URL and port to ",(0,a.kt)("inlineCode",{parentName:"li"},"C8Client")," constructor.\n",(0,a.kt)("inlineCode",{parentName:"li"},"C8Client")," holds all the methods needed to work with Macrometa platform."),(0,a.kt)("li",{parentName:"ul"},"Function ",(0,a.kt)("inlineCode",{parentName:"li"},"client.execute_query(QUERY, sql=True)")," with ",(0,a.kt)("inlineCode",{parentName:"li"},"sql")," parameter sends SQL query to Macrometa platform.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-py"},"from c8 import C8Client\n\n# Authentication parameters\nEMAIL = 'nemo@nautilus.com'\nPASSWORD = 'xxxxx'\nURL = \"play.paas.macrometa.io\"\n\n# SQL Query\nQUERY = 'SELECT * FROM categories'\n\nclient = C8Client(protocol='https', host=URL, port=443, email=EMAIL, password=PASSWORD)\n\ncursor = client.execute_query(QUERY, sql=True)\ndocs = [doc for doc in cursor]\n# Test data will be printed in the terminal\nprint(docs)\n\n")))))}p.isMDXComponent=!0}}]);