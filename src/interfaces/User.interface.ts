import { z, array, object, string } from 'zod';
import { memoDataType } from './Memo.interface';

export const userDataType = object({
    token: string().nullable(),
    name: string(),
    id: string(),
    pw: string(),
    bookmarks: array(string()),
    memos: memoDataType
});

export type userType = z.infer<typeof userDataType>;