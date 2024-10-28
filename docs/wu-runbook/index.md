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
   
     - For first-time users, the onboarding screen is displayed so you can download the appropriate installer for the service you want to use. Refer to the respective guides for detailed instructions on how to set up the [VDI](./vdi/index.md#download-the-vdi-installer) and [RBA](./rba/index.md#download-the-rba-installer) installers. Click **Go to Home** to proceed to the Workspaces homepage.
   
        ![onboarding-page](/img/runbook-images/onboarding.png)

     - If you're a returning user, you are automatically redirected to the homepage. This homepage is for users subscribed to RBA and VDI.

        ![vdi-rba-user](/img/runbook-images/rba-vdi.png)

:::note
If you missed the installers, click the **Download Package** menu from the sidebar to return to the onboarding screen.
:::

The sidebar also provides access to the **User Guide** and **Logout** options. To view your profile, click the **user icon** in the top-right corner of the screen. 

**Next steps:**
- For WUPOS users, continue with the steps highlighted in [ Using RBA to access the Western Union App](./rba/index.md).
- VDI users can continue with the [setup process](./vdi/index.md) to start using remote desktops.

## Workspace Management

Cloud Workspaces offers its management dashboard for admin users to configure and edit their domain.

![admin-dashboard](/img/workspaces/management-dashboard.png)

:::note
Regular users won't find the management dashboard as it is only available for admin users.
:::


## **Workspace Subscriptions**

Cloud Workspaces has different tools in its toolbox and are available based on subscriptions. Depending on subscriptions, there are three classes of Cloud Workspace users:

- **VDI users**: This class of users can only access the Windows VDI. After logging into Workspaces, users with only a VDI subscription have the following homepage.

![vdi-user](/img/runbook-images/vdi.png)

- **RBA users**: Users in this group can only access RBA and their valid web apps.

![rba-user](/img/runbook-images/rba.png)

- **VDI and RBA users**: These users have access to all the tools in the Workspaces toolbox

![vdi-rba-user](/img/runbook-images/rba-vdi.png)