import ChannelsSelect from "../../../../components/ui/dropdowns/channels-select";
import RolesSelect from "../../../../components/ui/dropdowns/roles-select";
import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";
export default function Page() {
	return (
		<div>
			<Navbar />
			<Sidebar />

			<div className="stats-container">
				<p className="container-title">
					<img src="/home.svg" alt="edit" width={35} height={35} />
					Stats Overview
				</p>

				<div className="stats-wrapper">
					<div className="stats">
						<p className="stat"> MEMBERS </p>
						<p className="stat-count">
							<img
								src="/indicator-up.svg"
								alt="indicator"
								className="indicator"
							/>
							2137
						</p>
					</div>
					<div className="stats">
						<p className="stat"> MESSAGES </p>
						<p className="stat-count">
							<img
								src="/indicator-up.svg"
								alt="indicator"
								className="indicator"
							/>
							2137
						</p>
					</div>
					<div className="stats">
						<p className="stat"> VOICE ACTIVITY </p>
						<p className="stat-count">
							<img
								src="/indicator-down.svg"
								alt="indicator"
								className="indicator"
							/>
							2137
						</p>
					</div>
				</div>
			</div>

			<div className="settings-container">
				<p className="container-title">
					<img src="/gear.svg" alt="edit" width={35} height={35} />
					Settings
				</p>

				<div className="settings-wrapper">
					<div className="setting">
						<ChannelsSelect />
					</div>
				</div>
				<div className="settings-wrapper">
					<div className="setting">
						<RolesSelect />
					</div>
				</div>
				<div className="settings-wrapper">
					<div className="setting">
						<ChannelsSelect />
					</div>
				</div>
			</div>
		</div>
	);
}
