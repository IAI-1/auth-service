import express from "express";
import * as controller from "./profileController.js";
import * as auth from "./middlewares/auth.js";

const router = express.Router();

router.patch(
  "/update/:id",
  auth.newAuthenticator(),
  auth.newRoleAuthorizer("STUDENT"),
  controller.updateProfile
);

export default router;
