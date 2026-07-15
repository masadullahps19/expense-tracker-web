"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import {  tagsTable } from "@/db/schema";

import { redirect } from "next/navigation";
import { AddTagSchema, addTagSchema } from "@/validations/tags";

export async function createTag(data: AddTagSchema) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	const validated = addTagSchema.parse(data);

	try {
		await db.insert(tagsTable).values({
			name: validated.name,
			userId,
		});
	} catch (error) {
		throw new Error("You already have a tag with this name.");
	}

	revalidatePath("/tags");


  redirect("/tags");
}
