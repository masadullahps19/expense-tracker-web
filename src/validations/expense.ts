import { createInsertSchema } from "drizzle-orm/zod";
import { expensesTable } from "@/db/schema";
import { z } from "zod";

export const addExpenseSchema = createInsertSchema(expensesTable, {
	amount: z.coerce
		.number()
		.positive("Amount must be a positive number"),
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

export type AddExpenseSchemaOutput = z.output<typeof addExpenseSchema>;
export type AddExpenseSchemaInput = z.input<typeof addExpenseSchema>;

