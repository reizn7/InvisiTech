const express = require('express');
const cors = require('cors');
const app = express();
const runPythonRoute = require('./routes/runPython');

app.use(cors());
app.use(express.json());
app.use('/', runPythonRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

