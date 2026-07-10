//Import express module
import express from "express"; 

//Create an express application
const app = express(); 

// Middleware to parse incoming JSON requests
app.use(express.json());

// router import
import userRouter from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);


// example route http://localhost:5001/api/v1

//export express application for use in other modules
export default app; 