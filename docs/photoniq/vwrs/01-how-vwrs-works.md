---
title: How VWRs Works
---

Macrometa PhotonIQ Virtual Waiting Rooms (VWRs) are an advanced prioritization service that manages visitors entering a site. VWRs serves as a protective layer for your origin server, effectively managing high traffic volumes to prevent server overload.

## Solution Overview

The waiting room solution includes essential aspects:

- **Origin Service**: The website for which you want to set up a virtual waiting room.
- **Origin Metrics Service**: Allows you to retrieve information about a specific waiting room.
- **Waiting Room Page**: The endpoint (URL) with the waiting room attached.

![VWR Solution Architecture](/img/photoniq/vwr/vwr-solution-architecture.png)

## How It Works

The VWRs follows this workflow:

1. A user attempts to access a webpage origin.
1. The [Akamai Edgeworker](./03-configuration-and-setup/01-configuring-edgeworkers.md) checks the virtual waiting room service to confirm if a waiting room is enabled for the website origin.
    - If yes, the Edgeworker sends the request to the waiting room service.
    - If no, the EdgeWorker sends the request directly to the webpage origin service.
3. The waiting room service adds this new request to the waiting room.
1. Once the user accesses the waiting room page, the page polls the virtual waiting room service for the latest waiting time and waiting room depth.
1. After polling the latest virtual waiting room data, the waiting room page displays the waiting time and waiting room depth to the user.
1. When the waiting time is near zero, or the user is at the front of the queue, the waiting room page forwards the user to the origin service.
7. On releasing a request, the waiting room service removes a request from the queue.
1. On detecting a duplicate request, the waiting room service confirms if the user already has an active session.
    - If yes, the waiting room service returns the user's position in the queue.
    - If no, the waiting room service creates a new session and adds the request to the appropriate queue
9. The waiting room service periodically checks the sessions to remove requests for expired sessions from the queues.

**For Monitoring:**
- The waiting room service calculates the waiting time and queue depth every second and updates the [telemetry for the origins and waiting rooms](https://www.macrometa.com/docs/apiVwrs#/operations/getTelemetry).
- The waiting room service collects the [metrics](https://www.macrometa.com/docs/apiVwrs#/operations/getMetrics) for each waiting room.

**Note:**  Requests are served from the queue for the users, based on the join time. You can configure the queue to be [FIFO, random, or lottery](./queue-types.md). Also, the administrator can turn customer waiting rooms on or off through Configuration APIs.

Following this workflow ensures that users are directed to the appropriate origin service while ensuring fairness in the queue and providing metrics and alerts to the administrator.

