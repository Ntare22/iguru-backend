import { Router } from 'express';

const router = Router();

/**
 * @swagger
 *
 * /api/v1:
 *  get:
 *   description: Welcome message for users
 *   responses:
 *     '200':
 *       description: 'Welcome to Barefoot Nomad'
 */
router.get('/', (req, res) => {
  res.send('Welcome to Barefoot Nomad');
});

export default router;
