import { useState, useMemo } from "react";
import classes from "./commands-settings.module.css";
import InputType from "@/components/ui/inputs/input";
import Switch from "@/components/ui/inputs/switch";
import CreateReplyModal from "@/dashboard/guild/[id]/economy/commands-settings/modals/CreateReply";
import React from "react";
const CommandsTabs = () => {
	const [activeTab, setActiveTab] = useState("Work");
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};
	const tabs = [
		"Work",
		"Crime",
		"Slut",
		"Rob",
		"Roulette",
		"Blackjack",
		"SlotMachine",
	];

	return (
		<div>
			<div className={classes.tabsContainer}>
				{tabs.map((tab) => (
					<button
						key={tab}
						className={
							activeTab === tab
								? classes.activeTab
								: classes.inactiveTab
						}
						onClick={() => handleTabClick(tab)}
					>
						{tab}
					</button>
				))}
			</div>

			<div className={classes.tabContent}>
				<CommandSettings cmd={activeTab} />
			</div>
		</div>
	);
};
interface CommandSettingsProps {
	cmd: string;
}
// TODO: cmd handling

export function CommandSettings({ cmd }: CommandSettingsProps) {
	const [, setCooldown] = useState("Work");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const initialData = [
		{
			id: 1,
			addedBy: "korrumz2",
			reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas",
			avatarURL:
				"https://cdn.discordapp.com/avatars/817883855310684180/29bf6e0eb3509d4c4abd024513f74150.png",
		},
		{
			id: 2,
			addedBy: "cyberl1",
			reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas",
			avatarURL:
				"https://cdn.discordapp.com/avatars/682572949219180547/a_2ef2ec825184268dfc4a5bc843e8dbb4.png",
		},
		{
			id: 3,
			addedBy: "c82",
			reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas",
			avatarURL:
				"https://cdn.discordapp.com/avatars/554407665401593862/a_2f31017031379a688110a13ffd7ae586.png",
		},
		{
			id: 4,
			addedBy: "minerpl",
			reply: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas",
			avatarURL:
				"https://cdn.discordapp.com/avatars/791077984395591720/a_c47d13fcc56f3c88ec0349102606598d.gif?size=1024",
		},
	];
	const [searchTerm, setSearchTerm] = useState("");

	const filteredReplies = useMemo(() => {
		if (!searchTerm.trim()) return initialData;
		const term = searchTerm.toLowerCase();
		return initialData.filter(
			(r) =>
				r.addedBy.toLowerCase().includes(term) ||
				r.reply.toLowerCase().includes(term),
		);
	}, [searchTerm]);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleCooldownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCooldown(e.target.value);
	};

	return (
		<div>
			<Table cmd={cmd} filteredReplies={filteredReplies} />
		</div>
	);
}
interface CommandSettingsProps {
	cmd: string;
	filteredReplies?: {
		id: number;
		addedBy: string;
		reply: string;
		avatarURL: string;
	}[];
}
function Table({
	cmd,
	filteredReplies,
}: {
	cmd: string;
	filteredReplies: {
		id: number;
		addedBy: string;
		reply: string;
		avatarURL: string;
	}[];
}) {
	return (
		<div>
			<table className={classes.table}>
				<thead>
					<tr>
						<th className={classes.tableHeader}>Added by</th>
						<th className={classes.tableHeader}>Reply</th>
						<th className={classes.tableHeader}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredReplies &&
						filteredReplies.map((reply) => (
							<tr key={reply.id} className={classes.tableRow}>
								<td>
									<div className={classes.userInfo}>
										<img
											src={reply.avatarURL}
											alt={reply.addedBy}
											className={classes.avatar}
										/>
										<span className={classes.author}>
											{reply.addedBy}
										</span>
									</div>
								</td>
								<td className={classes.reply}>{reply.reply}</td>
								<td>
									<div className={classes.actionButtons}>
										<button
											className={
												classes.listItemActionButton
											}
										>
											<img
												src="/edit-button.svg"
												alt="Edit"
											/>
										</button>
										<button
											className={
												classes.listItemActionButton
											}
										>
											<img src="/trash.svg" alt="Trash" />
										</button>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
export default CommandsTabs;
