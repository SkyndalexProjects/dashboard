import { useState } from "react";
import classes from "./selectors.module.css";
export default function Switch() {
	const [isOn, setIsOn] = useState(false);

	const toggleSwitch = () => setIsOn(!isOn);

	return (
		<label className={classes.switch}>
			<input type={"checkbox"} checked={isOn} onChange={toggleSwitch} />
			<span className={`${classes.knob}`} />
		</label>
	);
}
