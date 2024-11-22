import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { makeStore } from "./store.ts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuilds } from "./thunks/guilds";
import { fetchUser } from "./thunks/user";
import { fetchChannels } from "./thunks/channels.ts";
import { fetchRoles } from "./thunks/roles.ts";
import { RootState, AppDispatch } from "./store";
import "./index.css";
import App from "./App.tsx";
const store = makeStore();
import { ReactNode } from "react";

const DispatchProvider = ({ children }: { children: ReactNode }) => {
	const guildId = window.location.pathname.split("/")[3];
	const dispatch = useDispatch<AppDispatch>();

	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);
	const isUserFetched = useSelector(
		(state: RootState) => state.user.isUserFetched,
	);

	const areChannelsFetched = useSelector(
		(state: RootState) => state.channels.areChannelsFetched,
	);

	const areRolesFetched = useSelector(
		(state: RootState) => state.roles.areRolesFetched,
	);

	useEffect(() => {
		if (!haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
		if (!isUserFetched) {
			dispatch(fetchUser());
		}
		if (!areChannelsFetched) {
			dispatch(fetchChannels(guildId as string));
		}
		if (!areRolesFetched) {
			dispatch(fetchRoles(guildId as string));
		}
	}, [
		dispatch,
		haveGuildsFetched,
		isUserFetched,
		areChannelsFetched,
		areRolesFetched,
	]);
	return <>{children}</>;
};
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<DispatchProvider>
					<App />
				</DispatchProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
