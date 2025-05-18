import classes from "./inputs.module.css";
interface InputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	placeholderLogo?: string;
	placeholderLogoClassName?: string;
	type: string;
	value: string;
}
export default function InputType({
	onChange,
	placeholder,
	placeholderLogo,
	placeholderLogoClassName,
	type,
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
				className={classes.input}
				type={type}
				style={placeholderLogo ? { paddingLeft: "60px" } : undefined}
			/>
		</div>
	);
}
