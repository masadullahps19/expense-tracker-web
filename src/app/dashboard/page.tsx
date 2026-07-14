import { type FC } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const DashboardPage: FC = async () => {
	await auth.protect();

	const user = await currentUser();

	return (
		<>
			<header className="flex items-center justify-between border-b p-4">
				<h1 className="text-4xl font-bold">Dashboard</h1>

				<UserButton userProfileUrl="/profile" />
			</header>
			<main className="p-4">
				<div className="mt-4">
					<p>
						Welcome, <strong>{user?.username ?? "User"}</strong>!
					</p>
				</div>
			</main>
		</>
	);
};

export default DashboardPage;
