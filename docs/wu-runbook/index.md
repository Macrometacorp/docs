---
pagination_next: null
pagination_prev: null
sidebar_class_name: hidden
sidebar_label: WU Workspaces Runbook v1.0
sidebar_position: 0
title: Cloud Workspaces Runbook for Western Union v1.0
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
If you missed the installers, click the **Software Downloads** menu from the sidebar to return to the installer screen.
:::

The sidebar also provides access to the **User Guide** and **Logout** options. To view your profile, click the **user icon** in the top-right corner of the screen. 

## **Workspaces subscriptions**

Cloud Workspaces has different tools in its toolbox which are available based on subscriptions. Depending on subscriptions, there are three classes of Cloud Workspace users:

- **VDI users**: This class of users can only access the Windows VDI. After logging into Workspaces, users with only a VDI subscription have the following homepage.

![vdi-user](/img/runbook-images/vdi-windows.png)


- **RBA users**: Users in this group can only access their designated web applications, specifically the Western Union App in this instance.

![rba-user](/img/runbook-images/rba.png)

- **VDI and RBA users**: These users have access to all the tools in the Workspaces toolbox.

![vdi-rba-user](/img/runbook-images/rba-vdi.png)

**Next steps:**
- For admins, visit the [Workspace Management guide](workspace-manangement.md) to configure your domain.
- For WUPOS users, continue with the steps highlighted in [ Using RBA to access the Western Union App](./rba/index.md).
- VDI users can continue with the [setup process](./vdi/index.md) to start using remote desktops.

