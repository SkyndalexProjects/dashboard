import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./sidebar.module.css";
import Switch from "@/components/ui/selectors/switch";

interface SidebarItemProps {
	path: string;
	icon: string;
	text: string;
	hasSwitch?: boolean;
	additionalPaths?: string[];
}

interface SidebarCategoryProps {
	title: string;
	children: React.ReactNode;
}

const SidebarItem = ({
	path,
	icon,
	text,
	hasSwitch = false,
	additionalPaths = [],
}: SidebarItemProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	const isActive = (path: string) => {
		if (location.pathname === path) return true;
		return additionalPaths.some((p) => location.pathname.includes(p));
	};

	const handleNavigation = () => {
		navigate(path);
	};

	return (
		<div
			className={`${classes.sidebarItem} ${
				isActive(path) ? classes.active : ""
			}`}
			onClick={handleNavigation}
		>
			<div className={classes.itemContent}>
				<img src={icon} alt={text} className={classes.sidebarIcon} />
				<span className={classes.sidebarText}>{text}</span>
			</div>
			{hasSwitch && (
				<Switch
					switchClassName={classes.switch}
					knobClassName={classes.knob}
				/>
			)}
		</div>
	);
};

const SidebarCategory = ({ title, children }: SidebarCategoryProps) => {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<div className={classes.sidebarCategory}>
			<div
				className={classes.categoryHeader}
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className={classes.dividerVector}> </div>
				<span className={classes.categoryTitle}>{title}</span>
				<img
					src="/indicator.svg"
					alt="Toggle"
					className={`${classes.chevron} ${
						isExpanded ? classes.expanded : ""
					}`}
				/>
			</div>
			{isExpanded && (
				<div className={classes.categoryContent}>{children}</div>
			)}
		</div>
	);
};

const Sidebar = () => {
	const { id: guildId } = useParams<{ id: string }>();
	const { botId } = useParams<{ botId: string }>();

	const overviewItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${guildId}/home`,
			icon: "/home.svg",
			text: "Home",
			hasSwitch: false,
		},
		{
			path: `/dashboard/guild/${guildId}/insights`,
			icon: "/insights.svg",
			text: "Insights",
			hasSwitch: false,
		},
	];

	const managementItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${guildId}/main-settings`,
			icon: "/gear-icon-sidebar.svg",
			text: "Main settings",
			hasSwitch: false,
		},
		{
			path: `/dashboard/guild/${guildId}/logs`,
			icon: "/logs.svg",
			text: "Logs",
			hasSwitch: true,
		},
		{
			path: `/dashboard/guild/${guildId}/custombots`,
			icon: "/bot_icon.svg",
			text: "Custombots",
			hasSwitch: true,
			additionalPaths: [
				`/dashboard/guild/${guildId}/custombots/list`,
				`/dashboard/guild/${guildId}/custombots/manage/${botId}`,
			],
		},
	];

	const funItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${guildId}/economy`,
			icon: "/economy.svg",
			text: "Economy",
			hasSwitch: true,
		},
		{
			path: `/dashboard/guild/${guildId}/radio`,
			icon: "/radio.svg",
			text: "Radio",
			hasSwitch: true,
		},
		{
			path: `/dashboard/guild/${guildId}/ai`,
			icon: "/sparkles.svg",
			text: "AI",
			hasSwitch: true,
		},
	];
	return (
		<div className={classes.sidebar}>
			<SidebarCategory title="OVERVIEW">
				{overviewItems.map((item, index) => (
					<SidebarItem
						key={index}
						path={item.path}
						icon={item.icon}
						text={item.text}
						hasSwitch={item.hasSwitch}
						additionalPaths={item.additionalPaths}
					/>
				))}
			</SidebarCategory>

			<SidebarCategory title="MANAGEMENT">
				{managementItems.map((item, index) => (
					<SidebarItem
						key={index}
						path={item.path}
						icon={item.icon}
						text={item.text}
						hasSwitch={item.hasSwitch}
						additionalPaths={item.additionalPaths}
					/>
				))}
			</SidebarCategory>

			<SidebarCategory title="FUN">
				{funItems.map((item, index) => (
					<SidebarItem
						key={index}
						path={item.path}
						icon={item.icon}
						text={item.text}
						hasSwitch={item.hasSwitch}
						additionalPaths={item.additionalPaths}
					/>
				))}
			</SidebarCategory>
		</div>
	);
};

export default Sidebar;
