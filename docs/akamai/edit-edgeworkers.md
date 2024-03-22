---
sidebar_position: 60
title: Edit EdgeWorkers
---

You can edit a specific EdgeWorker by downloading the code bundle and then editing the files.

:::note
This feature is currently in preview.
:::

To test an existing function:

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Compute > Functions**.
3. Click the EdgeWorker that you want to edit.
4. Click **Versions**.
5. Next the the version that you want to edit, click the three stacked dots and then click **Download source bundle**.
   A .tar file containing the following files is downloaded to your computer:

   - **client.js**
     - Defines endpoints and logic for executing the query worker to fetch the next batch.
     - For EdgeWorkers involved in stream querying, it posts queries to the stream worker code.
     - In cases of stream publishing, it handles posting messages to the configured stream.
   - **config.js**
     - Central configuration for all supported EdgeWorkers, defining essential variables.
     - `C8_URL`: Specifies the GDN URL.
     - `Fabric`: Identifies the fabric to connect to.
     - `MACROMETA_ORIGIN_NAME`: Used as a PM user variable for routing requests to the correct Macrometa origin, passed as a header in API calls from the EdgeWorker.
     - For EdgeWorkers via query worker, includes `QUERY_WORKER_NAME` (the query worker name).
     - For EdgeWorkers via stream publisher, details `STREAM_APP_NAME` (the stream worker name) and `STREAM_NAME` (the name of the stream).
     - For EdgeWorkers via stream query, specifies `STREAM_APP_NAME`.
   - **main.js**
     - Serves as the main entry point for the code, setting up the EdgeWorkers' event handler to process incoming requests and outgoing responses.
   - **service.js**
     - Defines the complete logic for handling API calls, including pre- and post-call actions.

6. Unpack the .tar files with a tool or a command such as `tar -xvf file.tar`.
7. Edit the files.
   - Most of the functional code is contained in main.js.
   - You must increment the version in bundle.json before you upload the files.

8. Bundle the files. You can use a tool or a command such as `tar -czvf file.tgz main.js bundle.json client.js service.js config.js`.
9. In the Function Details window, click **Upload Version** to upload the bundle. Macrometa runs dependency checks upon upload, so make sure that all files referenced in `main.js` are included.
10. To activate the new version, click the stacked dots next to the new version and then click **Activate version**.

![Edit Function](/img/functions/edit-function.png)
