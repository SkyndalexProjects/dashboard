import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";

export default function Page() {
	return (
		<div>
			<Navbar />
			<Sidebar />

			{/* @ts-expect-error */}
			<h1 align="center"> Nothing yet here </h1>
		</div>
	);
}
