/**
 * @swagger
 * tags:
 *   name: version
 *   description: check version
*/

import { Router } from "express";
import accounts from './api/account.routes';
import memo from './api/memo.routes';
import words from './api/words.routes';
import { env, getWorkbook } from "../utils/utils";
const router = Router();

router.use("/account", accounts);
router.use("/memo", memo);
router.use("/words", words);

/**
 * @swagger
 * paths:
 *  /version:
 *   post:
 *     summary: Check application version
 *     description: Check application version from REST API
 *     consumes: application/json
 *     tags: [version]
 *     value: 0.1.0
 *     requestBody:
 *       content:
 *          application/json:
 *            name: version
 *            required: true
 *            description: client version
 *            schema:
 *              type: object
 *              properties:
 *                 version:
 *                     type: string
 *                     example: 0.1.0
 *     responses:
 *       "200":
 *         description: version is correct
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
 *                   example: Version check successfully
 *       "400":
 *         description: version is mismatch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: Version mismatch
 *                 sheetData:
 *                   type: array
 *                   example: [{ category: "category_name", word: "word", mean: "word's mean", hint: "word's mean hint" }]
 */
router.post("/version", async (req, res) => {
    const { version } = req.body;
    if (version != env.npm_package_version) {
        const sheetData = getWorkbook();
        res.status(400).json({
            status: 1,
            message: "Version mismatch",
            sheetData
        });
    } else {
        res.status(200).json({ status: 200, message: "Version check successfully" });
    };
});

export default router;