import { guildsSlice } from "./slices/guilds";
import { configureStore } from "@reduxjs/toolkit";
export const makeStore = () => {
	return configureStore({
		reducer: {
			guilds: guildsSlice.reducer,
		},
		devTools: true,
	});
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
