# System Health Dashboard

## Overview:

The System Health Dashboard is a Grafana Telemetry dashboard that monitors key server metrics, including CPU usage, system load, memory, disk space, and uptime. By using data sources and Prometheus tasks, it provides real-time insights into server performance.

<!-- [Grafana Link](https://telemetry-paas.mm.macrometa.io/d/rYdddlPWk/linux-os-prometheus-node-exporter-full?orgId=1&refresh=1m) -->

### Data Source
    
- **Definition**: A source of data used to create visualizations and reports.
    
- **Usage**: Stores information that is used to populate visualizations and reports.
    
- **Threshold**: N/A
    
### Job
    
- **Definition**: The designated task in Prometheus used to retrieve metrics from a server.
    
- **Usage**: Identifies the specific task that Prometheus will execute to collect metrics from a server.
    
- **Threshold**: N/A
    
### Host
 
 - **Definition**: The name of the host system whose metrics are currently being displayed.
 
 - **Usage**: Indicates which of the server's nodes are being monitored for metrics.
 
 - **Threshold**: N/A
    
## Quick CPU/Mem/Disk
    
### CPU Busy

- **Definition**: Displays the current utilization of the CPU resources on the selected host system.

- **Usage**: Provides a quick overview of the amount of CPU resources being used by the server.

- **Threshold**: TBD

- **Example Metric**    
![Screenshot from 2023-03-24 15-14-46.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-14-46.png)
    
### Sys Load (1m Avg): 

- **Definition**: The average system load calculated over the past 1 minute.

- **Usage**: Provides a quick snapshot of the server's load over the past 1 minute.

- **Threshold**: TBD

- **Example Metric**    
![Screenshot from 2023-03-24 15-15-27.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-15-27.png)
    
### Sys Load (5m Avg): 

- **Definition**: The average system load calculated over the past 5 minutes.

- **Usage**: Provides a quick snapshot of the server's load over the past 5 minutes.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 15-20-58.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-20-58.png)
    
### Sys Load (15m Avg): 

- **Definition**: The average system load calculated over the past 15 minutes.

- **Usage**: Provides a quick snapshot of the server's load over the past 15 minutes.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 15-21-06.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-21-06.png)
    
### RAM Used: 

- **Definition**: The percentage of RAM currently being used by the system.

- **Usage**: Provides a quick overview of the current utilization of the system's RAM.

- **Threshold**: TBD

- **Example Metric**    
![Screenshot from 2023-03-24 15-21-13.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-21-13.png)
    
### Root FS Used: 

- **Definition**: The amount of hard drive space currently being used on the node.

- **Usage**: Displays the utilization of the root file system, which is the main file system where the operating system and other software is installed.

- **Threshold**: TDB
    
- **Example Metric**
![Screenshot from 2023-03-24 15-42-18.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-42-18.png)
    
### CPU Cores: 

- **Definition**: The number of CPU cores available on the node.

- **Usage**: Displays the number of CPU cores that are present on the system.

- **Threshold**: TBD

- **Example Metric**    
![Screenshot from 2023-03-24 15-42-53.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-42-53.png)
    
### Uptime: 

- **Definition**: The length of time that the node has been running since the last reboot.

- **Usage**: Displays the system uptime, which provides a rough estimate of the stability and reliability of the system.

- **Threshold**: TBD

- **Example Metric**        
![Screenshot from 2023-03-24 15-44-03.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-44-03.png)
    
### RootFS Total: 

- **Definition**: The total amount of hard drive space available on the root file system of the server.

- **Usage**: The total amount of hard drive space available on the root file system of the server.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 15-43-00.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-43-00.png)
    
### RAM Total: 

- **Definition**: The total amount of RAM available for use by the system.

- **Usage**: Displays the total amount of RAM that is present on the system and available for use.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 16-12-28.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_16-12-28.png)
    
### SWAP Total: 

- **Definition**: The amount of swap space available for use by the system.

- **Usage**: Displays the total amount of swap space that is available for use on the system.

- **Threshold**: TBD

- **Example Metric**    
![Screenshot from 2023-03-24 16-12-53.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_16-12-53.png)
    
## Basic CPU/Memory/Network/Disk Metrics

### Basic CPU Metrics:

- **Definition**: A graphical representation of the CPU metrics collected over time for the node.

- **Usage**: Displays a graph of the CPU metrics collected over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 16-20-59.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_16-20-59.png)
    
### Basic Memory Metrics:

- **Definition**: A graphical representation of the memory metrics collected over time for the node.

- **Usage**: Displays a graph of the memory metrics collected over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 16-21-25.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_16-21-25.png)
    
### Network Traffic Basic: 

- **Definition**: Show the network traffics in/out collected over time.

- **Usage**:

- **Threshold**:
    
- **Example Metric**
![Screenshot from 2023-03-24 16-22-11.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_16-22-11.png)
    
### Basic Disk Space Used Metrics:

- **Definition**: A graphical representation of the percentage of disk space used over time for the node.

- **Usage**: Displays a graph of the percentage of disk space used over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 16-22-39.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_16-22-39.png)
    
## CPU/Memory/Net/Disk
    
### CPU: 

- **Definition**: The CPU metric displays a detailed graph of the utilization of the central processing unit (CPU) over a specified time period.

- **Usage**: The CPU metric is used to monitor the performance of the system's central processing unit and to determine if the system is running efficiently.

- **Threshold**: TBD

- **Example Metric**    
![Screenshot from 2023-03-24 19-16-47.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-16-47.png)
    
### Detailed Memory Metrics:

- **Definition**: A detailed graphical representation of the memory usage collected over time for the node.

- **Usage**: Displays a detailed graph of the memory usage collected over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 19-16-32.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-16-32.png)
    
### Detailed Network Traffic Metrics:

- **Definition**: A detailed graphical representation of the network traffic collected over time for the node.

- **Usage**: Displays a detailed graph of the network traffic collected over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 19-15-54.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-15-54.png)
    
### Detailed Disk Space **Usage** Metrics:

- **Definition**: A detailed graphical representation of the disk space usage collected over time for the node.

- **Usage**: Displays a detailed graph of the disk space usage collected over time for the node, including all used space of mounted disk space.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 19-15-25.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-15-25.png)
    
### Detailed Disk I/O Metrics:

- **Definition**: A detailed graphical representation of the disk I/O operations collected over time for the node.

- **Usage**: Displays a detailed graph of the disk read/write operations per second collected over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 19-15-02.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-15-02.png)
    
### Detailed Disk I/O **Usage** Metrics:

- **Definition**: A detailed graphical representation of the input/output data transactions with the disks collected over time for the node.

- **Usage**: Displays a detailed graph of the amount of input/output data transactions with the disks collected over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 19-14-27.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-14-27.png)
    
### Detailed Disk I/O Time Metrics:

- **Definition**: A detailed graphical representation of the time spent during input/output operations with the disks collected over time for the node.

- **Usage**: Displays a detailed graph of the time spent during input/output operations with the disks collected over time for the node.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 19-13-47.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-13-47.png)
    
## Memory Meminfo
    
### Detailed Active/Inactive Memory Metrics:

- **Definition**: A detailed graphical representation of the current state of the memory on the node, including disposable and in-use RAM, collected over time.

- **Usage**: Displays a detailed graph of the current state of the memory on the node, including disposable and in-use RAM, collected over time.

- **Threshold**: TBD
    
- **Example Metric**
![Screenshot from 2023-03-24 18-46-01.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-46-01.png)
        
### Committed Memory Metrics:

- **Definition**: A graphical representation of the current in-use memory and the overall memory of the node, collected over time.

- **Usage**: Displays the current in-use memory and the overall memory of the node, collected over time.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-46-47.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-46-47.png)
    

#### Active and Inactive Memory Detail:

- **Definition**: A graphical representation of the currently in-use memory and the memory that can be reallocated by the system, collected over time.

- **Usage**: Displays the currently in-use memory and the memory that can be reallocated by the system, collected over time.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-47-22.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-47-22.png)
    

### Memory Writeback and Dirty:

- **Definition**: Show the memory that is in use and will be flushed to disk when possible.

- **Usage**: Monitor the amount of memory being used and being flushed to disk.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-48-22.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-48-22.png)
    

### Memory Shared and Mapped:

- **Definition**: Memory information field Mapped_bytes/ Shmem_bytes/ MemAvailable_bytes.

- **Usage**: These metrics show the amount of shared and mapped memory in bytes used by the system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-50-33.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-50-33.png)
        
    
### Memory Slab: 

- **Definition**: Show the allocated memory where the kernel objects are stored.

- **Usage**: The memory slab metric is useful for understanding the amount of memory being used by the kernel for storing objects. This information can help identify any memory leaks or inefficiencies in the kernel's memory management.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-51-30.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-51-30.png)
        

### Memory Vmalloc: 

- **Definition**: Memory information field that displays the amount of virtual memory currently allocated via vmalloc.

- **Usage**: The memory Vmalloc field provides insight into the virtual memory allocation and usage of the system. This information can be used to troubleshoot performance issues related to virtual memory usage.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-57-24.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-57-24.png)
        

### Memory Bounce: 

- **Definition**: Memory information field that shows the amount of memory reserved for kernel bounce buffers.

- **Usage**: This metric can be used to monitor the amount of memory used for bounce buffers and to identify potential performance issues related to memory pressure.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-59-07.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-59-07.png)
        
    
### Memory Anonymous: 

- **Definition**: Display the memory usage information for anonymous pages, including huge anonymous pages and regular anonymous pages, in bytes.

- **Usage**: This metric provides insight into the amount of memory being utilized for anonymous pages, which are pages that do not have an associated file or mapping. By monitoring changes in the amount of anonymous memory usage over time, administrators can identify potential memory leaks or other issues that may impact the performance of the system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 19-01-41.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-01-41.png)
        
    
### Memory Kernel / CPU: 

- **Definition**: Memory information field KernelStack_bytes/ Percpu_bytes.

- **Usage**: Memory field KernelStack_bytes displays the total amount of memory used by all kernel stacks in the system. The memory field Percpu_bytes displays the amount of memory used by per-CPU data structures.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 19-09-35.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-09-35.png)
        
    
### Memory HugePages Counter: 

- **Definition**: Memory information field HugePages_Free/ HugePages_Reserved.

- **Usage**: This metric shows the amount of HugePages memory that is free and reserved on the system. It provides insight into the memory allocation and usage of HugePages on the system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 19-10-20.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-10-20.png)
        
    
### Memory HugePages Size: 

- **Definition**: Show the information related to the total number of HugePages available and the HugePages size in bytes.

- **Usage**: This metric provides insight into the size and availability of HugePages, which are a feature in the Linux kernel that allow for the allocation of memory in large blocks. Monitoring this metric can help to detect issues with HugePage allocation, such as when the system runs out of HugePages or when there is fragmentation in the HugePage pool.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 19-11-06.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-11-06.png)
        
    
### Memory DirectMap: 

- **Definition**: Memory information field DirectMap1G_bytes.

- **Usage**: Monitor the DirectMap1G_bytes to understand the memory usage by the system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 19-11-50.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-11-50.png)
        
    
### Memory Unevictable and MLocked: 

- **Definition**: Show the memory information fields of Unevictable_bytes and Mlocked_bytes.

- **Usage**: This metric can be used to monitor the memory usage of the node and identify any potential issues with memory utilization.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 19-12-24.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-12-24.png)
        

### Memory NFS: 

- **Definition**: Memory information field NFS_Unstable_bytes.

- **Usage**: This metric provides information about the amount of NFS memory that is unstable, meaning it is being written to disk.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 19-12-52.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_19-12-52.png)
        

## Memory Vmstat
    
### Memory Pages In / Out: 

- **Definition**: Show the amount of paging activity of your node.

- **Usage**: This metric can be used to monitor the amount of paging activity of a node, which can be an indicator of memory pressure on the system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 14-57-12.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_14-57-12.png)
        
    
### Memory Pages Swap In / Out: 

- **Definition**: Show the amount of paging activity in the node swap.

- **Usage**: This metric can be used to monitor the amount of paging activity in the node swap, which can indicate the amount of memory pressure on the system and potentially lead to performance issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 14-57-57.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_14-57-57.png)
        
    
### Memory Page Faults: 

- **Definition**: Show the node is under heavy memory pressure.

- **Usage**: This metric can be used to monitor the memory pressure on a node. High values of page faults can indicate that the node is struggling to allocate enough memory to handle its workload, and may be a sign of memory exhaustion.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 14-58-28.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_14-58-28.png)
        
    
### OOM Killer: 

- **Definition**: Host Out of memory killer detected.

- **Usage**: This metric indicates that the system has run out of memory and the Out-of-Memory (OOM) killer has been invoked to sacrifice one or more processes in order to free up memory for the system. 

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 14-59-30.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_14-59-30.png)
        

## System Timesync
    
### Time Synchronized Drift: 

- **Definition**: Show the current time drift in the current node.

- **Usage**: Monitoring time drift between nodes in a cluster can help to identify and resolve issues related to time synchronization. 

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 15-01-32.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-01-32.png)
        
    
### Time PLL Adjust: 

- **Definition**: Phase-locked loop time constant.

- **Usage**: The phase-locked loop (PLL) time constant is used in computer clock synchronization systems to adjust the frequency of a local oscillator to match the frequency of an incoming signal.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 15-02-48.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-02-48.png)
        

- **Definition**: The status synchronized of the clock/ Local clock adjustment.

- **Usage**: This metric can be used to monitor the status of time synchronization on a node, which can be an indicator of network or hardware issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 15-03-25.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-03-25.png)
        

### Time Misc: 

- **Definition**: Seconds between clock ticks.

- **Usage**: This metric can be used to monitor the rate at which the clock is ticking on a node, which can indicate the stability and accuracy of the node's clock.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 15-04-00.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_15-04-00.png)
        
## System Processes
    
### Processes Status: 

- **Definition**: Number of processes running / blocked waiting for I/O to complete.

- **Usage**: This metric can be used to monitor the number of processes running and/or blocked on a node, which can indicate the level of activity on the system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-31-00.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-31-00.png)
        
    
### Processes State: 

- **Definition**: Number of processes in each state.

- **Usage**: This metric can be used to monitor the distribution of processes in different states, such as running, blocked, sleeping, and others. This information can be used to identify potential performance issues or bottlenecks in the system.

- **Threshold**: TBD

### Processes Forks: 

- **Definition**: Total number of forks.

- **Usage**: This metric can be used to monitor the rate at which new processes are being created on the system. This can be an indicator of the workload on the system and can also highlight any issues related to process creation, such as resource constraints.

- **Threshold**: TBD

- **Example Metric**    
![Screenshot from 2023-03-24 18-27-50.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-27-50.png)
        

### Processes Memory: 
    
- **Definition**: Memory size in bytes for each process.

- **Usage**: This metric can be used to monitor the memory usage of individual processes, which can help identify which processes are consuming the most memory and potentially contributing to overall system memory pressure.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-29-12.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-29-12.png)
        
<!--     
### PIDs Number and Limit: 

- **Definition**: Process ID limit.

### Process schedule stats and Running / Waiting:

- **Definition**: Number of seconds CPU spent running a process/ seconds spent by processing waiting for this CPU.
    
### Threads Number and Limit: 

- **Definition**: Number of allocated threads/ Threads limits. -->
    
## System Misc
    
### Context Switches / Interrupts: 

- **Definition**: Total number of context switches/ interrupts.

- **Usage**: This metric can be used to monitor the amount of context switches and interrupts that are occurring on the system. High levels of context switches or interrupts can indicate a heavily loaded or congested system, which can lead to performance issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-45-34.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-45-34.png)
        

### System Load:

- **Definition**: 1m, 5m, 15m load average.

- **Usage**: The system load average is a measure of the average system load over a specified period of time. The 1m, 5m, and 15m load averages are the average system load over the past 1 minute, 5 minutes, and 15 minutes, respectively.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-46-30.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-46-30.png)
        

### Interrupts Detail: 

- **Definition**: Show the total number of interruptions.

- **Usage**: This metric can be used to monitor the number of interruptions the system is handling, which can be an indicator of system load. High interruptions can indicate that the system is heavily utilized and may be under stress.

- **Threshold**: TBD

### Schedule timeslices executed by each cpu: 

- **Definition**: Track the number of slices of time that were used to run processes.

- **Usage**: This metric can be used to monitor the distribution of time slices among different CPUs. This can help to identify if there is an imbalance or if a particular CPU is overutilized.

- **Threshold**: TBD

### Entropy: 

- **Definition**: Bits of available entropy.

- **Usage**: Entropy is a measure of the randomness available in the system. Monitoring the entropy level can help to detect issues with the entropy source and to ensure that there is enough entropy available for the system to function correctly.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-48-00.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-48-00.png)
        

### CPU time spent in user and system contexts: 

- **Definition**: Total user and system CPU time spent in seconds.

- **Usage**: This metric can be used to monitor the amount of CPU time spent in user and system contexts. This can help identify performance bottlenecks and areas for optimization.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-49-00.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-49-00.png)
        
    
### File Descriptors: 

- **Definition**: Maximum/ Current number of open file descriptors.

- **Usage**: Monitoring the number of open file descriptors can help identify file descriptor leaks, which can cause system performance issues. It can also indicate issues with the application that is consuming file descriptors.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-49-50.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-49-50.png)
        
## Hardware Misc
    
### Hardware temperature monitor

- **Definition**: Show the temperature of the hardware.

- **Usage**: This metric can be used to monitor the temperature of the hardware components, such as the CPU, GPU, and motherboard. High temperatures can indicate an issue with the cooling system or a malfunctioning component, and should be investigated.

- **Threshold**: TBD

### Throttle cooling device: 

- **Definition**: Maximum / Current throttle state of the cooling device.

- **Usage**: This metric can be used to monitor the state of the cooling device, which helps prevent overheating.

- **Threshold**: TBD

### Power Supply:

- **Definition**: The status of the power supply.

- **Usage**: The power supply status can be used to monitor the state of the power supply, including its voltage and current levels. If the power supply status changes, this could indicate a problem with the power supply or the power source it is connected to.

- **Threshold**: TBD

## Systemd

### Systemd Sockets: 

- **Definition**: Total number of accepted socket connections.

- **Usage**: This metric can be used to monitor the total number of socket connections that have been accepted by the system. This can provide insight into the network activity and demand on the system.

- **Threshold**: TBD

### Systemd Units State: 

- **Definition**: Summary of systemd unit states.

- **Usage**: The Systemd Units State metric provides a summary of the state of all units managed by the Systemd service manager. This information can be used to monitor the health and status of individual units, as well as to track the overall stability of the system.

- **Threshold**: TBD

## Storage Disk

### Disk IOps Completed: 

- **Definition**: Show in detail the number of read/ write operations completed per second.

- **Usage**: This metric provides information about the number of read/ write operations completed by the disk, which can be used to monitor disk performance and identify performance bottlenecks.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-17-11.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-17-11.png)
    

### Disk R/W Data: 

- **Definition**: Show in detail the amount of data read/ written per second.

- **Usage**: This metric can be used to monitor the disk read and write activity on a system, which can be an indicator of disk performance and utilization.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-18-00.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-18-00.png)
    

### Disk R/W Time: 

- **Definition**: Show in detail the time taken to read/ write data to the disk.

- **Usage**: This metric can be used to monitor the time taken to perform disk read/write operations, which can be an indicator of disk performance.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-18-40.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-18-40.png)
    

### Disk IOs Weighted: 

- **Definition**: Show the number of seconds spent doing I/Os.

- **Usage**: This metric can be used to monitor the time spent by the disk on input/output operations. High values can indicate high disk utilization and potential performance issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-20-34.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-20-34.png)


### Disk R/W Merged: 

- **Definition**: Show the total number of Read/ Write merge operations.

- **Usage**: This metric can be used to monitor the efficiency of disk I/O operations. If a large number of read/ write merge operations are occurring, it may indicate that the disk is frequently accessing the same data, which can result in decreased performance.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-21-24.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-21-24.png)
    

### Time Spent Doing I/Os: 

- **Definition**: Total seconds spent doing I/Os

- **Usage**: This metric can be used to monitor the amount of time the system is spending on I/O operations, which can be an indicator of disk I/O performance. High values may indicate that the system is spending a lot of time waiting for I/O operations to complete, which can impact overall performance.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-22-13.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-22-13.png)
    

### Disk IOs Current in Progress: 

- **Definition**: The number of I/Os currently in progress.

- **Usage**: This metric can be used to monitor the current number of I/Os in progress on the system, which can help to identify potential performance bottlenecks.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-23-43.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-23-43.png)
    

### Disk Iops Discards completed/merged: 

- **Definition**: The total number of discards completed/merged successfully.

- **Usage**: This metric can be used to monitor the efficiency of disk discards. High numbers of discards can indicate that the disk is under heavy load or that there is an issue with the storage system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-31-33.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-31-33.png)


## Storage Filesystem

### Filesystem space available: 

- **Definition**: Space available and free to non-root users in bytes.

- **Usage**: This metric can be used to monitor the amount of available and free space on a filesystem. This information can be useful for predicting and preventing disk space issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 06-12-08.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_06-12-08.png)
    

### File Nodes Free: 

- **Definition**: Filesystem total free file nodes.

- **Usage**: This metric can be used to monitor the number of free file nodes in a file system. This can help indicate if the file system is running out of space for new files.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 06-08-13.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_06-08-13.png)


### File Descriptor: 

- **Definition**: File descriptor statistics: maximum / allocated.

- **Usage**: This metric can be used to monitor the number of file descriptors currently in use, as well as the maximum number of file descriptors that can be used at any given time. This information can be useful for troubleshooting issues related to file descriptor exhaustion.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 06-07-22.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_06-07-22.png)
    

### File Nodes Size: 

- **Definition**: Filesystem total file nodes.

- **Usage**: This metric can be used to monitor the total number of file nodes on a filesystem, which can provide insight into the overall utilization of the file system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 06-06-42.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_06-06-42.png)
    

### Filesystem in ReadOnly/Error: 

- **Definition**: Filesystem read-only status / Error getting statistics for the given device.

- **Usage**: This metric can be used to monitor the read-only status of a filesystem, which can indicate a potential issue with the underlying storage device. 

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 06-05-35.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_06-05-35.png)
    
## Network Traffic

### Network Traffic by Packets: 

- **Definition**: Network device statistic receive_packets/ transmit_packets.

- **Usage**: This metric is used to monitor the number of packets received and transmitted by a network device. This information can be used to understand the network traffic and help diagnose performance issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-53-17.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-53-17.png)
    

### Network Traffic Errors: 

- **Definition**: Network device statistic receive_errs/ transmit_errs.

- **Usage**: This metric can be used to monitor the number of errors that occur during network data transmission. This can indicate issues with network hardware or connectivity, and can be used to troubleshoot problems with network communication.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-54-05.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-54-05.png)
    

### Network Traffic Drop: 

- **Definition**: Network device statistic receive_drop/ transmit_drop.

- **Usage**: This metric can be used to monitor the amount of dropped network traffic, which can indicate network congestion or other issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-54-44.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-54-44.png)
    

### Network Traffic Compressed: 

- **Definition**: Network device statistic receive/transmit compressed.

- **Usage**: This metric can be used to monitor the amount of data being compressed by the network interface, which can impact the overall network performance.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-55-27.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-55-27.png)
    

### Network Traffic Multicast: 

- **Definition**: Network device statistic receive_multicast.

- **Usage**: This metric can be used to monitor the amount of multicast network traffic received by a device. This information can be useful to determine if there is a large amount of multicast traffic being received, which could indicate network congestion or other issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-57-03.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-57-03.png)
    

### Network Traffic Fifo: 

- **Definition**: Network device statistic receive_fifo/transmit_fifo.

- **Usage**: The network traffic FIFO metric can be used to monitor the rate at which data is transmitted and received through the network device in a first-in-first-out manner. This metric can provide information about the network device's buffer utilization and potential bottlenecks in the network.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 17-58-57.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_17-58-57.png)
    

### Network Traffic Frame: 

- **Definition**: Network device statistic receive_frame.

- **Usage**: This metric provides information on the number of receive_frame errors on the network device. This can indicate issues with the physical layer of the network, such as incorrect cabling or interference.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-10-43.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-10-43.png)
    

### Network Traffic Carrier: 

- **Definition**: Network device statistic transmit_carrier.

- **Usage**: This metric can be used to monitor the network device's transmit carrier. A carrier is a signal that is transmitted over a communication channel to provide synchronization between sender and receiver.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-11-25.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-11-25.png)
    

### Network Traffic Colls: 

- **Definition**: Network device statistic transmit_colls.

- **Usage**: This metric can be used to monitor the number of collisions that occur on a network device while transmitting data. High numbers of collisions can indicate network congestion or other issues with the network environment.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-13-30.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-13-30.png)
    

### NF Contrack:

- **Definition**: Number of currently allocated flow entries for connection tracking/ Maximum size of connection tracking table.

- **Usage**: This metric provides information on the usage and capacity of the connection tracking table, which is used by the netfilter framework to track the state of network connections. This information can be used to monitor the performance and efficiency of the connection tracking mechanism and identify any potential performance issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-21-40.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-21-40.png)


### ARP Entries: 

- **Definition**: ARP entries by device.

- **Usage**: This metric provides information on the number of ARP entries by device. This can be useful in monitoring the usage of ARP cache and identifying potential issues with network connectivity.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-22-07.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-22-07.png)
    

### MTU: 

- **Definition**: Node network mtu bytes

- **Usage**: The MTU metric can be used to monitor the maximum transmission unit size for the node's network interfaces. This can impact the performance and efficiency of network communication, and it may be necessary to adjust the MTU size to optimize network performance.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-22-32.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-22-32.png)
    

### Speed: 

- **Definition**: Node network interface speed in bytes per second.

- **Usage**: This metric can be used to monitor the speed of a network interface, which can indicate the performance of the network and potential bottlenecks.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-22-53.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-22-53.png)


### Queue Length: 

- **Definition**: Node network device transmit queue length.

- **Usage**: This metric can be used to monitor the length of the transmit queue on a network device. High queue length can indicate network congestion, leading to increased latency and decreased network performance.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-23-17.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-23-17.png)
    

### Softnet Packets: 

- **Definition**: Number of processed / dropped packets.

- **Usage**: This metric can be used to monitor the efficiency of network packet processing in the system. High values of processed packets could indicate that the system is handling network traffic efficiently, while high values of dropped packets could indicate that the system is under high network pressure and may need additional resources.

- **Threshold**: TBD


### Softnet Out of Quota: 

- **Definition**: Number of times processing packets ran out of quota.

- **Usage**: This metric can be used to monitor the number of times the packet processing quota has been exceeded, which can be an indicator of high network traffic or other performance issues.

- **Threshold**: TBD

### Network Operational Status: 

- **Definition**: Network interface status

- **Usage**: This metric can be used to monitor the operational status of the network interface, which can help to quickly identify issues with the network.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 18-23-47.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_18-23-47.png)
    
## Network Sockstat

### Sockstat TCP: 

- **Definition**: Number of TCP sockets in state alloc / inuse.

- **Usage**: This metric can be used to monitor the number of TCP sockets in different states (alloc, inuse) on a node, which can be an indicator of the current usage and resource utilization of the system.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 05-37-01.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-37-01.png)
        
    
### Sockstat UDP: 

- **Definition**: The number of UDP sockets currently in use.

- **Usage**: This metric is useful for monitoring the usage of UDP sockets on the system. It can help identify if there is a high demand for UDP socket connections and if the system is able to handle the load. 

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 05-36-14.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-36-14.png)
        
    
### Sockstat Used: 

- **Definition**: The number of IPv4 sockets in use is a metric that indicates the total number of active IPv4 sockets on the system. It is an important performance metric as it provides insight into the level of network activity and the utilization of network resources. 

- **Usage**: The number of IPv4 sockets in use can be used to monitor the overall health and performance of a network. By tracking this metric over time, administrators can identify trends and patterns in network usage and determine if there are any issues that need to be addressed. 

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 05-35-21.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-35-21.png)
        

### Sockstat Memory Size: 

- **Definition**: Number of TCP/ UDP sockets in state mem_bytes.

- **Usage**: This metric is used to track the number of TCP and UDP sockets that are currently in use, as well as the amount of memory being consumed by these sockets. This information can be useful for monitoring the performance of a system and identifying any potential performance bottlenecks.

- **Threshold**: TBD


- **Example Metric**
![Screenshot from 2023-03-24 05-33-44.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-33-44.png)
        
    
### Sockstat FRAG/RAW: 

- **Definition**: Number of FRAG and RAW sockets in use and their memory usage.

- **Usage**: By monitoring this metric, you can get an understanding of the system's socket usage, which can help you identify potential performance issues related to network communication.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 05-32-41.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-32-41.png)
        
## Network Netstat
    
### Netstat IP IN/Out Octets: 

- **Definition**: Shows the incoming and outgoing network traffic in octets (units of digital information).

- **Usage**: This metric is useful in understanding the network load on a system and can help identify network bottlenecks.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 05-31-03.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-31-03.png)
        
    
### Netstat IP Forwarding: 

- **Definition**: The number of IP packets that have been forwarded from the server.

- **Usage**: This metric can be used to monitor the amount of IP traffic that is being forwarded from the server, which can help identify potential network bottlenecks or issues with routing configurations.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 05-30-01.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-30-01.png)
        
    
### ICMP In/Out: 

- **Definition**: The number of incoming and outgoing Internet Control Message Protocol (ICMP) packets. 

- **Usage**: This metric can be used to monitor the amount of ICMP traffic that is being received and sent by the system. This information can be useful in understanding the network activity of the system and detecting any potential network issues or security threats.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 05-28-34.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_05-28-34.png)
        
    
### ICMP Errors:

- **Definition**: The number of ICMP error packages.

- **Usage**: This metric can be used to monitor the health of the network and identify any potential issues with ICMP traffic.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 00-18-02.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_00-18-02.png)
        
    
### UDP In/Out: 

- **Definition**: The number of incoming and outgoing UDP packets.

- **Usage**: This metric can be used to monitor the network traffic on a system and ensure that there are no bottlenecks or issues with the UDP packets being transmitted or received. 

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-24 00-15-33.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_00-15-33.png)
        
    
### UDP Errors:

- **Definition**: The number of UDP packages with errors.

- **Usage**: This metric is used to monitor the error rate of UDP packages being transmitted or received by the system. High error rates can indicate issues with the network or the applications using the network.

- **Threshold**: TBD


- **Example Metric**
![Screenshot from 2023-03-24 00-11-31.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_00-11-31.png)
        
    
### TCP In/Out: 

- **Definition**: The number of incoming and outgoing TCP packages.

- **Usage**: This metric is used to monitor the volume of TCP traffic being transmitted or received by the system. High levels of incoming or outgoing traffic can indicate a busy network or heavy usage of applications that rely on TCP communication.

- **Threshold**: TBD   

- **Example Metric**
![Screenshot from 2023-03-24 00-00-06.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-24_00-00-06.png)
        
    
### TCP Errors: 

- **Definition**: The number of TCP packages that have been dropped during transmission.

- **Usage**: This metric is used to monitor the error rate of TCP packages being transmitted or received by the system. High error rates can indicate issues with the network or the applications using the network.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-23 23-59-23.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-23_23-59-23.png)
        
    
### TCP Connections: 

- **Definition**: The number of currently open TCP connections.

- **Usage**: This metric is used to monitor the number of active connections to the system using the TCP protocol. This can provide insights into the overall network traffic and the number of clients or servers connected to the system.

- **Threshold**: TBD


- **Example Metric**
![Screenshot from 2023-03-23 23-51-47.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-23_23-51-47.png)
        
    
### TCP SynCookie:

- **Definition**: The number of TCP syncookies, which are a security measure used to prevent against syn flood attacks.

- **Usage**: This metric is used to monitor the use of TCP syncookies on the system. High numbers of syncookies can indicate that the system is under attack or that there are issues with the network or applications using the network.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-23 23-47-30.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-23_23-47-30.png)
        
    
### TCP Direct Transition:

- **Definition**: The current number of TCP connections on the system.

- **Usage**: This metric can be used to monitor the number of active connections and ensure that the system is not overburdened with too many connections, which could lead to performance issues.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-23 23-46-34.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-23_23-46-34.png)
        
## Node Exporter
    
### Node Exporter Scrape Time: 

- **Definition**: Show the time it takes to scrape the information from the node.

- **Usage**: This metric can be used to monitor the efficiency of the node exporter. If the scrape time is consistently high, it may indicate a performance issue with the node exporter or the system it is monitoring.

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-23 23-07-41.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-23_23-07-41.png)
        
    
### Node Exporter Scrape: 

- **Definition**: Display the status of all the Prometheus scrape runs.

- **Usage**: The Node Exporter Scrape metric is used to monitor the status of all scrape runs performed by Prometheus. If the scrape is successful, the metric will show a status of "1," and if the scrape has failed, the metric will show a status of "0."

- **Threshold**: TBD

- **Example Metric**
![Screenshot from 2023-03-23 23-09-14.png](/../static/img/telemetry-dashboards/system-health-imgs/Screenshot_from_2023-03-23_23-09-14.png)