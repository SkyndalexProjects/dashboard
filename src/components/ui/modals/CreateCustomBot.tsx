import React from "react";
import classes from "./modals.module.css";

interface CustomBotModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const CustomBotModal: React.FC<CustomBotModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className={classes.modalOverlay}>
			<div className={classes.modalContent}>
				<button onClick={onClose} className={classes.closeButton}>
					X
				</button>
				<h2>Add new custom bot</h2>

				<div className={classes.botForm}>
					<form>
						<label htmlFor="bot-token" className={classes.label}>
							Your bot token
							<input
								id="bot-token"
								type="password"
								placeholder="Enter token"
								autoComplete="off"
							/>
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CustomBotModal;
