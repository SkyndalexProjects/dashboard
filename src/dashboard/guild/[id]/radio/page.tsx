import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "@/dashboard/guild/[id]/main-settings/main-settings.module.css";
import React from "react";

export default function Page() {
	console.log("im running");

	return (
		<div>
			<Navbar />
			<Sidebar />

			<center>
				{" "}
				<p className={classes.sectionTitle}>
					{" "}
					Current status
					<div className={classes.underlineVector} />
				</p>
			</center>
		</div>
	);
}
