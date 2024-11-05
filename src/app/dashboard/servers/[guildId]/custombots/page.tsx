"use client";
import Navbar from "@/app/components/ui/navigation/navbar";
import Sidebar from "@/app/components/ui/navigation/sidebar";

export default function PageContent() {
	return (
		<>
			<Navbar />
			<Sidebar />

			<div className="fast-settings">
				<h1 className="fast-settings-title"> Custombots </h1>
				<h2 className="fast-settings-title"> dupa</h2>
			</div>
		</>
	);
}