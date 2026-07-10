//Import mongoose module
import mongoose from "mongoose"; 

//Function to connect to MongoDB database
const connectDB = async () => { 
    try{
        //Connect to MongoDB using the connection string from environemnt variables
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`) 
        //Log the host of the connected MongoDB instance
        console.log(`MongoDB connected !! ${connectionInstance.connection.host}`); 
    } catch (error){
        console.error("MongoDB connection failed", error); 
        //Exit process with failure
        process.exit(1); 
    }
}
//Export the connectDB function for use in other modules
export default connectDB; 