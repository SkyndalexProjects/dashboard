import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../store";
import { fetchChannels } from "../../../../thunks/channels";
import { fetchGuilds } from "../../../../thunks/guilds";
import { fetchUser } from "../../../../thunks/user";
import Select from "react-select/base";
export default function Page() {
    const { id: guildId } = useParams();
	console.log('guildId', guildId);
    const dispatch = useDispatch<AppDispatch>();

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState<{ id: string; name: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const haveGuildsFetched = useSelector((state: RootState) => state.guilds.haveGuildsFetched);
    const isUserFetched = useSelector((state: RootState) => state.user.isUserFetched);
    const areChannelsFetched = useSelector((state: RootState) => state.channels.areChannelsFetched);

    useEffect(() => {
        if (!haveGuildsFetched) {
            dispatch(fetchGuilds());
        }
        if (!isUserFetched) {
            dispatch(fetchUser());
        }
        if (!areChannelsFetched) {
            dispatch(fetchChannels(guildId as string));
        }
    }, [dispatch, haveGuildsFetched, isUserFetched, areChannelsFetched]);

    const guild = useSelector((state: RootState) =>
        Array.isArray(state.guilds.data)
            ? state.guilds.data.find((x) => x.id === guildId)
            : undefined,
    );

    const channels = useSelector((state: RootState) => state.channels.data);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleChannelClick = (channel: { id: string; name: string }) => {
        setSelectedChannel(channel);
        setDropdownVisible(false);
    };

    const filteredChannels = channels.filter((channel) =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1> tutaj będzie panel zarządzania dla serwera {guild?.name}</h1>

            <div className="dropdown">
                <button className="dropbtn" onClick={toggleDropdown}>
                    {selectedChannel ? "#" + selectedChannel.name : "#channel"}
                    <img src="/dropdown_vector.svg" alt="dropdown" />
                </button>
				{dropdownVisible && (
					<div className="dropdown-content show">
						<input
							type="text"
							className="search-input"
							placeholder="Search channels..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						{filteredChannels.map((channel) => (
							<div
								key={channel.id}
								onClick={() => handleChannelClick(channel)}
							>
								{channel.name}
							</div>
						))}
					</div>
				)}
            </div>
        </div>
    );
}
