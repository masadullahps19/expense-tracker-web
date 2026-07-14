"use client";
import { type FC, type PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

const ReduxProvider: FC<Readonly<PropsWithChildren>> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
