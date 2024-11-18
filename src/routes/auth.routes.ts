import UserRepository from '@/repositories/user.repository';
import { Router } from 'express';

import AuthController from '@/controllers/auth.controller';
import UserService from '@/services/user.service';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const authController = new AuthController(userService);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     description: Creates a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *                 minLength: 8
 *                 maxLength: 100
 *     responses:
 *       201:
 *         description: User created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Unprocessable Entity
 *
 */
router.post('/signup', authController.signup.bind(authController));

export default router;
