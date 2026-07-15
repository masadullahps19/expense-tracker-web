import { createInsertSchema } from "drizzle-orm/zod";
import { categoriesTable } from "@/db/schema";
import { z } from "zod";

export const addCategorySchema = createInsertSchema(categoriesTable, {
	name: z.string().trim().min(1, "Category name is required"),
}).omit({
	id: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
});

export type AddCategorySchema = z.infer<typeof addCategorySchema>;
