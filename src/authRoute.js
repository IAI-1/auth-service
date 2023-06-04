import express from 'express';
import * as controller from './authController.js';
import * as auth from './middlewares/auth.js';

const router = express.Router();

// router.post('/signup', controller.signup);
router.post('/signin', controller.signin);

router.post(
  '/signup/admin',
  auth.newAuthenticator(),
  auth.isAdmin(true),
  controller.signupAdmin
);

router.post(
  '/edit-role',
  auth.newAuthenticator(),
  auth.isAdmin(true),
  (req, res, next) => { res.status(200).json({ 'message': 'Edit role here' }) }
)

router.post(
  '/reset-password',
  auth.newAuthenticator(),
  auth.isAdmin(true),
  (req, res, next) => { res.status(200).json({ 'message': 'Reset password here' }) }
)

router.delete(
  '/delete-user',
  auth.newAuthenticator(),
  auth.isAdmin(true),
  (req, res, next) => { res.status(200).json({ 'message': 'Delete user here' }) }
)

export default router;
