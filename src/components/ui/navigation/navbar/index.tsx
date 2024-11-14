import GuildsDropdown from "../../dropdowns/guilds-select";
const navbar = () => {
	return (
		<>
			<nav>
				<img
					src="/favicon.ico"
					alt="logo"
					width={71}
					height={71}
					style={{ float: "left" }}
					className="nav-logo"
				/>
				<p className="nav-title"> DASHBOARD </p>
				<GuildsDropdown />
				<div className="nav-right">
					<p className="nav-item"> 0.0.0 </p>
				</div>
			</nav>
			<hr />
		</>
	);
};

export default navbar;
