"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { categoriesTable } from "@/db/schema";

import {
	addCategorySchema,
	type AddCategorySchema,
} from "@/validations/category";
import { redirect } from "next/navigation";

export async function createCategory(data: AddCategorySchema) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	const validated = addCategorySchema.parse(data);

	try {
		await db.insert(categoriesTable).values({
			name: validated.name,
			userId,
		});
	} catch (error) {
		throw new Error("You already have a category with this name.");
	}

	revalidatePath("/categories");


  redirect("/categories");
}
