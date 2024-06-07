---
title: Best Practices for using FaaS Functions
---
Here are some recommendations for getting the most from FaaS functions for your next project/deployments:

## Security Best Practices
PhotonIQ values [trust](https://www.macrometa.com/trust-center) and employs numerous organizational and technical controls to ensure the safety and security of consumer data. For FaaS, here are some additional security measures to improve the security of your functions:

### Perform Static and Dynamic Code Analysis
Employ a mix of complementary static and dynamic code testing methods during testing. While static code analysis offers a white-box testing method that scans and checks the source code for vulnerabilities like injection and buffer inflows, dynamic code analysis uses Dynamic Application Security Testing (DAST) tools to simulate attacks to evaluate the impact and response to these attacks. Furthermore, DAST tools also help identify vulnerabilities in third-party tools and dependencies missed by Static ApplicationSecurity Testing (SAST) tools. 

### Penetration Testing
Pentesting offers a targeted approach to identifying specific vulnerabilities in your systems and networks. Unlike the DAST, which identifies known vulnerabilities using automation tools, pentesting goes beyond to identify potential issues within your system, offering a more comprehensive view of your security and compliance posture.


