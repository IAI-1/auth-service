import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["STUDENT", "ADMIN"],
            default: "STUDENT",
        },
        nama: {
            type: String,
            required: false,
        },
        niu: {
            type: String,
            required: false,
        },
        prodi: {
            type: String,
            required: false,
        },
        foto: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
