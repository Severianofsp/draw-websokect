import { Router } from 'express';
import drawcontroller from '../controllers/drawcontroller';

const router = new Router();

router.get('/', drawcontroller.clientHome);
router.get('/admin', drawcontroller.adminPage);

export default router;
