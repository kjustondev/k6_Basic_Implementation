# K6 Performance Test JavaScript Implementation <br>[<kbd>Previous Page</kbd>](../README.md)[<kbd>Next Page</kbd>](../local-server/README.md) 
For Implementing Performance Test into any application, we will need to use Grafana K6. It is an open source load testing tool designed for efficient performance testing in any applications. Test scripts can be written in Kotlin or JavaScript, but for the following example of implementation the script will be writen in Javascript. 

To better understand the capabilities of Grafana K6 feel free to check out the Learn More section of this documentation. 

## Goal:
 To establish the basic understanding on using Grafana K6 to implement load testing to any projects.

### K6 Implementation Structure (System Design):
 ![Types of Load Testing Overview](/Images/Flowcharts.png)

### K6 Implementation Steps:

1. Create/Ensure there is a delicated directory for any K6 Grafana JavaScript Implementation from the root level
    <code>mkdir Testing_Implementation</code>
 > [!IMPORTANT]  
 > This is setup a directory for limited to application testing only

2. Install the K6 Commands:
- On macOS: `brew install k6` 

- On Windows (Command Prompt): `choco install k6` 

- On Docker: `docker run -i loadimpact/k6 run - <script.js`

3. Validate if k6 is installed
    <code>k6 version</code>

4. Under the `Testing_Implementation` directory, create 2 seperate directories under the one for hosting JavaScripts, another hosting for JSON context files:
    <p><code>mkdir Implementation_JS</code><br><code>mkdir Implementation_JSON</code></p>

5. Navigate to the `Implementation_JS` and create a .js file. 
  > [!IMPORTANT]  
  > This will be the directory for hosting K6 scripts:

   ```javascript
       // import necessary module
       import http from 'k6/http'; // Import the http module
       import { SharedArray } from 'k6/data';

       // This method configures the amount of virtual users calling the services in set durations
       export const options = {
           stages: [
               { duration: '1m', target: 100 },
               { duration: '2m', target: 200 },
           ],
       };

       // This is to setup the endpoint where the K6 run scripts hits
       export default function () {
         const url = '<<YOUR ENDPOINT URL FOR TESTING>>'
  ;
         // JSON payload for the endpoint that is authenticating
         const payload = JSON.stringify({
             username: 'test_case',
             password: '1234',
         });
  
         // Parameters file content type declaration
         const params = {
             headers: {
             'Content-Type': 'application/json',
             },
         };
  
         // When K6 run command executes it will make a http post request to the given endpoint url
         const res = http.post(url, payload, params);
       }
   ```
   The above JavaScript is a sample of a basic K6 script structure, for a more advance implementation checkout [this file](JavaScript_Implementation/localPerformanceBaseTest.js).

6. The `Implementation_JSON` directory is for hosting any necessary JSON context file setup for the K6 JavaScript.

- Here is an example for the json setup
    ```json
    {
        "users": [
            { "username": "validUser1", "password": "validPassword1" },
            { "username": "validUser2", "password": "validPassword2" },
            { "username": "invalidUser", "password": "invalidPassword" }
        ]
    }
    ```
- Check out here for the sample repo as [reference](Performance_Test_JSON_Config/).
    
7. To execute the k6 run test here is the command:
    <br><code>k6 run %YOUR PATH TO THE SCRIPT/load_test.js</code>

8. To abort the test at anytime type <kbd>Ctrl</kbd> + <kbd>c</kbd> to end the session.


## Learn More:
YouTube video on K6 Overview: [Official Grafana K6 Channel Video](https://www.youtube.com/watch?v=1mtYVDA2_iQ&t=2s).

You can learn more in the: [Official Grafana K6 Documentation](https://grafana.com/docs/k6/latest/examples/get-started-with-k6/).
