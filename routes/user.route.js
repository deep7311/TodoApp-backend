// post -> /api/users/register
// post -> /api/users/login

import express from 'express';
import { login, register } from '../controllers/user.controller.js';

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

export default router;