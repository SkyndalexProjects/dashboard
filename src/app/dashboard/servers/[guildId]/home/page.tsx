"use client";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/app/components/ui/navigation/navbar";
import Sidebar from "@/app/components/ui/navigation/sidebar";

export default function PageContent() {
    const dispatch = useDispatch<AppDispatch>();
    const { guildId } = useParams();

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

    const exampleChannels = [
        { id: "1", name: "general" },
        { id: "2", name: "announcements" },
        { id: "3", name: "rules" },
        { id: "4", name: "bot-commands" },
    ]
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="fast-settings">
				<h1 className="fast-settings-title"> Home </h1>
				<h2 className="fast-settings-title"> Set all your essentials in one place</h2>
			</div>
			<div className="settings-grid">
				{["Welcome Channel", "Goodbye Channel", "Auto Role", "Voice-logs", "Auto-Radio Channel", "Chatbot Channel"].map((label, index) => (
					<div className="setting-container" key={index}>
						<label className="setting-label-title">{label}</label>
						<div className="select-container">
							<select id="setting-select" name={label.toLowerCase().replace(" ", "-")}>
								{exampleChannels.map((ch) => (
									<option key={ch.id} value={ch.id}>
										{ch.name}
									</option>
								))}
							</select>
						</div>
					</div>
				))}
			</div>
		</>
	);
}