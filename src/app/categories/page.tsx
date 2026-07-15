import { type FC } from "react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

const CategoriesPage: FC = async () => {
	const { userId } = await auth();

	if (!userId) {
		return null;
	}

	const userCategories = await db
		.select()
		.from(categoriesTable)
		.where(eq(categoriesTable.userId, userId));

	return (
		<>
			<div className="p-8">
				<h1 className="text-2xl font-bold mb-6">Your Categories</h1>

				{userCategories.length === 0 ? (
					<p>No categories found. Create one to get started!</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{userCategories.map((category) => (
							<div
								key={category.id}
								className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
							>
								<h2 className="font-semibold">
									{category.name}
								</h2>
							</div>
						))}
					</div>
				)}
			</div>
			<Link
				href="/categories/add"
				className="rounded-full bg-white px-6 py-3 text-center font-medium text-neutral-900 transition hover:bg-fuchsia-700"
			>
				Add Category
			</Link>
		</>
	);
};

export default CategoriesPage;
