---
sidebar_position: 1
title: Workspace Management Admin Guide
sidebar_label: Workspace Management
---


Cloud Workspaces provides a centralized management dashboard for administrators to configure workspace settings and manage hosts. Navigate to **Admin Management** from the sidebar to access this dashboard.

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

## Users & Hosts

The **Users & Hosts** tab enables admins to manage user-to-host assignments in [VDI](./remote-desktop-enviroment/index.md). Hosts in the workspace are displayed with the following details:
- **Host Name**
- **Host Type** (persistent or non-persistent)
- **Region**
- **Username** of the assigned user (if applicable)

Admins can assign users to hosts, change assignments, or unassign users as needed. Additionally, they can search for users or hosts and filter hosts based on their assignment status or host type.

![user-dashboard](/img/runbook-images/user-dashboard.png)


To configure a host, 

1. Go to the **Users & Hosts** tab.
2. Use the search bar to find users or hosts by their hostname, username, or region.
3. Apply filters to view unassigned hosts or other specific configurations.
4. Continue with the desired action:
   1. **Assign**: Select a host and assign a user. The assigned user can now access the VDI.
   2. **Change user**: Change the user assigned to a host. The VDI is assigned to a new user.
   3. **Unassign**: Remove a user from a host. The user no longer has access to the VDI.
5. Click **Load More** to fetch additional hosts or **Refresh** to update the list with the latest data.

By using the **Users & Hosts** tab, admins can efficiently manage their workspace configurations for optimal resource allocation and user access.
