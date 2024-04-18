// @ts-ignore
const express = require('express');

// /Users/ali/node-simple-projectt/src/controllers/Users/index
import { getAllUsers } from "../../controllers/Users";
import { signup } from '../../controllers/Auth';

const router = express.Router();


router.get('/', getAllUsers);
router.post('/signup', signup);

export default router;