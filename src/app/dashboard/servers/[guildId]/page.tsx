"use client";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/app/components/ui/navigation/navbar";
import Sidebar from "@/app/components/ui/navigation/sidebar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PageContent() {
	const dispatch = useDispatch<AppDispatch>();
	const { guildId } = useParams();
	const router = useRouter();

	console.log("guildid params", guildId);
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
	console.log("guild", guild);

	return (
		<>
			<Navbar />
			<Sidebar />

            <div className="fast-settings">
                
            </div>
		</>
	);
}
