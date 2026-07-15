import { db } from "@/db";
import { incomesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { IncomeTable } from "@/components/tables/income-table";
import { auth } from "@clerk/nextjs/server";

export default async function IncomesPage() {
	const { userId } = await auth();

	if (!userId) {
		return null;
	}

	const data = await db
		.select()
		.from(incomesTable)
		.where(eq(incomesTable.userId, userId));

	return (
		<div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
			<div className="bg-white p-8 rounded-lg shadow-sm">
				<h1 className="text-2xl font-bold mb-4">Incomes</h1>
				<IncomeTable data={data} />
			</div>
		</div>
	);
}
