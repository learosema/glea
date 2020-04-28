const PORT = 1337 || process.env.PORT;
const HOST = 'localhost' || process.env.HOST;
const express = require('express');
const app = express();
app.use(express.static('docs'));

app.listen(PORT, HOST, () =>
  console.log(`Server listening on http://${HOST}:${PORT}/`)
);
