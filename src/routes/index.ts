import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import auth from './auth';

const router = Router();

router.use('/api/auth', auth);
router.get('/', (req, res) => {
  res.send('Hey!');
});

router.get('/secret', requireAuth, (req, res) => {
  res.send('Secret!');
});

export default router;
