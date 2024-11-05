import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const isActive = (path: string) => pathname.includes(path);

	const handleNavigation = (path: string) => {
		router.push(path);
	};
	const dispatch = useDispatch<AppDispatch>();
	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);
	useEffect(() => {
		if (!haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
	}, [dispatch, haveGuildsFetched]);

	const guilds = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data) ? state.guilds.data : undefined,
	)
		?.slice()
		.sort((a, b) => {
			if (a.icon && !b.icon) return -1;
			if (!a.icon && b.icon) return 1;
			return 0;
		});

	const currentGuild = useParams().guildId;
	const currentGuildData = guilds?.find((guild) => guild.id === currentGuild);

	return (
		<div className="sidebar" style={{ userSelect: "none" }}>
			<button
				className={`sidebar-item ${isActive("/") ? "active" : ""}`}
				onClick={() => handleNavigation(`/dashboard/servers/${currentGuildData?.id}/home`)}
			>
				<Image src="/home.svg" alt="home" width={30} height={30} /> Home
			</button>
			<button
				className={`sidebar-item ${isActive("/custombots") ? "active" : ""}`}
				onClick={() => handleNavigation(`/dashboard/servers/${currentGuildData?.id}/custombots`)}
			>
				<Image src="/bot_icon.svg" alt="custombot" width={30} height={30} /> Custombots
			</button>
			<button
				className={`sidebar-item ${isActive("/economy") ? "active" : ""}`}
				onClick={() => handleNavigation(`/dashboard/servers/${currentGuildData?.id}/economy`)}
			>
				<Image src="/economy.svg" alt="economy" width={30} height={50} /> Economy
			</button>
			<button
				className={`sidebar-item ${isActive("/levels") ? "active" : ""}`}
				onClick={() => handleNavigation(`/dashboard/servers/${currentGuildData?.id}/levels`)}
			>
				<Image src="/levels.svg" alt="levels" width={30} height={30} /> Levels
			</button>
			<button
				className={`sidebar-item ${isActive("/radio") ? "active" : ""}`}
				onClick={() => handleNavigation(`/dashboard/servers/${currentGuildData?.id}/radio`)}
			>
				<Image src="/radio.svg" alt="radio" width={30} height={30} /> Radio
			</button>
			<button
				className={`sidebar-item ${isActive("/ai") ? "active" : ""}`}
				onClick={() => handleNavigation(`/dashboard/servers/${currentGuildData?.id}/ai`)}
			>
				<Image src="/sparkles.svg" alt="ai" width={30} height={30} /> AI
			</button>
		</div>
	);
};

export default Sidebar;
