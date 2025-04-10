import styles from "./Modal.module.css"

import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion } from "motion/react"

export default function Modal({ children, onEscape}) {
    const dialog = useRef()

    useEffect(() => {
        const modal = dialog.current
        modal.showModal()

        //closes when unmounted
        return () => {
            modal.close()
        }
    })

    return createPortal(
        <motion.dialog
            ref={dialog}
            className={styles["modal"]}
            onCancel={onEscape}
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, y: -30}}
            layout
            transition={{type: "spring", bounce: 0.5, duration: 0.5}}
        >
            {children}
        </motion.dialog>,
        document.getElementById("modal")
    )
}