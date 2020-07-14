import { Router } from 'express';
import companiesController from '../controllers/companiesController';
import checkUser from '../middlewares/checkUser';
const router = Router();
import validation from '../validations/user.validation';

const {
  checkName,
  checkDescription,
  checkValidImageUrl,
  validateResult,
} = validation;

/**
 * @swagger
 *
 * /api/v1/auth/signup:
 *   post:
 *     security: []
 *     summary: super admin add an insurance company
 *     description: add insurance company
 *     tags:
 *       - COMPANY
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
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
  '/add',
  checkUser,
  checkName,
  checkDescription,
  checkValidImageUrl,
  validateResult,
  companiesController.add
);

export default router;
