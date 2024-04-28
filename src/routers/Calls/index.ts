const express = require('express');

import {
  createNewCall,
  deleteCall,
  getAllCalls,
  getCall,
} from '../../controllers/Calls';

import { protect } from '../../controllers/Auth';

const router = express.Router();

router.route('/').get(protect, getAllCalls).post(protect, createNewCall);

router.route('/:id').get(protect, getCall).delete(protect, deleteCall);

export default router;
