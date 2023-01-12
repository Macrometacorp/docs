"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[47924],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var a=t(67294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var c=a.createContext({}),s=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return a.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},y=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,o=e.originalType,c=e.parentName,p=r(e,["components","mdxType","originalType","parentName"]),y=s(t),d=l,m=y["".concat(c,".").concat(d)]||y[d]||u[d]||o;return t?a.createElement(m,i(i({ref:n},p),{},{components:t})):a.createElement(m,i({ref:n},p))}));function d(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var o=t.length,i=new Array(o);i[0]=y;var r={};for(var c in n)hasOwnProperty.call(n,c)&&(r[c]=n[c]);r.originalType=e,r.mdxType="string"==typeof e?e:l,i[1]=r;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},85162:(e,n,t)=>{t.d(n,{Z:()=>i});var a=t(67294),l=t(34334);const o="tabItem_Ymn6";function i(e){let{children:n,hidden:t,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,l.Z)(o,i),hidden:t},n)}},65488:(e,n,t)=>{t.d(n,{Z:()=>d});var a=t(87462),l=t(67294),o=t(34334),i=t(72389),r=t(67392),c=t(7094),s=t(12466);const p="tabList__CuJ",u="tabItem_LNqP";function y(e){const{lazy:n,block:t,defaultValue:i,values:y,groupId:d,className:m}=e,k=l.Children.map(e.children,(e=>{if((0,l.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=y??k.map((e=>{let{props:{value:n,label:t,attributes:a}}=e;return{value:n,label:t,attributes:a}})),h=(0,r.l)(v,((e,n)=>e.value===n.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===i?i:i??k.find((e=>e.props.default))?.props.value??k[0].props.value;if(null!==g&&!v.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:f,setTabGroupChoices:b}=(0,c.U)(),[C,x]=(0,l.useState)(g),_=[],{blockElementScrollPositionUntilNextRender:T}=(0,s.o5)();if(null!=d){const e=f[d];null!=e&&e!==C&&v.some((n=>n.value===e))&&x(e)}const N=e=>{const n=e.currentTarget,t=_.indexOf(n),a=v[t].value;a!==C&&(T(n),x(a),null!=d&&b(d,String(a)))},w=e=>{let n=null;switch(e.key){case"ArrowRight":{const t=_.indexOf(e.currentTarget)+1;n=_[t]??_[0];break}case"ArrowLeft":{const t=_.indexOf(e.currentTarget)-1;n=_[t]??_[_.length-1];break}}n?.focus()};return l.createElement("div",{className:(0,o.Z)("tabs-container",p)},l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":t},m)},v.map((e=>{let{value:n,label:t,attributes:i}=e;return l.createElement("li",(0,a.Z)({role:"tab",tabIndex:C===n?0:-1,"aria-selected":C===n,key:n,ref:e=>_.push(e),onKeyDown:w,onFocus:N,onClick:N},i,{className:(0,o.Z)("tabs__item",u,i?.className,{"tabs__item--active":C===n})}),t??n)}))),n?(0,l.cloneElement)(k.filter((e=>e.props.value===C))[0],{className:"margin-top--md"}):l.createElement("div",{className:"margin-top--md"},k.map(((e,n)=>(0,l.cloneElement)(e,{key:n,hidden:e.props.value!==C})))))}function d(e){const n=(0,i.Z)();return l.createElement(y,(0,a.Z)({key:String(n)},e))}},99119:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>u});var a=t(87462),l=(t(67294),t(3905)),o=t(65488),i=t(85162);const r={title:"Key-Value Store",sidebar_position:1},c=void 0,s={unversionedId:"collections/keyvalue/index",id:"collections/keyvalue/index",title:"Key-Value Store",description:"A key-value collection stores data in the form of a dictionary. This requires a key for each record and a corresponding value that contains the data. Each document in the database must have a unique key, similar to the concept of a primary key. Key-value databases are known for being quick and storage efficient resulting in faster CRUD (Create, Read, Update, Delete) operations.",source:"@site/docs/collections/keyvalue/index.md",sourceDirName:"collections/keyvalue",slug:"/collections/keyvalue/",permalink:"/docs/collections/keyvalue/",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/collections/keyvalue/index.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Key-Value Store",sidebar_position:1},sidebar:"defaultSidebar",previous:{title:"Geo Spatial Tutorial",permalink:"/docs/collections/documents/geospatial/tutorial"},next:{title:"Create a Key-Value Store",permalink:"/docs/collections/keyvalue/create-key-value-store"}},p={},u=[{value:"SDK download",id:"sdk-download",level:2},{value:"Connect to GDN",id:"connect-to-gdn",level:2},{value:"Create Collection",id:"create-collection",level:2},{value:"Insert Key Value Pairs",id:"insert-key-value-pairs",level:2},{value:"Get Value",id:"get-value",level:2},{value:"Get Key-Value Count",id:"get-key-value-count",level:2},{value:"Update Value",id:"update-value",level:2},{value:"Delete Key-Value",id:"delete-key-value",level:2},{value:"Delete Collection",id:"delete-collection",level:2},{value:"Complete Example",id:"complete-example",level:2}],y={toc:u};function d(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},y,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"A key-value collection stores data in the form of a dictionary. This requires a key for each record and a corresponding value that contains the data. Each document in the database must have a unique key, similar to the concept of a primary key. Key-value databases are known for being quick and storage efficient resulting in faster CRUD (Create, Read, Update, Delete) operations."),(0,l.kt)("p",null,"In GDN, each document stored in a collection contains a ",(0,l.kt)("inlineCode",{parentName:"p"},"_key"),", and the rest of the document is its ",(0,l.kt)("em",{parentName:"p"},"value"),". The only key-value operations available are key lookups (single and batch) and key-value pair insertions and updates. If no sharding attribute is specified, ",(0,l.kt)("inlineCode",{parentName:"p"},"_key")," is used for sharding the data instead."),(0,l.kt)("p",null,"Key-value collections are always global. You can specify time_to_live (TTL) during creation."),(0,l.kt)("p",null,"For the following examples, assume these credentials:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Tenant name: ",(0,l.kt)("a",{parentName:"li",href:"mailto:nemo@nautilus.com"},"nemo@nautilus.com")),(0,l.kt)("li",{parentName:"ul"},"Password: xxxxxx")),(0,l.kt)("h2",{id:"sdk-download"},"SDK download"),(0,l.kt)("p",null,"Download the appropriate SDK for Python or JavaScript."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},"  pyC8 requires Python 3.5+. Python 3.6 or higher is recommended\n\n  To install pyC8, simply run\n\n      $ pip3 install pyC8\n\n  or, if you prefer to use conda:\n\n      conda install -c conda-forge pyC8\n\n  or pipenv:\n\n      pipenv install --pre pyC8\n\n  Once the installation process is finished, you can begin developing applications in Python.\n"))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"  With Yarn or NPM\n\n      yarn add jsc8\n      (or)\n      npm install jsc8\n\n  If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:\n\n      npm install --global jsc8\n\n  From source,\n\n      git clone https://github.com/macrometacorp/jsc8.git\n      cd jsC8\n      npm install\n      npm run dist\n")))),(0,l.kt)("h2",{id:"connect-to-gdn"},"Connect to GDN"),(0,l.kt)("p",null,"Establish connection to a local region. When this code runs, it initializes the server connection to the region URL you specify. You can create an API key from the GUI or REST API."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},"  from c8 import C8Client\n\n  # Simple Way\n  print(\"--- Connecting to C8\")\n  client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,\n                          email='nemo@nautilus.com', password=\"xxxxxx\",\n                          geofabric='_system')\n\n  # Or Using token\n  client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,\n  token=\"XXXX\")\n\n  # Or Using API Key\n  client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,\n  apikey=\"<your-api-key>\")\n"))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  const jsc8 = require("jsc8");\n\n  // Simple Way\n  const client = new jsc8({url: "https://play.paas.macrometa.io", token: "", fabricName: \'_system\'});\n  // ----- OR -----\n  const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "<your-api-key>", fabricName: \'_system\'});\n\n  // To use advanced options\n  const client = new jsc8("https://play.paas.macrometa.io"); \n')))),(0,l.kt)("h2",{id:"create-collection"},"Create Collection"),(0,l.kt)("p",null,"Create a Collection for saving the key-value pairs."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n\n  # Create a new collection if it does not exist\n  if client.has_collection(collection_name):\n      print("Collection exists")\n  else:\n      client.create_collection_kv(name=collection_name)\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  // Add this snippet in previously created main function\n  let coll = await client.getKVCollections();\n  console.log("Existing Collections: ", coll.result);\n  try{\n      await client.createKVCollection(collectionName);\n      console.log("Collection Created Successfully");\n  }\n  catch(e){\n      console.log("Collection creation did not succeed due to " + e);\n  }\n')))),(0,l.kt)("h2",{id:"insert-key-value-pairs"},"Insert Key Value Pairs"),(0,l.kt)("p",null,"Insert key-value pairs into the collection."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n  # Insert Key Value pairs\n  data = [\n    {\n      "_key": "John",\n      "value": "Science",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alice",\n      "value": "Maths",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alex",\n      "value": "Physics",\n      "expireAt": 0\n    },\n    {\n      "_key": "Monika",\n      "value": "Chemistry",\n      "expireAt": 0\n    }\n  ]\n\n  client.insert_key_value_pair(collection_name, data)\n  print("KV Pairs Inserted")\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  // Insert Key Value pairs\n  var data = [\n    {\n      "_key": "John",\n      "value": "Science",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alice",\n      "value": "Maths",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alex",\n      "value": "Physics",\n      "expireAt": 0\n    },\n    {\n      "_key": "Monika",\n      "value": "Chemistry",\n      "expireAt": 0\n    }\n  ]\n  try{\n      await client.insertKVPairs(collectionName, data);\n      console.log("Key Value pairs inserted successfully.");\n  }\n  catch(e){\n      console.log("Key Value Pairs not inserted due to " + e);\n  }\n')))),(0,l.kt)("h2",{id:"get-value"},"Get Value"),(0,l.kt)("p",null,"Get value for a given key."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n  # Get value for a key\n  print("Value for the provided key: ",client.get_value_for_key(collection_name, "Monika"))\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"  const result = await client.getValueForKey(collectionName, 'Monika');\n  console.log(\"Value for provided key: \", result);\n")))),(0,l.kt)("h2",{id:"get-key-value-count"},"Get Key-Value Count"),(0,l.kt)("p",null,"Get key-value count from a given collection."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n\n  # Get KV count of a collection\n  print("Number of kv pairs in your collection: ",client.get_kv_count(collection_name))\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  // Get KV count of a collection\n  const count = await client.getKVCount(collectionName);\n  console.log("Number of kv pairs in your collection: ", count.count);\n')))),(0,l.kt)("h2",{id:"update-value"},"Update Value"),(0,l.kt)("p",null,"Update value for a given key."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n\n  # Update value for a key\n  data = {\n      "_key": "John",\n      "value": "Biology",\n      "expireAt": 0\n  }\n  client.insert_key_value_pair(collection_name, data)\n  print("Updated the specified KV pair")\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  //Update value for a key\n  data = {\n      "_key": "John",\n      "value": "Biology",\n      "expireAt": 0\n  }\n  try{\n      client.insertKVPairs(collectionName, data)\n      console.log("Updated the specified KV pair")\n  }\n  catch(e){\n    console.log("Key Value Pair not updated due to " + e)\n\n  }\n')))),(0,l.kt)("h2",{id:"delete-key-value"},"Delete Key-Value"),(0,l.kt)("p",null,"Delete key-value pairs from a collection."),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n\n  # Delete entry for a key\n  print("Deleted Entry for the specified Key: ",client.delete_entry_for_key(collection_name, "John"))\n\n  # Delete entry for multiple keys\n  print("Deleted Entries for the list of keys: ",client.delete_entry_for_keys(collection_name, ["Monika", "Alex", "Alice"]))\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  try{\n      // Delete entry for a key\n      await client.deleteEntryForKey(collectionName, \'John\');\n\n      // Delete entries for multiple keys\n      await client.deleteEntryForKeys(collectionName, ["Monika", "Alex", "Alice"])\n  }\n  catch(e){\n      console.log("Failed to delete entries due to " + e)\n\n  }\n')))),(0,l.kt)("h2",{id:"delete-collection"},"Delete Collection"),(0,l.kt)("p",null,"Delete key-value collection"),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n\n  # Delete Collection\n  print("Collection Deleted: ",client.delete_collection_kv(collection_name))\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  // Delete Collection\n  try{\n      await client.deleteKVCollection(collectionName)\n      console.log("Collection Deleted")\n  }\n  catch(e){\n      console.log("Failed to delete collection due to " + e)\n  }\n')))),(0,l.kt)("h2",{id:"complete-example"},"Complete Example"),(0,l.kt)("p",null,"The following complete examples are a composite of the previous code snippets:"),(0,l.kt)(o.Z,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"py",label:"Python",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},'  from c8 import C8Client\n\n  key = "<your-api-key>"\n  collection_name = "students"\n\n  # Create a connection to gdn\n  client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  apikey=key)\n\n  # client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  #                          email=\'nemo@nautilus.com\', password="xxxxxx",\n  #                          geofabric=\'_system\')\n\n  # OR Using token\n  # client = C8Client(protocol=\'https\', host=\'play.paas.macrometa.io\', port=443,\n  #  token="XXXX")\n\n\n  # Create a new collection if it does not exist\n  if client.has_collection(collection_name):\n      print("Collection exists")\n  else:\n      client.create_collection_kv(name=collection_name)\n\n  # Insert Key Value pairs\n  data = [\n    {\n      "_key": "John",\n      "value": "Science",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alice",\n      "value": "Maths",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alex",\n      "value": "Physics",\n      "expireAt": 0\n    },\n    {\n      "_key": "Monika",\n      "value": "Chemistry",\n      "expireAt": 0\n    }\n  ]\n\n  client.insert_key_value_pair(collection_name, data)\n  print("KV Pairs Inserted")\n\n  # Get value for a key\n  print("Value for the provided key: ",client.get_value_for_key(collection_name, "Monika"))\n\n  # Get KV count of a collection\n  print("Number of kv pairs in your collection: ",client.get_kv_count(collection_name))\n\n  # Update value for a key\n  data = {\n      "_key": "John",\n      "value": "Biology",\n      "expireAt": 0\n  }\n  client.insert_key_value_pair(collection_name, data)\n  print("Updated the specified KV pair")\n\n  # Delete entry for a key\n  print("Deleted Entry for the specified Key: ",client.delete_entry_for_key(collection_name, "John"))\n\n  # Delete entry for multiple keys\n  print("Deleted Entries for the list of keys: ",client.delete_entry_for_keys(collection_name, ["Monika", "Alex", "Alice"]))\n\n  # Delete Collection\n  print("Collection Deleted: ",client.delete_collection_kv(collection_name))\n'))),(0,l.kt)(i.Z,{value:"js",label:"Javascript",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'  const jsc8 = require("jsc8");\n\n  const key = "<your-api-key>";\n  const collectionName = "students";\n\n  // Connect to gdn\n  const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: key});\n\n  // Crete a authenticated instance with Token / Apikey\n  // const client = new jsc8({url: "https://play.paas.macrometa.io", token: "XXXX", fabricName: \'_system\'});\n  // const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXX", fabricName: \'_system\'});\n  // await console.log("Authentication done!!...");\n\n  // Or use Email & Password to Authenticate client instance\n  // const client = new jsc8("https://play.paas.macrometa.io");\n\n  // await client.login("nemo@nautilus.com", "xxxxx");\n\n  async function main(){\n  // Create a Collection  \n  let coll = await client.getKVCollections();\n  console.log("Existing Collections: ", coll.result);\n  try{\n      await client.createKVCollection(collectionName);\n      console.log("Collection Created Successfully");\n  }\n  catch(e){\n      console.log("Collection creation did not succeed due to " + e);\n  }\n\n  // Insert Key Value pairs\n  var data = [\n    {\n      "_key": "John",\n      "value": "Science",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alice",\n      "value": "Maths",\n      "expireAt": 0\n    },\n    {\n      "_key": "Alex",\n      "value": "Physics",\n      "expireAt": 0\n    },\n    {\n      "_key": "Monika",\n      "value": "Chemistry",\n      "expireAt": 0\n    }\n  ]\n  try{\n      await client.insertKVPairs(collectionName, data);\n      console.log("Key Value pairs inserted successfully.");\n  }\n  catch(e){\n      console.log("Key Value Pairs not inserted due to " + e);\n  }\n\n  // Get value for a key\n  const result = await client.getValueForKey(collectionName, \'Monika\');\n  console.log("Value for provided key: ", result);\n\n  // Get KV count of a collection\n  const count = await client.getKVCount(collectionName);\n  console.log("Number of kv pairs in your collection: ", count.count);\n\n  //Update value for a key\n  data = {\n      "_key": "John",\n      "value": "Biology",\n      "expireAt": 0\n  }\n  try{\n      client.insertKVPairs(collectionName, data);\n      console.log("Updated the specified KV pair");\n  }\n  catch(e){\n    console.log("Key Value Pair not updated due to " + e);\n\n  }\n  try{\n      // Delete entry for a key\n      await client.deleteEntryForKey(collectionName, \'John\');\n\n      // Delete entries for multiple keys\n      await client.deleteEntryForKeys(collectionName, ["Monika", "Alex", "Alice"]);\n  }\n  catch(e){\n      console.log("Failed to delete entries due to " + e);\n\n  }\n\n  // Delete Collection\n  try{\n      await client.deleteKVCollection(collectionName);\n      console.log("Collection Deleted");\n  }\n  catch(e){\n      console.log("Failed to delete collection due to " + e);\n  }\n\n\n  }\n\n  main();\n')))))}d.isMDXComponent=!0}}]);