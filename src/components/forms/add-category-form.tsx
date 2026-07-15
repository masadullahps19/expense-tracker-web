"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createCategory } from "@/app/categories/add/actions";

import {
	addCategorySchema,
	type AddCategorySchema,
} from "@/validations/category";

export default function AddCategoryForm() {
	const [pending, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddCategorySchema>({
		resolver: zodResolver(addCategorySchema),
	});

	const onSubmit = async (data: AddCategorySchema) => {
		startTransition(async () => {
			await createCategory(data);
			reset();
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 rounded-lg border p-6"
		>
			<div>
				<label
					htmlFor="name"
					className="mb-2 block text-sm font-medium"
				>
					Category Name
				</label>

				<input
					id="name"
					type="text"
					placeholder="e.g. Food"
					{...register("name")}
					className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
				/>

				{errors.name && (
					<p className="mt-1 text-sm text-red-500">
						{errors.name.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={pending}
				className="w-full rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
			>
				{pending ? "Creating..." : "Add Category"}
			</button>
		</form>
	);
}
