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

	// END CLOSING DROPDOWN WHEN CLICKING OUTSIDE

	const handleSelect = (value: string) => {
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
		<div ref={selectRef} className={classes.selectInput}>
			<div onClick={toggleDropdown} className={classes.inputContainer}>
				<div className={classes.placeholder}>
					{placeholderIcon && (
						<img
							src={placeholderIcon}
							alt="logo"
							className={classes.logo}
						/>
					)}
				</div>

				<input
					placeholder={placeholder}
					type={"text"}
					value={searchTerm}
					className={classes.searchInput}
					onChange={(event) => {
						try {
							setSearchTerm(event.target.value);
						} catch (e) {
							console.error("Search error", e);
						}
					}}
					onClick={!searchTerm ? toggleDropdown : undefined}
				/>
			</div>
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
										((optionProps: SelectOptionProps) => (
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
	);
}

export function SelectOption({ children }: SelectOptionProps) {
	return <>{children}</>;
}
