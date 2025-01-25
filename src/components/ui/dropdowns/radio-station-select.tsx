import { useState, useEffect, useRef } from "react";
import classes from "./dropdowns.module.css";

const RadioStationSelect = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [stations, setStations] = useState<RadioStation[]>([]);
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

	useEffect(() => {
		if (searchTerm) {
			fetch(`/radio-api/api/search?q=${searchTerm}`)
				.then((response) => response.json())
				.then((data) => {
					console.log("Fetched data:", data);
					setStations(data.hits.hits);
				})
				.catch((error) => {
					console.error("Error fetching radio stations:", error);
				});
		}
	}, [searchTerm]);

	if (!Array.isArray(stations)) {
		return <div>Loading...</div>;
	}

	const handleStationClick = (station: RadioStation) => {
		setSearchTerm(station._source.title);
		setDropdownVisible(false);
	};

	console.log("Stations:", stations);
	return (
		<div className={classes.select} ref={selectRef}>
			<div onClick={() => setDropdownVisible(!dropdownVisible)}>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={classes.select}
				/>
			</div>
			{dropdownVisible && (
				<div className={`${classes.options} ${classes.scrollable}`}>
					{stations.slice(0, 5).map((station) => (
						<div
							key={station._id}
							onClick={() => handleStationClick(station)}
							className={classes.option}
						>
							{station._source.title}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default RadioStationSelect;
