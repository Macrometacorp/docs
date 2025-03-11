---
sidebar_position: 5
title:  Using VDI
---


Cloud Workspaces provides Virtual Desktop Infrastructure (VDI), offering remote Windows desktop that allows you to perform tasks as if on a local machine.

Cloud Workspaces offers you access to two different types of Windows VDI:

- **Persistent VDI**: A persistent VDI retains your user session even after you log out, allowing you to resume your previous session and retain your work progress.

- **Non-persistent VDI**: With non-persistent VDI, logging out of a session terminates that session. A new session is started upon logging back in, and data from the previous session is not retained.

 
These remote desktops support the following key peripherals:  
1. **Keyboard**
2. **Mouse**
3. **Printer**
4. **Camera** 
5. **Speaker**

## **Prerequisites**

- **VDI login credentials**: Contact your organization for the username and password to access your remote desktop enviroment.

## Accessing VDI

You can access VDI on Cloud Workspaces through two methods:

1. **[Universal Client](vdi-universal-client.md):** The universal client provides access to the remote Windows desktop directly through a web browser. This method is accessible to all users, regardless of their operating system.
2. **[Native Client](vdi-native-client.md):** The native client allows you to connect to the remote Windows desktop using RDP client on your Windows and Mac operating systems.

 Accessing VDI via the native client offers you more functionality and flexibility than the universal client. For example, the native client allows you to access more peripheral devices, enabling a smoother and flexible user experience.

   ![vdi-user](/img/runbook-images/just-vdi-users.png)

## Next

The next sections will guide you on how to connect to the VDI via [Universal Client](vdi-universal-client.md) or [Native Client](vdi-native-client.md).
