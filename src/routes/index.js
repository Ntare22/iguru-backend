import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import userRoutes from './user.routes';
import swaggerOptions from '../utils/api-specifications';
import welcomeRoute from './welcome.routes';
import companyRoutes from './company.routes';
import vehicleRoutes from './vehicle.routes';

const router = Router();
const swaggerDoc = swaggerJsdoc(swaggerOptions);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// welcome route
router.use('/api/v1', welcomeRoute);

// set up auth routes v1
router.use('/api/v1/auth', userRoutes);
router.use('/api/v1/company', companyRoutes);
router.use('/api/v1/vehicles', vehicleRoutes);

export default router;
