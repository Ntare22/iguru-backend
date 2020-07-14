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
 * /api/v1/company/add:
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

/**
 * @swagger
 *
 * /api/v1/company/edit?id={companyId}:
 *   patch:
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
 *     parameters:
 *       - name: x-access-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
 *       - name: companyId
 *         description: companyId.
 *         in: path
 *         required: true
 *         default: please add a company id here
 *         type: string
 *     responses:
 *       200:
 *         description: created
 */
router.patch(
  '/edit',
  checkUser,
  checkName,
  checkDescription,
  checkValidImageUrl,
  validateResult,
  companiesController.edit
);

export default router;
