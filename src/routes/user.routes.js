import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

import validation from '../validations/user.validation';

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

export default router;
