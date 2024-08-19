import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Running this code initializes a server connection to the specified region URL. Before attempting a connection, ensure to [authenticate your account](../account-management/auth/index.md) and have your details ready to enable a successful connection.  

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Import libraries
from c8 import C8Client

# Define constants. You can find these constants in the GUI
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "my API key" # Change this to your API key

print("--- Connecting to GDN")

# Choose one of the following methods to access the GDN. API key is recommended.

# Authenticate with API key
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Authenticate with JWT
# client = C8Client(protocol='https', host=URL, port=443, token=<your token>, geofabric=GEO_FABRIC))

# Authenticate with email and password
# client = C8Client(protocol='https', host=URL, port=443, email=<your email id>, password=<your password>, geofabric=GEO_FABRIC)
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

```js
const jsc8 = require("jsc8");

// Choose one of the following methods to access the GDN. API key is recommended.
// API key
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});

// JSON Web Token
// const client = new jsc8({url: "https://play.paas.macrometa.io", token: "XXXX", fabricName: '_system'});

// Or use email and password to authenticate client instance
// const client = new jsc8("https://play.paas.macrometa.io");
// Replace values with your email and password (use it inside an async function).
// await client.login("nemo@nautilus.com", "xxxxxx"); 
```

</TabItem>
</Tabs>
