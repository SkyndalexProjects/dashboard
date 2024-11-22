import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";
import InsertSetting from "../../../../components/ui/buttons/add-custombot";
export default function Page() {
	return (
		<div>
			<Navbar />
			<Sidebar />

			{/* @ts-expect-error */}
			<h1 align="center"> Nothing yet here </h1>
			<center>
				<InsertSetting />
			</center>
		</div>
	);
}
