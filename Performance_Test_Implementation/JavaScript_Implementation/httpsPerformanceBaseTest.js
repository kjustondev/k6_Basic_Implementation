import { check, sleep, Rate } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

// Load the JSON file using the absolute path
let usersData;

try {
  usersData = JSON.parse(open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Implementation/Performance_Test_JSON_Config/users.json'));
} catch (e) {
  throw new Error(`Error parsing users.json: ${e.message}`);
}

if (!usersData || !usersData.users || !Array.isArray(usersData.users)) {
  throw new Error("Invalid users data: Ensure the JSON structure is correct.");
}

const users = new SharedArray('users', function () {
  return usersData.users;
});

// Create a Rate metric to track failed requests
const failRate = new Rate('failed_requests');

export const options = {
    stages: [
        { duration: '15s', target: 100 },
        { duration: '1m', target: 20 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<2000'],
        'failed_requests': ['rate<0.01'],
    },
};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  // Check if user is undefined
  if (!user) {
    throw new Error("No user found in the users array.");
  }

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

  if (!isValidResponse) {
    failRate.add(1);
  }

  if (res.status === 200) {
    const delPayload = JSON.stringify({ name: res.json().json.name });
    http.patch('https://httpbin.test.k6.io/patch', delPayload, { headers });
  }

  sleep(1);
}
