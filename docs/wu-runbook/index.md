---
pagination_next: null
pagination_prev: null
sidebar_class_name: hidden
sidebar_label: WU Workspaces Runbook v1.1.0
sidebar_position: 0
title: Cloud Workspaces Runbook for Western Union v1.1.0
---

Macrometa Cloud Workspaces is redefining our approach to remote work and productivity. As a cloud-based virtual environment, it enables effective access to your work tools and business-specific applications directly from your browser. The service includes a suite of tools designed for high performance and security, including remote browser access and remote desktops on the edge.

For Western Union, Cloud Workspaces provides the following key services:

- [**Remote Browser Acceleration (RBA)**](./rba/index.md) - to access the Western Union App for agents.
- [**Virtual Desktop Interface (VDI)**](./vdi/index.md) - providing remote Windows desktops.

## **Objective**

This runbook provides a comprehensive guide on how to use the Western Union App and remote desktops from Cloud Workspaces efficiently. It includes steps for accessing the services and [troubleshooting common issues](troubleshooting.md).

## **Connecting to Workspaces**

:::note
Ignore steps 1 and 2 if you are already logged into Cloud Workspaces.
:::

1. Open your browser and enter the Workspaces URL. This URL connects you to the Workspace environment and displays a login screen.

    ![login-page](/img/runbook-images/login-page.png)

2. Login with appropriate credentials to your workspace.
3. After logging in,
   
     - For first-time users, the **Software Downloads** screen is displayed for you to download the appropriate installer for the service you want to use. Refer to the respective guides for more details on the [VDI](./vdi/index.md) and [RBA](./rba/index.md) installers. Click **Homepage** to proceed to the Workspaces homepage.
   
        ![onboarding-page](/img/runbook-images/onboarding.png)

     - If you're a returning user, you are automatically redirected to the homepage. The services displayed in your homepage is based on your [user subscription](#workspaces-subscriptions). The homepage below is for users subscribed to RBA and VDI.

        ![vdi-rba-user](/img/runbook-images/rba-vdi-mac.png)

:::note
- VDI users with only [Universal Client](./vdi/index.md#accessing-vdi) won't see **Software Downloads** and will be redirected to the homepage instead. See [Workspace subscriptions](#workspaces-subscriptions) for more details.
- If you missed the installers, click the **Software Downloads** menu from the sidebar.
:::

### Account options

1. The sidebar gives you quick access to the **User Guide** and **Logout** options.

2. To **see your username**, click the **user icon** in the top-right corner.

3. To **log out**, you can either click **Logout** in the sidebar or click the **user icon** and choose **Logout** from the dropdown. You'll be prompted to confirm this action as shown below. Click the **Logout** button to complete the process.
   
      ![logout](/img/runbook-images/logout.png)


## **Workspaces subscriptions**

Cloud Workspaces has different tools in its toolbox which are available based on subscriptions. Depending on subscriptions, there are three classes of Cloud Workspace users:

:::tip
The subscriptions determine the options displayed in the **Homepage** and **Software Downloads**.
:::

- **VDI users**: Users with this subscription can only access the [Windows VDI](./vdi/index.md). After logging into Workspaces, the user has the following homepage:

![vdi-user](/img/runbook-images/vdi-windows.png)

:::note
The Client available for your VDI may differ. Visit the [VDI documentation](./vdi/index.md#accessing-vdi) for more details.
:::

- **RBA users**: Users in this group have the browser subscription and can access the WUPOS application using [RBA](./rba/index.md).

![rba-user](/img/runbook-images/rba.png)

- **VDI and RBA users**: These users have full access to the Workspaces toolbox, which includes the WUPOS application and the Windows VDI.

![vdi-rba-user](/img/runbook-images/rba-vdi.png)

**Next steps:**
- For admins, visit the [Workspace Management guide](workspace-manangement.md) to configure your domain.
- For WUPOS users, continue with the steps highlighted in [ Using RBA to access the Western Union App](./rba/index.md).
- VDI users can continue with the [setup process](./vdi/index.md) to start using remote desktops.

