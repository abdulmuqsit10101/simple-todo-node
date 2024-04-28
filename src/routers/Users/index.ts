// @ts-ignore
const express = require('express');

import { login, signup } from '../../controllers/Auth';
import { getAllUsers } from '../../controllers/Users';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

export default router;
