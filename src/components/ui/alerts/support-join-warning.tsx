import classes from "./alerts.module.css";
import { useTranslation } from "react-i18next";

export default function JoinSupportAlert() {
	const { t } = useTranslation();

	return (
		<div className={classes.supportJoinOverlay}>
			<img
				src="/info-icon.svg"
				alt="warning"
				className={classes.supportJoinWarningIcon}
			/>
			<p className={classes.supportJoinWarningText}>
				{t("system.alerts.support_join_warning")}
			</p>
		</div>
	);
}
