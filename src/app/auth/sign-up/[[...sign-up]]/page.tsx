import { type FC } from "react";
import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SignUpPage: FC = async () => {
	const { userId } = await auth();

	if (userId) {
		redirect("/dashboard");
	}

	return (
		<main className="flex min-h-screen items-center justify-center">
			<SignUp path="/auth/sign-up" signInUrl="/auth/sign-in" 
  forceRedirectUrl="/dashboard" />
		</main>
	);
};

export default SignUpPage;
