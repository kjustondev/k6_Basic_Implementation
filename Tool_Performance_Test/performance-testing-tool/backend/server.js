const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/perform-test', upload.fields([{ name: 'xml' }, { name: 'json' }]), (req, res) => {
    // Run your performance test script here
    const xmlPath = path.join(__dirname, req.files['xml'][0].path);
    const jsonPath = path.join(__dirname, req.files['json'][0].path);

    // Replace with your actual k6 command
    exec(`k6 run ${xmlPath} ${jsonPath}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send({ error: stderr });
        }
        res.send({ results: stdout });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
