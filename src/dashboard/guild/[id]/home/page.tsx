import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";
import classes from "./home.module.css";
export default function Page() {
	return (
		<div>
			<Navbar />
			<Sidebar />
			<div className={classes.gridContainer}>
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/sparkles.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> AI </p>
						<p className={classes.featureSubtext}>
							Set up AI features like chatbot channel, API keys
							and more
						</p>
					</div>
					<button className={classes.featureButton}>
						Setup
						<img
							src="/button-arrow.svg"
							alt="arrow"
							className={classes.buttonArrow}
						/>
					</button>
				</div>
				<div className={classes.container}></div>
				<div className={classes.container}></div>
				<div className={classes.container}></div>
				<div className={classes.container}></div>
				<div className={classes.container}></div>
			</div>
		</div>
	);
}
