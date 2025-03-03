import { useState, useRef, useEffect, ReactNode } from "react";
import classes from "./dropdowns.module.css";

interface SelectProps {
    onChange?: (value: string) => void;
    setSearchTerm: (value: string) => void;
    children: ReactNode;
    placeholder?: string;
    value?: string;
    searchTerm: string;
    className?: string;
    inputClassName?: string;
    placeholderLogo?: string;
    disableSearch?: boolean;
}

interface SelectOptionProps {
    onClick?: () => void;
    onChange?: (value: string) => void;
    value: string;
    children: ReactNode;
    className?: string;
    inputClassName?: string;
}

export default function Select({
    onChange,
    setSearchTerm,
    children,
    placeholder,
    searchTerm,
    className,
    inputClassName,
    placeholderLogo,
    disableSearch,
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
        if (!disableSearch) setSearchTerm(value);
    };

    return (
		<div ref={selectRef} className={className}>
			<div onClick={toggleDropdown} className={classes.inputContainer}>
			{placeholderLogo && (
				<img
				src={placeholderLogo}
				alt="logo"
				className={classes.logo}
				/>
			)}
           <input
                type="text"
                value={searchTerm}
                placeholder={placeholder}
                className={`${inputClassName} ${placeholderLogo ? classes.withLogo : ""} ${classes.placeholder}`}
                onChange={(e) => {
                    if (!disableSearch) setSearchTerm(e.target.value);
                }}
                onClick={toggleDropdown}
                disabled={disableSearch}
            />
			<div
				className={`${classes.indicator} ${isOpen ? classes.open : ""}`}
			>
				<img
				src="/indicator.svg"
				alt="indicator"
				className={isOpen ? classes.rotate : ""}
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
        </div>
    );
}

export function SelectOption({ children }: SelectOptionProps) {
    return <>{children}</>;
}