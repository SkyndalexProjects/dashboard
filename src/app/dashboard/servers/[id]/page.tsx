"use client"
import { useParams } from "next/navigation";
import { Guild } from "@/app/globals";
import { useEffect, useState } from "react";

export default function PageContent() {

	const [guild, setGuild] = useState<Guild | null>(null);

	const params = useParams<{ id: string }>();

	useEffect(() => {
		const getGuild = async () => {
			const guildId = params.id;
			const response = await fetch(`/api/panel/getGuild?id=${guildId}`);
			const data = (await response.json()) as Guild;
			setGuild(data);
		};

		getGuild();
	}, [params]);

	return (
		<div>
			<h1> Im working. Choosen guild: {guild ? guild.name || guild.message : "Loading..."} </h1>
		</div>
	);
}
