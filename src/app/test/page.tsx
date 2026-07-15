"use client";
import { useUser } from "@clerk/nextjs";

const TestPage = () => {
	const { user } = useUser();
    
	console.log(user);

	return <div>Hello, {user?.firstName}</div>;
};

export default TestPage;
