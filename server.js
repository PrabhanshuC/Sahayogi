const express = require("express");
const path = require("path");
const morgan = require("morgan");

// Global variables
const config = require("./global_variables");

// Creating application
const server = express();

server.use(express.json());
server.use(express.urlencoded());
server.use(express.static(path.join(__dirname, "static")));

// Logging
server.use(morgan('dev'));

// CORS
const cors = require("cors");

const options =
{
    origin: config.DATABASE
};

server.use(cors(options));

// Database
const connect_db = require("./config/database");

connect_db();

const home = require("./controllers/home");
const { model } = require("mongoose");

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// Routes
server.get("/", home);

// server.use("/admin", require("./Routes/admin"));
server.use("/user", require("./routes/user"));
server.use("/article", require("./routes/article"));

server.listen(config.PORT, config.HOSTNAME, () => console.log(`Server is running at http://${config.HOSTNAME}:${config.PORT}`));
