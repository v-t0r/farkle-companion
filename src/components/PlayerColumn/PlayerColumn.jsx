import RoundsHistory from "../RoundsHistory/RoundsHistory"
import styles from "./PlayerColumn.module.css"

import { useContext, useEffect, useRef } from "react"
import { GameContext } from '../../store/GameContext'

export default function PlayerColumn({playerNumber}){

    const {gameState, addPoints, finishRound, burstRound} = useContext(GameContext)

    const playerInfo = gameState.players[playerNumber]
    const inputRef = useRef(null)


    useEffect(() => {

        inputRef.current.addEventListener("focus", () => {
            setTimeout(() => {
                inputRef.current.scrollIntoView({behavior: "smooth", block: "center"})
            }, 300)
            
        })
    }, [inputRef])

    function handleAddPoints(){
        const points = inputRef.current.value
        
        if(+points <= 0 || points === "") return 
        
        addPoints({playerNumber, points})
        inputRef.current.value = ""
    }

    function handleFinishRound(){
        const points = inputRef.current.value

        //nao pode finalizar sem marcar ponto
        if(
            +points < 0 ||
            (+points === 0 && playerInfo.currentRound.length === 0)
        ) return

        finishRound({playerNumber, points})
         inputRef.current.value = ""
    }

    function handleBurstRound(){
        burstRound({playerNumber})
         inputRef.current.value = ""
    }

    return <div className={styles["player-column"]}>
        <h2>{playerInfo.name}</h2>
        
        <RoundsHistory playerNumber={playerNumber} />

        <p id={styles["score"]}>{`Total: ${playerInfo.totalPoints}`}</p>
        
        <input ref={inputRef} type="number" placeholder="0" />   

        <div className={styles["action-buttons"]}>
            <div>
                <button 
                    type="button" 
                    id={styles["add-button"]} 
                    onClick={handleAddPoints}
                >Add</button>

                <button 
                    type="button" 
                    id={styles["finish-button"]}
                    onClick={handleFinishRound}
                >Finish</button>
            </div>
        
            <button 
                type="button" 
                id={styles["burst-button"]} 
                onClick={handleBurstRound}
            >Burst</button>
        </div>

    </div>
}