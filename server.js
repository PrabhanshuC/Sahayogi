const config = require("./global_variables");
const connect_db = require("./Config/database");

const express = require("express");
const path = require("path");
const cors = require("cors");

const options = {
    origin: config.DATABASE
}

connect_db();

const server = express();

server.use(express.json);
server.use(express.static(path.join(__dirname, "Static")));
server.use(cors(options));

// server.use("/admin", require("./Routes/admin"));
server.use("/user", require("./Routes/user"));
server.use("/article", require("./Routes/article"));

server.listen(config.PORT, config.HOSTNAME, () => console.log(`Server is running at ${config.HOSTNAME}:${config.PORT}`));
