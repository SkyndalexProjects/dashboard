import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useState, useRef, useEffect } from "react";
import classes from "./dropdowns.module.css";

export default function TextChannelsSelect() {
	const channels = useSelector((state: RootState) => state.channels.data);
	const [searchTerm, setSearchTerm] = useState("");
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setDropdownVisible(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	if (!Array.isArray(channels)) {
		return <div>Loading...</div>;
	}

	const filteredChannels = channels
		.filter((channel) =>
			channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.slice(0, 5);

	const handleChannelClick = (channel: { id: string; name: string }) => {
		setSearchTerm(channel.name);
		setDropdownVisible(false);
	};

	return (
		<div ref={selectRef}>
			<div onClick={() => setDropdownVisible(!dropdownVisible)}>
				<img
					src="/hashtag.svg"
					alt="hashtag"
					className={classes.textChannelIcon}
				/>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={classes.selectInput}
				/>
			</div>
			{dropdownVisible && (
				<div className={classes.options}>
					{filteredChannels.map((channel) => (
						<div
							key={channel.id}
							onClick={() => handleChannelClick(channel)}
							className={classes.option}
						>
							{channel.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
