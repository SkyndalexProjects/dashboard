"use client";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PageContent() {
	const dispatch = useDispatch<AppDispatch>();
	const params = useParams<{ id: string }>();
	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === params.id)
			: undefined,
	);

	useEffect(() => {
		dispatch(fetchGuilds());
	}, [dispatch]);
	return (
		<div>
			<h1> Im working </h1>
			{guild ? (
				<>
					<img src={guild.icon} alt={`${guild.name} icon`} />
					<p>{guild.name}</p>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}
