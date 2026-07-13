// Import the mongoose llibrary and the Schema class from mongoose
import mongoose, {Schema} from "mongoose";
// Import the bcryptjs library for password hashing
import bcrypt from "bcrypt"

// Define the user schema with the required fields and their validation rules
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 10,
            lowercase: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        }, 
    },
        {
            timestamps: true
        }

);

// Pre-save middleware to hash the password before saving the user document
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Export the User model based on the user
export const User = mongoose.model("User", userSchema);
