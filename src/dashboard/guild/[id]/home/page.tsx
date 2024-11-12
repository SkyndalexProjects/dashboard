import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuilds } from "../../../../thunks/guilds.ts";
import type { AppDispatch, RootState } from "../../../../store.ts"
import { useParams } from "react-router-dom";
export default function Page() {
	const dispatch = useDispatch<AppDispatch>();

    let { id: guildId } = useParams();
    console.log("guildId", guildId);
    const haveGuildsFetched = useSelector((state: RootState) => {
        console.log("state.guilds.data", state.guilds.data);
        return state.guilds.haveGuildsFetched;
    });

	useEffect(() => {
        if (!haveGuildsFetched) {
            dispatch(fetchGuilds());
        }
    }, [dispatch, haveGuildsFetched]);

    
	const guild = useSelector((state: RootState) =>
        Array.isArray(state.guilds.data)
            ? state.guilds.data.find((x) => x.id === guildId)
            : undefined,
    );
    if (!guild) return <div> No guild </div>;

    const [channels, setChannels] = useState([]);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        async function fetchChannels() {
            const response = await fetch(`http://localhost:3000/api/cache/guilds/${guild.id}/channels`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setChannels(data);
        }

        async function fetchSettings() {
            const response = await fetch(`http://localhost:3000/api/db/guilds/${guild.id}/settings`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSettings(data);
        }

        fetchChannels();
        fetchSettings();
    }, [guild.id]);

    console.log("channels", channels);
    console.log("settings", settings);

	return (
		<div>
			<h1> tutaj będzie panel zarządzania dla serwera  {guild.name}</h1>
		</div>
	);
}
