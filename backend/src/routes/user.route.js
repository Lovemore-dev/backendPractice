// Import the Router class from the express
import { Router } from "express"; 
// Import from user controller
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js"; 
// create a new router instance
const router = Router(); 

// Define a POST route for user registration
router.route("/register").post(registerUser);

// Define a POST route for user login
router.route("/login").post(loginUser);

// Define a POST route for user logout
router.route("/logout").post(logoutUser);

// export the router instance for use in other parts of the application
export default router; 