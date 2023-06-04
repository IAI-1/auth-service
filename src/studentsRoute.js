import express from "express";
import * as controller from "./studentsController.js";
import * as auth from "./middlewares/auth.js";

const router = express.Router();

// Create new student
router.post(
    "/",
    auth.newAuthenticator(),
    auth.newRoleAuthorizer("ADMIN"),
    controller.createStudent
);

// Get all students
router.get(
    "/",
    auth.newAuthenticator(),
    auth.newRoleAuthorizer("ADMIN"),
    controller.getAllStudents
);

// Get one student
router.get(
    "/:id",
    auth.newAuthenticator(),
    auth.newRoleAuthorizer("ADMIN"),
    controller.getOneStudent
);

// Update a student profile
router.patch(
    "/:id",
    auth.newAuthenticator(),
    auth.newRoleAuthorizer("ADMIN"),
    controller.updateStudent
);

// Delete a student
router.delete(
    "/:id",
    auth.newAuthenticator(),
    auth.newRoleAuthorizer("ADMIN"),
    controller.deleteStudent
);

export default router;
