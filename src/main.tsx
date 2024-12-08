import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { makeStore, RootState, AppDispatch } from "./store";
import { fetchGuilds } from "./thunks/guilds";
import { fetchUser } from "./thunks/user";
import { fetchChannels } from "./thunks/channels";
import { fetchRoles } from "./thunks/roles";
import Home from "./dashboard/guild/[id]/home/page";
import Custombots from "./dashboard/guild/[id]/custombots/page";
import CustombotList from "./dashboard/guild/[id]/custombots/list/page";
import Page from "./dashboard/guild/[id]/radio/page";
import NoMatch from "./NoMatch";
import "./index.css";
import GuildsList from "./guilds-list";

const store = makeStore();

const DispatchProvider = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id: guildId } = useParams<{ id: string }>();

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
		if (guildId) {
			dispatch(fetchChannels(guildId));
			dispatch(fetchRoles(guildId));
		}
	}, [
		dispatch,
		haveGuildsFetched,
		isUserFetched,
		areChannelsFetched,
		areRolesFetched,
		guildId,
	]);

	return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route
						path="/dashboard/guild/:id/*"
						element={
							<DispatchProvider>
								<Routes>
									<Route path="home" element={<Home />} />
									<Route
										path="custombots"
										element={<Custombots />}
									/>
									<Route
										path="custombots/list"
										element={<CustombotList />}
									/>
									<Route
										path="radio"
										element={<Page />}
									/>
								</Routes>
							</DispatchProvider>
						}
					/>
					<Route path="/" element={<GuildsList />} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
