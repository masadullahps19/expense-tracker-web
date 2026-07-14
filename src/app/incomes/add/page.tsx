import { auth } from "@clerk/nextjs/server";

const AddIncomePage = async () => {
	await auth.protect();

	return (
		<main className="p-4">
			<h1 className="text-3xl font-bold">Add Income</h1>
		</main>
	);
};

export default AddIncomePage;
