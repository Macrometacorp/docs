---
sidebar_position: 10
title: Get Started with Fingerprinting
---

To incorporate the Digital Fingerprinting client into your website, add one of the following example scripts to your web page. In each example, replace the `DS_URL` placeholder with the data service URL that Macrometa provided you.

## Fingerprint on Button Click

In this example, the JavaScript is initially loaded at page load time, and a function is created that is tied to a button. Once the button is clicked, a call is made to the fingerprint server, which returns the visitorId. The visitorId is returned in the response header (x-photoniq-vid) and the JSON body’s response (visitorId).

```jsx
<html>
<header>
    <script>
        // Replace all DS_URL with your provided values
        const DS_URL = "<URL-TO-DS-SERVICE>";
       
        const VISIT_API_ENDPOINT = `${DS_URL}/visits`;

        // Dynamically load the script when the page loads
        window.onload = function () {
            var script = document.createElement('script');
            script.src = DS_URL;
            script.onload = function () {
                // Initialize the agent at startup.
                var dsPromise = DS_Client.load();
                window.dsPromise = dsPromise;  // Make it globally accessible
            };
            document.body.appendChild(script);
        };

        // Function to get visitor details when button is clicked
        function getVisitorDetails() {
            // Use the globally accessible dsPromise
            window.dsPromise.then((ds) => ds.get()).then((ds_data) => {
                // Record a visit in the server
                fetch(VISIT_API_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      
                    },
                    body: JSON.stringify(ds_data)
                })
                    .then(res => {
                        console.log("API call done!");
                        // The visitor id is returned in the response header and in the response body
                        // We are logging it from the header to the console
                        console.log("Visitor ID from header:", res.headers.get('x-photoniq-vid'));
                        return res.json();
                    })
                    .then(data => {
                        console.log("visitor id from response:", data.visitorId);
												console.log("Confidnece Score:", data.visit.confidence.matchScore);
                        // Displaying a popup after getting visitorId from the response
                        window.alert('Visitor ID from response: ' + data.visitorId);
                    })
                    .catch(e => {
                        console.log("API call failed");
                        console.error(e);
                    });
            });
        }
    </script>
</header>

<body>
    <!-- Button to trigger the getVisitorDetails function -->
    Button: <button onclick="getVisitorDetails()">Get DS Data</button>
</body>
</html>
```

## Fingerprint on Page Load

In this example, the JavaScript is loaded at page load time, and the function to get the visitorId is run right away.

```jsx
<html>
<head>
    <script>
        // Constants
        const DS_URL = "<URL-TO-DS-SERVICE>";
       
        const VISIT_API_ENDPOINT = `${DS_URL}/visits`;

        let fetchPromise;

        // Dynamically load the script when the page loads
        window.onload = function () {
            var script = document.createElement('script');
            script.src = DS_URL;
            script.onload = function () {
                // Initialize the agent at startup.
                var dsPromise = DS_Client.load();
                window.dsPromise = dsPromise;  // Make it globally accessible

                // Start the fetch request as soon as the DS_Client is loaded.
                window.dsPromise.then((ds) => ds.get()).then((ds_data) => {
                    fetchPromise = fetch(VISIT_API_ENDPOINT, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
 
                        },
                        body: JSON.stringify(ds_data)
                    });
                });
            };
            document.body.appendChild(script);
        };

        // Function to handle visitor details when button is clicked
        function getVisitorDetails() {
            if (fetchPromise) {
                fetchPromise
                .then(res => {
                    console.log("API call done!");
                    console.log("Visitor ID from header:", res.headers.get('x-photoniq-vid'));
                    return res.json();
                })
                .then(data => {
                    console.log("Visitor ID from response:", data.visitorId);
                    window.alert('Visitor ID from response: ' + data.visitorId);
                })
                .catch(e => {
                    console.log("API call failed");
                    console.error(e);
                });
            } else {
                console.log("Data not fetched yet or there was an issue initializing the fetch.");
            }
        }
    </script>
</head>

<body>
    <!-- Button to trigger the getVisitorDetails function -->
    Button: <button onclick="getVisitorDetails()">Get DS Data</button>
</body>

</html>
```

### Fingerprint on Text Input

Perform a fetch call when a user starts entering some text in an input field. Here's an example:

```jsx
<html>
<head>
    <script>
        // Constants
        const DS_URL = "<URL-TO-DS-SERVICE>";
      
        const VISIT_API_ENDPOINT = `${DS_URL}/visits`;

        let fetchPromise;

        // Function to trigger fetch when someone types in the input field
        function initiateFetch() {
            // Check if fetchPromise is undefined to ensure fetch is called only once
            if (!fetchPromise) {
                window.dsPromise.then((ds) => ds.get()).then((ds_data) => {
                    fetchPromise = fetch(VISIT_API_ENDPOINT, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                          
                        },
                        body: JSON.stringify(ds_data)
                    });
                });
            }
        }

        // Function to handle visitor details when button is clicked
        function getVisitorDetails() {
            if (fetchPromise) {
                fetchPromise
                .then(res => {
                    console.log("API call done!");
                    console.log("Visitor ID from header:", res.headers.get('x-photoniq-vid'));
                    return res.json();
                })
                .then(data => {
                    console.log("Visitor ID from response:", data.visitorId);
                    window.alert('Visitor ID from response: ' + data.visitorId);
                })
                .catch(e => {
                    console.log("API call failed");
                    console.error(e);
                });
            } else {
                console.log("Data not fetched yet or there was an issue initializing the fetch.");
            }
        }

        // Dynamically load the DS client script
        window.onload = function () {
            var script = document.createElement('script');
            script.src = DS_URL;
            script.onload = function () {
                var dsPromise = DS_Client.load();
                window.dsPromise = dsPromise;  // Make it globally accessible
            };
            document.body.appendChild(script);
        };

    </script>
</head>

<body>
    <!-- Input field to trigger fetch when typing starts -->
    <input type="text" oninput="initiateFetch()" placeholder="Start typing...">

    <!-- Button to trigger the getVisitorDetails function -->
    <button onclick="getVisitorDetails()">Get DS Data</button>
</body>

</html>
```

### Fingerprint with Google Tag Manager

Here is an example of the JavaScript being loaded by Google’s Tag Manager. The VistorId is sent to the JavaScript console.

```jsx
<body>
    <!-- Get the script in your application -->
    <script src="<URL-TO-DS-SERVICE>"></script>
    <script>
        // Initialize the agent at application startup.
        var dsPromise = DS_Client.load();

        // Get the visitor details
        dsPromise.then(function(ds) {
            return ds.get();
        }).then(function(ds_data) {
            // Record a visit in the server
            fetch("<URL-TO-DS-SERVICE>/visits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  
                },
                body: JSON.stringify(ds_data)
            })
            .then(function(res) {
                return res.json().then(function(b) {
                    console.log(b);
                });
            })
            .catch(function(e) {
                console.error(e);
            });
        });
    </script>
</body>
```

## Digital Fingerprinting Response Headers

Digital Fingerprinting returns the following headers in the response:

- `x-photoniq-dsid` - The device signature
- `x-photoniq-vid` - The visitor ID
