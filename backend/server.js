const express = require("express");
const path = require("path");
const morgan = require("morgan");

// Global Variables
const config = require("./global_variables");

// Creating Application
const server = express();

// Core Middleware
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static(path.join(__dirname, "..", "static")));

// Logging
server.use(morgan('dev'));

// CORS Configuration
const cors = require("cors");

const options =
{
    origin: config.FRONTEND
};

server.use(cors(options));

// Database Connection
const connect_db = require("./config/database");

connect_db();

// View Engine Setup (for page-serving routes)
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views/templates"));

// Route Mounting

// API and Page-Serving Routes
server.use(require("./routes/pages"));
server.use(require("./routes/user"));
server.use(require("./routes/workspace"));
server.use(require("./routes/resource"));
server.use(require("./routes/admin"));

// server.use("/admin", require("./Routes/admin"));
server.use("/user", require("./routes/user"));
server.use("/resource", require("./routes/resource"));

server.listen(config.PORT, config.HOSTNAME, () => console.log(`Server is running at http://${config.HOSTNAME}:${config.PORT}`));
