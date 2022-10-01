import Router from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', authController.logIn);
router.post('/signup', authController.signUp);
router.get('/logout', authController.logOut);

export default router;
