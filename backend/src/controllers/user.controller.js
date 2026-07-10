// Import the User model from the user.model.js file
import { User } from "../models/user.model.js";

// Function to create a new user
const registerUser = async (req, res) => {
    try {
        // Extract the username, email, and password from the request body
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password){
            return res.status(400).json({ message: "All fields are required"})
        }

        // Check if the user already exists in the database
        const existingUser = await User. findOne({ $or: [{username: username.toLowerCase()}, {email: email.toLowerCase()}]});
        if (existingUser){
            return res.status(400).json({ message: "User already exists"});
        }

        // Create user
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: password,
            loggedIn: false,
        });
        return res.status(201).json({ 
            message: "User registered successfully",
            // Return the user details in the response
            user:{
                id: user._id,
                email: user.email,
                username: user.username,
            }
        });
    }catch (error){
        res.status(500).json({ message: "Internal server error", error: error.message});
    }
}
// Export
export { registerUser };