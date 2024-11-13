import { configureStore } from "@reduxjs/toolkit";
import { guildsSlice } from "./slices/guilds";
import { userSlice } from "./slices/user";

export const makeStore = () => {
	return configureStore({
		reducer: {
			guilds: guildsSlice.reducer,
			user: userSlice.reducer,
		},
		devTools: true,
	});
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];