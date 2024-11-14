import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../store";
import { fetchGuilds } from "../../../../thunks/guilds";
import { fetchUser } from "../../../../thunks/user";
import ChannelsSelect from "../../../../components/ui/dropdowns/channels-select";
import RolesSelect from "../../../../components/ui/dropdowns/roles-select";
import Navbar from "../../../../components/ui/navigation/navbar";
export default function Page() {
	const { id: guildId } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);
	const isUserFetched = useSelector(
		(state: RootState) => state.user.isUserFetched,
	);

	useEffect(() => {
		if (!haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
		if (!isUserFetched) {
			dispatch(fetchUser());
		}
	}, [dispatch, haveGuildsFetched, isUserFetched]);

	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);

	return (
		<div>
			<Navbar />
			<h1> tutaj będzie panel zarządzania dla serwera {guild?.name}</h1>

			<ChannelsSelect />
			<RolesSelect />
		</div>
	);
}
