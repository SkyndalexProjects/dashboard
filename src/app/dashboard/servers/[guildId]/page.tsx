"use client";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/app/components/ui/navigation/navbar";
import Sidebar from "@/app/components/ui/navigation/sidebar";
export default function PageContent() {
	const dispatch = useDispatch<AppDispatch>();
	const { guildId } = useParams();

	console.log("guildid params", guildId);
	const haveGuildsFetched = useSelector((state: RootState) => state.guilds.haveGuildsFetched);

	if (!haveGuildsFetched) {
		dispatch(fetchGuilds());
	}
	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);
	console.log("guild", guild);

	useEffect(() => {
		dispatch(fetchGuilds());
	}, [dispatch]);

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="guild-panel">
				{guild ? (
					<>
						<h1> "{guild.name}" Management</h1>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
