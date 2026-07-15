import { createInsertSchema } from "drizzle-orm/zod";
import { incomesTable } from "@/db/schema";
import { z } from "zod";

export const addIncomeSchema = createInsertSchema(incomesTable, {
    amount: z.coerce.number().positive("Amount must be a positive number"),
   description: z.string().trim().optional(),
    note: z.string().trim().optional(),
    transactionDate: z.coerce.date(),
}).omit({
    id: true,
    userId: true, 
    createdAt: true,
    updatedAt: true,
    deletedAt: true
});

export type AddIncomeSchema = z.infer<typeof addIncomeSchema>;