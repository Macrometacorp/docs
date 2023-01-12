"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5051],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=a.createContext({}),c=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=c(e.components);return a.createElement(i.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(t),m=r,y=p["".concat(i,".").concat(m)]||p[m]||d[m]||o;return t?a.createElement(y,l(l({ref:n},u),{},{components:t})):a.createElement(y,l({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=p;var s={};for(var i in n)hasOwnProperty.call(n,i)&&(s[i]=n[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var c=2;c<o;c++)l[c]=t[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},85162:(e,n,t)=>{t.d(n,{Z:()=>l});var a=t(67294),r=t(34334);const o="tabItem_Ymn6";function l(e){let{children:n,hidden:t,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,l),hidden:t},n)}},65488:(e,n,t)=>{t.d(n,{Z:()=>m});var a=t(87462),r=t(67294),o=t(34334),l=t(72389),s=t(67392),i=t(7094),c=t(12466);const u="tabList__CuJ",d="tabItem_LNqP";function p(e){const{lazy:n,block:t,defaultValue:l,values:p,groupId:m,className:y}=e,g=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),f=p??g.map((e=>{let{props:{value:n,label:t,attributes:a}}=e;return{value:n,label:t,attributes:a}})),b=(0,s.l)(f,((e,n)=>e.value===n.value));if(b.length>0)throw new Error(`Docusaurus error: Duplicate values "${b.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const h=null===l?l:l??g.find((e=>e.props.default))?.props.value??g[0].props.value;if(null!==h&&!f.some((e=>e.value===h)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${h}" but none of its children has the corresponding value. Available values are: ${f.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:C,setTabGroupChoices:T}=(0,i.U)(),[E,R]=(0,r.useState)(h),N=[],{blockElementScrollPositionUntilNextRender:q}=(0,c.o5)();if(null!=m){const e=C[m];null!=e&&e!==E&&f.some((n=>n.value===e))&&R(e)}const w=e=>{const n=e.currentTarget,t=N.indexOf(n),a=f[t].value;a!==E&&(q(n),R(a),null!=m&&T(m,String(a)))},k=e=>{let n=null;switch(e.key){case"ArrowRight":{const t=N.indexOf(e.currentTarget)+1;n=N[t]??N[0];break}case"ArrowLeft":{const t=N.indexOf(e.currentTarget)-1;n=N[t]??N[N.length-1];break}}n?.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",u)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":t},y)},f.map((e=>{let{value:n,label:t,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:E===n?0:-1,"aria-selected":E===n,key:n,ref:e=>N.push(e),onKeyDown:k,onFocus:w,onClick:w},l,{className:(0,o.Z)("tabs__item",d,l?.className,{"tabs__item--active":E===n})}),t??n)}))),n?(0,r.cloneElement)(g.filter((e=>e.props.value===E))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},g.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==E})))))}function m(e){const n=(0,l.Z)();return r.createElement(p,(0,a.Z)({key:String(n)},e))}},42527:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var a=t(87462),r=(t(67294),t(3905)),o=t(65488),l=t(85162);const s={sidebar_position:9,title:"Query Worker Tutorial"},i=void 0,c={unversionedId:"queryworkers/tutorial",id:"queryworkers/tutorial",title:"Query Worker Tutorial",description:"This tutorial is about using C8QL queries as API (aka Query Workers) in Macrometa GDN with low latencies across the globe.",source:"@site/docs/queryworkers/tutorial.md",sourceDirName:"queryworkers",slug:"/queryworkers/tutorial",permalink:"/docs/queryworkers/tutorial",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/tutorial.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9,title:"Query Worker Tutorial"},sidebar:"defaultSidebar",previous:{title:"Queries and Query Workers",permalink:"/docs/queryworkers/"},next:{title:"Building Queries",permalink:"/docs/queryworkers/building-queries"}},u={},d=[{value:"Installation",id:"installation",level:2},{value:"Code Sample",id:"code-sample",level:2}],p={toc:d};function m(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This tutorial is about using C8QL queries as API (aka Query Workers) in Macrometa GDN with low latencies across the globe."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"With Yarn or NPM\n\n    yarn add jsc8\n    (or)\n    npm install jsc8\n\nIf you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:\n\n    npm install --global jsc8\n\nFrom source,\n\n    git clone https://github.com/macrometacorp/jsc8.git\n    cd jsC8\n    npm install\n    npm run dist\n"))),(0,r.kt)(l.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"pyC8 requires Python 3.5+. Python 3.6 or higher is recommended\n\nTo install pyC8, simply run\n\n    $ pip3 install pyC8\n\nor, if you prefer to use conda:\n\n    conda install -c conda-forge pyC8\n\nor pipenv:\n\n    pipenv install --pre pyC8\n\nOnce the installation process is finished, you can begin developing applications in Python.\n")))),(0,r.kt)("h2",{id:"code-sample"},"Code Sample"),(0,r.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const jsc8 = require("jsc8");\n\nconst globalUrl = "https://play.paas.macrometa.io";\n\n/*\n// Create auth instance with token\nconst client = new jsc8({\n    url: gdnUrl,\n    token: "XXXX",\n    fabricName: \'_system\'\n});\n\n// ----- OR -----\n// Create an auth instance with an API key\nconst client = new jsc8({\n    url: gdnUrl,\n    apiKey: "XXXX",\n    fabricName: \'_system\'\n});\n\n// ----- OR -----\n// Create an auth instance using an email and password\nconst client = new jsc8(gdnUrl);\nawait client.login("nemo@nautilus.com", "xxxxx");\n*/\n\n// Connect to GDN\nconst client = new jsc8({ url: globalUrl, apiKey: "XXXXX", fabricName: "_system" });\n\n// Variables\nconst collectionName = "address";\n\n// Variables - Query Workers\nconst parameter = { firstname: "", lastname: "", email: "", zipcode: "" };\n\nconst insertDataValue = {\n  query: {\n    name: "insertRecord",\n    value: `INSERT {\'firstname\':@firstname, \'lastname\':@lastname, \'email\':@email, \'zipcode\':@zipcode, \'_key\': \'abc\'} \n      IN ${collectionName}`,\n    parameter\n  }\n};\n\nconst getDataValue = {\n  query: {\n    name: "getRecords",\n    value: `FOR doc IN ${collectionName} RETURN doc`\n  }\n};\n\nconst updateDataValue = {\n  query: {\n    name: "updateRecord",\n    value: `UPDATE \'abc\' WITH { "lastname": "cena" } IN ${collectionName}`\n  }\n};\n\nconst deleteDataValue = {\n  query: {\n    name: "deleteRecord",\n    value: `REMOVE \'abc\' IN ${collectionName}`\n  }\n};\n\nconst getCountValue = {\n  query: {\n    name: "countRecords",\n    value: `RETURN COUNT(FOR doc IN ${collectionName} RETURN 1)`\n  }\n};\n\n// Step 1: Open connection to GDN. You will be routed to the closest region.\nconsole.log(`\\n1. Connecting to federation: ${globalUrl},  user: ${thisApikey}`);\n\nasync function createCollection () {\n  console.log("\\n2. Creating collection.");\n\n  try {\n    console.log(`Creating the collection ${collectionName}...`);\n    const existsColl = await client.hasCollection(collectionName);\n    if (existsColl === false) {\n      await client.createCollection(collectionName);\n      console.log(`Collection ${collectionName} has been created successfully.`);\n    } else {\n      console.log(`Collection ${collectionName} already exists.`);\n    }\n  } catch (e) {\n    console.log("Collection creation did not succeed due to " + e);\n  }\n}\n\n// This function creates the needed collection or displays a message if it already exists.\nasync function insertQueryWorker (nameToCheck, value, parameterToCheck) {\n  let queryAlreadyExists = false;\n  const queryList = await client.getRestqls();\n  try {\n    for (let i = 0; i < queryList.result.length; i++) {\n      if (queryList.result[i].name === nameToCheck) {\n        queryAlreadyExists = true;\n        break;\n      }\n    }\n\n    if (queryAlreadyExists) {\n      console.log(`Query worker ${nameToCheck} already exists.`);\n    } else {\n      await client.createRestql(nameToCheck, value, parameterToCheck);\n      console.log(`Query worker ${nameToCheck} created successfully.`);\n    }\n  } catch (e) {\n    console.log("Could not check the list of query workers due to " + e);\n  }\n}\n\nasync function createRestQL () {\n  console.log("\\n3. Creating query workers.");\n\n  try {\n    await insertQueryWorker(insertDataValue.query.name.toString(), insertDataValue.query.value.toString(), insertDataValue.query.parameter);\n    await insertQueryWorker(getDataValue.query.name.toString(), getDataValue.query.value.toString(), {});\n    await insertQueryWorker(updateDataValue.query.name.toString(), updateDataValue.query.value.toString(), {});\n    await insertQueryWorker(deleteDataValue.query.name.toString(), deleteDataValue.query.value.toString(), {});\n    await insertQueryWorker(getCountValue.query.name.toString(), getCountValue.query.value.toString(), {});\n\n    console.log("All query workers are now in the system.");\n  } catch (e) {\n    console.log("Query workers could not be created due to " + e);\n  }\n}\n\nasync function executeRestQL () {\n  console.log("\\n4. Running query workers");\n  console.log("\\n a. Insert data");\n\n  let resp = await client.executeRestql(insertDataValue.query.name.toString(), {\n    firstname: "john",\n    lastname: "doe",\n    email: "john.doe@macrometa.io",\n    zipcode: "511037"\n  }).catch(e => console.log(console.error(e)));\n  console.log(resp.result);\n\n  console.log("\\n b. Get data");\n  resp = await client.executeRestql(getDataValue.query.name.toString(), {});\n  console.log(resp.result);\n\n  console.log("\\n c. Update data");\n  resp = await client.executeRestql(updateDataValue.query.name.toString(), {});\n  console.log(resp.result);\n\n  console.log("\\n d. Get data");\n  resp = await client.executeRestql(getDataValue.query.name.toString(), {});\n  console.log(resp.result);\n\n  console.log("\\n e. Count records");\n  resp = await client.executeRestql(getCountValue.query.name.toString(), {});\n  console.log(resp.result);\n\n  console.log("\\n f. Delete record");\n  resp = await client.executeRestql(deleteDataValue.query.name.toString(), {});\n  console.log(resp.result);\n}\n\nasync function deleteRestQL () {\n  console.log("\\n5a. Deleting query workers.");\n\n  try {\n    await client.deleteRestql(insertDataValue.query.name.toString());\n    await client.deleteRestql(getDataValue.query.name.toString());\n    await client.deleteRestql(updateDataValue.query.name.toString());\n    await client.deleteRestql(getCountValue.query.name.toString());\n    await client.deleteRestql(deleteDataValue.query.name.toString());\n\n    console.log("All query workers deleted.");\n  } catch (e) {\n    console.log("Could not delete query workers due to " + e);\n  }\n}\n\nasync function deleteCollection () {\n  console.log("\\n5b. Deleting the collection.");\n\n  try {\n    console.log(`Removing the collection ${collectionName}...`);\n    const existsColl = await client.hasCollection(collectionName);\n    if (existsColl === false) {\n      console.log(`Can\'t remove non-existent collection: ${collectionName}.`);\n    } else {\n      await client.deleteCollection(collectionName);\n      console.log(`Collection ${collectionName} has been deleted successfully.`);\n    }\n  } catch (e) {\n    console.log("Collection creation did not succeed due to " + e);\n  }\n}\n\n(async function () {\n  await createCollection();\n  await createRestQL();\n  await executeRestQL();\n  await deleteRestQL();\n  await deleteCollection();\n})();\n'))),(0,r.kt)(l.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},'from c8 import C8Client\nimport pprint\nimport time\n\n# Variables - URLs\nGLOBAL_URL = "play.paas.macrometa.io"\n\n# Variables - DB\nEMAIL = "nemo@nautilus.com"\nPASSWORD = "xxxxxx"\nGEO_FABRIC = "_system"\nCOLLECTION_NAME = "address"\n\n# Variables - Query Workers\nPARAMETER = {"firstname": "", "lastname": "", "email": "", "zipcode": ""}\nINSERT_DATA = {\n    "query": {\n        "name": "insertRecord",\n        "value": f"INSERT {{\'firstname\':@firstname, \'lastname\':@lastname, \'email\':@email, \'zipcode\':@zipcode, \'_key\': \'abc\'}} IN {COLLECTION_NAME}",\n        "parameter": PARAMETER\n    }\n}\nGET_DATA = {\n    "query": {\n        "name": "getRecords",\n        "value": f"FOR doc IN {COLLECTION_NAME} RETURN doc"\n    }\n}\nUPDATE_DATA = {\n    "query": {\n        "name": "updateRecord",\n        "value": f"UPDATE \'abc\' WITH {{ \\"lastname\\": \\"cena\\" }} IN {COLLECTION_NAME}"\n    }\n}\nDELETE_DATA = {\n    "query": {\n        "name": "deleteRecord",\n        "value": f"REMOVE \'abc\' IN {COLLECTION_NAME}"\n    }\n}\nGET_COUNT = {\n    "query": {\n        "name": "countRecords",\n        "value": f"RETURN COUNT(FOR doc IN {COLLECTION_NAME} RETURN 1)"\n    }\n}\n\npp = pprint.PrettyPrinter(indent=4)\n\nif __name__ == \'__main__\':\n\n# Step1: Open connection to GDN. You will be routed to closest region.\n    print(f"1. CONNECT: federation: {GLOBAL_URL},  user: {EMAIL}")\n    client = C8Client(protocol=\'https\', host=GLOBAL_URL, port=443,\n                        email=EMAIL, password=PASSWORD,\n                        geofabric=GEO_FABRIC)\n\n    # Step2: Create a collection if not exists\n    print(f"2. CREATE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")\n    if client.has_collection(COLLECTION_NAME):\n        collection = client.collection(COLLECTION_NAME)\n    else:\n        collection = client.create_collection(COLLECTION_NAME)\n\n    # Step3: Create RestQLs\n    print(f"3. CREATE_RESTQLs: region: {GLOBAL_URL}")\n    client.create_restql(INSERT_DATA)  # name: insertRecord\n    client.create_restql(GET_DATA)  # name: getRecords\n    client.create_restql(UPDATE_DATA)  # name: updateRecord\n    client.create_restql(DELETE_DATA)  # name: deleteRecord\n    client.create_restql(GET_COUNT)  # name: countRecords\n    pp.pprint(client.get_restqls())\n\n    time.sleep(5)\n    # Step4: Execute Query Workers\n    print(f"4. EXECUTE_RESTQLs: region: {GLOBAL_URL}")\n\n    print("\\t a. Insert data....")\n    response = client.execute_restql(\n        "insertRecord", {\n            "bindVars": {\n                "firstname": "john",\n                "lastname": "doe",\n                "email": "john.doe@macrometa.io",\n                "zipcode": "511037"\n            }\n        })\n    print("\\t b. Get data....")\n    response = client.execute_restql("getRecords")\n    pp.pprint(response[\'result\'])\n    print("\\t c. Update data....")\n    response = client.execute_restql("updateRecord")\n    print("\\t d. Get data....")\n    response = client.execute_restql("getRecords")\n    pp.pprint(response[\'result\'])\n    print("\\t e. Count records....")\n    response = client.execute_restql("countRecords")\n    pp.pprint(response[\'result\'])\n    print("\\t f. Delete data....")\n    response = client.execute_restql("deleteRecord")\n\n    print(f"5. DELETE_RESTQLs: region: {GLOBAL_URL}")\n    client.delete_restql("insertRecord")\n    client.delete_restql("getRecords")\n    client.delete_restql("updateRecord")\n    client.delete_restql("countRecords")\n    client.delete_restql("deleteRecord")\n')))))}m.isMDXComponent=!0}}]);