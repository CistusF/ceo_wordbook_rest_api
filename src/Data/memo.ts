import { userModel } from "../utils/Database";
import { isUser } from "../utils/utils";

/**
 * Create new memo
 * @param {string} token - user's token
 * @param {string} title - title of memo
 * @param {string} context - context of memo
 * @returns {Promise<boolean>}
 */
export const create = async (token: string, title: string, context: string): Promise<boolean> => {
    const user = await userModel.findOne({ token });
    if (isUser(user) && title && context) {
        const memo = {
            title,
            context
        };

        user.memos.unshift(memo);
        await user.save();
        return true;
    };
    return false;
};

/**
 * Remove memo
 * @param {string} token - user's token
 * @param {number} index - index of memo
 * @returns {Promise<boolean>}
 */
export const remove = async (token: string, index: number): Promise<boolean> => {
    const user = await userModel.findOne({ token });
    if (isUser(user) && !isNaN(index)) {
        user.memos.splice(index, 1);
        await user.updateOne({
            memos: user.memos
        });
        return true;
    };
    return false;
};

/**
 * Update memo
 * @param {string} token - user's token
 * @param {number} index - index of memo
 * @param {string} title - title of memo
 * @param {string} context - context of memo
 * @returns {Promise<boolean>}
 */
export const update = async (token: string, index: number, title: string, context: string): Promise<boolean> => {
    const user = await userModel.findOne({ token });
    if (isUser(user) && !isNaN(index)) {
        const memo = user.memos[index];
        memo.title = title;
        memo.context = context;
        await user.updateOne({
            memo: user.memos
        });
        return true;
    };
    return false;
};