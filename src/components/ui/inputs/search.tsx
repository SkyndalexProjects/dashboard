import React, { useState, useRef, useEffect, ReactNode } from "react";
import classes from "./inputs.module.css";

interface SelectProps {
	onChange?: (value: string) => void;
	setSearchTerm: (value: string) => void;
	searchTerm: string;
	children: ReactNode;
	placeholder?: string;
	value?: string;
	placeholderIcon?: string;
	placeholderStyle?: string;
	inputStyle?: string;
}

interface SelectOptionProps {
	onClick?: () => void;
	onChange?: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	children: ReactNode;
	className?: string;
}

export default function SearchSelect({
	onChange,
	setSearchTerm,
	children,
	placeholder,
	searchTerm,
	placeholderIcon,
	placeholderStyle,
	inputStyle,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [, setSelected] = useState<string | null>(null);
	const selectRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	// CLOSING DROPDOWN WHEN CLICKING OUTSIDE
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (value: string) => {
		console.log("SELECTED VALUE SUCCESSFULLY");
		setSelected(value);
		setIsOpen(false);
		if (onChange) onChange(value);
		if (setSearchTerm) setSearchTerm(value);
	};

	const filteredChildren = Array.isArray(children)
		? children.filter((child) =>
				child.props.value
					.toLowerCase()
					.includes((searchTerm || "").toLowerCase()),
			)
		: children;

	return (
		<div ref={selectRef} className={inputStyle}>
			<div className={classes.container}>
				<img
					src={placeholderIcon}
					alt="logo"
					className={classes.logo}
				/>
				<input
					type={"text"}
					value={searchTerm}
					placeholder={placeholder}
					className={placeholderStyle}
					onChange={(event) => {
						try {
							setSearchTerm(event.target.value);
						} catch (error) {
							console.error("Search error", error);
						}
					}}
					onClick={!searchTerm ? toggleDropdown : undefined}
				/>

				{isOpen && (
					<div className={classes.options}>
						{filteredChildren &&
							(Array.isArray(filteredChildren)
								? filteredChildren
								: [filteredChildren]
							).map((child, index) =>
								child
									? child.type === SelectOption
										? child.props &&
											((
												optionProps: SelectOptionProps,
											) => (
												<div
													key={index}
													onClick={() =>
														handleSelect(
															optionProps.value,
														)
													}
													className={classes.option}
												>
													{optionProps.children}
												</div>
											))(child.props)
										: null
									: null,
							)}
					</div>
				)}
			</div>
			<img
				src="/indicator.svg"
				alt="indicator"
				className={isOpen ? classes.rotate : classes.neutral}
			/>
		</div>
	);
}

export function SelectOption({ children }: SelectOptionProps) {
	return <>{children}</>;
}
