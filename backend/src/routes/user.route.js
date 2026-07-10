// Import the Router class from the express
import { Router } from "express"; 
// Import from user controller
import { registerUser } from "../controllers/user.controller.js"; 
// create a new router instance
const router = Router(); 

// Define a POST route for user registration
router.route("/register").post(registerUser);

// export the router instance for use in other parts of the application
export default router; 