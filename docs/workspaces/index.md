---
# hide_table_of_contents: true
pagination_next: null
pagination_prev: null
sidebar_class_name: hidden
sidebar_label: Overview
sidebar_position: 0
# slug: /photoniq
title: Cloud Workspaces
---

# Macrometa Cloud Workspaces

Macrometa Cloud Workspaces redefines the digital workplace by delivering secure, high-performance virtual work environments that users can access from any internet-connected device on a browser. By harnessing the power of CDN edge computing, Cloud Workspaces ensures minimal latency, creating a responsive and ideal experience that empowers teams to work efficiently, no matter where they are.

At its core, Cloud Workspaces integrates advanced technologies like Remote Browser Acceleration (RBA), Remote Browser Isolation (RBI), and Remote Desktop Enviroments (RDE) to deliver a versatile and secure workspace solution on the edge, tailored to the diverse needs of modern businesses. It enables rapid deployment of web applications, secure and isolated browsing sessions, and full-featured virtual desktops—all within a unified environment designed to enhance productivity and maintain strong security.

## Key benefits

1. **Flexibility for remote work**: Access your work environment from anywhere, ensuring you remain productive no matter your location or the limitations of your local device. This flexibility helps maintain operational continuity, even during unexpected disruptions.

2. **Robust security**: Protect your sensitive data and applications with advanced cloud-based security measures. By centralizing information and enforcing strict access controls and encryption, you minimize the risks associated with device theft or loss.

3. **Cost-effective solutions**: Lower hardware expenses by utilizing cloud infrastructure and streamline IT management. With scalable pricing, you only pay for the resources you use, making it a financially savvy choice for organizations of all sizes.

4. **Optimized performance with edge computing**: Benefit from reduced latency and enhanced performance through edge computing. This technology ensures a faster and more responsive experience for users, regardless of their geographic location, by processing data closer to the source.

5. **Enhanced data privacy**: Cloud Workspaces ensure compliance with global data protection laws such as GDPR, CCPA, LGPD, and PIPL by maintaining data residency, minimizing cross-border data movement, and providing granular control over data management.

## Cloud Workspaces Toolbox

1. **Remote Browser Isolation (RBI)**: RBI offers a powerful approach to web security by executing all web browsing activities within isolated cloud environments. This isolation ensures that any potential threats from web content are contained and kept away from the user's local device, significantly reducing the risk of malware and other web-based attacks.

2. **[Remote Browser Acceleration (RBA)](./remote-browser-accelerator/index.md)**: RBA enhances the performance of specific web applications by deploying them directly at the network edge. It extends the remote browser isolation by allowing users to interact with web apps as if they were running locally on their devices, ensuring optimal speed and responsiveness. By accelerating the delivery of these applications, RBA guarantees that even the most resource-intensive tools perform smoothly, on legacy or resource-constrained systems.

3. **[Remote Desktop Environments (RDE)](./remote-desktop-enviroment/index.md)**: RDE provides full-featured Windows and Linux remote desktop environments, accessible from any device with an internet connection. These desktops are hosted in the cloud, allowing users to access their familiar workspace, including all applications and data, from anywhere. VDI ensures consistency and flexibility, enabling users to maintain productivity regardless of their location.

## Using Cloud Workspaces

Cloud Workspaces is deployed and managed by Macrometa's engineering team based on your product needs, ensuring optimal performance and security.

### Prerequisite

1. For **Windows 10**, download the latest stable **Chrome** browser.

2. For **Windows 7**, download the [latest supported Chrome browser](https://support.google.com/chrome/a/answer/7100626?hl=en&sjid=16270217913818414435-EU).

3. For **Windows XP**, you need to install the **Supermium browser**. Follow these steps to download and install Supermium:

   a. Go to the [Supermium v.122 release page](https://github.com/win32ss/supermium/releases/tag/v122-r6) on GitHub

   b. Select and download the *.exe* file appropriate for your operating system architecture (32-bit or 64-bit).

   c. Locate the downloaded *.exe* file and double-click to start the installation. Follow the on-screen instructions to complete the installation process.

   d. During installation, select the "**Create shortcuts**" checkbox for easier access to the app after installation.

   ![Supermium installation](/img/workspaces/supermium.png)

### Connecting to the workspace

Once your browser is installed on your device,

- Contact Macrometa support to receive your unique URL for accessing your Cloud Workspace environment.

- Open your local browser and enter the provided URL in the address bar. This URL connects you to your remote workspace.

Once connected, you'll see the specific web applications deployed for your business use case under Workspaces, along with the virtual Linux and Windows desktops. Additionally you have VS Code, a remote IDE for developers. Refer to the [RBA](./remote-browser-accelerator/index.md) and [RDE](./remote-desktop-enviroment/index.md) documentation for more details on how to use these workspaces.

![Cloud Workspace interface](/img/workspaces/workpsace-screen.png)

### Workspace settings

In a remote environment, it's essential that your peripheral devices connect successfully to ensure a smooth and productive experience. This feature enhances the user experience by allowing the use of essential hardware in virtual environments. Cloud Workspaces currently supports the following peripheral devices:

- Signature pad
- Card reader
- Webcams
- Printers

To ensure these devices function correctly within your remote sessions:

1. Start by selecting the **Drivers and Updates** menu from the **Workspace settings**.

2. It downloads an installer (.exe file) to your device. Run the installer to automatically configure all prerequisites needed for your peripherals.

3. Once the installation is complete, you can proceed to [validate your peripherals](peripheral-validator.md), ensuring they are properly configured and ready for use in your remote sessions.