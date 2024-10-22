import { check, sleep, Counter } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { Rate } from 'k6/metrics';

// Load the JSON file using the absolute path
const users = new SharedArray('users', function () {
  return JSON.parse(open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Implementation/Performance_Test_JSON_Config/users.json')).users;
});

// Create a Rate metric to track failed requests
const failRate = new Rate('failed_requests');

// Counters for valid and failed responses
let validResponses = 0;
let failedResponses = 0;

export const options = {
    stages: [
        { duration: '15s', target: 100 },
        { duration: '1m', target: 20 },
        // { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<2000'],
        'failed_requests': ['rate<0.01'],  // Set a threshold for failed requests
    },
    ext: {
        loadimpact: {
            distribution: {
                'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
            },
        },
    },
};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    name: user.username,
    surname: user.surname,
  });
  const headers = { 'Content-Type': 'application/json' };
  
  const res = http.post('https://httpbin.test.k6.io/post', payload, {
    headers,
  });

  const isValidResponse = check(res, {
    'Post status is 200': (r) => r.status === 200,
    'Post Content-Type header': (r) => r.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => r.status === 200 && r.json().json.name === user.username,
  });

  // Track valid and failed responses
  if (isValidResponse) {
    validResponses++;
  } else {
    failedResponses++;
    failRate.add(1); // Increment the fail rate
    // console.log('Failed request count:', failedResponses); // Log failed requests
  }

  // console.log('Response Returned: ', res.status);

  if (res.status === 200) {
    const delPayload = JSON.stringify({ name: res.json().json.name });
    http.patch('https://httpbin.test.k6.io/patch', delPayload, { headers });
  }

  // Optional sleep to pace requests
  sleep(1);
}