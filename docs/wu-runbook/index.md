---
pagination_next: null
pagination_prev: null
sidebar_class_name: hidden
sidebar_label: Introduction
sidebar_position: 0
title: Cloud Workspaces Runbook
---

Macrometa Cloud Workspaces is redefining our approach to remote work and productivity. As a cloud-based virtual environment, it enables effective access to your work tools and business-specific applications directly from your browser. The service includes a suite of tools designed for high performance and security, including remote browser access and remote desktops on the edge.

Cloud Workspaces provides the following key services:

- [**Remote Browser Acceleration (RBA)**](./solutions/rba/index.md) - for accessing your work apps. 
- [**Virtual Desktop Interface (VDI)**](./solutions/vdi/index.md) - providing remote Windows desktops.

## **Objective**

This runbook provides a comprehensive guide on using the services offered by Cloud Workspaces and includes the following:

- [Accessing the RBA and VDI solutions](./solutions/index.md)
- [Tips for using these solutions](./solutions/vdi/tips.md)
- [Troubleshooting some common issues](./troubleshooting/index.md)
- [Using the Workspaces Assistant](./assistant.md)

## **Connecting to Workspaces**

:::note
Ignore steps 1 and 2 if you are already logged into Cloud Workspaces.
:::

1. Open your browser and enter the Workspaces URL. This URL connects you to the Workspace environment and displays a login screen.

    ![login-page](/img/runbook-images/login-page.png)

2. Login with appropriate credentials to your workspace.
3. After logging in,
   
     - For first-time users, it displays the **Software Downloads** screen for you to download the appropriate installer for the subscribed service. Refer to the respective guides for more details on the [VDI](./solutions/vdi/index.md) and [RBA](./solutions/rba/index.md) installers. Click **Homepage** to proceed to the Workspaces homepage.
   
       ![software downloads](/img/runbook-images/software-downloads.png)

     - If you're a returning user, you are automatically redirected to the homepage. This displays your services based on your [user subscription](#workspaces-subscriptions). The homepage below is for users subscribed to RBA and VDI.

        ![vdi-user](/img/runbook-images/vdi-macs.png)

:::note
- VDI users with only [Universal Client](./solutions/vdi/index.md#accessing-vdi) won't see **Software Downloads** and will be redirected to the homepage instead. See [Workspace subscriptions](#workspaces-subscriptions) to learn more.
- If you missed the installers, click the **Software Downloads** menu from the sidebar.
:::

### Account options

1. The Workspaces sidebar gives you quick access to the **User Guide** and **Logout** options.

2. To **see your username**, click the **user icon** in the top-right corner.

3. To **log out**, you can either click **Logout** in the sidebar or click the **user icon** and choose **Logout** from the dropdown. You'll be prompted to confirm this action as shown below. Click the **Logout** button to complete the process.
   
      ![logout](/img/runbook-images/workspaces-logout.png)


## **Workspaces subscriptions**

Cloud Workspaces has different tools in its toolbox which are available based on subscriptions. Depending on subscriptions, there are three classes of Cloud Workspace users:

:::tip
The subscriptions determine the options displayed in the **Homepage** and **Software Downloads**.
:::

- **VDI users**: Users with this subscription can only access the [Windows VDI](./solutions/vdi/index.md). After logging into Workspaces, the user has the following homepage:

![vdi-user](/img/runbook-images/just-vdi-users.png)

:::note
The Client available for your VDI may differ. Visit the [VDI documentation](./solutions/vdi/index.md#accessing-vdi) for more details.
:::

- **RBA users**: Users in this group have the browser subscription and can access their applications using [RBA](./solutions/rba/index.md).

![rba-user](/img/runbook-images/just-rba-users.png)

- **VDI and RBA users**: These users have full access to the Workspaces toolbox, which includes their applications and the Windows VDI.

![vdi-user](/img/runbook-images/vdi-macs.png)

**Next steps:**
- For admins, visit the [Workspace Management guide](workspace-management.md) to configure your domain.
- Start [using RBA to access your applications](./solutions/rba/index.md).
- VDI users can continue with the [setup process](./solutions/vdi/index.md) to start using remote desktops.
- Get more information about your Workspaces environment with our AI chatbot.

