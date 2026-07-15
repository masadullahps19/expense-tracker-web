import AddExpenseForm from "@/components/forms/add-expense-form";
import { auth } from "@clerk/nextjs/server";

const AddExpensePage = async () => {
	await auth.protect();

	return (
		<main className="mx-auto max-w-2xl p-4">
			<h1 className="mb-6 text-3xl font-bold">
				Add Expense
			</h1>

			<AddExpenseForm />
		</main>
	);
};

export default AddExpensePage;
