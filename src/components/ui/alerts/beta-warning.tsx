import classes from "./alerts.module.css";

export default function BetaWarning() {
	return (
		<div className={classes.betaWarningOverlay}>
			<p className={classes.betaWarningOverlayText}>
				<img
					src="/warning-icon.svg"
					alt="warning"
					className={classes.betaWarningOverlayIcon}
				/>
				Dashboard is still under BETA version. Stable release will be
				out after v1.0.0
			</p>
		</div>
	);
}
