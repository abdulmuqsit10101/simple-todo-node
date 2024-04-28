// @ts-ignore
const express = require('express');

import { authRole, login, protect, signup } from '../../controllers/Auth';
import { deleteUser, getAllUsers } from '../../controllers/Users';

const router = express.Router();

router.route('/').get(protect, authRole, getAllUsers);

router.route('/:id').delete(protect, deleteUser);

router.post('/signup', signup);
router.post('/login', login);

export default router;
