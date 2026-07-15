
import AddTagForm from "@/components/forms/add-tag-form";
import { auth } from "@clerk/nextjs/server";

const AddTagPage = async () => {
	await auth.protect();

	return (
		<main className="mx-auto max-w-lg p-4">
			<h1 className="mb-6 text-3xl font-bold">Add Tag</h1>

			<AddTagForm />
		</main>
	);
};

export default AddTagPage;
