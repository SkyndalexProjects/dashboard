import classes from "./alerts.module.css";

export default function JoinSupportAlert() {
	return (
		<div className={classes.supportJoinOverlay}>
			<p className={classes.supportJoinWarningText}>
				<img
					src="/info-icon.svg"
					alt="warning"
					className={classes.supportJoinWarningIcon}
				/>
				You did not join our discord support guild. It is highly
				recommended to keep up to date with the changes in the bot that
				are currently being intensively carried out
			</p>
		</div>
	);
}
