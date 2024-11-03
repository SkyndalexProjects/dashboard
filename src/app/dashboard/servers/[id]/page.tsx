"use client";
import { useParams } from "next/navigation";

export default function PageContent() {
    const params = useParams<{ id: string }>();
    console.log("params", params);

	return (
		<div>
			<h1> Im working </h1>
		</div>
	);
}
