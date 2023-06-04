import express from 'express';
import * as controller from './authController.js';
import * as auth from './middlewares/auth.js';

const router = express.Router();

// router.post('/signup', controller.signup);
router.post('/signin', controller.signin);

// Admin -------------
router.post(
  '/signup/admin',
  auth.newAuthenticator(),
  auth.newRoleAuthorizer('ADMIN'),
  controller.signupAdmin
);

// Mahasiswa -------------

router.post(
  '/reset-password',
  auth.newAuthenticator(),
  auth.newRoleAuthorizer('STUDENT', 'ADMIN'),
  controller.resetPassword
)

export default router;
