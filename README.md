# Strengthen Software & More Than Testing <br>[<kbd>Next Page</kbd>](Performance_Test_Implementation/README.md)
This is a personal project for guiding any future developers on desiring to limit test and improve their software reliance by leveraging Grafana K6 implementation for any projects to be capable to execute performance/load testing in their applications.

## What is Performance Testing?

- Is a type of software testing that is carried out to determine system performance in terms of **Sensitivity**, **Reactivity**, and **Stability** under a particular workload.
  
   <table border="0">
    <tr>
       <td><b style="font-size:30px">Sensitivity</b></td>
       <td><b style="font-size:30px">Reactivity</b></td>
       <td><b style="font-size:30px">Stability</b></td>
    </tr>
    <tr>
       <td>The Sensitivity of the system is defined in the case how much the varying types responses made overtime.</td>
       <td>The Reactivity of the system is defined by the frequency of successful calls are made overtime.</td>
       <td>The Stability of the system is defined in the system ability to operating in operational conditions overtime.</td>
    </tr>
   </table>
- Ultimately the purpose is to increase system reliability by immitate conditions to uncover potential system issues.

## What is Load Testing?
- Is a type of software testing that determines the performance of a system, software product, or software application under real life based load conditions. 

> [!NOTE]  
> ### Wouldn't Dashboard Monitor System does that already?
> - YES! It does! Tools like Grafana, Kibana, OpenLens and other tools would do the job. 
> - However we want to discover potential problems occur before we even deploy software into lower levels enviornment and so that when issues occur they are visible and we have already anticipated when spoted.  



## Types of testing methodologies

![Types of Load Testing Overview](/Images/loadTestTypeOverview.png)

1. Smoke Test:
   - It verify the system functions with minimal load, and they are used to gather baseline performance values.

2. Average-Load Test:
   - It assess how the system performs under a typical load for your system or application. Typical load might be a regular day in production or an average timeframe in your daily traffic.

3. Stress Test:
    - It discovers how the system functions with the load at peak traffic.

4. Spike Test:
    - It verifies whether the system survives and performs under sudden and massive rushes of utilization.

5. Breakpoint Test:
    - It tests to discover your system’s limits. Usually comprised of a breakpoint test ramps to unrealistically high numbers.

6. Soak Test: 
    - It is a variation of the average-load test but in a longer sustained duration. 
        - In a soak test, the peak load is usually an average load, but the peak load duration extends several hours or even days.



# Implementation Overview:
There will be 2 seperate parts of the implementation, please refer to these documentations below.
- Part I - (Mandatory): How to setup K6 and full JavaScript implementation: [Documentation for K6 Implementation](Performance_Test_Implementation/README.md)

- Part II - (Optional): Localhost Setup for endpoint testing: [Documentation for local environment setup](local-server/README.md)

## Learn More:

To understand the difference between Performance Testing and Load Testing: [Performance Testing vs. Load Testing](https://www.geeksforgeeks.org/difference-between-performance-testing-and-load-testing/).

More on Load Testing: [The 6 Types of Load Testing](https://grafana.com/load-testing/types-of-load-testing/)
