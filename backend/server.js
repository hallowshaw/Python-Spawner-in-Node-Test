// backend/server.js
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post('/run-script', (req, res) => {
    const { word } = req.body;

    const pyScript = spawn('python', ['../hello.py', word]);

    pyScript.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.send(data.toString());
    });

    pyScript.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pyScript.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
