/**
*  @swagger
*  tags:
*    name: Words
*    description: Add/Remove bookmarks from REST API.
*/
import { Router } from "express";
import { bookmark } from "../../Data/word";

const router = Router();

/**
 * @swagger
 * paths:
 *  /words/bookmarks:
 *   post:
 *     summary: Add/Remove bookmarks
 *     description: Add/Remove bookmarks from REST API
 *     tags: [Words]
 *     requestBody:
 *       content:
 *          application/json:
 *              required: true
 *              description: user token and word name
 *              schema:
 *                type: object
 *                properties:
 *                   token:
 *                       type: string
 *                       example: 1234-123-12513
 *                   word:
 *                       type: string
 *                       example: word1
 *     responses:
 *       "200":
 *         description: Add/Remove bookmarks Successfully
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
 *                   example: Success to set bookmark
 *       "400":
 *         description: token is not available or word null
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
 *                   example: Failed to set bookmark
 */
router.post("/bookmark", async (req, res) => {
    const { token, word } = req.body;

    const response = await bookmark(token, word);

    if (!response) return res.json({
        status: -1,
        message: "Failed to set bookmark",
    });

    return res.json({
        status: 200,
        message: "Success to set bookmark",
    });
});

export default router;