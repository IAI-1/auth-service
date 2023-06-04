import bcrypt from "bcrypt";
import { successResponseBuilder } from "./helpers/responseBuilder.js";
import User from "./userModel.js";

export const createStudent = async (req, res, next) => {
    try {
        console.log(req.body);
        const { nama, nim, prodi, fakultas, email } = req.body;

        const encryptedPassword = await bcrypt.hash(nim, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
            nama,
            nim,
            prodi,
            fakultas,
            role: "STUDENT",
        });

        res.status(201).json(
            successResponseBuilder({
                user: user,
            })
        );
    } catch (err) {
        if (err?.code === 11000) {
            next({
                message: `Another user with email ${err?.keyValue?.email} is already registered.`,
                stack: err.stack,
                statusCode: 409,
            });
            return;
        }
        if (["CastError", "ValidationError"].includes(err?.name)) {
            next({
                message: err.message,
                stack: err.stack,
                statusCode: 400,
            });
            return;
        }
        next(err);
    }
};
// Get all students
export const getAllStudents = async (req, res, next) => {
    try {
        const result = await User.find({ role: "STUDENT" });
        res.status(200).json(successResponseBuilder({ students: result }));
    } catch (err) {
        next(err);
    }
};

// Get One Student
export const getOneStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.findById(id);
        res.status(200).json(successResponseBuilder({ user: result }));
    } catch (error) {
        next(err);
    }
};

// Update Student Profile
export const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = {
            nama: req.body.nama,
            nim: req.body.nim,
            prodi: req.body.prodi,
            fakultas: req.body.fakultas,
            foto: req.body.foto,
        };

        const result = await User.findByIdAndUpdate(id, body);

        result
            ? res.status(200).json(successResponseBuilder({ user: result }))
            : res.status(404).send({ message: "Data not found." });
    } catch (error) {
        next(err);
    }
};

// Delete Student Account
export const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndRemove(id);
        result
            ? res.status(200).json(successResponseBuilder({ user: result }))
            : res.status(404).send({ message: "Data not found." });
    } catch (error) {
        next(err);
    }
};
