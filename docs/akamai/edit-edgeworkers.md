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
   - service.js
   - main.js
   - config.js
   - client.js
   - bundle.json

6. Unpack the .tar files with a tool or a command such as `tar -xvf file.tar`.
7. Edit the files.
   - Most of the functional code is contained in main.js.
   - You must increment the version in bundle.json before you upload the files.

8. Bundle the files. You can use a tool or a command such as `tar -czvf file.tgz main.js bundle.json client.js service.js config.js`.
9. In the Function Details window, click **Upload Version** to upload the bundle. Macrometa runs dependency checks upon upload, so make sure that all files referenced in `main.js` are included.
10. To activate the new version, click the stacked dots next to the new version and then click **Activate version**.

![Edit Function](/img/functions/edit-function.png)
