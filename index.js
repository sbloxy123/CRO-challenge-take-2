// Packages and variables
const express = require("express"),
  server = express(),
  port = 7000;

// Static directory
server.use("/public", express.static(`${__dirname}/public`));

// Listen to port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
