import { configureStore } from "@reduxjs/toolkit";
import { channelsSlice } from "@/features/channels";
import { guildsSlice } from "@/features/guilds";
import { userSlice } from "@/features/user";
import { rolesSlice } from "@/features/roles";
import { custombotsSlice } from "@/features/custombots";
import { logsSlice } from "@/features/logs";

export const makeStore = () => {
	return configureStore({
		reducer: {
			guilds: guildsSlice.reducer,
			user: userSlice.reducer,
			channels: channelsSlice.reducer,
			roles: rolesSlice.reducer,
			custombots: custombotsSlice.reducer,
			logs: logsSlice.reducer,
		},
		devTools: true,
	});
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
