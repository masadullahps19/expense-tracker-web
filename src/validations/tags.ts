import { createInsertSchema } from "drizzle-orm/zod";
import { tagsTable } from "@/db/schema";
import { z } from "zod";

export const addTagSchema = createInsertSchema(tagsTable, {
    name: z.string().trim().min(1, "Tag name is required"),
}).omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
});

export type AddTagSchema = z.infer<typeof addTagSchema>;