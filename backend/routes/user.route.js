import express from 'express'
import {loginUser, registerUser, admin} from '../controllers/user.controller.js'

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/admin',admin)

export default router;