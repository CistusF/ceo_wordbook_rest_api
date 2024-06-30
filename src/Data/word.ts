import { userModel } from "../utils/Database";
import { isUser } from "../utils/utils";

/**
 * Set bookmark for specified word in workSheet.
 * @param {string} token - user's token
 * @param {string} word - specified word
 * @returns {Promise<boolean>}
 */
export const bookmark = async (token: string, word: string): Promise<boolean> => {
    const user = await userModel.findOne({ token });
    if (isUser(user) && !word) {
        if (user.bookmarks.includes(word)) {
            const index = user.bookmarks.indexOf(word);
            user.bookmarks.splice(index, 1);
        } else {
            user.bookmarks.unshift(word);
        }
        return true;
    };
    return false;
};