import { useState } from "react";
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
		<label className={switchClassName}>
			<input type={"checkbox"} checked={isOn} onChange={toggleSwitch} />
			<span className={`${knobClassName}`} />
		</label>
	);
}
