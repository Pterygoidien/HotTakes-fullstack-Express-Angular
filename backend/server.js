const http = require("http");
const dotenv = require("dotenv").config(".env");
const app = require("./app");

const port = process.env.HOST_PORT || 3004;
const server = http.createServer(app);
server.listen(port, () =>
  console.log(`Démarrage du serveur sur le port ${port}`)
);
