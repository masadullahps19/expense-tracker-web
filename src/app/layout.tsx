import { type PropsWithChildren, type FC } from "react";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ReduxProvider from "@/providers/redux-provider";

export const metadata: Metadata = {
	title: { default: "Expense Tracker", template: "%s | Expense Tracker" },
};

const RootLayout: FC<Readonly<PropsWithChildren>> = ({ children }) => {
	return (
		<html
			lang="en"
			className={`h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col">
				<ReduxProvider>
					<ClerkProvider
						signInUrl="/auth/sign-in"
						signUpUrl="/auth/sign-up"
						afterSignOutUrl="/sign-out"
					>
						{children}
					</ClerkProvider>
				</ReduxProvider>
			</body>
		</html>
	);
};

export default RootLayout;
