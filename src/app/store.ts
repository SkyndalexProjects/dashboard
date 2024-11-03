import { configureStore } from "@reduxjs/toolkit";
import { guildsSlice } from "./slices/guilds";
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
