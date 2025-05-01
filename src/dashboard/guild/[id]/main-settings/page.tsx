import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./main-settings.module.css";
import Switch from "@/components/ui/inputs/switch";
import WelcomingTabs from "@/dashboard/guild/[id]/main-settings/tabs/welcoming-tabs";
export default function MainSettings() {
    return (
        <div>
            <Navbar />
            <Sidebar />

            <p className={classes.greetingsAndFarewell}>
                {" "}
                Greetings & Farewell
                <div className={classes.underlineVector}></div>
            </p>

            <Switch
                switchClassName={classes.switch}
                knobClassName={classes.knob}
            />

            <WelcomingTabs />
        </div>
    );
}
