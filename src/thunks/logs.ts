import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogs = createAsyncThunk(
    "logs/fetch",
    async (guildId: string, thunkAPI) => {
        try {
            const endpoint = `${import.meta.env.VITE_API_URL}/guilds/${guildId}/logs`;
            if (!endpoint) {
                throw new Error("LOGS_DATA_ENDPOINT is not defined");
            }

            const res = await fetch(endpoint, {
                method: "POST",
                credentials: "include",
            });

            const json = await res.json();

            console.log("fetchLogs response:", json);
            return json;
        } catch (err) {
            console.log(err, "fetchLogsThunk");
            return thunkAPI.rejectWithValue(err);
        }
    },
);
