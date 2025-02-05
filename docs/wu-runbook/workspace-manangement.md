---
sidebar_position: 1
title: Workspace Management Admin Guide
sidebar_label: Workspace Management
---


Cloud Workspaces provides a centralized management dashboard for administrators to configure workspace settings and manage hosts. Navigate to **Admin Management** from the sidebar to access this dashboard.

The admin management dashboard allows admin users perform the following tasks:

- [Manage Active domains.](#active-directory-domain)
- [Configure and manage desktop and users.](#managing-desktops-and-users)

:::note
Regular users won't find the management dashboard as it is only available for admin users.
:::

## Active Directory Domain

The **Active Directory Domain** tab allows admins to configure the Active Directory for the workspace. This setup is a one-time process that links your organization's user directory to the workspace, enabling effective user authentication and access management.

![add-dashboard](/img/runbook-images/management-dashboard.png)


To configure the Active Directory for your workspace:
1. Navigate to the **Active Directory Domain** tab.
2. Update the required fields with your Active Directory configurations.
3. Save the configuration once the setup is complete.

:::tip
Only qualified admins with expertise in Active Directory should perform this task.
:::

## Managing Desktops and Users

The **Desktops and users** tab enables admins to configure and manage desktop assignments in [VDI](./vdi/index.md). 
![desktop and users tab](/img/runbook-images/desktop-users.png)

Admins can assign users to hosts, change assignments, or unassign users as needed. Additionally, they can search for users or hosts and filter hosts based on their assignment status or host type.

### Configuring a desktop user

1. Go to the **Desktop and Users** tab from the Admin management page. 

![desktop users](/img/runbook-images/desktop-info.png)
The desktop tab gives insights into the provisioned desktops in a region with the following details:
- **Desktop Name**
- **Region**: Desktop region
- **Username**: Username of the assigned user (if applicable)
- **Desktop Type** (persistent or non-persistent)
- **Desktop plan**
- **Actions**: Assign, change, or unassign a user.
![user info](/img/runbook-images/users-info.png)

The user tab also offers useful information like insights into the different VDI users **Username**, **Desktop Name**, **Region**, **Last login**, **Total duration**. and **Actions** on your VDI users.

2. Use the search bar to find users or desktops by their name, username, or regions.
1. Apply the `Persistent`, `Assigned` or `Unassigned` filter based on your required configurations.
1. Continue with the desired action:
   1. **Assign**: Select a host and assign a user. The assigned user can now access the VDI.
   2. **Change user**: Change the user assigned to a host. This assigns the VDI to a new user.
   3. **Unassign**: Remove a user from a host. The user no longer has access to the VDI.
1. Click **Load More** to fetch additional hosts or **Refresh** to update the list with the latest data.

By using the **Desktops and Users** tab, admins can efficiently manage their workspace configurations for optimal resource allocation and user access. Workspaces also offers admin users the [analytics dashboard](monitoring-analytics.md) to monitor and track the performance of their Workspaces tools.