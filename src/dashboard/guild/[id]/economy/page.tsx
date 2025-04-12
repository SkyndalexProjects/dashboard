import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./economy.module.css";

export default function Economy() {
    return (
        <div>
            <Navbar />
            <Sidebar />

            <p className={classes.moneySettings}>
                {" "}
                Money settings{" "}
                <svg
                    width="185"
                    height="4"
                    viewBox="0 0 185 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        flexShrink: 0,
                        strokeWidth: 4,
                        stroke: "#275EE7",
                    }}
                    className={classes.sectionTitleVector}
                >
                    <line x1="0" y1="2" x2="185" y2="2" />
                </svg>
            </p>
        </div>
    );
}
