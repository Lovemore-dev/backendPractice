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

// Function to login a User
const loginUser = async (req, res) => {
    try {
        // check if user exists
        const { email, password } = req.body;
        const user = await User.findOne({ 
            email: email.toLowerCase() });

        // if user does not exist
        if (!user) return res.status(404).json({
            message: "User not found"
        });

        //compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })
        res.status(200).json({
            message: "User logged in successfully",
            user:{
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

// Function to logout a User
const logoutUser = async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email.toLowerCase()
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "User logged out successfully"
        });
    }catch (error){
        res.status(500).json({
            message: "Intenal server error",
            error: error.message
        })
    }
}
// Export
export { registerUser, loginUser, logoutUser };