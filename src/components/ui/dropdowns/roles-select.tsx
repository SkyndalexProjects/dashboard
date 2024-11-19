import Select, { StylesConfig } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import chroma from "chroma-js";
import { SetStateAction, useEffect, useState } from "react";
import { fetchRoles } from "../../../thunks/roles";
import { useParams } from "react-router-dom";
export type ColourOption = {
	value: string;
	label: string;
	isFixed?: boolean;
	color: string;
};

export default function RolesSelect() {
	const { id: guildId } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const areRolesFetched = useSelector(
		(state: RootState) => state.roles.areRolesFetched,
	);

	useEffect(() => {
		if (!areRolesFetched) {
			dispatch(fetchRoles(guildId as string));
		}
	});

	const roles = useSelector((state: RootState) => state.roles.data);
    const [selectedOptions, setSelectedOptions] = useState([]);
	const handleChange = (selected: any) => {
		setSelectedOptions(selected);
	};
	
	const colourStyles: StylesConfig<ColourOption, true> = {
		control: (provided) => ({
			...provided,
			backgroundColor: "#101111a6",
			border: "1px solid #0048ff",
			color: "#ffffff",
			fontSize: "16px",
			fontWeight: "bold",
			cursor: "pointer",
			height: "43px",
			borderRadius: "5px",
			paddingLeft: "10px",
			textAlign: "left",
			position: "relative",
			paddingRight: "40px",
		}),
		option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
			...provided,
			padding: "12px 16px",
			whiteSpace: "nowrap",
			backgroundColor: isDisabled
				? undefined
				: isSelected
					? data.color
					: isFocused
						? chroma(data.color).alpha(0.1).css()
						: "#101111d9",
			color: isDisabled
				? "#ccc"
				: isSelected
					? chroma.contrast(chroma(data.color), "white") > 2
						? "white"
						: "black"
					: data.color,
			cursor: isDisabled ? "not-allowed" : "default",
		}),
		multiValue: (styles, { data }) => {
			const color = chroma(data.color);
			return {
				...styles,
				backgroundColor: color.alpha(0.1).css(),
			};
		},
		multiValueLabel: (styles, { data }) => ({
			...styles,
			color: data.color,
		}),
		multiValueRemove: (styles, { data }) => ({
			...styles,
			color: data.color,
			":hover": {
				backgroundColor: data.color,
				color: "white",
			},
		}),
	};

    return (
        <div className="dropdown">
            <Select
                placeholder="Select roles..."
                options={roles.map(
                    (role: { id: string; name: string; color: string }) => ({
                        value: role.id,
                        label: role.name,
                        color: role.color,
                    }),
                )}
                closeMenuOnSelect={false}
                defaultValue={[roles[0], roles[1]]}
                isMulti
                styles={colourStyles}
                components={{
                    DropdownIndicator: () => (
                        <img src={"/dropdown_vector.svg"} alt="dropdown icon" />
                    ),
                    IndicatorSeparator: () => null,
                }}
                onChange={handleChange}
                classNamePrefix="react-select"
            />
        </div>
    );
}
