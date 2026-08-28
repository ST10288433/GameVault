// import mongoose
const mongoose = require("mongoose");

/*connect gameVault to mongodb

connection = asynchronous

backend needs to:
- contact mongo
- est a network connection
- auth db user
- select deployment = cluster provider
- est usable db connection

connection = asynchronous ? because server should wait for this operation before
accepting API requests
*/

const connectDB = async () =>{
    
    // read the mongoDB connection string
    const mongoURI = process.env.MONGODB_URI;

    // dont let the backend start without the req db config
    if(!mongoURI){
        throw new Error(
            "MONGODB_URI is not ready/configured."
        );
    }

    // mongoose.connect establishes the connection
    await mongoose.connect(mongoURI);

    console.log("GameVault connected to MongoDB successfully.");

};

module.exports = connectDB;
