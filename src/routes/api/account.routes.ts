/**
*  @swagger
*  tags:
*    name: Account
*    description: Get user infomation from server.
*/

import { Router } from "express";
import { login, logout } from "../../Data/account";

const router = Router();

/**
 * @swagger
 * paths:
 *  /account/login:
 *   post:
 *     summary: Login to server
 *     description: Get user account's info from REST API
 *     tags: [Account]
 *     requestBody:
 *       content:
 *          application/json:
 *              required: true
 *              description: user account id, password
 *              schema:
 *                type: object
 *                properties:
 *                   id:
 *                       type: string
 *                       example: userId
 *                   pw:
 *                       type: string
 *                       example: userPassword
 *     responses:
 *       "200":
 *         description: account is available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: object
 *                   example: Success to login
 *                 data:
 *                   type: object
 *                   example: [{ token: "1234-1242-214", name: "CistusF", bookmarks: ["word1", "word2"], memos: [{title: "memo", context: "my memo"}] }]
 *       "400":
 *         description: account is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Invalid ID or password.
 */
router.post("/login", async (req, res) => {
    const { id, pw } = req.body;

    const userData = await login(id, pw);

    if (!userData) return res.status(400).json({
        status: -1,
        message: "Invalid ID or password.",
    });

    const { token, name, bookmarks, memos } = userData;

    return res.json({
        status: 200,
        message: "Success to login",
        data: {
            token,
            name,
            bookmarks,
            memos
        }
    });
});

/**
 * @swagger
 * paths:
 *  /account/logout:
 *   post:
 *     summary: Logout from server
 *     description: Logout from REST API
 *     tags: [Account]
 *     requestBody:
 *       content:
 *          application/json:
 *              required: true
 *              description: user token
 *              schema:
 *                type: object
 *                properties:
 *                   token:
 *                       type: string
 *                       example: 1234-123-1234
 *     responses:
 *       "200":
 *         description: token is available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: object
 *                   example: Success to logout
 *       "400":
 *         description: token is not available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Invalid token.
 */
router.post("/logout", async (req, res) => {
    const { token } = req.body;

    const userData = await logout(token);

    if (!userData) return res.json({
        status: -1,
        message: "Invalid token",
    });

    return res.json({
        status: 200,
        message: "Success to logout"
    });
});

export default router;