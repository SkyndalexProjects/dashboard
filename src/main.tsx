import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { i18n } from "./i18n";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStore } from "./store";
import Home from "./dashboard/guild/[id]/home/page";
import UserHome from "./dashboard/user/[id]/home/page";
import Custombots from "./dashboard/guild/[id]/custombots/page";
import CustombotList from "./dashboard/guild/[id]/custombots/list/page";
import ManageCustombot from "./dashboard/guild/[id]/custombots/manage/[id]/page";
import Page from "./dashboard/guild/[id]/radio/page";
import Economy from "./dashboard/guild/[id]/economy/page";
import NoMatch from "./NoMatch";
import "./index.css";
import GuildsList from "./guilds-list";
import MainSettings from "@/dashboard/guild/[id]/main-settings/page";
i18n();

const store = makeStore();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route
						path="/dashboard/guild/:id/*"
						element={
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
									path="custombots/manage/:botId"
									element={<ManageCustombot />}
								/>
								<Route path="radio" element={<Page />} />
								<Route path="economy" element={<Economy />} />
								<Route path="main-settings" element={<MainSettings /> } />
							</Routes>
						}
					/>
					<Route
						path="/dashboard/user/:id/*"
						element={
							<Routes>
								<Route path="home" element={<UserHome />} />
							</Routes>
						}
					/>
					<Route path="/" element={<GuildsList />} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
