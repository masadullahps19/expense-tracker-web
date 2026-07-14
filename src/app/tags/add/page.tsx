import { auth } from "@clerk/nextjs/server";

const AddTagPage = async () => {
	await auth.protect();

	return (
		<main className="p-4">
			<h1 className="text-3xl font-bold">Add Tag</h1>
		</main>
	);
};

export default AddTagPage;
