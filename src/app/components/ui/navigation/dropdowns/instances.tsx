"use client";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
interface Custombot {
	id: number;
	userId: string;
	clientId: string;
	token: string;
	activity: string;
	status: string;
}

const InstancesDropdown = () => {
	const [custombots, setCustombots] = useState<Custombot[]>([]);

	// prisma not fully initialized yet

	// useEffect(() => {
	// 	const getCustombots = async () => {
	// 		const prisma = new PrismaClient();
	// 		const custombots = await prisma.custombots.findMany();
	// 		setCustombots(custombots as unknown as Custombot[]);
	// 	};

	// 	getCustombots();
	// }, []);

	return (
		<ul>
			<li className="dropdown">
				<p className="dropdown-toggle" data-toggle="dropdown">
					<Image src="/logo.ico" alt="logo" width={38} height={37} />{" "}
					Main instance
					<Image
						src="/dropdown.svg"
						alt="dropdown"
						width={38}
						height={37}
						className="dropdown-icon"
					/>{" "}
					<b className="caret"></b>
				</p>
				<ul className="dropdown-menu">
					{custombots && custombots.length > 0 ? (
						custombots.map((bot) => (
							<li key={bot.id}>{bot.clientId}</li>
						))
					) : (
						<li>No custom bots</li>
					)}
				</ul>
			</li>
		</ul>
	);
};

export default InstancesDropdown;
