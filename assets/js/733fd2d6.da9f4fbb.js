"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1348],{3905:(e,r,n)=>{n.d(r,{Zo:()=>m,kt:()=>u});var t=n(67294);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function s(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function o(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?s(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function l(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},s=Object.keys(e);for(t=0;t<s.length;t++)n=s[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)n=s[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=t.createContext({}),p=function(e){var r=t.useContext(i),n=r;return e&&(n="function"==typeof e?e(r):o(o({},r),e)),n},m=function(e){var r=p(e.components);return t.createElement(i.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},c=t.forwardRef((function(e,r){var n=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=p(n),u=a,g=c["".concat(i,".").concat(u)]||c[u]||d[u]||s;return n?t.createElement(g,o(o({ref:r},m),{},{components:n})):t.createElement(g,o({ref:r},m))}));function u(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=c;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<s;p++)o[p]=n[p];return t.createElement.apply(null,o)}return t.createElement.apply(null,n)}c.displayName="MDXCreateElement"},32419:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var t=n(87462),a=(n(67294),n(3905));const s={title:"Stream Worker Commands"},o="Stream Workers (gdnsl stream-worker)",l={unversionedId:"cli/stream-workers-cli",id:"cli/stream-workers-cli",title:"Stream Worker Commands",description:"Get commands related to stream workers.",source:"@site/docs/cli/stream-workers-cli.md",sourceDirName:"cli",slug:"/cli/stream-workers-cli",permalink:"/docs/cli/stream-workers-cli",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/cli/stream-workers-cli.md",tags:[],version:"current",frontMatter:{title:"Stream Worker Commands"},sidebar:"defaultSidebar",previous:{title:"Search View Commands",permalink:"/docs/cli/search-views-cli"},next:{title:"Stream Commands",permalink:"/docs/cli/streams-cli"}},i={},p=[{value:"gdnsl stream-worker create",id:"gdnsl-stream-worker-create",level:2},{value:"gdnsl stream-worker delete",id:"gdnsl-stream-worker-delete",level:2},{value:"gdnsl stream-worker describe",id:"gdnsl-stream-worker-describe",level:2},{value:"gdnsl stream-worker list",id:"gdnsl-stream-worker-list",level:2},{value:"gdnsl stream-worker update",id:"gdnsl-stream-worker-update",level:2}],m={toc:p};function d(e){let{components:r,...n}=e;return(0,a.kt)("wrapper",(0,t.Z)({},m,n,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"stream-workers-gdnsl-stream-worker"},"Stream Workers (gdnsl stream-worker)"),(0,a.kt)("p",null,"Get commands related to stream workers."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  gdnsl stream-worker <stream-worker-name> [flags]\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Examples:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'  \n  # Publish a stream worker.\n  gdnsl stream-worker TestStreamWorker --enable\n\n  # Unpublish a stream worker.\n  gdnsl stream-worker TestStreamWorker --disable\n\n  # Submit an ad hoc Stream query and get the result records from a store.\n  gdnsl stream-worker TestStream --query "SELECT * FROM TestStreamTable"\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  -h, --help                  Help to create a stream worker.\n      --query string          Query to return the result.\n      --enable                Enable a stream worker.\n      --disable               Disable a stream worker.\n      --fabric                Name of the fabric to use.\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options inherited:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"      --config string       gdnsl config file (default is ./gdnsl.yaml)\n")),(0,a.kt)("h2",{id:"gdnsl-stream-worker-create"},"gdnsl stream-worker create"),(0,a.kt)("p",null,"Create a stream worker."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  gdnsl stream-worker create [flags]\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Examples:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'  # Create a simple stream worker.\n   gdnsl stream-worker create \n      --name "cargo-stream-worker" \n      --description "my stream worker" \n      --source "SampleCargoAppInputTable WITH \n                (type = \'database\', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type=\'json\') (weight int);"\n      --sink "STREAM SampleCargoAppDestStream (weight int);"\n      --query "INSERT INTO SampleCargoAppDestStream \n               SELECT weight \n               FROM SampleCargoAppInputTable;"\n\n  # Create a stream worker using JS functions.\n   gdnsl stream-worker create \n      --name "abc-stream-worker" \n      --description "my stream worker2" \n      --function "concatFn[javascript] return string {\n                      var str1 = data[0];\n                      var str2 = data[1];\n                      var str3 = data[2];\n                      var response = str1 + str2 + str3;\n                      return response;\n                  };"\n      --source "STREAM SampleScriptAppInputStream (deviceID string, roomNo int, temperature double);"\n      --table "SampleScriptAppOutputTable (id string, temperature double);"\n      --query "INSERT INTO SampleScriptAppOutputTable \n                SELECT concatFn(roomNo,\'-\',deviceID) as id, temperature\n                FROM SampleScriptAppInputStream;"\n\n  # Create a cron stream worker.\n   gdnsl stream-worker create \n      --name "cron-stream-worker" \n      --description "This app will produce an event after every 5 secondsr" \n      --trigger "MyTrigger WITH ( interval = 5 sec );"\n      --sink "STREAM SampleStream (startTime long);"\n      --table "SampleScriptAppOutputTable (id string, temperature double);"\n      --query "INSERT INTO SampleStream\n                SELECT eventTimestamp() as startTime\n                FROM MyTrigger;"\n\n  # Create a stream worker with indexes.\n   gdnsl stream-worker create \n      --name "my-stream-worker2" \n      --description "This application creates different types of indexes on a given table." \n      --table "SampleGDNTable (sensorId string, temperature double);"\n      --index "SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);"\n      --index "SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);"\n      --index "SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId)"\n      --index "SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);"\n      --index "SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);"\n\n  # Validate a stream worker.\n   gdnsl stream-worker create \n      --name "cargo-stream-worker" \n      --description "my stream worker" \n      --source "SampleCargoAppInputTable WITH \n                (type = \'database\', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type=\'json\') (weight int);"\n      --sink "STREAM SampleCargoAppDestStream (weight int);"\n      --query "INSERT INTO SampleCargoAppDestStream \n               SELECT weight \n               FROM SampleCargoAppInputTable;"\n      --validate\n\n   # Validate a stream worker from a file.\n   gdnsl stream-worker create -file "cargo-stream-worker.json" --validate\n\n  # Create a stream worker with indexes.\n   gdnsl stream-worker create \n      --name "my-rdbmc-cdc" \n      --description "This stream app will explain the usage of rdbms store extension using MySQL database" \n      --trigger "ceprdbmsTrigger WITH (interval=5 sec);"\n      --store " StockTable WITH \n                ( type="rdbms", \n                  jdbc.url="jdbc:mysql://dummy-mysql-server.com:3306/MySQLDB?useSSL=false", \n                  username="my-username", \n                  password="my-password", \n                  jdbc.driver.name="com.mysql.jdbc.Driver",\n                  field.length="symbol:100", \n                  table.check.query="SELECT 1 FROM StockTable LIMIT", \n                  PrimaryKey=\'id\', \n                  PrimaryKey=\'symbol\', \n                  Index=\'volume\') \n                  (id string, symbol string, price float, volume long);"\n      --query " INSERT INTO StockTable\n                SELECT convert(count(), \'string\')  as id, \n                      convert(count(), \'string\') as symbol, \n                      23.33f as price, \n                      eventTimestamp() as volume \n                FROM ceprdbmsTrigger; "\n\n   # Create a stream worker from a file.\n   gdnsl stream-worker create -file "cargo-stream-worker.json" --regions "gdn-us-west,gdn-ap-west"\n\n  # Create a stream worker using advanced mode\n   gdnsl stream-worker create --advanced"@App:name(\'Sample-Adhoc-Query\')\\n@App:description(\\"This application demonstrates how to send adhoc queries and fetch data from Stores and named windows.\\")\\n@App:qlVersion(\'2\')\\n\\n/**\\nTesting the Stream Application:\\n    1. Upload following data into `SampleAdhocQueryInputTable` C8DB Collection\\n        {\\"sensorId\\":\\"sensor A1234\\",\\"temperature\\":18}\\n        {\\"sensorId\\":\\"sensor A1234\\",\\"temperature\\":-32.2}\\n        {\\"sensorId\\":\\"sensor FR45\\",\\"temperature\\":20.9}\\n        {\\"sensorId\\":\\"sensor meter1\\",\\"temperature\\":49.6}\\n\\n    2. This application accumulates all the data for one minute in the named window `SampleAdhocQueryInputTableOneMinTimeWindow`\\n        Named window allows other application to query data in realtime.\\n\\n    3. Run the adhoc query on the `SampleAdhocQueryInputTableOneMinTimeWindow` (Refer [1] for running adhoc queries.)\\n        Query:\\n            select * from SampleAdhocQueryInputTableOneMinTimeWindow\\n\\n        Output:\\n            [\\n                [\\"sensor A1234\\",18],\\n                [\\"sensor A1234\\",-32.2],\\n                [\\"sensor FR45\\",20.9],\\n                [\\"sensor meter1\\",49.6]\\n            ]\\n\\n    4. Similar to Named Windows one can run adhoc queries on the stores as well. Running adhoc query on \\n        `SampleAdhocQuerySensorA1234DestTable` C8DB Collection should produce below result\\n\\n        Query: Store the result if sensorId is equal to \\"sensor A1234\\"\\n            SELECT * FROM SampleAdhocQuerySensorA1234DestTable\\n\\n        Output:\\n            [\\n                [\\"sensor A1234\\",18],\\n                [\\"sensor A1234\\",-32.2]\\n            ]\\n\\n    [1] https://macrometa.dev/cep/quickstart/#run-an-adhoc-query\\n*/\\n\\n-- Defines `SampleAdhocQueryInputTable` collection to process events having `sensorId` and `temperature`(F).\\nCREATE SOURCE SampleAdhocQueryInputTable WITH(type = \'database\', collection = \\"SampleAdhocQueryInputTable\\", collection.type=\\"doc\\" , replication.type=\\"global\\", map.type=\'json\') (sensorId string, temperature double);\\n\\n-- Named Window\\nCREATE WINDOW SampleAdhocQueryInputTableOneMinTimeWindow (sensorId string, temperature double) SLIDING_TIME(1 min);\\n\\n-- Table\\nCREATE TABLE SampleAdhocQuerySensorA1234DestTable(sensorId string, temperature double);\\n\\n@info(name = \'Insert-to-window\')\\nINSERT INTO SampleAdhocQueryInputTableOneMinTimeWindow\\nSELECT *\\nFROM SampleAdhocQueryInputTable;\\n\\n@info(name = \'EqualsFilter\')\\n-- Note: Filter out events with `sensorId` equalling `sensor A1234`\\nINSERT INTO SampleAdhocQuerySensorA1234DestTable\\nSELECT *\\nFROM SampleAdhocQueryInputTable\\nWHERE sensorId == \'sensor A1234\';\\n" --regions "gdn-us-west,gdn-ap-west"\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  -h, --help                  Help to create a stream worker.\n      --name string           Stream worker name. Mandatory field.\n      --description           Stream worker description. Mandatory field.\n      --source                Source definition. Can be provided multiple times.\n      --sink                  Sink definition. Can be provided multiple times.\n      --trigger               Trigger definition. Can be provided only once. \n      --store                 Store definition. Can be provided multiple times.\n      --query                 Stream query. Can be provided multiple times.\n      --table                 Table definition. Can be provided multiple times. \n      --index                 Index definition. Can be provided multiple times.\n      --function              JS function definition. Can be provided multiple times.\n      --advanced string       Complete stream worker definiton as string.\n      --file   string         Json file from where the stream worker definition is to be read from.\n      --regions string        Comma separated regions where stream workers should be deployed. Default to local region.\n      --validate              Validate stream worker definition. Stream worker will not be created.\n      --fabric                Name of the fabric to use\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options inherited:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"      --config string  gdnsl config file (default is ./gdnsl.yaml)\n")),(0,a.kt)("h2",{id:"gdnsl-stream-worker-delete"},"gdnsl stream-worker delete"),(0,a.kt)("p",null,"Delete a stream worker."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  gdnsl stream-worker delete <stream-worker-name>\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Examples:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  # Delete a stream worker.\n  gdnsl stream-worker delete TestStreamWorker\n\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  -h, --help                  Help to describe stream workers.\n  --fabric                    Name of the fabric to use.\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options inherited:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"      --config string         gdnsl config file (default is ./gdnsl.yaml)\n")),(0,a.kt)("h2",{id:"gdnsl-stream-worker-describe"},"gdnsl stream-worker describe"),(0,a.kt)("p",null,"Describe a stream worker."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  gdnsl stream-worker describe <stream-name>\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Examples:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"\n  # Describe a stream worker.\n  gdnsl stream-worker describe TestStreamWorker\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  -h, --help                  Help to describe stream workers.\n      --fabric                Name of the fabric to use.\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options inherited:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"--config string         gdnsl config file (default is ./gdnsl.yaml)\n")),(0,a.kt)("h2",{id:"gdnsl-stream-worker-list"},"gdnsl stream-worker list"),(0,a.kt)("p",null,"List stream workers."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  gdnsl stream-worker list [flags]\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Examples:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"\n  # List stream workers.\n  gdnsl stream-worker list\n\n  # List sample stream workers.\n  gdnsl stream-worker list --sample\n\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  -h, --help                  Help to list stream workers.\n      --sample                List sample stream workers.\n      --fabric                Name of the fabric to use.\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options inherited:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"      --config string         gdnsl config file (default is ./gdnsl.yaml)\n")),(0,a.kt)("h2",{id:"gdnsl-stream-worker-update"},"gdnsl stream-worker update"),(0,a.kt)("p",null,"Update a stream worker."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  gdnsl stream-worker update <stream-worker-name> [flags]\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Examples:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'\n  # Update a simple stream worker.\n   gdnsl stream-worker update \n      --name "cargo-stream-worker" \n      --description "my stream worker" \n      --source "SampleCargoAppInputTable WITH \n                (type = \'database\', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type=\'json\') (weight int);"\n      --sink "STREAM SampleCargoAppDestStream (weight int);"\n      --query "INSERT INTO SampleCargoAppDestStream \n               SELECT weight \n               FROM SampleCargoAppInputTable;"\n\n  # Update a stream worker using JS functions.\n   gdnsl stream-worker update \n      --name "abc-stream-worker" \n      --description "my stream worker2" \n      --function "concatFn[javascript] return string {\n                      var str1 = data[0];\n                      var str2 = data[1];\n                      var str3 = data[2];\n                      var response = str1 + str2 + str3;\n                      return response;\n                  };"\n      --source "STREAM SampleScriptAppInputStream (deviceID string, roomNo int, temperature double);"\n      --table "SampleScriptAppOutputTable (id string, temperature double);"\n      --query "INSERT INTO SampleScriptAppOutputTable \n                SELECT concatFn(roomNo,\'-\',deviceID) as id, temperature\n                FROM SampleScriptAppInputStream;"\n\n  # Update a cron stream worker.\n   gdnsl stream-worker update \n      --name "cron-stream-worker" \n      --description "This app will produce an event after every 5 secondsr" \n      --trigger "MyTrigger WITH ( interval = 5 sec );"\n      --sink "STREAM SampleStream (startTime long);"\n      --table "SampleScriptAppOutputTable (id string, temperature double);"\n      --query "INSERT INTO SampleStream\n                SELECT eventTimestamp() as startTime\n                FROM MyTrigger;"\n\n  # Update a stream worker with indexes.\n   gdnsl stream-worker update \n      --name "my-stream-worker2" \n      --description "This application creates different types of indexes on a given table." \n      --table "SampleGDNTable (sensorId string, temperature double);"\n      --index "SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);"\n      --index "SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);"\n      --index "SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId)"\n      --index "SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);"\n      --index "SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);"\n\n  # Validate a stream worker.\n   gdnsl stream-worker update \n      --name "cargo-stream-worker" \n      --description "my stream worker" \n      --source "SampleCargoAppInputTable WITH \n                (type = \'database\', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type=\'json\') (weight int);"\n      --sink "STREAM SampleCargoAppDestStream (weight int);"\n      --query "INSERT INTO SampleCargoAppDestStream \n               SELECT weight \n               FROM SampleCargoAppInputTable;"\n      --validate\n\n   # Validate a stream worker from a file.\n   gdnsl stream-worker update --file "cargo-stream-worker.json" --validate\n\n  # Update a stream worker with indexes.\n   gdnsl stream-worker update \n      --name "my-rdbmc-cdc" \n      --description "This stream app will explain the usage of rdbms store extension using MySQL database" \n      --trigger "ceprdbmsTrigger WITH (interval=5 sec);"\n      --store " StockTable WITH \n                ( type="rdbms", \n                  jdbc.url="jdbc:mysql://dummy-mysql-server.com:3306/MySQLDB?useSSL=false", \n                  username="my-username", \n                  password="my-password", \n                  jdbc.driver.name="com.mysql.jdbc.Driver",\n                  field.length="symbol:100", \n                  table.check.query="SELECT 1 FROM StockTable LIMIT", \n                  PrimaryKey=\'id\', \n                  PrimaryKey=\'symbol\', \n                  Index=\'volume\') \n                  (id string, symbol string, price float, volume long);"\n      --query " INSERT INTO StockTable\n                SELECT convert(count(), \'string\')  as id, \n                      convert(count(), \'string\') as symbol, \n                      23.33f as price, \n                      eventTimestamp() as volume \n                FROM ceprdbmsTrigger; "\n\n   # Update a stream worker from a file.\n   gdnsl stream-worker update --file "cargo-stream-worker.json" --regions "gdn-us-west,gdn-ap-west"\n')),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"  -h, --help                  Help to create a stream worker.\n      --name string           Stream worker name. Mandatory field.\n      --description           Stream worker description. Mandatory field.\n      --source                Source definition. Can be provided multiple times.\n      --sink                  Sink definition. Can be provided multiple times.\n      --trigger               Tigger definition. Can be provided only once. \n      --store                 Store definition. Can be provided multiple times.\n      --query                 Stream query. Can be provided multiple times.\n      --table                 Table definition. Can be provided multiple times. \n      --index                 Index definition. Can be provided multiple times.\n      --function              JS function definition. Can be provided multiple times.\n      --advanced string       Complete stream worker definiton as string\n      --file   string         Json file from where the stream worker definition is to be read from\n      --regions string        Comma separated regions where stream workers should be deployed. Default to local region.\n      --validate              Validate stream worker definition. Stream worker will not be updated.\n      --fabric                Name of the fabric to use.\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Options inherited:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"      --config string         gdnsl config file (default is ./gdnsl.yaml)\n")))}d.isMDXComponent=!0}}]);