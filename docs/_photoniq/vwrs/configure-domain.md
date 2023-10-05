---
sidebar_position: 30
title: Configure a Domain
---

You can configure a domain with the `POST /api/vwr/v1/domains` REST API. Use this API to define and configure the behavior of the waiting room.

Domain Definition Fields
The following required fields define a domain (waiting room): 
domain_key: The unique key of the domain.
domain_url: The URL that the waiting room needs to sit in front of. All subpaths of this URL are sent to this defined waiting room. (e.g.,/checkout/path1 and /checkout/path2 are all sent to the /checkout waiting room).
access_type: The access type defines how the rate limit should be calculated.
users - The Metric Service counts the number of unique user requests every second. The unique user requests are identified by a request ID that is stored in the encrypted cookie (vwrs-session). A rolling history of unique user requests is kept for 60 seconds.
VWRS queries the Metric Service for the number of unique users for the past 60 seconds and then is divided by 60 to get a USER rate. This rate is then fed to the Intelligent Flow Control Engine to determine the number of requests to be released from the waiting room to maintain the allowed rate.
For example, suppose Metric Service indicates 480 unique users observed in the last 60 seconds. In this case, the unique user rate is calculated as 480 divided by 60, resulting in a rate of 8 unique users per second. If the maximum allowed rate is 10, the Flow Engine will release two requests from the waiting room. This calculation is repeated every second to ensure a consistent flow rate of 10 unique users per second.
users_per_period - The users_per_period access type behaves the same way as the user access type. Except the rate_limit is now divided over the defined period to get the expected rate limit per second.
For example, if the maximum unique user rate allowed is 100 for 5 seconds, then the maximum unique user rate is 20 users per second. If the Metric Service reports seeing eight unique users per second, the Flow Engine releases 12 requests from the waiting room to maintain a steady flow rate of 100 users over 5 seconds.
rps - The Metric Service service counts the number of requests to the origin server per second (RPS). A rolling history of the number of requests is kept over 60 seconds.
The VWRS consults the Metric Service to find the number of requests within the preceding 60-second interval. It then divides this number by 60 to calculate the RPS. This computed RPS is subsequently entered into the Intelligent Flow Control Engine and uses this rate to determine the appropriate number of requests that should be released from the waiting room, ensuring the allowed rate is upheld.
For example, if the maximum number of requests allowed per second is 20 and the Metric Service detects 13 POST requests, then the Flow Engine will release seven requests from the waiting room to ensure a consistent flow rate of 20 requests per second.
period: This must be set if the access_type is set to users_per_period. The period defines the time (in seconds) over which the rate should be calculated.  The period must be a number greater than zero.
rate_limit: This is the rate limit when traffic should be diverted to the waiting room.   The rate_limit must be a number greater than zero.
For access_type of users and rps, this is the maximum request rate before traffic is diverted to the waiting room.
For users_per_period, the maximum rate before diverting to the waiting room is calculated using the current active rate divided by the period defined in the period field.
Consult the section on access types for further explanation of how the rate limit is calculated for different access_type.
Domain Behavior Fields
The following optional fields define the behavior of the waiting room:
queue_type: This defines how requests should be removed from the waiting room. The three possible queue types are fifo, random, and lottery. If this is not set, then the default queue is fifo. Refer to the section on queue types that describe the behavior of each queue type.
queue_enablement: You can configure the waiting room to be enabled dynamically. When this field is set to auto, the waiting room is enabled only after reaching the defined rate_limit for a defined metric_interval of time. This avoids traffic being sent to the waiting room for short periods and possibly causing a negative user experience. If this field is set to manual, then the waiting room is enabled all the time.
origin_key: Every domain is associated with an origin that was created with the Create Origin REST API, POST /api/vwr/v1/origins/{origin_id}.
metric_interval: The time to enable and disable the waiting room (in seconds). This time represents how long the traffic is at or above the rate limit before traffic is directed to the waiting room.
access_duration: The time users can access the origin (in seconds). Once a user has been granted access, the access_duration determines how long they can access the origin before they are forwarded to the waiting room again.
status_interval: The status_interval, in seconds, defines how often the waiting room HTML page is updated with the requests position, estimated waiting time, and the maximum number of requests in the waiting room.
waiting_room_path: The cloud origin (e.g. NetStorage) path for a domain that stores the HTML for the waiting room. The path should be a fully qualified path like /{upload-directory-id}/path.
priority: An array of priorities, where the highest priority corresponds to the lowest number.