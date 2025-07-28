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

// For API routes related to authentication
server.use("/api/auth", require("./routes/auth"));

// For API routes related to user profiles
server.use("/api/users", require("./routes/user_profile"));

// For API routes related to workspaces and resources
server.use("/api/workspaces", require("./routes/workspace"));
server.use("/api/resources", require("./routes/resource"));
server.use("/api/admin", require("./routes/admin"));

server.listen(config.PORT, config.HOSTNAME, () => console.log(`Server is running at http://${config.HOSTNAME}:${config.PORT}`));
