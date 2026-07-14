import { auth } from "@clerk/nextjs/server";

const AddCategoryPage = async () => {
	await auth.protect();

	return (
		<main className="p-4">
			<h1 className="text-3xl font-bold">Add Category</h1>
		</main>
	);
};

export default AddCategoryPage;
