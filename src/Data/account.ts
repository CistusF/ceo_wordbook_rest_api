import { uuid } from "uuidv4";
import { userModel } from "../utils/Database";
import { isUser } from "../utils/utils";
import { userType } from "../interfaces/User.interface";

/**
 * Try to login
 * @param {string} id - ID of the user
 * @param {string} pw - Password of the user
 * @returns {Promise<userType | null>}
 */
export const login = async (id: string, pw: string): Promise<userType | null> => {
    const user = await userModel.findOne({ id, pw });
    if (isUser(user)) {
        const token = uuid();
        user.token = token;
        await user.save();
        return user;
    };
    return null;
};

/**
 * Try to logout
 * @param {string} token - Token of the user
 * @returns {Promise<boolean>}
 */
export const logout = async (token: string): Promise<boolean> => {
    const user = await userModel.findOne({ token });
    if (isUser(user)) {
        user.token = null;
        await user.save();
        return true;
    };
    return false;
};