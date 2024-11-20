---
title: Working with GDN Documents Using PhotonIQ Functions
---

[GDN (Global Data Network) Document Collections](/docs/collections/documents/index.md) are schema-free stores that hold JSON documents. Each document is uniquely identified by a `_key`. These collections are globally distributed, ensuring low-latency access to data across multiple regions. [PhotonIQ Functions](/docs/photoniq/functions/index.md) is an edge-computing service that allows you to run your serverless applications smoothly. By using PhotonIQ functions to interact with GDN collections, you can create flexible APIs for efficient data management.

In this tutorial, you’ll build a PhotonIQ function to:
- Add a new document to a GDN collection.
- Retrieve existing documents by their `_key`.

This guide will walk you through the steps to build and deploy this function, making it easy to create globally distributed and scalable applications.

## Prerequisites

Before you begin, ensure you have the following ready:

1. **Macrometa Account**  
   You need a Macrometa account with permissions to create collections and access APIs.

2. **PhotonIQ CLI**  
   Install the PhotonIQ CLI to manage and deploy functions. Follow these steps:

   - Install Rust and WebAssembly libraries. Run this command:
     ```bash
     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
     rustup target add wasm32-wasi
     ```

   - Install the PhotonIQ CLI using npm:
     ```bash
     npm i -g @macrometa/faas
     ```

   - Verify the CLI installation:
     ```bash
     faas help
     ```

Once these prerequisites are in place, you’re ready to start building.

## Step 1: Create a GDN Collection

The first step is to create the GDN collection where your documents will be stored.

1. Log in to the **Macrometa GDN Dashboard**.
2. From the side menu, go to **Data > Collections**.
3. Click **New Collection** and choose **Document** as the collection type.
4. Provide a **Collection Name** (e.g., `test`) and click **Create**.

Your collection is now ready to store and retrieve documents.

### Gather Your GDN Credentials
Before moving to the next step, make sure you have the following details from your Macrometa account:

- **gdnKey**: Your **API Key** for authenticating with GDN.  
- **gdnUrl**: The **GDN API URL** for your region.  
- **gdnFabric**: The name of your **fabric** (usually `_system` by default).  
- **gdnCollection**: The name of the collection you just created (e.g., `myDocuments`).  

These credentials will be required to connect your PhotonIQ function to the GDN collection.

## Step 2: Create a PhotonIQ Function

PhotonIQ Functions support multiple languages, including Rust, JavaScript, Next.js, and Node.js. In this tutorial, we will use JavaScript.

To create a new Javascript function:

1. Scaffold a new project using the PhotonIQ CLI:
   ```bash
   faas new myProject --lang js
   ```
   If successful, the CLI outputs:
   ```bash
   Template function has been created in path: functions/<projectName>
   Configuration can be modified in the file: functions/<projectName>/photoniq.toml
   ```

2. Navigate to the newly created project directory:
   ```bash
   cd functions/myProject
   ```

3. Open the `index.js` file in your preferred editor. This is where you will write the function logic.

Once the function is created, proceed to write its logic.

## Step 3: Writing the PhotonIQ Function

The core of the function logic will be defined in the `index.js` file. The function will handle two operations:
- Creating a new document in the GDN collection.
- Fetching an existing document from the GDN collection.

### Set Up request handling

Start by setting up the function to handle incoming HTTP requests and validate the input:

1. Open `index.js` and add the following code:
   ```javascript
   addEventListener("handler", async (event) => {
     const bodyObject = await event.request.json();

     // Validate operation
     if (!bodyObject.isRead && !bodyObject.isWrite) {
       return event.respondWith(
         new HttpResponseBuilder().body("No operation specified").build()
       );
     }
   });
   ```

   The function uses `isRead` or `isWrite` flags in the request body to determine the operation.  
   - `isRead`: Fetch an existing document.  
   - `isWrite`: Create a new document.

2. Next, define the parameters expected in the request body:
   ```javascript
   const {
     gdnKey,
     gdnUrl,
     gdnFabric,
     gdnCollection,
     newDocumentBody,
     existingDocumentKey,
   } = bodyObject;

   let result = "";
   ```
   The request body should include the following fields:
   - **gdnKey**: API Key for authentication.
   - **gdnUrl**: GDN API URL for your region.
   - **gdnFabric**: Name of the fabric (default: `_system`).
   - **gdnCollection**: Name of the GDN collection.
   - **newDocumentBody**: Data for creating a new document (required for `isWrite`).
   - **existingDocumentKey**: Document key for fetching an existing document (required for `isRead`).


### Read Operation: Fetch an Existing Document

To fetch a document using its `_key`, add the following logic inside the event listener:

```javascript
  if (bodyObject.isRead) {
    const gdnApiEndpoint = `${gdnUrl}/_fabric/${gdnFabric}/_api/document/${gdnCollection}/${gdnDocumentKey}`;

    try {
      const response = await new HttpRequestBuilder(gdnApiEndpoint)
        .method(HttpMethod.GET)
        .header("Authorization", `apikey ${gdnKey}`)
        .build()
        .send();

      if (response.status === 200) {
        result = response.json();
      } else if (response.status === 401 || response.status === 403) {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body("Authentication or authorization failed.")
            .build()
        );
      } else {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body(
              `Failed to retrieve data from GDN. Status code: ${response.status}`
            )
            .build()
        );
      }
    } catch (error) {
      return event.respondWith(
        new HttpResponseBuilder()
          .status(500)
          .body(`Failed to send request to GDN API: ${error.message}`)
          .build()
      );
    }
  }
```

This code sends a request to the [Read Document API](https://www.macrometa.com/docs/api#/operations/readDocument) with the `existingDocumentKey` to fetch the document.


### Write Operation: Create a New Document

To create a document in the collection, add the following logic:

```javascript
  if (bodyObject.isWrite) {

    const gdnApiEndpoint = `${gdnUrl}/_fabric/${gdnFabric}/_api/document/${gdnCollection}`;

    try {
      const response = await new HttpRequestBuilder(gdnApiEndpoint)
        .method(HttpMethod.POST)
        .header("Authorization", `apikey ${gdnKey}`)
        .body(JSON.stringify(newDocumentBody))
        .build()
        .send();
        
      if (response.status === 202) {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body(`Document succesfully created`)
            .build()
        );
      } else if (response.status === 401 || response.status === 403) {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body("Authentication or authorization failed.")
            .build()
        );
      } else {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body(`Failed to save data to GDN. Status code:`)
            .build()
        );
      }
    } catch (error) {
      return event.respondWith(
        new HttpResponseBuilder()
          .status(500)
          .body(`Failed to send request to GDN API: ${error.message}`)
          .build()
      );
    }
  } else {
    gdnDocumentKey = existingDocumentKey;
  }
```

This sends a request with the `newDocumentBody` to the [Create Document API](https://www.macrometa.com/docs/api#/operations/insertDocument) to create a new document in the collection.

### Return the response

Finally, return the processed result back to the client:

```javascript
return event.respondWith(
  new HttpResponseBuilder().body(result).build()
);
```


### Finalized  function code

After you're done, your `index.js` file should look like this:

``` javascript
addEventListener("handler", async (event) => {
  const bodyObject = event.request.json();

  if (!bodyObject.isRead && !bodyObject.isWrite) {
    return event.respondWith(
      new HttpResponseBuilder().body("Nothing to do").build()
    );
  }

  const {
    gdnKey,
    gdnUrl,
    gdnFabric,
    gdnCollection,
    newDocumentBody,
    existingDocumentKey,
  } = bodyObject;
  let gdnDocumentKey;
  let result = "";

  if (bodyObject.isWrite) {

    const gdnApiEndpoint = `${gdnUrl}/_fabric/${gdnFabric}/_api/document/${gdnCollection}`;

    try {
      const response = await new HttpRequestBuilder(gdnApiEndpoint)
        .method(HttpMethod.POST)
        .header("Authorization", `apikey ${gdnKey}`)
        .body(JSON.stringify(newDocumentBody))
        .build()
        .send();
        
      if (response.status === 202) {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body(`Document succesfully created`)
            .build()
        );
      } else if (response.status === 401 || response.status === 403) {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body("Authentication or authorization failed.")
            .build()
        );
      } else {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body(`Failed to save data to GDN. Status code:`)
            .build()
        );
      }
    } catch (error) {
      return event.respondWith(
        new HttpResponseBuilder()
          .status(500)
          .body(`Failed to send request to GDN API: ${error.message}`)
          .build()
      );
    }
  } else {
    gdnDocumentKey = existingDocumentKey;
  }

  if (bodyObject.isRead) {
    const gdnApiEndpoint = `${gdnUrl}/_fabric/${gdnFabric}/_api/document/${gdnCollection}/${gdnDocumentKey}`;

    try {
      const response = await new HttpRequestBuilder(gdnApiEndpoint)
        .method(HttpMethod.GET)
        .header("Authorization", `apikey ${gdnKey}`)
        .build()
        .send();

      if (response.status === 200) {
        result = response.json();
      } else if (response.status === 401 || response.status === 403) {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body("Authentication or authorization failed.")
            .build()
        );
      } else {
        return event.respondWith(
          new HttpResponseBuilder()
            .status(response.status)
            .body(
              `Failed to retrieve data from GDN. Status code: ${response.status}`
            )
            .build()
        );
      }
    } catch (error) {
      return event.respondWith(
        new HttpResponseBuilder()
          .status(500)
          .body(`Failed to send request to GDN API: ${error.message}`)
          .build()
      );
    }
  }

  return event.respondWith(new HttpResponseBuilder().body(result).build());
});
```

## Step 4: Configure the Function

Update the `photoniq.toml` file to define the necessary HTTP methods and allowed hosts for your function:

```title='photoniq.toml'
allowed_methods = ["GET", "POST"]
allowed_hosts = ["<GDN_API_HOST>", "<FUNCTION_SERVER_HOST>"]
```

Replace `<GDN_API_HOST>` with the host of your GDN instance and `<FUNCTION_SERVER_HOST>` with your function server host. This configuration ensures your function can handle HTTP requests and communicate with the appropriate services.

## Step 5: Test the Function

### Test the function locally

1. Start the local server using the following command:
   ```bash
   faas run
   ```
   By default, the server will be hosted on `http://localhost:8080`.

2. Test the function by sending requests to `http://127.0.0.1:8080/<projectName>` using tools like `curl`, Postman, or any HTTP client.

**Example: Create a New Document**

To create a new document, send a `GET` request with the following `curl` command:

```bash
curl --location 'http://127.0.0.1:8080/<projectName>' \
--header 'Authorization: apikey <YOUR_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
    "isWrite": true,
    "gdnKey": "<YOUR_API_KEY>",
    "gdnUrl": "https://<GDN_API_URL>",
    "gdnFabric": "_system",
    "gdnCollection": "<collection-name>",
    "newDocumentBody": {
        "item": "sample data"
    }
}'
```

Replace:
- `<YOUR_API_KEY>` with your API key.
- `<GDN_API_URL>` with your GDN URL.
- `<collection-name>` with the name of your GDN collection.

After sending the request, check your GDN collection. You should see the document created successfully.

**Example: Fetch an Existing Document**

To retrieve a document using its `_key`, send the following `GET` request:

```bash
curl --location 'http://127.0.0.1:8080/<projectName>' \
--header 'Authorization: apikey <YOUR_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
    "isRead": true,
    "gdnKey": "<YOUR_API_KEY>",
    "gdnUrl": "https://<GDN_API_URL>",
    "gdnFabric": "_system",
    "gdnCollection": "<collection-name>",
    "existingDocumentKey": "<DOCUMENT_KEY>"
}'
```

Replace:
- `<YOUR_API_KEY>` with your API key.
- `<GDN_API_URL>` with your GDN URL.
- `<collection-name>` with the name of your GDN collection.
- `<DOCUMENT_KEY>` with the `_key` of the document you want to fetch.


### Test the function remotely

To deploy and test your function on the PhotonIQ remote server:

1. Contact your Macrometa representative to obtain authentication credentials for the PhotonIQ Functions remote server. You’ll need:
   - **API_KEY**
   - **API_URL**

2. Deploy the function remotely using the `faas remote deploy` command:
   ```bash
   faas remote deploy <projectName>
   ```

   Replace `<projectName>` with the name of your project.

3. After successful deployment, use the PhotonIQ [Execute Function API](https://www.macrometa.com/docs/apiFaas#/operations/handle_latest_mm_execute) to test the function. The request format and body will remain the same as in the local test examples.  The request will be similar to this:

   ```bash
   curl -X 'POST' \
  'https://<REMOTE_FUNCTION_URL>/api/faas/v1/execute/<functionName>' \
  -H 'accept: */*' \
  -H 'Authorization: apikey <YOUR_API_KEY>' \
  -H 'Content-Type: application/json' \
  -d '<YOUR_REQUEST_BODY>'
   ```

Replace  the following :
- `<REMOTE_FUNCTION_URL>` with the remote URL of your deployed function 
- `<YOUR_REQUEST_BODY>` with the respective JSON payload for creating or fetching a document
- `<functionName>` with the name of the project or function.



## Conclusion

Well done! You’ve built and deployed a PhotonIQ function to manage GDN document collections. With this foundation, you can now create powerful APIs that leverage Macrometa’s globally distributed infrastructure.

To take this further, explore additional operations like updating or deleting documents, or integrate your API into larger applications. With Macrometa, you have the tools to create fast, scalable, and real-time solutions.