import express from 'express';
import vehiclesController from '../controllers/vehiclesController';
import checkUser from '../middlewares/checkUser';

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/vehicles/add:
 *   post:
 *     summary: Vehicles
 *     description: users can get all their registered vehicles
 *     tags:
 *       - VEHICLES
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Brand:
 *                 type: string
 *               PlateNumber:
 *                 type: string
 *               Year:
 *                 type: string
 *               VehicleType:
 *                 type: string
 *               Version:
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
 *         description: Vehicle has been successfully added
 *       403:
 *         description: Please log in or sign up to continue
 *       500:
 *         description: Server error
 */
router.post('/add', checkUser, vehiclesController.addVehicle);

export default router;
