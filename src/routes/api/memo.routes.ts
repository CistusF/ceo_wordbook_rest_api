/**
*  @swagger
*  tags:
*    name: Memo
*    description: CRUD memo from server.
*/

import { Router } from "express";
import { create, remove, update } from "../../Data/memo";

const router = Router();

/**
 * @swagger
 * paths:
 *  /memo/create:
 *   post:
 *     summary: Create new memo
 *     description: Create new memo from REST API
 *     tags: [Memo]
 *     requestBody:
 *       content:
 *          application/json:
 *              required: true
 *              description: user token and memo info
 *              schema:
 *                type: object
 *                properties:
 *                   token:
 *                       type: string
 *                       example: 1234-123-12513
 *                   title:
 *                       type: string
 *                       example: my memo
 *                   context:
 *                       type: string
 *                       example: isn't it lovely?
 *     responses:
 *       "200":
 *         description: Create memo successfully
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
 *                   example: Success to create new memo
 *       "400":
 *         description: token is not available or title or context is null
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
 *                   example: Failed to create new memo
 */
router.post("/create", async (req, res) => {
    const { token, title, context } = req.body;

    const response = await create(token, title, context);

    if (!response) return res.json({
        status: -1,
        message: "Failed to create new memo",
    });

    return res.json({
        status: 200,
        message: "Success to create new memo",
    });
});

/**
 * @swagger
 * paths:
 *  /memo/remove:
 *   post:
 *     summary: Remove memo
 *     description: Remove memo from REST API
 *     tags: [Memo]
 *     requestBody:
 *       content:
 *          application/json:
 *              required: true
 *              description: user token and memo index
 *              schema:
 *                type: object
 *                properties:
 *                   token:
 *                       type: string
 *                       example: 1234-123-12513
 *                   index:
 *                       type: number
 *                       example: 1
 *     responses:
 *       "200":
 *         description: Remove memo successfully
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
 *                   example: Success to remove memo
 *       "400":
 *         description: token is not available or index is not found
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
 *                   example: Failed to remove memo
 */
router.post("/remove", async (req, res) => {
    const { token, index } = req.body;

    const response = await remove(token, index);

    if (!response) return res.json({
        status: -1,
        message: "Failed to remove memo",
    });

    return res.json({
        status: 200,
        message: "Success to remove memo",
    });
});

/**
 * @swagger
 * paths:
 *  /memo/update:
 *   post:
 *     summary: Update memo
 *     description: Update memo from REST API
 *     tags: [Memo]
 *     requestBody:
 *       content:
 *          application/json:
 *              required: true
 *              description: user token and memo index, title, context
 *              schema:
 *                type: object
 *                properties:
 *                   token:
 *                       type: string
 *                       example: 1234-123-12513
 *                   index:
 *                       type: number
 *                       example: 1
 *                   title:
 *                       type: string
 *                       example: my memo edited
 *                   context:
 *                       type: string
 *                       example: super lovely memo
 *     responses:
 *       "200":
 *         description: Update memo successfully
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
 *                   example: Success to update memo
 *       "400":
 *         description: token is not available or index, title, context is not found
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
 *                   example: Failed to update memo
 */
router.post("/update", async (req, res) => {
    const { token, index, title, context } = req.body;

    const response = await update(token, index, title, context);

    if (!response) return res.json({
        status: -1,
        message: "Failed to update memo",
    });

    return res.json({
        status: 200,
        message: "Success to update memo",
    });
});

export default router;