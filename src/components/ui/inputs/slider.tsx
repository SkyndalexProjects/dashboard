import React, { useState } from "react";
import classes from "./inputs.module.css";
interface SliderProps {
	min: number;
	max: number;
	step?: number;
	initialValue?: number;
	className?: string;
	inputClassName: string;
	rageClassName: string;
}

export default function Slider({
	min,
	max,
	step = 1,
	initialValue = min,
	className,
	inputClassName,
	rageClassName,
}: SliderProps) {
	const [value, setValue] = useState<number>(initialValue);

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(e.target.value);
		setValue(newValue);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(e.target.value);
		if (!isNaN(newValue) && newValue >= min && newValue <= max) {
			setValue(newValue);
		}
	};

	return (
		<div className={className}>
			<div className={classes.sliderLabel}>
				<input
					type="number"
					value={value}
					onChange={handleInputChange}
					className={inputClassName}
					min={min}
					max={max}
				/>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={handleSliderChange}
				className={rageClassName}
			/>
		</div>
	);
}
