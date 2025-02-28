---
title: Quickstart
sidebar_position: 1
---

Cloud Workspaces is deployed and managed by Macrometa's engineering team based on your product needs, ensuring optimal performance and security. This guide walks you through getting started with the service. 

## Connecting to the workspace

Once your browser is installed on your device,

1. Open your local browser and enter the Workspaces URL. Enter your login details.

     ![login-page](/img/runbook-images/login-page.png)

- After login:
    - First-time users are taken to the **Software Downloads** screen. This screen contains different installers for using Cloud Workspaces services. Download the appropriate installer for your use-case and refer to the respective guides for detailed instructions on how to set up the [VDI](./solutions/remote-desktop-enviroment/index.md#download-the-vdi-installer) and [RBA](./solutions/remote-browser-accelerator/index.md#step-1-download-and-install-the-rba-installer) installers.
    
    ![onboarding-page](/img/runbook-images/onboarding.png)
    

- Returning users are redirected to the homepage.

    ![onboarding-screen](/img/workspaces/onboard-screen.png)

:::note
- Services displayed on the Workspaces homepage depends on your subscription. For example, VDI users with only Universal Client won't see **Software Downloads** and will be redirected to the homepage instead.  
- If you missed the installers, click the **Software Downloads** menu from the sidebar.
:::

After setting up the appriopriate installer for your use-case, you can now start using [RBA](./solutions/remote-browser-accelerator/index.md) or [VDI](./solutions/remote-desktop-enviroment/index.md). 



### Peripheral devices

Cloud Workspaces support various peripherals across RBA and VDI. For RBA, you can test and validate these connected devices before using it in your workspace. Refer to [Validating peripheral devices in RBA guide](./solutions/remote-browser-accelerator/rba-peripheral-validator.md) for more details. You can also visit the [VDI guide](./solutions/remote-desktop-enviroment/index.md) to learn more about the supported peripheral devices for remote desktops.

## Workspaces Management

Cloud Workspaces provides a management dashboard for admin users to configure their Active Directory. This setup is a one-time task that requires expertise in Active Directory and should be performed by qualified admins.

![admin-dashboard](/img/runbook-images/management-dashboard.png)

:::note
Regular users won't find the management dashboard as it is only available for admin users.
:::

