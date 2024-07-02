import { Schema, connect, model } from 'mongoose';
import { userType } from '../interfaces/User.interface';

(() => {
    connect(process.env.MONGO_DB_URI ?? 'mongodb://localhost:' + process.env.PORT)
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