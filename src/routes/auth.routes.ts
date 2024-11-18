import UserRepository from '@/repositories/user.repository';
import { Router } from 'express';

import AuthController from '@/controllers/auth.controller';
import UserService from '@/services/user.service';
import AuthService from '@/services/auth.service';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);

const authController = new AuthController(userService, authService);

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
/**
 * @swagger
 * /api/auth/sigin:
 *   post:
 *     summary: User signin
 *     description: Authenticate a user.
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
 *       200:
 *         description: User signed in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMxOTQxNDA2fQ.OEz5-Rj91BIhcSN7AGC0SgRVz50F-2CdfigQIWFrxGk"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   default: Unauthorized
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   default: User not found
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   default: Unprocessable Entity
 */
router.post('/sigin', authController.sigin.bind(authController));

export default router;
