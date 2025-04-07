import styles from "./RoundsHistory.module.css"

import { useContext } from "react"
import { GameContext } from "../../store/GameContext"

export default function RoundsHistory({playerNumber}){
    const { gameState } = useContext(GameContext)
    const player = gameState.players[playerNumber]
    
    return <ul className={styles["rounds-list"]}>
        
        {player.history.map((roundHistory, index) => {
            return <div key={index} className={`${styles["round-div"]} ${roundHistory.bursted ? styles["bursted-round"] : styles["finished-round"]}`}>
                
                {(gameState.showBursted || !roundHistory.burst) && roundHistory.roundHistory.map((points, index) => {
                    return <li key={index}>{points}</li>
                })
                
            }
            </div>
        })}

        {player.currentRound.length !== 0 && <div className={styles["round-div"]}>
            {player.currentRound.map((points, index) => {
                return <li key={index}>{points}</li>
            })}
        </div>}
        
    </ul>
}