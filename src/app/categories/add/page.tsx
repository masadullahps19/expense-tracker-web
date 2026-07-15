import AddCategoryForm from "@/components/forms/add-category-form";
import { auth } from "@clerk/nextjs/server";

const AddCategoryPage = async () => {
	await auth.protect();

	return (
		<main className="mx-auto max-w-2xl p-4">
			<h1 className="mb-6 text-3xl font-bold">Add Category</h1>

			<AddCategoryForm />
		</main>
	);
};

export default AddCategoryPage;
