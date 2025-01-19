import { configureStore } from "@reduxjs/toolkit";
import { channelsSlice } from "@/slices/channels";
import { guildsSlice } from "@/slices/guilds";
import { userSlice } from "@/slices/user";
import { rolesSlice } from "@/slices/roles";
import { custombotsSlice } from "@/slices/custombots";
export const makeStore = () => {
	return configureStore({
		reducer: {
			guilds: guildsSlice.reducer,
			user: userSlice.reducer,
			channels: channelsSlice.reducer,
			roles: rolesSlice.reducer,
			custombots: custombotsSlice.reducer,
		},
		devTools: true,
	});
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
