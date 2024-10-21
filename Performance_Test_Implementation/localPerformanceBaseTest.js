import { check } from 'k6';
import { sleep } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import ws from 'k6/ws';

const users = new SharedArray('users.json', function () {
    return JSON.parse(open('./users.json')).users;
});

export const options = {
    stages: [
        { duration: '1m', target: 20 },
        { duration: '3m', target: 20 },
        { duration: '1m', target: 0 },
    ]
};

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];
    const payload = JSON.stringify({
        name: user.username,
        surname: user.surname,
    });
    const headers = { 'Content-Type': 'application/json' };
    
    // HTTP POST request to the local server
    const res = http.post('http://localhost:8080/api/users', payload, { headers });

    check(res, {
        'Post status is 200': (r) => r.status === 200,
        'Post Content-Type header': (r) => r.headers['Content-Type'] === 'application/json',
        'Post response name': (r) => r.status === 200 && r.json().json.name === user.username,
    });

    if (res.status === 200) {
        // Prepare payload for PATCH request
        const delPayload = JSON.stringify({ name: res.json().json.name });
        http.patch('http://localhost:8080/api/users/update', delPayload, { headers });
    }

    // WebSocket connection to localhost
    const host = ws.connect('ws://localhost:8080/host', {}, function (socket) {
        socket.on('open', () => {
            console.log('WebSocket connection opened');
            // Send a message to the server
            socket.send(JSON.stringify({ message: 'K6 Initiated' }));

            // Close the WebSocket connection after sending the message
            socket.close();
        });

        socket.on('close', () => {
            console.log('WebSocket connection closed');
        });

        socket.on('error', (e) => {
            console.error('WebSocket error:', e);
        });
    });

    sleep(1); // Optional sleep after operations
}
