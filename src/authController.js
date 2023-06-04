import bcrypt from 'bcrypt';
import generateAccessToken from './helpers/generateAccessToken.js';
import { successResponseBuilder } from './helpers/responseBuilder.js';
import User from './userModel.js';

export const signupAdmin = async (req, res, next) => {
  try {
    const { email, password, nama } = req.body;


    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      nama,
      isAdmin: true,
      fakultas: '-',
      prodi: '-',
      nim: '-'
    });

    const token = generateAccessToken({
      id: user._id,
      email,
      isAdmin: true,
    });

    res
      .status(201)
      .json(successResponseBuilder({ user: user, accessToken: token }));
  } catch (err) {
    if (err?.code === 11000) {
      next({
        message: `Another user with email ${err?.keyValue?.email} is already registered.`,
        stack: err.stack,
        statusCode: 409,
      });
      return;
    }
    if (['CastError', 'ValidationError'].includes(err?.name)) {
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

// export const signup = async (req, res, next) => {
//   try {
//     const { email, password, name } = req.body;

//     const encryptedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       email: email.toLowerCase(),
//       password: encryptedPassword,
//       name,
//     });

//     const token = generateAccessToken({
//       id: user._id,
//       email,
//       isAdmin: false,
//     });

//     res
//       .status(201)
//       .json(successResponseBuilder({ user: user, accessToken: token }));
//   } catch (err) {
//     if (err?.code === 11000) {
//       next({
//         message: `Another user with email ${err?.keyValue?.email} is already registered.`,
//         stack: err.stack,
//         statusCode: 409,
//       });
//       return;
//     }
//     if (['CastError', 'ValidationError'].includes(err?.name)) {
//       next({
//         message: err.message,
//         stack: err.stack,
//         statusCode: 400,
//       });
//       return;
//     }
//     next(err);
//   }
// };

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next({
        message: 'email and password are required',
        statusCode: 400,
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      next({
        message: 'invalid credentials',
        statusCode: 401,
      });
      return;
    }

    const token = generateAccessToken({
      id: user._id,
      email,
      isAdmin: user.isAdmin,
    });

    res
      .status(200)
      .json(successResponseBuilder({ user: user, accessToken: token }));
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      next({
        message: 'old password and new password are required',
        statusCode: 400,
      });
      return;
    }

    // Check old password
    const email = req.user.email;
    const user = await User.findOne({ email });

    if (!await bcrypt.compare(oldPassword, user.password)) {
      next({
        message: 'Wrong old password',
        statusCode: 400,
      });
      return;
    }

    // Reset password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    user.password = encryptedPassword;

    const newUser = await User.findOneAndUpdate({ _id: req.user.id }, { ...user }, { returnDocument: 'after' }).exec();

    const token = generateAccessToken({
      id: newUser._id,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });

    res
      .status(201)
      .json(successResponseBuilder({ user: newUser, accessToken: token }));

  } catch (err) {

  }
}
