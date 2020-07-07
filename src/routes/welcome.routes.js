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
 *       description: 'Welcome to Iguru'
 */
router.get('/', (req, res) => {
  res.send('Welcome to Iguru');
});

export default router;
