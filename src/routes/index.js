import { Router } from 'express';
import userRoutes from './user.routes';
import swaggerOptions from '../utils/api-specifications';
import swaggerUi from 'swagger-ui-express';
import welcomeRoute from './welcome.routes';
import swaggerJsdoc from 'swagger-jsdoc';

const router = Router();
const swaggerDoc = swaggerJsdoc(swaggerOptions);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// welcome route
router.use('/api/v1', welcomeRoute);

// set up auth routes v1
router.use('/api/v1/auth', userRoutes);

export default router;
