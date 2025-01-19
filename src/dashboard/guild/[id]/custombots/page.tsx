import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import AddingCustombot from "@/components/ui/forms/adding-custombot";

export default function Page() {
	return (
		<div>
			<Navbar />
			<Sidebar />

			<center>
				<AddingCustombot />
			</center>
		</div>
	);
}
