interface InputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	placeholderLogo?: string;
    placeholderLogoClassName?: string;
	className?: string;
	type: string;
}
export default function InputType({
	onChange,
	placeholder,
	placeholderLogo,
    placeholderLogoClassName,
	className,
	type,
}: InputProps) {
	return (
        <div className={className}>
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
                className={className}
                type={type}
                style={placeholderLogo ? { paddingLeft: '60px' } : undefined}
            />
        </div>
	);
}
