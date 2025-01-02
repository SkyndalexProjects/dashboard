import Navbar from "../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../components/ui/navigation/sidebar";
import classes from "./home.module.css";
export default function Page() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={classes.container}>
                <div className={classes.featureRectangle}>
                    <div className={classes.textContainer}>
                        <p className={classes.featureText}> AI </p>
                        <p className={classes.featureSubtext}>
                            Set up AI features like chatbot channel, API keys and
                            more
                        </p>
                        <button className={classes.featureButton}>Setup</button>

                    </div>
                    <div className={classes.imgCircle}>
                        <img src="/sparkles.svg" alt="feature1" />
                    </div>
                </div>
                <div className={classes.featureRectangle}></div>
                <div className={classes.featureRectangle}></div>
                <div className={classes.featureRectangle}></div>
                <div className={classes.featureRectangle}></div>
                <div className={classes.featureRectangle}></div>
            </div>
        </div>
    );
}