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
            enum: ["STUDENT", "ADMIN"],
            default: "STUDENT",
        },
        nama: {
            type: String,
            required: true,
        },
        nim: {
            type: String,
            required: true,
        },
        prodi: {
            type: String,
            required: true,
        },
        fakultas: {
            type: String,
            required: true,
        },
        foto: {
            type: String,
            required: true,
            default: null
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
