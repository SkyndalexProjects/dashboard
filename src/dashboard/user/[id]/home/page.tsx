import Navbar from "@/components/ui/navigation/navbar";
import UserSidebar from "@/components/ui/navigation/sidebar/user-index";
import BetaWarning from "@/components/ui/alerts/beta-warning";
import JoinSupportAlert from "@/components/ui/alerts/support-join-warning";
import classes from "./home.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function UserHome() {
	const user = useSelector(
		(state: RootState) =>
			state.user.data as unknown as {
				username: string;
				avatar: string;
				id: string;
			},
	);
	return (
		<div>
			<Navbar />
			<UserSidebar />

			<BetaWarning />
			<JoinSupportAlert />

			<div className={classes.userContainer}>
				<div className={classes.userDataContainer}>
					<img
						src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`}
						alt="avatar"
						className={classes.userAvatar}
					/>

					<div className={classes.userDetails}>
						<p className={classes.username}> {user?.username} </p>
						<p className={classes.accountType}> free account </p>
					</div>
				</div>

				<div className={classes.premiumUpgradeAlertContainer}>
					<img
						src={`/crown.svg`}
						alt="crown"
						className={classes.crown}
					/>
					<div className={classes.premiumDetails}>
						<p className={classes.premiumUpgradeTitle}>
							{" "}
							Upgrade to premium{" "}
						</p>
						<p className={classes.premiumUpgradeSubtext}>
							{" "}
							The entire bot is developed by a single self-taught
							programmer. Appreciate my work by buying premium and
							get cool features described here{" "}
						</p>
					</div>
				</div>
			</div>

			<div className={classes.gridContainer}>
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/sparkles.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> AI </p>
						<p className={classes.featureSubtext}>
							Set up AI features like chatbot channel, API keys
							and more
						</p>
					</div>
					<button className={classes.featureButton}>
						Setup
						<img
							src="/button-arrow.svg"
							alt="arrow"
							className={classes.buttonArrow}
						/>
					</button>
				</div>
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/economy.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> Economy </p>
						<p className={classes.featureSubtext}>
							Make your own economy system on guild
						</p>
					</div>
					<button className={classes.featureButton}>
						Setup
						<img
							src="/button-arrow.svg"
							alt="arrow"
							className={classes.buttonArrow}
						/>
					</button>
				</div>
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/radio.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> Radio </p>
						<p className={classes.featureSubtext}>
							Listen to the radio from the entire world. Feel the
							entire radio.garden experience!
						</p>
					</div>
					<button className={classes.featureButton}>
						Setup
						<img
							src="/button-arrow.svg"
							alt="arrow"
							className={classes.buttonArrow}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
