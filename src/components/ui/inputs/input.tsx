import classes from "./inputs.module.css";
import React from "react";
import { ReactSVG } from "react-svg";

interface InputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	placeholderIcon?: string;
	type: string;
	className?: string;
	value?: string;
	onIconError?: (iconUrl: string) => void;
}

export default function InputType({
	onChange,
	placeholder,
	placeholderIcon,
	type,
	className,
	value,
}: InputProps) {
	return (
		<div className={className}>
			<ReactSVG
				src={placeholderIcon}
				className={classes.logo}
				onError={(error) => {
					console.error(error);
				}}
			/>
			<input
				placeholder={placeholder}
				onChange={(e) => onChange(e)}
				className={classes.searchInputField}
				type={type}
				value={value}
			/>
		</div>
	);
}
