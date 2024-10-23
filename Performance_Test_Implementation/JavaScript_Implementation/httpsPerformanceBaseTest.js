import { check, sleep, Counter } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { Rate } from 'k6/metrics';

// Load the JSON file using the absolute path
const userData = open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Implementation/Performance_Test_JSON_Config/users.json');
console.log('User Data:', userData);  // Log the raw data read from the file
const users = new SharedArray('users', function () {
    const parsedData = JSON.parse(userData);
    console.log('Parsed Data:', parsedData); // Log the parsed data
    return parsedData.users;
});

console.log('Users:', users); // Log the users array to ensure it’s populated



// Create Counters for total counts
const totalSuccessfulRequests = new Counter('successful_requests');
const totalFailedRequests = new Counter('failed_requests');


export const options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 200 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<2000'],
    },
};


export default function () {

  const user = users[Math.floor(Math.random() * users.length)];
  console.log('Selected User:', user); // Log selected user


  const payload = JSON.stringify({
    name: user.username,
    surname: user.surname,
  });
  const headers = { 'Content-Type': 'application/json' };
  
  const res = http.post('https://httpbin.test.k6.io/post', payload, { headers });

  const isValidResponse = check(res, {
    'Post status is 200': (r) => r.status === 200,
    'Post Content-Type header': (r) => r.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => r.status === 200 && r.json().json.name === user.username,
  });

  // Track valid and failed responses
  if (isValidResponse) {
    totalSuccessfulRequests.add(1); // Count successful requests
  } else {
    totalFailedRequests.add(1); // Count failed requests
  }

  if (res.status === 200) {
    const delPayload = JSON.stringify({ name: res.json().json.name });
    http.patch('https://httpbin.test.k6.io/patch', delPayload, { headers });
  }

  // Optional sleep to pace requests
  sleep(1);
}
