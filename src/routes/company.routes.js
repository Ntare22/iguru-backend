import { Router } from 'express';
import companiesController from '../controllers/companiesController';
import checkUser from '../middlewares/checkUser';
import validation from '../validations/user.validation';
import isSuperAdmin from '../middlewares/isSuperAdmin';

const router = Router();

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
  isSuperAdmin,
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
 *     summary: super admin edit an insurance company
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
  isSuperAdmin,
  checkName,
  checkDescription,
  checkValidImageUrl,
  validateResult,
  companiesController.edit
);

/**
 * @swagger
 *
 * /api/v1/company/get-all:
 *   get:
 *     security: []
 *     summary: Get All Insurance Companies
 *     description: show all insurance companies
 *     tags:
 *       - COMPANY
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
 *       - name: x-access-token
 *         description: Access token.
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Insurance company has been updated
 *  */
router.get('/get-all', checkUser, isSuperAdmin, companiesController.getAll);

/**
 * @swagger
 *
 * /api/v1/company/activate?id={companyId}:
 *   patch:
 *     security: []
 *     summary: Activate insurance Companies
 *     description: Activate insurance Companies
 *     tags:
 *       - COMPANY
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
 *         description: Activate insurance Companies
 *  */
router.patch('/activate', checkUser, isSuperAdmin, companiesController.activate);

/**
 * @swagger
 *
 * /api/v1/company/deactivate?id={companyId}:
 *   patch:
 *     security: []
 *     summary: deactivate insurance Companies
 *     description: deactivate insurance Companies
 *     tags:
 *       - COMPANY
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
 *         description: deactivate insurance Companies
 *  */
router.patch('/deactivate', checkUser, isSuperAdmin, companiesController.deactivate);

/**
 * @swagger
 *
 * /api/v1/company/delete?id={companyId}:
 *   delete:
 *     security: []
 *     summary: delete insurance Companies
 *     description: delete insurance Companies
 *     tags:
 *       - COMPANY
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
 *         description: delete insurance Companies
 *  */
router.patch('/delete', checkUser, isSuperAdmin, companiesController.delete);

export default router;
