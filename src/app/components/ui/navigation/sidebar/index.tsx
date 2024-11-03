import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = () => {
	const pathname = usePathname();
	const isActive = (path: string) => pathname.startsWith(path);

	return (
		<div className="sidebar" style={{ userSelect: "none" }}>
			<p className={`sidebar-item ${isActive("/") ? "active" : ""}`}>
				<Image src="/home.svg" alt="home" width={30} height={30} /> Home
			</p>
			<p
				className={`sidebar-item ${isActive("/custombots") ? "active" : ""}`}
			>
				<Image
					src="/bot_icon.svg"
					alt="custombot"
					width={30}
					height={30}
				/>{" "}
				Custombots
			</p>
			<p
				className={`sidebar-item ${isActive("/economy") ? "active" : ""}`}
			>
				<Image
					src="/economy.svg"
					alt="economy"
					width={30}
					height={50}
				/>{" "}
				Economy
			</p>
			<p
				className={`sidebar-item ${isActive("/levels") ? "active" : ""}`}
			>
				<Image src="/levels.svg" alt="levels" width={30} height={30} />{" "}
				Levels
			</p>
			<p className={`sidebar-item ${isActive("/radio") ? "active" : ""}`}>
				<Image src="/radio.svg" alt="radio" width={30} height={30} />{" "}
				Radio
			</p>
			<p className={`sidebar-item ${isActive("/ai") ? "active" : ""}`}>
				<Image src="/sparkles.svg" alt="ai" width={30} height={30} /> AI
			</p>
		</div>
	);
};

export default Sidebar;
