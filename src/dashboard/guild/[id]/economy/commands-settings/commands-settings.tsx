import { useState, useMemo } from "react";
import classes from "./commands-settings.module.css";
import InputType from "@/components/ui/inputs/input";
import Switch from "@/components/ui/inputs/switch";
import CreateReplyModal from "@/dashboard/guild/[id]/economy/commands-settings/modals/CreateReply";
import React from "react";
const EconomyCommandsSettings = () => {
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
			<div className={`${isModalOpen ? classes.blurBackground : ""}`}>
				<div className={classes.cooldownSetting}>
					<p className={classes.cooldownTitle}>Cooldown</p>

					<div className={classes.cooldownOverlay}>
						<InputType
							onChange={handleCooldownChange}
							placeholder="30s"
							placeholderLogoClassName={classes.placeholder}
							className={classes.input}
							type="text"
						/>
					</div>
					<div className={classes.chanceOverlay}>
						<p className={classes.chanceTitle}>Chance</p>

						<InputType
							onChange={handleCooldownChange}
							placeholder="30s"
							placeholderLogoClassName={classes.placeholder}
							className={classes.input}
							type="text"
						/>
						<div className={classes.hint}>
							<img
								src={"/hint.svg"}
								alt={"hint"}
								width={"26px"}
								height={"26px"}
							/>
							<p className={classes.hintTitle}> Chance of win </p>
						</div>
					</div>
					<div className={classes.payoutOverlay}>
						<p className={classes.payoutTitle}>Payout</p>

						<div className={classes.inputs}>
							<InputType
								onChange={handleCooldownChange}
								placeholder="min"
								placeholderLogoClassName={classes.placeholder}
								className={classes.input}
								type="text"
							/>
							<InputType
								onChange={handleCooldownChange}
								placeholder="max"
								placeholderLogoClassName={classes.placeholder}
								className={classes.input}
								type="text"
							/>
						</div>
					</div>
					<div className={classes.additionalSettings}>
						<p className={classes.additionalSettingsTitle}>
							Additional settings
						</p>

						<div className={classes.defaultReplies}>
							<Switch
								switchClassName={classes.switch}
								knobClassName={classes.knob}
							/>
							<p className={classes.defaultRepliesTitle}>
								{" "}
								Use default replies
							</p>
						</div>
					</div>
					<div className={`${classes.customReplies}`}>
						<p className={classes.customRepliesTitle}>
							Custom replies
						</p>

						<button
							className={classes.createReplyButton}
							onClick={openModal}
						>
							<img
								src="/plus.svg"
								alt="plus.svg"
								width={"21px"}
								height={"21px"}
							/>
							<p>Create reply</p>
						</button>
					</div>

					<div className={classes.repliesTable}>
						<input
							type="text"
							placeholder="Search replies"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className={classes.searchInput}
						/>

						<div className={classes.repliesHeader}>
							<p className={classes.columnTitleLeft}>Added by</p>
							<p className={classes.columnTitleRight}>Reply</p>
						</div>

						<div className={classes.repliesList}>
							{filteredReplies.map((item) => (
								<div className={classes.replyRow} key={item.id}>
									<div className={classes.userInfo}>
										<img
											src={
												item.avatarURL ||
												"/default-avatar.png"
											}
											alt="avatar"
											className={classes.avatar}
										/>
										<div>
											<div className={classes.username}>
												{item.addedBy}
											</div>
											<div className={classes.userRole}>
												Staff
											</div>
										</div>
									</div>
									<div className={classes.replyWrap}>
										<div className={classes.replyContent}>
											<span className={classes.replyText}>
												{item.reply.length > 65
													? `${item.reply.substring(
															1,
															65,
														)} [...]`
													: item.reply}
												<a
													href={`/reply/${item.id}`}
													className={classes.viewLink}
												>
													View
												</a>
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<CreateReplyModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
}
export default EconomyCommandsSettings;
