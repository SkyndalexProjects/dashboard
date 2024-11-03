"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import router from "next/navigation"
import { useParams } from "next/navigation";

export default function PageContent() {
	const params = useParams<{ id: string }>();
	const guild = useSelector((state: RootState) => state.guilds.data.find(x => x.id === params.id)) 

	console.log("guild", guild);
	return (
		<div>
			<h1> Im working </h1>
		</div>
	);
}
