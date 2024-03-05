---
sidebar_position: 20
title: Get Started with Fingerprint
---

To incorporate the Fingerprint client into your website, add one of the following example scripts to your web page. In each example, replace the `DS_URL` placeholder with the data service URL that Macrometa provides you.

After you incorporate the Fingerprint client, you should [integrate Fingerprint as a first-party](integrate-fingerprint.md). Fingerprint will work if you do not follow the first-party integration steps, but accuracy will be lower and some browsers will block the functionality.

## Fingerprint on Page Load

In this example, the JavaScript is loaded at page load time, and the function to get the visitorId is run right away. The visitorId is returned in the response header (x-photoniq-vid) and the JSON body’s response (visitorId).

```html
<body>
    <!-- Content of your body here... -->

    <!-- Get the script in your application -->
    <script src="https://<HOST-TO-DS-SERVICE>/api/ds/v1"></script>
    <script>
        async function recordVisit() {
            try {
                // Initialize the agent at application startup.
                const dsClient = await DS_Client.load();

                // Get the visitor details
                const dsData = await dsClient.get();

                // Record a visit in the server
                const response = await fetch("https://<HOST-TO-DS-SERVICE>/api/ds/v1/visits", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "apikey <DS-APIKEY>"
                    },
                    body: JSON.stringify(dsData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseBody = await response.json();
                console.log(responseBody);
            } catch (error) {
                console.error(error);
            }
        }

        recordVisit();
    </script>
</body>
```

## Fingerprint on Button Click

In this example, the JavaScript is initially loaded at page load time, and a function is created that is tied to a button. Once the button is clicked, a call is made to the fingerprint server, which returns the visitorId. The visitorId is returned in the response header (x-photoniq-vid) and the JSON body’s response (visitorId).

```html
<html>
<head>
    <script src="https://<HOST-TO-DS-SERVICE>/api/ds/v1"></script>
</head>

<body>
    <!-- Button to trigger the getVisitorDetails function -->
    Button: <button onclick="getVisitorDetails()">Get DS Data</button>

    <script>
        window.dsPromise = DS_Client.load();

        async function getDSData() {
            try {
                const ds = await window.dsPromise;
                return ds.get();
            } catch (error) {
                console.error("Error fetching DS data:", error);
            }
        }

        async function recordVisit(ds_data) {
            try {
                const response = await fetch("https://<HOST-TO-DS-SERVICE>/api/ds/v1/visits", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "apikey <DS-APIKEY>"
                    },
                    body: JSON.stringify(ds_data)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                console.log("Visitor ID from header:", response.headers.get('X-Photoniq-Vid'));
                return response.json();
            } catch (error) {
                console.error("Error recording visit:", error);
            }
        }

        async function getVisitorDetails() {
            try {
                const ds_data = await getDSData();
                const data = await recordVisit(ds_data);

                console.log("Visitor ID from response:", data.visitorId);
                console.log("Confidence Score:", data.visit.confidence.matchScore);
                window.alert('Visitor ID from response: ' + data.visitorId);
            } catch (error) {
                console.error("Error in getVisitorDetails:", error);
            }
        }
    </script>
</body>
</html>
```

## Fingerprint on Text Input

In this example, the visitorId is fetched when a user enters text in the input field.

```html
<html>
<head>
    <script src="https://<HOST-TO-DS-SERVICE>/api/ds/v1"></script>

    <script>
        window.addEventListener('DOMContentLoaded', (event) => {
            window.dsPromise = DS_Client.load();
            let fetchPromise;

            async function initiateDSFetch() {
                try {
                    const ds = await window.dsPromise;
                    const ds_data = await ds.get();
                    return fetch("https://<HOST-TO-DS-SERVICE>/api/ds/v1/visits", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "apikey <DS-APIKEY>"
                        },
                        body: JSON.stringify(ds_data)
                    });
                } catch (e) {
                    console.error("Error initiating DS fetch:", e);
                }
            }

            async function initiateFetch() {
                if (!fetchPromise) {
                    fetchPromise = initiateDSFetch();
                }
            }

            async function getVisitorDetails() {
                try {
                    if (fetchPromise) {
                        const res = await fetchPromise;
                        console.log("Visitor ID from header:", res.headers.get('x-photoniq-vid'));
                        const data = await res.json();
                        console.log("Visitor ID from response:", data.visitorId);
                        window.alert('Visitor ID from response: ' + data.visitorId);
                    } else {
                        console.log("Data not fetched yet or there was an issue initializing the fetch.");
                    }
                } catch (e) {
                    console.error(e);
                }
            }

            document.querySelector('input').addEventListener('input', initiateFetch);
            document.querySelector('button').addEventListener('click', getVisitorDetails);
        });
    </script>
</head>

<body>
    <!-- Input field to trigger fetch when typing starts -->
    <input type="text" placeholder="Start typing...">

    <!-- Button to trigger the getVisitorDetails function -->
    <button>Get DS Data</button>
</body>

</html>
```

## Fingerprint with Google Tag Manager

Here is an example of the JavaScript being loaded by Google’s Tag Manager. The vistorId is sent to the JavaScript console.

```html
<body>
    <!-- Get the script in your application -->
    <script src="https://<HOST-TO-DS-SERVICE>/api/ds/v1"></script>
    <script>
        function initializeDSClient() {
            return DS_Client.load().catch(function(error) {
                console.error("Error initializing DS Client:", error);
            });
        }

        function getDSData(dsClient) {
            return dsClient.get().catch(function(error) {
                console.error("Error fetching DS data:", error);
            });
        }

        function sendVisitRecord(dsData) {
            return fetch("https://<HOST-TO-DS-SERVICE>/api/ds/v1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "apikey <DS-APIKEY>"
                },
                body: JSON.stringify(dsData)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(responseBody) {
                console.log(responseBody);
            })
            .catch(function(error) {
                console.error("Error recording visit:", error);
            });
        }

        function initializeAndSendData() {
            initializeDSClient()
            .then(function(dsClient) {
                return getDSData(dsClient);
            })
            .then(function(dsData) {
                return sendVisitRecord(dsData);
            })
            .catch(function(error) {
                console.error("Error in initializeAndSendData:", error);
            });
        }

        initializeAndSendData();
    </script>
</body>
```

## Fingerprint Response Headers

Fingerprint returns the following headers in the response:

- `x-photoniq-dsid` - The device signature
- `x-photoniq-vid` - The visitor ID
