import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";
import InsertSetting from "../../../../components/ui/forms/adding-custombot";

export default function Page() {
	return (
		<div>
			<Navbar />
			<Sidebar />

			<center>
				<InsertSetting />
			</center>
		</div>
	);
}
