import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./economy.module.css";
import InputType from "@/components/ui/inputs/input";
import { useState } from "react";
import Switch from "@/components/ui/inputs/switch";
import EconomyCommandsSettings from "@/dashboard/guild/[id]/economy/commands-settings/commands-settings";

export default function Economy() {
	const [setStatus] = useState("");

	const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// @ts-ignore
		setStatus(e.target.value);
	};

	return (
		<div>
			<Navbar />
			<Sidebar />

			<p className={classes.moneySettings}>
				{" "}
				Money settings{" "}
				<svg
					width="185"
					height="4"
					viewBox="0 0 185 4"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						flexShrink: 0,
						strokeWidth: 4,
						stroke: "#275EE7",
					}}
					className={classes.sectionTitleVector}
				>
					<line x1="0" y1="2" x2="185" y2="2" />
				</svg>
			</p>

			<div className={classes.settingsMoneySection}>
				<div className={classes.settingColumn}>
					<div className={classes.setting}>
						<p className={classes.settingTitle}>Symbol</p>
						<InputType
							onChange={handleSymbolChange}
							placeholder="$"
							className={classes.input}
							type="text"
						/>

						<p className={classes.hint}>
							<img src={"/hint.svg"} alt={"hint"} />
							Use win + . to choose emoji
						</p>
					</div>
					<div className={classes.setting}>
						<p className={classes.settingTitle}>
							Starting point (wallet)
						</p>
						<InputType
							onChange={handleSymbolChange}
							placeholder="$"
							className={classes.input}
							type="text"
						/>

						<p className={classes.hint}>
							<img src={"/hint.svg"} alt={"hint"} />
							Money for the new users (wallet)
						</p>
					</div>
					<div className={classes.setting}>
						<p className={classes.settingTitle}>
							Starting point (bank)
						</p>
						<InputType
							onChange={handleSymbolChange}
							placeholder="$"
							className={classes.input}
							type="text"
						/>

						<p className={classes.hint}>
							<img src={"/hint.svg"} alt={"hint"} />
							Money for the new users (bank)
						</p>
					</div>
					<div className={classes.additionalSettings}>
						<div className={classes.setting}>
							<p className={classes.settingTitle}>
								Additional settings
								<p className={classes.additionalSettingTitle}>
									<Switch
										switchClassName={classes.switch}
										knobClassName={classes.knob}
									/>
									Clear money after leaving the guild
								</p>
								<p className={classes.additionalSettingTitle}>
									<Switch
										switchClassName={classes.switch}
										knobClassName={classes.knob}
									/>
									Enable rob system
								</p>
							</p>
						</div>
					</div>
				</div>
			</div>

			<p className={classes.commandsSettingsTitle}>
				{" "}
				Commands settings{" "}
				<svg
					width="185"
					height="4"
					viewBox="0 0 185 4"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						flexShrink: 0,
						strokeWidth: 4,
						stroke: "#275EE7",
					}}
					className={classes.sectionTitleVector}
				>
					<line x1="0" y1="2" x2="185" y2="2" />
				</svg>
			</p>

			<div className={classes.commandsSettingsSection}>
				<EconomyCommandsSettings />
			</div>
		</div>
	);
}
