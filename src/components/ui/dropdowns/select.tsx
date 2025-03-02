import { useState, useRef, useEffect, ReactNode } from "react";
import classes from "./dropdowns.module.css";

interface SelectProps {
	children: ReactNode;
	placeholder?: string;
	onChange?: (value: string) => void;
	value?: string;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

interface SelectOptionProps {
	value: string;
	children: ReactNode;
	onClick?: () => void;
	onChange?: (value: string) => void;
}

export default function Select({
	children,
	placeholder = "Select",
	onChange,
	searchTerm,
	setSearchTerm,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<string | null>(null);
	const selectRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

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
		setSearchTerm(value);
	};

	return (
		<div ref={selectRef} className={classes.dropdownContainer}>
			<div className={classes.inputContainer} onClick={toggleDropdown}>
				<input
					type="text"
					value={searchTerm}
					placeholder={placeholder}
					className={classes.selectInput}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			{isOpen && (
				<div className={classes.options}>
					{children &&
						(Array.isArray(children) ? children : [children]).map(
							(child, index) =>
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
	);
}

export function SelectOption({ children }: SelectOptionProps) {
	return <>{children}</>;
}
