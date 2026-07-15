import { type PropsWithChildren, type FC } from "react";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

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
				<ClerkProvider
					signInUrl="/auth/sign-in"
					signUpUrl="/auth/sign-up"
					afterSignOutUrl="/sign-out"
				>
					<QueryProvider>
                        {children}
                    </QueryProvider>
				</ClerkProvider>
			</body>
		</html>
	);
};

export default RootLayout;
