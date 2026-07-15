import {
	doublePrecision,
	index,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { baseColumns } from "./utils";
import { defineRelations } from "drizzle-orm";

export const categoriesTable = pgTable(
	"categories",
	{
		...baseColumns,
		name: text("name").notNull(),
		userId: text("user_id").notNull(),
	},
	(table) => ({
		uniqueUserCategory: unique("unique_user_category").on(
			table.name,
			table.userId,
		),
	}),
);

export const tagsTable = pgTable(
	"tags",
	{
		...baseColumns,
		name: text("name").notNull(),
		userId: text("user_id").notNull(),
	},
	(table) => ({
		uniqueUserTag: unique("unique_user_tag").on(table.name, table.userId),
	}),
);

export const incomesTable = pgTable(
	"incomes",
	{
		...baseColumns,
		amount: doublePrecision("amount").notNull(),
		transactionDate: timestamp("transaction_date").defaultNow().notNull(),
		description: text("description"),
		note: text("note"),
		userId: text("user_id").notNull(),
		categoryId: uuid("category_id")
			.references(() => categoriesTable.id, { onDelete: "restrict" })
			.notNull(),
	},
	(table) => ({
		userIdIdx: index("income_user_id_idx").on(table.userId),
		dateIdx: index("income_transaction_date_idx").on(table.transactionDate),
	}),
);

export const incomeTagsTable = pgTable("income_tags", {
	incomeId: uuid("income_id")
		.references(() => incomesTable.id, { onDelete: "cascade" })
		.notNull(),
	tagId: uuid("tag_id")
		.references(() => tagsTable.id, { onDelete: "cascade" })
		.notNull(),
});

export const expensesTable = pgTable(
	"expenses",
	{
		...baseColumns,
		amount: doublePrecision("amount").notNull(),
		transactionDate: timestamp("transaction_date").defaultNow().notNull(),
		description: text("description"),
		note: text("note"),
		userId: text("user_id").notNull(),
		categoryId: uuid("category_id")
			.references(() => categoriesTable.id, { onDelete: "restrict" })
			.notNull(),
	},
	(table) => ({
		userIdIdx: index("expense_user_id_idx").on(table.userId),
		dateIdx: index("expense_transaction_date_idx").on(
			table.transactionDate,
		),
	}),
);

export const expenseTagsTable = pgTable("expense_tags", {
	expenseId: uuid("expense_id")
		.references(() => expensesTable.id, { onDelete: "cascade" })
		.notNull(),
	tagId: uuid("tag_id")
		.references(() => tagsTable.id, { onDelete: "cascade" })
		.notNull(),
});

export const relations = defineRelations(
	{
		incomesTable,
		categoriesTable,
		incomeTagsTable,
		tagsTable,
		expensesTable,
		expenseTagsTable,
	},
	(r) => ({
		incomesTable: {
			category: r.one.categoriesTable({
				from: r.incomesTable.categoryId,
				to: r.categoriesTable.id,
			}),
			tags: r.many.incomeTagsTable(),
		},

		incomeTagsTable: {
			income: r.one.incomesTable({
				from: r.incomeTagsTable.incomeId,
				to: r.incomesTable.id,
			}),
			tag: r.one.tagsTable({
				from: r.incomeTagsTable.tagId,
				to: r.tagsTable.id,
			}),
		},

		expensesTable: {
			category: r.one.categoriesTable({
				from: r.expensesTable.categoryId,
				to: r.categoriesTable.id,
			}),
			tags: r.many.expenseTagsTable(),
		},

		expenseTagsTable: {
			expense: r.one.expensesTable({
				from: r.expenseTagsTable.expenseId,
				to: r.expensesTable.id,
			}),
			tag: r.one.tagsTable({
				from: r.expenseTagsTable.tagId,
				to: r.tagsTable.id,
			}),
		},

		categoriesTable: {
			incomes: r.many.incomesTable(),
			expenses: r.many.expensesTable(),
		},

		tagsTable: {
			incomeTags: r.many.incomeTagsTable(),
			expenseTags: r.many.expenseTagsTable(),
		},
	}),
);
