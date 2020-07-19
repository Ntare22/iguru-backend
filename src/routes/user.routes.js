import express from 'express';
import userController from '../controllers/userController';

import validation from '../validations/user.validation';

const router = express.Router();

const {
  checkFirstName,
  checkLastName,
  checkValidEmail,
  checkExistingEmail,
  checkPassword,
  validateResult,
} = validation;

/**
 * @swagger
 *
 * /api/v1/auth/signup:
 *   post:
 *     security: []
 *     summary: User registration
 *     description: Register new users
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               error:
 *                 type: string
 *     responses:
 *       201:
 *         description: created
 */

router.post(
  '/signup',
  checkFirstName,
  checkLastName,
  checkValidEmail,
  checkExistingEmail,
  checkPassword,
  validateResult,
  userController.signUp
);

/**
 * @swagger
 *
 * /api/v1/auth/login:
 *   post:
 *     security: []
 *     summary: Login
 *     description: users can log into their accounts
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *               token: string
 *     responses:
 *       200:
 *         description: login successfully
 */
router.post('/login', checkValidEmail, validateResult, userController.login);

/**
 * @swagger
 *
 * /api/v1/auth/verification:
 *   get:
 *     security: []
 *     summary: Verification
 *     description: users can verify their emails
 *     parameters:
 *       - name: token
 *         in: header
 *         schema:
 *           type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: user successfully verified
 *       404:
 *         description: This link is no longer valid
 */
router.get('/verification', userController.verifyUser);

/**
 * @swagger
 *
 * /api/v1/auth/forgot/password:
 *   put:
 *     security: []
 *     summary: Forgot Pasword
 *     description: email is able to be sent when user forgets password
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Forgot email password successfully
 *       500:
 *         description: This service is currently unavailable.
 */
router.put('/forgot/password', checkValidEmail, userController.forgotPassword);

/**
 * @swagger
 *
 * /api/v1/auth/reset/password?email={userEmail}:
 *   put:
 *     security: []
 *     summary: Reset Pasword
 *     description: users can reset password
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *     parameters:
 *       - name: userEmail
 *         description: userEmail.
 *         in: path
 *         required: true
 *         default: please add user email here
 *         type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       500:
 *         description: This service is currently unavailable.
 */
router.put('/reset/password', checkPassword, userController.resetPassword);

export default router;
