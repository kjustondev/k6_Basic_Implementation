import http from 'k6/http'; // Import the http module
import { SharedArray } from 'k6/data';
import { check, sleep } from 'k6'; // Import check and sleep

// Load the JSON file in the global scope
const users = new SharedArray('users', function () {
    const userData = open('/Users/juston/Desktop/Personal Cover Letter Portfollio/k6_Basic_Implementation/Performance_Test_Implementation/Performance_Test_JSON_Config/users.json');
    const parsedData = JSON.parse(userData);
    console.log('Parsed Data:', parsedData); // Log parsed data
    return parsedData.users; // Return the users array
});

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

// Check if users array is populated
if (!users || users.length === 0) {
    console.error('No users found in the users array!');
}

// The default function runs the actual test
export default function () {
    const user = users[Math.floor(Math.random() * users.length)];
    console.log('Selected User:', user); // Log selected user

    const payload = JSON.stringify({
        name: user.username,
        surname: user.surname,
    });
    const headers = { 'Content-Type': 'application/json' };

    // Change the URL to localhost:3000
    const res = http.post('http://localhost:3000', payload, {
        headers,
    });

    console.log('Response Status:', res.status);
    console.log('Response Body:', res.body);

    // Check response validity
    const isValidResponse = check(res, {
        'Post status is 200': (r) => r.status === 200,
        'Post Content-Type header': (r) => r.headers['Content-Type'] === 'application/json',
        'Post response name': (r) => r.json().name === user.username,
    });

    if (!isValidResponse) {
        console.error('Request failed validation:', {
            status: res.status,
            body: res.body,
        });
    }

    // Optional sleep to pace requests
    sleep(1);
}