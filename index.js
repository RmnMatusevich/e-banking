const config = require("./config.json");
const db = require("./database/models");

const server = require("./server")(db, config);

(async function () {
  server.listen(9000, () => console.log("Running"));
})();
