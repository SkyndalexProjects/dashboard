import { auth } from "@/app/auth";
import { createSlice, configureStore } from "@reduxjs/toolkit";
export async function GET() {
	const session = await auth();
	if (session) {
		const response = await fetch("https://discord.com/api/users/@me/guilds", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});
		const data = await response.json();
		const counterSlice = createSlice({
			name: "counter",
			initialState: {
				value: 0,
			},
			reducers: {
				increment: (state) => {
					state.value += 1;
				},
				decrement: (state) => {
					state.value -= 1;
				},
			},
		});
		return Response.json(data);
	}
}
