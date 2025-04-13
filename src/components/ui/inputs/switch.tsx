import { useState } from "react";
import classes from "./inputs.module.css";
interface SwitchProps {
	switchClassName: string;
	knobClassName: string;
}
export default function Switch({
	switchClassName,
	knobClassName,
}: SwitchProps) {
	const [isOn, setIsOn] = useState(false);

	const toggleSwitch = () => setIsOn(!isOn);
	return (
		<div className={switchClassName} onClick={toggleSwitch}>
			<div
				className={`${knobClassName} ${
					isOn ? classes.on : classes.off
				}`}
			/>
		</div>
	);
}
