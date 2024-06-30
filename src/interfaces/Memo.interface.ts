import { array, object, string, z } from "zod";

export const memoDataType = array(
    object({
        title: string(),
        context: string()
    })
);

export type memoType = z.infer<typeof memoDataType>;