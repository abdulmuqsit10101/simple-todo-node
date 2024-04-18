// @ts-ignore
const express = require('express');

import { getAllUsers } from "../../controllers/Users";
import { signup, login } from '../../controllers/Auth';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

export default router;