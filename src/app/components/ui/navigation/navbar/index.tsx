import Image from "next/image";
import GuildsDropdown from "../dropdowns/guilds";
import InstancesDropdown from "../dropdowns/instances";
const navbar = () => {
	return (
		<>
			<nav>
				<Image
					src="/favicon.ico"
					alt="logo"
					width={71}
					height={71}
					style={{ float: "left" }}
					className="nav-logo"
				/>
				<p className="nav-title"> DASHBOARD </p>
				<GuildsDropdown />
				<InstancesDropdown />
				<div className="nav-right">
					<p className="nav-item"> 0.0.0 </p>
				</div>
			</nav>
			<hr />
		</>
	);
};

export default navbar;
