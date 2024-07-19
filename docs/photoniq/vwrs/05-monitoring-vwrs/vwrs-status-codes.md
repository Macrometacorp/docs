---
sidebar_position: 130
title: VWRs Status Codes
---

The Virtual Waiting Rooms (VWRs) library uses the Akamai Property Manager `PMUSER_VWRS_STATUS_CODE` variable to return more detailed status or error codes when using the VWRs library. Adding these variable results to the Akamai DataStream custom field helps debug/monitor the VWRs library operations. The status codes use the following format:

```bash
Format: STATUS TYPE OBJECT VERB/ADJECTIVE
STATUS = SUCCESS | ERROR
TYPE = HTTP | SECURITY | ROUTE
```

| **Status Code** | **Description** |
|----------------------|---------------------------|
| EHDD | The cookie reuse check failed    |
| EHMN | Error in metrics notification    |
| EHQD | Error getting queue depth    |
| EHRP | Error pushing request to queue   |
| EHRS | Error getting request status |
| ESCC | Error cookie createdAt |
| ESCD | Error in cookie decryption   |
| ESCE | Error in cookie encryption   |
| ESDC | Error in digest creation |
| ESER | Error in encryption raw-key creation |
| ESTE | Token does not exist   |
| SHSL | Successfully fetched queue status live |
| SHSP | Successfully fetched queue status preview  |
| SROL | Successfully routed to origin live  |
| SRWL | Successfully routed to the waiting room live   |
| SRWP | Successfully routed to the waiting room preview    |
