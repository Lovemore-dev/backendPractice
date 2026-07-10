//Import dotenv module to load environment variables from .env file
import dotenv from "dotenv"; 

//Specify the path to the .env file
dotenv.config({
    path: "./.env" 
})

//Import the connectDB function to establish a connection to the database
import connectDB from "./config/database.js"; 

//Import the express application instance
import app from "./app.js"; 

//Function to start the server
const startServer = async () => { 
    try {
        //Connect to the database
        await connectDB(); 
        //Handle server errors
        app.on("error", (error) => { 
            console.error("Server error:", error);
        throw error;
    });
    //Start the server and listen on the specified port
    app.listen(process.env.PORT || 5001, () => { 
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    
    }catch (error){
        //Log any errors that occur during the database connection
        console.error("MongoDB connection failed", error); 
    }
}

//Call the startServer function to initialize the server and connect to the database
startServer(); 