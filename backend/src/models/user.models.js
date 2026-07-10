import mongoose, {Schema} from "mongoose";

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
        maxlength: 50,
    },
    timestamps: true,   
});

export const User = mongoose.model("User", userSchema);
