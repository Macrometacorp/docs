---
sidebar_position: 1
title: Workspace Management Admin Guide
sidebar_label: Manage Workspaces
---


Cloud Workspaces provides a centralized management dashboard for administrators to configure workspace settings and manage hosts. Navigate to **Admin Management** from the sidebar to access this dashboard.

:::note
Regular users won't find the management dashboard as it is only available for admin users.
:::


## Active Directory Domain

The **Active Directory Domain** tab allows admins to configure the Active Directory for the workspace. This setup is a one-time process that links your organization's user directory to the workspace, enabling effective user authentication and access management.

![add-dashboard](/img/runbook-images/active-dir.png)


To configure the Active Directory for your workspace:
1. Navigate to the **Active Directory Domain** tab.
2. Update the required fields with your Active Directory configurations.
3. Save the configuration once the setup is complete.

:::tip
Only qualified admins with expertise in Active Directory should perform this task.
:::

## Desktops & Users

The **Desktops & Users** tab enables admins to manage user-to-host assignments in [VDI](./solutions/remote-desktop-enviroment/index.md). Hosts in the workspace are displayed with the following details:
- **Desktop Name**
- **Region**: Desktop region
- **Username**: Username of the assigned user (if applicable)
- **Desktop Type** (persistent or non-persistent)
- **Desktop plan**
- **Actions**: Assign, change, or unassign a user.
![user info](/img/runbook-images/users-info.png)

Admins can assign users to desktops, change assignments, or unassign users as needed. Additionally, they can search for users or hosts and filter hosts based on their assignment status or host type.

![user-dashboard](/img/runbook-images/new-admin-dashboard.png)


To configure a host, 

1. Go to the **Desktops & Users** tab.
2. Use the search bar to find users or hosts by their hostname, username, or region.
3. Apply the `Persistent` or `Assigned` filter based on your required configurations.
4. Continue with the desired action:
   1. **Assign**: Select a host and assign a user. The assigned user can now access the VDI.
   2. **Change user**: Change the user assigned to a host. The VDI is assigned to a new user.
   3. **Unassign**: Remove a user from a host. The user no longer has access to the VDI.
5. Click **Load More** to fetch additional hosts or **Refresh** to update the list with the latest data.

By using the **Desktops & Users** tab, admins can efficiently manage their workspace configurations for optimal resource allocation and user access.
