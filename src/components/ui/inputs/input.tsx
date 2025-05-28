import classes from "./inputs.module.css";
import React from "react";

interface InputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	placeholderLogo?: string;
	placeholderLogoClassName?: string;
	type: string;
	className?: string;
	value?: string;
}

export default function InputType({
	onChange,
	placeholder,
	placeholderLogo,
	placeholderLogoClassName,
	type,
	className,
	value,
}: InputProps) {
	return (
		<div>
			{placeholderLogo && (
				<img
					src={placeholderLogo}
					alt={"placeholder logo"}
					className={placeholderLogoClassName}
				/>
			)}
			<input
				placeholder={placeholder}
				onChange={(e) => onChange(e)}
				className={
					className ? `${classes.input} ${className}` : classes.input
				}
				type={type}
				value={value}
				style={placeholderLogo ? { paddingLeft: "60px" } : undefined}
			/>
		</div>
	);
}
