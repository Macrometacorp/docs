When this code runs, it initializes the server connection to the specified region URL. For more information about connecting to GDN, refer to [Authentication](../account-management/auth/index.md).

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
# Import libraries
from operator import concat
import base64
import json
import warnings
from c8 import C8Client
warnings.filterwarnings("ignore")

# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "my API key" # Change this to your API key

print("--- Connecting to GDN")

# Choose one of the following methods to access the GDN. API key is recommended.

# Authenticate with API key
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)

# Authenticate with JWT
# client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443, token=<your token>)
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const jsc8 = require("jsc8");

// Choose one of the following methods to access the GDN. API key is recommended.
// API key
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});

// JSON Web Token
// const client = new jsc8({url: "https://play.paas.macrometa.io", token: "XXXX", fabricName: '_system'});

// Or use email and password to authenticate client instance
// const client = new jsc8("https://play.paas.macrometa.io");
// Replace values with your email and password.
// await client.login("nemo@nautilus.com", "xxxxxx"); 
```

</TabItem>
</Tabs>
