import { auth } from "@clerk/nextjs/server";

const AddExpensePage = async () => {
	await auth.protect();

	return (
		<main className="p-4">
			<h1 className="text-3xl font-bold">Add Expense</h1>
		</main>
	);
};

export default AddExpensePage;
