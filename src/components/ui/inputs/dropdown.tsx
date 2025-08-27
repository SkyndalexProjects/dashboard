import React, { useState, useRef, useEffect, ReactNode } from "react";
import classes from "./inputs.module.css";
import { ReactSVG } from "react-svg";

interface DropdownProps {
	children: ReactNode;
	placeholder?: string;
	placeholderIcon?: string;
	type?: string;
}

interface DropdownOptionProps {
	onClick?: () => void;
	onChange?: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	children: ReactNode;
	className?: string;
	inputClassName?: string;
}

export default function Dropdown({
	children,
	placeholder,
	placeholderIcon,
}: DropdownProps) {
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
	};

	const filteredChildren = Array.isArray(children)
		? children.filter((child) => child.props.value.toLowerCase())
		: children;

	return (
		<div ref={selectRef}>
			<div className={classes.select} onClick={toggleDropdown}>
				<div className={classes.dropdownContainer}>
					{placeholderIcon &&
						(placeholderIcon.toLowerCase().endsWith(".svg") ? (
							<ReactSVG
								src={placeholderIcon}
								className={classes.logo}
								onError={(error) => {
									console.error("SVG loading error:", error);
								}}
							/>
						) : (
							<img
								src={placeholderIcon}
								className={classes.logo}
								alt="Placeholder icon"
								onError={(error) => {
									console.error(
										"Image loading error:",
										error,
									);
								}}
							/>
						))}
					{placeholder && (
						<p className={`${classes.placeholderText}`}>
							{placeholder}
						</p>
					)}
					<img
						src="/indicator.svg"
						alt="indicator"
						className={isOpen ? classes.rotate : ""}
					/>
				</div>
			</div>
			{isOpen && (
				<div className={classes.optionsWrapper}>
					<div className={classes.options}>
						{filteredChildren &&
							(Array.isArray(filteredChildren)
								? filteredChildren
								: [filteredChildren]
							).map((child, index) =>
								child
									? child.type === DropdownOption
										? child.props &&
											((
												optionProps: DropdownOptionProps,
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
				</div>
			)}
		</div>
	);
}

export function DropdownOption({ children }: DropdownOptionProps) {
	return <>{children}</>;
}
