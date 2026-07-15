import { type FC } from "react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tagsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

const TagsPage: FC = async () => {
	const { userId } = await auth();

	if (!userId) {
		return null;
	}

	const userTags = await db
		.select()
		.from(tagsTable)
		.where(eq(tagsTable.userId, userId));

	return (
		<>
			<div className="p-8">
				<h1 className="text-2xl font-bold mb-6">Your Tags</h1>

				{userTags.length === 0 ? (
					<p>No tags found. Create one to get started!</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{userTags.map((tag) => (
							<div
								key={tag.id}
								className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
							>
								<h2 className="font-semibold">
									{tag.name}
								</h2>
							</div>
						))}
					</div>
				)}
			</div>
			<Link
				href="/tags/add"
				className="rounded-full bg-white px-6 py-3 text-center font-medium text-neutral-900 transition hover:bg-fuchsia-700"
			>
				Add Tag
			</Link>
		</>
	);
};

export default TagsPage;
