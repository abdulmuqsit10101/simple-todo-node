// @ts-ignore
const express = require('express');

import { authRole, login, protect, signup } from '../../controllers/Auth';
import { getAllUsers } from '../../controllers/Users';

const router = express.Router();

router.get('/', protect, authRole, getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

export default router;
