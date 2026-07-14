import { type FC } from "react";
import { redirect } from "next/navigation";

const HomePage: FC = () => {
	redirect("/auth/sign-in");
};

export default HomePage;
