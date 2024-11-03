"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "./store";

const store = makeStore();

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<ReduxProvider store={store}>{children}</ReduxProvider>
		</SessionProvider>
	);
};

export default ClientProviders;
