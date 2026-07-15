"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	addExpenseSchema,
	type AddExpenseSchemaInput,
	type AddExpenseSchemaOutput,
} from "@/validations/expense";

const AddExpenseForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AddExpenseSchemaInput, unknown, AddExpenseSchemaOutput>({
		resolver: zodResolver(addExpenseSchema),
		defaultValues: {
			amount: 0,
			description: "",
			note: "",
			transactionDate: new Date(),
			categoryId: "",
		},
	});

	const onSubmit: SubmitHandler<AddExpenseSchemaOutput> = async (data) => {
		console.log(data.amount);
		console.log(data.transactionDate);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-5 rounded-lg border p-6"
		>
			<h2 className="text-2xl font-semibold">Add Expense</h2>

			{/* Amount */}
			<div className="space-y-2">
				<label htmlFor="amount">Amount</label>

				<input
					id="amount"
					type="number"
					step="0.01"
					{...register("amount")}
					className="w-full rounded border px-3 py-2"
				/>

				{errors.amount && (
					<p className="text-sm text-red-500">
						{errors.amount.message}
					</p>
				)}
			</div>

			{/* Category */}
			<div className="space-y-2">
				<label htmlFor="categoryId">Category</label>

				<select
					id="categoryId"
					{...register("categoryId")}
					className="w-full rounded border px-3 py-2"
				>
					<option value="">Select Category</option>

					{/* Replace with categories from DB */}
					<option value="uuid-1">Food</option>
					<option value="uuid-2">Transport</option>
					<option value="uuid-3">Shopping</option>
				</select>

				{errors.categoryId && (
					<p className="text-sm text-red-500">
						{errors.categoryId.message}
					</p>
				)}
			</div>

			{/* Transaction Date */}
			<div className="space-y-2">
				<label htmlFor="transactionDate">Transaction Date</label>

				<input
					id="transactionDate"
					type="date"
					{...register("transactionDate", {
						valueAsDate: true,
					})}
					className="w-full rounded border px-3 py-2"
				/>

				{errors.transactionDate && (
					<p className="text-sm text-red-500">
						{errors.transactionDate.message}
					</p>
				)}
			</div>

			{/* Description */}
			<div className="space-y-2">
				<label htmlFor="description">Description</label>

				<textarea
					id="description"
					rows={3}
					{...register("description")}
					className="w-full rounded border px-3 py-2"
				/>

				{errors.description && (
					<p className="text-sm text-red-500">
						{errors.description.message}
					</p>
				)}
			</div>

			{/* Note */}
			<div className="space-y-2">
				<label htmlFor="note">Note</label>

				<textarea
					id="note"
					rows={3}
					{...register("note")}
					className="w-full rounded border px-3 py-2"
				/>

				{errors.note && (
					<p className="text-sm text-red-500">
						{errors.note.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
			>
				{isSubmitting ? "Saving..." : "Add Expense"}
			</button>
		</form>
	);
};

export default AddExpenseForm;
