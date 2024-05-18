const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Adjust CORS configuration according to your frontend domain
const corsOptions = {
    origin: 'https://jade-tartufo-02d94f.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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
    console.log(`Server is running on port ${PORT}`);
});
