import classes from "./alerts.module.css";
import { useTranslation } from "react-i18next";
export default function BetaWarning() {
	const { t } = useTranslation();
	return (
		<div>
						<img
				src="/warning-icon.svg"
				alt="warning"
				className={classes.betaWarningOverlayIcon}
			/>
			<div className={classes.betaWarningOverlay}>
				<p className={classes.betaWarningOverlayText}>
					{t("system.alerts.beta_warning")}
				</p>
			</div>
		</div>
	);
}
