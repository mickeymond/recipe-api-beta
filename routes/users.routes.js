import { Router } from "express";
import { login, logout, profile, register } from "../controllers/users.controller.js";
import { checkSessionUser } from "../middlewares/auth.middleware.js";

// Create users router
const router = Router();

// Define routes
router.post('/register', register);

router.post('/login', login);

router.get('/profile', checkSessionUser, profile);

router.post('/logout', checkSessionUser, logout);

// Export router
export default router;