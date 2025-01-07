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
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/economy.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> Economy </p>
						<p className={classes.featureSubtext}>
							Make your own economy system on guild
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
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/radio.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> Radio </p>
						<p className={classes.featureSubtext}>
							Listen to the radio from the entire world. Feel the
							entire radio.garden experience!
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
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/radio.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> Levels </p>
						<p className={classes.featureSubtext}>
							Reward your users. Monitor and increase activity on
							the guild
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
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/radio.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> Custombots </p>
						<p className={classes.featureSubtext}>
							Increase the number of settings on the server .Have
							your own branding. Don't let limits scare you.
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
				<div className={classes.container}>
					<div className={classes.imgContainer}>
						<img src="/radio.svg" alt="feature1" />
					</div>
					<div className={classes.textContainer}>
						<p className={classes.featureText}> SoonTM </p>
						<p className={classes.featureSubtext}>
							My bot is constantly supported and updated. Perhaps
							soon there will be more modules worth your
							attention.
						</p>
					</div>
					<button className={classes.featureButton}>
						Be patient!
						<img
							src="/button-arrow.svg"
							alt="arrow"
							className={classes.buttonArrow}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
