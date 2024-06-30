import { Schema, connect, model } from 'mongoose';
import { env } from './utils';
import { userType } from '../interfaces/User.interface';

(() => {
    connect(env.MONGO_DB_URI)
        .then(() => {
            console.log("[MongoDB] Connected to Database");
        })
        .catch((e) => {
            console.log(e)
            throw new Error("[MongoDB] Failed to connect");
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