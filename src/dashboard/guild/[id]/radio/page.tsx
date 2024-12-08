import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";

export default function Page() {
    console.log("im running")

    return (
		<div>
			<Navbar />
			<Sidebar />

            <center> <h1> Radio </h1> </center>
		</div>
	);
}
