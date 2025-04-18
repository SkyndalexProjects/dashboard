import React from "react";
import classes from "@/dashboard/guild/[id]/custombots/list/modals/modals.module.css";

const CreateReplyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className={classes.modalOverlay}>
			<div className={classes.modalContent}>
				<button onClick={onClose} className={classes.closeButton}>
					X
				</button>
				<h2> Add new reply</h2>

				<div className={classes.botForm}>
					<form>
						<label htmlFor="bot-token" className={classes.label}>
							Your custom reply
							<input
								id="eco-reply"
								type="text"
								placeholder="Enter reply"
								autoComplete="off"
							/>
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};
export default CreateReplyModal;
