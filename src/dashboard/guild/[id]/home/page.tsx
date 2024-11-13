import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../store";
import { fetchChannels } from "../../../../thunks/channels";
import { fetchGuilds } from "../../../../thunks/guilds";
import { fetchUser } from "../../../../thunks/user";

export default function Page() {
	const dispatch = useDispatch<AppDispatch>();
	const { id: guildId } = useParams();

	const { haveGuildsFetched, isUserFetched, areChannelsFetched } =
		useSelector((state: RootState) => ({
			haveGuildsFetched: state.guilds.haveGuildsFetched,
			isUserFetched: state.user.isUserFetched,
			areChannelsFetched: state.channels.areChannelsFetched,
		}));

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

	return (
		<div>
			<h1> tutaj będzie panel zarządzania dla serwera {guild?.name}</h1>
		</div>
	);
}
