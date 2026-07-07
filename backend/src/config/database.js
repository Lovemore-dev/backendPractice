import mongoose from "mongoose"; //Import mongoose module

const connectDB = async () => { //Function to connect to MongoDB database
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`) //Connect to MongoDB using the connection string from environemnt variables
        console.log(`MongoDB connected !! ${connectionInstance.connection.host}`); //Log the host of the connected MongoDB instance
    } catch (error){
        console.error("MongoDB connection failed", error); 
        process.exit(1); //Exit process with failure
    }
}

export default connectDB; //Export the connectDB function for use in other modules