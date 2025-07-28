const config = require("../global_variables");

const mongoose = require("mongoose");

const connect_db = async () => 
{
    try
    {
        await mongoose.connect(config.DATABASE);

        console.log("MongoDB Connected");
    }
    catch(error)
    {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connect_db;
