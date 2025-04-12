import styles from "./ThemeToggle.module.css"
import { motion } from "motion/react"


export default function ThemeToggle({currentTheme, onChange}){
    return <div className={styles["toggle-container"]}>
        <motion.div 
            animate={{x: currentTheme == "light" ? "0px" : "22px"}} 
            className={styles["toggle-indicator"]}
            onClick={onChange}    
        ></motion.div>
        <div className={`${styles["light-theme-div"]} ${styles["theme-icon-div"]}`}>
            <span class="material-icons" id={styles["light-icon"]}>light_mode</span>
        </div>

        <div className={`${styles["dark-theme-div"]} ${styles["theme-icon-div"]}`}>
            <span className={`material-icons`} id={styles["dark-icon"]}>brightness_3</span>
        </div>
    </div>
}