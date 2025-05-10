import React, { useState, useRef, useEffect, ReactNode } from "react";
import classes from "./inputs.module.css";

interface SelectProps {
	onChange?: (value: string[]) => void;
	setSearchTerm: (value: string) => void;
	searchTerm: string;
	children: ReactNode;
	placeholder?: string;
	value?: string;
	className?: string;
	inputClassName?: string;
	indicatorClassName?: string;
	placeholderClassName?: string;
	placeholderLogo?: string;
	type?: string;
	disableSearch?: boolean;
	values: string[];
}

export default function MultiSelect({
	values = [],
	setSearchTerm,
	placeholder,
	searchTerm,
	className,
	inputClassName,
	placeholderLogo,
	placeholderClassName,
	disableSearch,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);

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

	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	const handleSelectValue = (value: string) => {
		if (!selectedValues.includes(value)) {
			setSelectedValues([...selectedValues, value]);
		} else {
			setSelectedValues(selectedValues.filter((v) => v !== value));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleRemoveValue = (valueToRemove: string) => {
		setSelectedValues((prevValues) =>
			prevValues.filter((value) => value !== valueToRemove),
		);
	};

	return (
		<div ref={selectRef} className={`${classes.multiInput} ${className}`}>
			<div className={classes.selectedTagsContainer}>
				{selectedValues.length > 0 && (
					<div className={classes.tags}>
						{selectedValues.map((value, index) => (
							<div key={index} className={classes.tag}>
								<p className={classes.multiValue}>
									{" "}
									{value.length > 8
										? `${value.slice(0, 5)}...`
										: value}{" "}
								</p>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleRemoveValue(value);
									}}
									className={classes.removeTag}
								>
									×
								</button>
							</div>
						))}
					</div>
				)}
				<input
					type="text"
					value={searchTerm}
					placeholder={selectedValues.length === 0 ? placeholder : ""}
					className={`${inputClassName} ${
						placeholderLogo ? classes.withLogo : ""
					} ${classes.placeholder} ${placeholderClassName}`}
					onChange={handleChange}
					onClick={(e) => {
						e.stopPropagation();
						if (!isOpen) toggleDropdown();
					}}
					disabled={disableSearch}
				/>
			</div>
			{isOpen && (
				<div className={classes.multiOptions}>
					{values
						.filter(
							(value) =>
								!selectedValues.includes(value) &&
								value
									.toLowerCase()
									.includes((searchTerm || "").toLowerCase()),
						)
						.slice(0, 5)
						.map((value, index) => (
							<div
								key={index}
								onClick={() => handleSelectValue(value)}
								className={`${classes.multiOption} ${
									selectedValues.includes(value)
										? classes.selected
										: ""
								}`}
							>
								{value}
							</div>
						))}
				</div>
			)}
		</div>
	);
}
