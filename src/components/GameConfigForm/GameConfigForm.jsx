import styles from "./GameConfigForm.module.css"
import { useContext } from "react"
import { GameContext } from "../../store/GameContext"
import { useState } from "react"


export default function GameConfigForm({onClose}){
    const {gameState, addPlayer, removePlayer, setMaxScore} = useContext(GameContext)

    const [newMaxScore, setNewMaxScore] = useState(gameState.maxScore)

    function handleSave(){
        setMaxScore({newMaxScore})
        onClose()
    }

    return <>             
        <label><h3>Number of Players</h3></label>
        <div className={styles["config-players-div"]}>
            <button 
                type="button" 
                onClick={removePlayer}
                className={gameState.players.length > 2 ? undefined : "disabled-button"}    
            >-</button>
            <p>{gameState.players.length}</p>
            <button type="button" onClick={addPlayer}>+</button>
        </div>
        
        <div>
            <label htmlFor={styles["max-score-input"]} className={styles["max-score-label"]}><h3>Max Score</h3></label>
            <input 
                type="number"
                id={styles["max-score-input"]}
                value={newMaxScore}
                onChange={(e) => setNewMaxScore(e.target.value)}></input>
        </div>
        <button type="button" onClick={handleSave}>Ok</button>
    </>
}
