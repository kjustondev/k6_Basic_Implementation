import { check, sleep, Counter } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

// Load the users from the JSON file with the correct path
const users = new SharedArray('users', function () {
  return JSON.parse(open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Implementation/Performance_Test_JSON_Config/users.json')).users; // Ensure the path is correct
});

// Counters for valid and failed responses
let validResponses = new Counter('valid_responses');
let failedResponses = new Counter('failed_responses');

export const options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  // Select a random user for each iteration
  const user = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });
  const headers = { 'Content-Type': 'application/json' };

  const res = http.post('http://localhost:3000/users', payload, { headers });

  // Log the response status for debugging
  console.log(`Response status: ${res.status}`);

  // Ensure the response is valid before checking it
  const isValidResponse = check(res, {
    'is status 200': (r) => r.status === 200,
    'is response valid': (r) => {
      try {
        const json = r.json();
        return json && json.token !== undefined; // Adjust based on expected response
      } catch (error) {
        console.error('Error parsing JSON response:', error);
        return false; // Invalid response if JSON parsing fails
      }
    },
  });

  if (isValidResponse) {
    validResponses.add(1);
  } else {
    failedResponses.add(1);
    console.error(`Failed response: ${res.body}`); // Log the entire response body
  }

  sleep(1); // Pause for a second between requests
}

export function handleSummary(data) {
  return {
    'stdout': JSON.stringify({
      valid_responses: validResponses.count,
      failed_responses: failedResponses.count,
    }, null, 2),
  };
}