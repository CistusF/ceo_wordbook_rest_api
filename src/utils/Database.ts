import { Schema, connect, model } from 'mongoose';
import { userType } from '../interfaces/User.interface';
import { logger } from './utils';
import { logType } from '../interfaces/Utils.interface';

(() => {
    connect(process.env.MONGO_DB_URI ?? 'mongodb://localhost:' + process.env.PORT)
        .then(() => {
            logger("Connected to Database", "MongoDB", logType.success);
        })
        .catch((e) => {
            logger(e, "MongoDB", logType.success);
            throw new Error("Failed to connect");
        });
})();

/* Schemas */
export const userSchema = new Schema({
    token: String,
    name: String,
    id: String,
    pw: String,
    bookmarks: Array<String>,
    memos: Array<{
        title: String,
        context: String
    }>
});

/* Models */
export const userModel = model<userType>("MEMBERS", userSchema);