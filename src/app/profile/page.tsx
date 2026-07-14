import { type FC } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ProfilePage: FC = async () => {
	await auth.protect();

	const user = await currentUser();

	return (
		<>
			<header className="flex items-center gap-4 border-b p-4">
				<Link
					href="/dashboard"
					className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-gray-100"
				>
					<ArrowLeft className="h-4 w-4" />
				</Link>
				<h1 className="text-4xl font-bold">Profile</h1>
			</header>
			<main className="mx-auto max-w-2xl p-6">
				<div className="overflow-hidden rounded-lg border">
					<div className="divide-y">
						<div className="flex items-center justify-between p-4">
							<span className="font-medium text-gray-600">
								Name
							</span>
							<span>
								{`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
									"Not set"}
							</span>
						</div>

						<div className="flex items-center justify-between p-4">
							<span className="font-medium text-gray-600">
								Username
							</span>
							<span>{user?.username ?? "Not set"}</span>
						</div>

						<div className="flex items-center justify-between p-4">
							<span className="font-medium text-gray-600">
								Email
							</span>
							<span>
								{user?.primaryEmailAddress?.emailAddress ??
									"Not set"}
							</span>
						</div>

						<div className="flex items-center justify-between p-4">
							<span className="font-medium text-gray-600">
								Phone
							</span>
							<span>
								{user?.primaryPhoneNumber?.phoneNumber ??
									"Not set"}
							</span>
						</div>
					</div>
				</div>

				<div className="mt-8 flex flex-col gap-4">
					<Link
						href="/tags/add"
						className="rounded-full bg-fuchsia-600 px-6 py-3 text-center font-medium text-white transition hover:bg-fuchsia-700"
					>
						Add Tag
					</Link>

					<Link
						href="/categories/add"
						className="rounded-full bg-fuchsia-600 px-6 py-3 text-center font-medium text-white transition hover:bg-fuchsia-700"
					>
						Add Category
					</Link>

					<Link
						href="/incomes/add"
						className="rounded-full bg-fuchsia-600 px-6 py-3 text-center font-medium text-white transition hover:bg-fuchsia-700"
					>
						Add Income
					</Link>

					<Link
						href="/expenses/add"
						className="rounded-full bg-fuchsia-600 px-6 py-3 text-center font-medium text-white transition hover:bg-fuchsia-700"
					>
						Add Expense
					</Link>

					<SignOutButton redirectUrl="/auth/sign-in">
						<button
							type="button"
							className="w-full rounded-full bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
						>
							Sign Out
						</button>
					</SignOutButton>
				</div>
			</main>
		</>
	);
};

export default ProfilePage;
