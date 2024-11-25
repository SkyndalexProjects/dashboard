import ChannelsSelect from "../../../../components/ui/dropdowns/channels-select";
import RolesSelect from "../../../../components/ui/dropdowns/roles-select";
import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";
import classes from "./home.module.css"
document.getElementById("root")?.classList.add(classes.root)
export default function Page() {
	return (
		<div>
			<Navbar />
			<Sidebar />

			<div className={classes.statsContainer}>
				<p className={classes.containerTitle}>
					<img src="/home.svg" alt="edit" width={35} height={35} />
					Stats Overview
				</p>

				<div className={classes.statsWrapper}>
					<div className={classes.stats}>
						<p className={classes.stat}> MEMBERS </p>
						<p className={classes.statCount}>
							<img
								src="/indicator-up.svg"
								alt="indicator"
								className={classes.indicator}
							/>
							2137
						</p>
					</div>
					<div className={classes.stats}>
						<p className={classes.stat}> MESSAGES </p>
						<p className={classes.statCount}>
							<img
								src="/indicator-up.svg"
								alt="indicator"
								className={classes.indicator}
							/>
							2137
						</p>
					</div>
					<div className={classes.stats}>
						<p className={classes.stat}> VOICE ACTIVITY </p>
						<p className={classes.statCount}>
							<img
								src="/indicator-down.svg"
								alt="indicator"
								className={classes.indicator}
							/>
							2137
						</p>
					</div>
				</div>
			</div>

			<div className={classes.settingsContainer}>
				<p className={classes.containerTitle}>
					<img src="/gear.svg" alt="edit" width={35} height={35} />
					Settings
				</p>

				<div className={classes.settingsWrapper}>
					<div className={classes.setting}>
						<ChannelsSelect />
					</div>
				</div>
				<div className={classes.settingsWrapper}>
					<div className={classes.setting}>
						<RolesSelect />
					</div>
				</div>
				<div className={classes.settingsWrapper}>
					<div className={classes.setting}>
						<ChannelsSelect />
					</div>
				</div>
			</div>
		</div>
	);
}
