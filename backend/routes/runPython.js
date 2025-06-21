const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.send('Welcome to the Python Function Runner API');
});

router.post('/call_python_function', (req, res) => {
  console.log('POST request received to run Python');

  const pythonScriptPath = path.join(__dirname, '../../python/invisitech.py');
  console.log('Using Python path', pythonScriptPath);

  const pythonProcess = spawn('python', [pythonScriptPath]);

  let output = '';
  let errorOutput = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Python script error', errorOutput);
      return res.status(500).json({ error: errorOutput });
    }
    res.json({ output });
  });
});

module.exports = router;
