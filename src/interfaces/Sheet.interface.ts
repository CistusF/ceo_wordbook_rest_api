import { z, object, array, string } from "zod";

export const sheetDataType = array(
    object({
        /** Shows categories of words. */
        "category": string(),
        /** Show words. */
        "word": string(),
        /** Shows the meaning of a word. */
        "mean": string(),
        /** Shows hints for words. */
        "hint": string().nullable()
    })
);

export type sheetType = z.infer<typeof sheetDataType>;