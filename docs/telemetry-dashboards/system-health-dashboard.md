# Prometheus Node Exporter Full (System Health)

### Overview:

[Grafana Link](https://telemetry-paas.mm.macrometa.io/d/rYdddlPWk/linux-os-prometheus-node-exporter-full?orgId=1&refresh=1m)

- Data Source
    
    Definition: A collection of data used for visualizations.
    
    Usage: Storage information
    
    Alerts: N/A
    
- Job
    
    Definition: The name of the Prometheus task used to fetch server metrics.
    
    Usage: Define the task that Prometheus will run in order to collect the metrics.
    
    Alerts: N/A
    
- Host
    
    Definition: This displays the name of the host whose metrics are currently being shown.
    
    Usage: Show the nodes of the server that are being monitored.
    
    Alerts: N/A
    
- Quick CPU/Mem/Disk
    
    CPU Busy: 
    
    Definition: Show the current CPU usage on the selected host.
    
    Usage: Quick display of server CPU resources that are in use.
    
    Alerts: N/A
    
    ![Screenshot from 2023-03-24 15-14-46.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-14-46.png)
    
    Sys Load (1m Avg): 
    
    Definition: Displays the average system load for the past 1 minute..
    
    Usage: Quick server load display of the past 1 minute
    
    Alerts:
    
    ![Screenshot from 2023-03-24 15-15-27.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-15-27.png)
    
    Sys Load (5m Avg): 
    
    Definition: Shows the average system load for the past 5 minutes.
    
    Usage: Quick server load display for the past 5 minutes
    
    Alerts: N/A
    
    ![Screenshot from 2023-03-24 15-20-58.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-20-58.png)
    
    Sys Load (15m Avg): 
    
    Definition: Displays the average system load for the past 15 minutes..
    
    Usage: Quick server load display of the past 15 minute
    
    Alerts: N/A
    
    ![Screenshot from 2023-03-24 15-21-06.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-21-06.png)
    
    RAM Used: 
    
    Definition: Display the percentage of RAM currently in use.
    
    Usage: Quick RAM usage display
    
    Alerts: Not define yet
    
    ![Screenshot from 2023-03-24 15-21-13.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-21-13.png)
    
    Root FS Used: 
    
    Definition: The current amount of hard drive disposable on the node.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 15-42-18.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-42-18.png)
    
    CPU Cores: 
    
    Definition: How many CPU cores the node has
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 15-42-53.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-42-53.png)
    
    Uptime: 
    
    Definition: How long has been since the node was rebooted
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 15-44-03.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-44-03.png)
    
    RootFS Total: 
    
    Definition: The amount of RootFS disk disposable on the server
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 15-43-00.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-43-00.png)
    
    RAM Total: 
    
    Definition: Total of RAM available for usage
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 16-12-28.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_16-12-28.png)
    
    SWAP Total: 
    
    Definition: The amount of swap is disposable for usage
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 16-12-53.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_16-12-53.png)
    
- Basic CPU/Mem/Net/Disk
    
    CPU Basic: 
    
    Definition: Show the graph of the node CPU metrics collect over time.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 16-20-59.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_16-20-59.png)
    
    Memory Basic: 
    
    Definition: Show the graph of the memory metrics collected over time.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 16-21-25.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_16-21-25.png)
    
    Network Traffic Basic: 
    
    Definition: Show the network traffics in/out collected over time.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 16-22-11.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_16-22-11.png)
    
    Disk Space Used Basic: 
    
    Definition: Show the percentage of the disk used over time.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 16-22-39.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_16-22-39.png)
    
- CPU/Memory/Net/Disk
    
    CPU: 
    
    Definition: Show a detail graph of the CPU usage of the data collected over time.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 19-16-47.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-16-47.png)
    
    Memory Stack: 
    
    Definition: Show a detail graph of the memory usage of the metrics collected over time.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 19-16-32.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-16-32.png)
    
    Network Traffic: 
    
    Definition: show a in depth  graph of the network traffic metrics collected over time.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 19-15-54.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-15-54.png)
    
    Disk Space Used: 
    
    Definition: Show all used space of mounted disk space.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 19-15-25.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-15-25.png)
    
    Disk IOps: 
    
    Definition: Show disks read/write operation per second over time.
    
    Usage: 
    
    Alerts:
    
    ![Screenshot from 2023-03-24 19-15-02.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-15-02.png)
    
    I/O Usage Read / Write: 
    
    Definition: Show the amount of input/Output data in transaction with the disks
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 19-14-27.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-14-27.png)
    
    I/O Usage Times: 
    
    Definition: Show the time spends during Input/Output during disks operations.
    
    Usage:
    
    Alerts:
    
    ![Screenshot from 2023-03-24 19-13-47.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-13-47.png)
    
- Memory Meminfo
    
    Memory Active / Inactive: 
    
    Definition: Show the current state of the memory on the node, disposable and in-use ram
    
    Usage:
    
    Alerts:
    
    - Image
        
        ![Screenshot from 2023-03-24 18-46-01.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-46-01.png)
        
    
    Memory Committed: 
    
    Definition: Show the currently in-use memory and the over all memory of the node
    
    - Image
        
        ![Screenshot from 2023-03-24 18-46-47.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-46-47.png)
        
    
    Memory Active / Inactive Detail: Show the currently in-use and memory that can be reclaim by the system
    
    - Image
        
        ![Screenshot from 2023-03-24 18-47-22.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-47-22.png)
        
    
    Memory Writeback and Dirty: Show the memory that in-use that will be flush to disk when possible.
    
    - Image
        
        ![Screenshot from 2023-03-24 18-48-22.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-48-22.png)
        
    
    Memory Shared and Mapped: Memory information field Mapped_bytes/ Shmem_bytes/ MemAvailable_bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 18-50-33.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-50-33.png)
        
    
    Memory Slab: Show the allocated memory where the kernel object are being store.
    
    - Image
        
        ![Screenshot from 2023-03-24 18-51-30.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-51-30.png)
        
    
    Memory Vmalloc: Memory information field VmallocChunk_bytes/ VmallocTotal_bytes/ VmallocUsed_bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 18-57-24.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-57-24.png)
        
    
    Memory Bounce: Memory information field Bounce_bytes.
    
    - Image
        
        ![Screenshot from 2023-03-24 18-59-07.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-59-07.png)
        
    
    Memory Anonymous: Memory information field AnonHugePages_bytes/ AnonPages_bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 19-01-41.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-01-41.png)
        
    
    Memory Kernel / CPU: Memory information field KernelStack_bytes/ Percpu_bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 19-09-35.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-09-35.png)
        
    
    Memory HugePages Counter: Memory information field HugePages_Free/ HugePages_Reserved
    
    - Image
        
        ![Screenshot from 2023-03-24 19-10-20.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-10-20.png)
        
    
    Memory HugePages Size: Memory information field HugePages_Total/ Hugepagesize_bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 19-11-06.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-11-06.png)
        
    
    Memory DirectMap: Memory information field DirectMap1G_bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 19-11-50.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-11-50.png)
        
    
    Memory Unevictable and MLocked: Memory information field Unevictable_bytes/ Mlocked_bytes.
    
    - Image
        
        ![Screenshot from 2023-03-24 19-12-24.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-12-24.png)
        
    
    Memory NFS: Memory information field NFS_Unstable_bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 19-12-52.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_19-12-52.png)
        
- Memory Vmstat
    
    Memory Pages In / Out: show the amount of paging activity of your node
    
    - Image
        
        ![Screenshot from 2023-03-24 14-57-12.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_14-57-12.png)
        
    
    Memory Pages Swap In / Out: Show the amount of paging activity in the node swap
    
    - Image
        
        ![Screenshot from 2023-03-24 14-57-57.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_14-57-57.png)
        
    
    Memory Page Faults: Show the node is under heavy memory pressure.
    
    - Image
        
        ![Screenshot from 2023-03-24 14-58-28.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_14-58-28.png)
        
    
    OOM Killer: Host Out of memory killer detected
    
    - Image
        
        ![Screenshot from 2023-03-24 14-59-30.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_14-59-30.png)
        
- System Timesync
    
    Time Synchronized Drift: Show the current time drift in the current node.
    
    - Image
        
        ![Screenshot from 2023-03-24 15-01-32.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-01-32.png)
        
    
    Time PLL Adjust: Phase-locked loop time constant.
    
    - Image
        
        ![Screenshot from 2023-03-24 15-02-48.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-02-48.png)
        
    
    Time Synchronized Status: The status synchronized of the clock/ Local clock adjustment
    
    - Image
        
        ![Screenshot from 2023-03-24 15-03-25.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-03-25.png)
        
    
    Time Misc: Seconds between clock ticks
    
    - Image
        
        ![Screenshot from 2023-03-24 15-04-00.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_15-04-00.png)
        
- System Processes
    
    Processes Status: Number of processes running / blocked waiting for I/O to complete
    
    - Image
        
        ![Screenshot from 2023-03-24 18-31-00.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-31-00.png)
        
    
    Processes State: Number of processes in each state
    
    Processes Forks: Total number of forks
    
    - Image
        
        ![Screenshot from 2023-03-24 18-27-50.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-27-50.png)
        
    
    Processes Memory: memory size in bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 18-29-12.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-29-12.png)
        
    
    PIDs Number and Limit: Process ID limit
    
    Process schedule stats and Running / Waiting: Number of seconds CPU spent running a process/ seconds spent by processing waiting for this CPU
    
    Threads Number and Limit: Number of allocated threads/ Threads limits
    
- System Misc
    
    Context Switches / Interrupts: Total number of context switches/ interrupts
    
    - Image
        
        ![Screenshot from 2023-03-24 17-45-34.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-45-34.png)
        
    
    System Load: 1m, 5m, 15m load average
    
    - Image
        
        ![Screenshot from 2023-03-24 17-46-30.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-46-30.png)
        
    
    Interrupts Detail: Show the total number of interruptions
    
    Schedule timeslices executed by each cpu: track the number of slices of time that were used to run processes
    
    Entropy: Bits of available entropy
    
    - Image
        
        ![Screenshot from 2023-03-24 17-48-00.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-48-00.png)
        
    
    CPU time spent in user and system contexts: Total user and system CPU time spent in seconds.
    
    - Image
        
        ![Screenshot from 2023-03-24 17-49-00.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-49-00.png)
        
    
    File Descriptors: Maximum/ Current number of open file descriptors.
    
    - Image
        
        ![Screenshot from 2023-03-24 17-49-50.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-49-50.png)
        
- Hardware Misc
    
    Hardware temperature monitor Show the temperature of the hardware
    
    Throttle cooling device: Maximum / Current throttle state of the cooling device
    
    Power supply: Status of the power supply
    
- Systemd
    
    Systemd Sockets: Total number of accepted socket connections
    
    Systemd Units State: Summary of systemd unit states
    
- Storage Disk
    
    Disk IOps Completed: Show in detail the number of read/ write operation completed per second
    
    - Image
        
        ![Screenshot from 2023-03-24 17-17-11.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-17-11.png)
        
    
    Disk R/W Data: Show in detail the amount of data read/ writes per second
    
    - Image
        
        ![Screenshot from 2023-03-24 17-18-00.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-18-00.png)
        
    
    Disk R/W Time: Show in detail the time taken to read/ write data to the disk
    
    - Image
        
        ![Screenshot from 2023-03-24 17-18-40.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-18-40.png)
        
    
    Disk IOs Weighted:  Show the number of seconds spent doing I/Os
    
    - Image
        
        ![Screenshot from 2023-03-24 17-20-34.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-20-34.png)
        
    
    Disk R/W Merged: Show the total number of Read/ Write merge.
    
    - Image
        
        ![Screenshot from 2023-03-24 17-21-24.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-21-24.png)
        
    
    Time Spent Doing I/Os: Total seconds spent doing I/Os
    
    - Image
        
        ![Screenshot from 2023-03-24 17-22-13.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-22-13.png)
        
    
    Disk IOs Current in Progress: The number of I/Os currently in progress.
    
    - Image
        
        ![Screenshot from 2023-03-24 17-23-43.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-23-43.png)
        
    
    Disk Iops Discards completed/merged: The total number of discards completed/merge successfully
    
    - Image
        
        ![Screenshot from 2023-03-24 17-31-33.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-31-33.png)
        
- Storage Filesystem
    
    Filesystem space available: space available and free to non-root users in bytes.
    
    - Image
        
        ![Screenshot from 2023-03-24 06-12-08.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_06-12-08.png)
        
        ![Screenshot from 2023-03-24 06-11-11.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_06-11-11.png)
        
    
    File Nodes Free: Filesystem total free file nodes
    
    - Image
        
        ![Screenshot from 2023-03-24 06-08-13.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_06-08-13.png)
        
    
    File Descriptor: File descriptor statistics: maximum / allocated
    
    - Image
        
        ![Screenshot from 2023-03-24 06-07-22.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_06-07-22.png)
        
    
    File Nodes Size: Filesystem total file nodes
    
    - Image
        
        ![Screenshot from 2023-03-24 06-06-42.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_06-06-42.png)
        
    
    Filesystem in ReadOnly/Error: Filesystem read-only status / Error getting statistics for the given device.
    
    - Image
        
        ![Screenshot from 2023-03-24 06-05-35.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_06-05-35.png)
        
- Network Traffic
    
    Network Traffic by Packets: Network device statistic receive_packets/ transmit_packets
    
    - Image
        
        ![Screenshot from 2023-03-24 17-53-17.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-53-17.png)
        
    
    Network Traffic Errors: Network device statistic receive_errs/ transmit_errs
    
    - Image
        
        ![Screenshot from 2023-03-24 17-54-05.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-54-05.png)
        
    
    Network Traffic Drop: Network device statistic receive_drop/ transmit_drop
    
    - Image
        
        ![Screenshot from 2023-03-24 17-54-44.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-54-44.png)
        
    
    Network Traffic Compressed: Network device statistic receive/transmit compressed
    
    - Image
        
        ![Screenshot from 2023-03-24 17-55-27.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-55-27.png)
        
    
    Network Traffic Multicast: Network device statistic receive_multicast
    
    - Image
        
        ![Screenshot from 2023-03-24 17-57-03.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-57-03.png)
        
    
    Network Traffic Fifo: Network device statistic receive_fifo/transmit_fifo
    
    - Image
        
        ![Screenshot from 2023-03-24 17-58-57.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_17-58-57.png)
        
    
    Network Traffic Frame: Network device statistic receive_frame
    
    - Image
        
        ![Screenshot from 2023-03-24 18-10-43.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-10-43.png)
        
    
    Network Traffic Carrier: Network device statistic transmit_carrier
    
    - Image
        
        ![Screenshot from 2023-03-24 18-11-25.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-11-25.png)
        
    
    Network Traffic Colls: Network device statistic transmit_colls
    
    - Image
        
        ![Screenshot from 2023-03-24 18-13-30.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-13-30.png)
        
    
    NF Contrack: Number of currently allocated flow entries for connection tracking/ Maximum size of connection tracking table
    
    - Image
        
        ![Screenshot from 2023-03-24 18-21-40.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-21-40.png)
        
    
    ARP Entries: ARP entries by device
    
    - Image
        
        ![Screenshot from 2023-03-24 18-22-07.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-22-07.png)
        
    
    MTU: Node network mtu bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 18-22-32.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-22-32.png)
        
    
    Spped: Node network interface speed bytes
    
    - Image
        
        ![Screenshot from 2023-03-24 18-22-53.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-22-53.png)
        
    
    Queue Length: Node network device transmit queue length
    
    - Image
        
        ![Screenshot from 2023-03-24 18-23-17.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-23-17.png)
        
    
    Softnet Packets: Number of processed / dropped packets
    
    Softnet Out of Quota: Number of times processing packets ran out of quota
    
    Network Operational Status: Network interface status
    
    - Image
        
        ![Screenshot from 2023-03-24 18-23-47.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_18-23-47.png)
        
- Network Sockstat
    
    Sockstat TCP: Number of TCP sockets in state alloc / inuse.
    
    - Image
        
        ![Screenshot from 2023-03-24 05-37-01.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-37-01.png)
        
    
    Sockstat UDP: Number of UDP sockets in state inuse
    
    - Image
        
        ![Screenshot from 2023-03-24 05-36-14.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-36-14.png)
        
    
    Sockstat Used: Number of IPv4 sockets in use
    
    - Image
        
        ![Screenshot from 2023-03-24 05-35-21.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-35-21.png)
        
    
    Sockstat Memory Size: Number of TCP/ UDP sockets in state mem_bytes.
    
    - Image
        
        ![Screenshot from 2023-03-24 05-33-44.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-33-44.png)
        
    
    Sockstat FRAG/RAW: Number of FRAG sockets in state inuse / memory.
    
    - Image
        
        ![Screenshot from 2023-03-24 05-32-41.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-32-41.png)
        
- Network Netstat
    
    Netstat IP IN/Out Octets: Show incoming / Outgoing traffic
    
    - Image
        
        ![Screenshot from 2023-03-24 05-31-03.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-31-03.png)
        
    
    Netstat IP Forwarding: Show the Ip traffic that has been forwarding from the server.
    
    - Image
        
        ![Screenshot from 2023-03-24 05-30-01.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-30-01.png)
        
    
    ICMP In/Out: Incoming / Outgoing ICMP traffic
    
    - Image
        
        ![Screenshot from 2023-03-24 05-28-34.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_05-28-34.png)
        
    
    ICMP Errors: ICMP error packages
    
    - Image
        
        ![Screenshot from 2023-03-24 00-18-02.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_00-18-02.png)
        
    
    UDP In/Out: Incoming / Outgoing UDP packages.
    
    - Image
        
        ![Screenshot from 2023-03-24 00-15-33.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_00-15-33.png)
        
    
    UDP Errors: UDP packages errors
    
    - Image
        
        ![Screenshot from 2023-03-24 00-11-31.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_00-11-31.png)
        
    
    TCP In/Out: Incoming / Outgoing TCP packages
    
    - Image
        
        ![Screenshot from 2023-03-24 00-00-06.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-24_00-00-06.png)
        
    
    TCP Errors: TCP packages drops during transmition
    
    - Image
        
        ![Screenshot from 2023-03-23 23-59-23.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-23_23-59-23.png)
        
    
    TCP Connections: Open  TCP connections
    
    - Image
        
        ![Screenshot from 2023-03-23 23-51-47.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-23_23-51-47.png)
        
    
    TCP SynCookie: Show TCP Syncookies status
    
    - Image
        
        ![Screenshot from 2023-03-23 23-47-30.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-23_23-47-30.png)
        
    
    TCP Direct Transition: Current TCP connections
    
    - Image
        
        ![Screenshot from 2023-03-23 23-46-34.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-23_23-46-34.png)
        
- Node Exporter
    
    Node Exporter Scrape Time: Show the time it takes to scrape the information from the node.
    
    - Image
        
        ![Screenshot from 2023-03-23 23-07-41.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-23_23-07-41.png)
        
    
    Node Exporter Scrape: Display the status of all the Prometheus scrape runs.
    
    - Image
        
        ![Screenshot from 2023-03-23 23-09-14.png](/../static/img/telemetry-dashboards/Screenshot_from_2023-03-23_23-09-14.png)

        