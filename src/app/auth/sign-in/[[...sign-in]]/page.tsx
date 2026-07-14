import { type FC } from "react";
import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SignInPage: FC = async () => {
	const { userId } = await auth();

	if (userId) {
		redirect("/dashboard");
	}

	return (
		<main className="flex min-h-screen items-center justify-center">
			<SignIn
				path="/auth/sign-in"
				signUpUrl="/auth/sign-up"
				forceRedirectUrl="/dashboard"
			/>
		</main>
	);
};

export default SignInPage;
