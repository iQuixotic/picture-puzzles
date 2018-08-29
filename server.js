const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4040;
const app = express();
const routes = require('./routes')

// Define middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.use(express.static(path.join(__dirname, 'views')));

// listen on port PORT
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});