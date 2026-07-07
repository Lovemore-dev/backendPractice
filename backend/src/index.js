import dotenv from "dotenv"; //Import dotenv module to load environment variables from .env file
dotenv.config({
    path: "./.env" //Specify the path to the .env file
})

import connectDB from "./config/database.js"; //Import the connectDB function to establish a connection to the database

import app from "./app.js"; //Import the express application instance


const startServer = async () => { //Function to start the server
    try {
        await connectDB(); //Connect to the database

        app.on("error", (error) => { //Handle server errors
            console.error("Server error:", error);
        throw error;
    });

    app.listen(process.env.PORT || 5001, () => { //Start the server and listen on the specified port
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    }catch (error){
        console.error("MongoDB connection failed", error); //Log any errors that occur during the database connection
    }
}

startServer(); //Call the startServer function to initialize the server and connect to the database