const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log('Received:', req.body);
    res.json({ name: req.body.name, surname: req.body.surname });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
