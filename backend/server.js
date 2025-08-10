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
server.use(morgan("dev"));

// CORS
const cors = require("cors");

const options =
{
    origin: config.FRONTEND,
    optionsSuccessStatus: 200
};

server.use(cors(options));

// Database
const connect_db = require("./config/database");

connect_db();

// Routes

// For API routes related to authentication
server.use("/api/auth", require("./routes/auth"));

// For API routes related to user profiles
server.use("/api/users", require("./routes/user"));

// For API routes related to articles
server.use("/api/articles", require("./routes/article"));

// For API routes related to searching
server.use("/api/search", require("./routes/search"));

// For API routes related to admin
server.use("/api/admin", require("./routes/admin"));

server.listen(config.PORT, config.HOSTNAME, () => console.log(`Server is running at http://${config.HOSTNAME}:${config.PORT}`));
