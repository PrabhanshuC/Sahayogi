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

const api_limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

// Authentication Rate Limiter (More Strict)
// Allows 5 requests per IP per 5 minutes for login/registration
const auth_limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many login/registration attempts from this IP, please try again after 5 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

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

// Rate limiting

// Rate limiting for every route
server.use("/api/", api_limiter);

// Rate limiting for /auth routes
server.use("/api/auth/login", auth_limiter);
server.use("/api/auth/register", auth_limiter);

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
