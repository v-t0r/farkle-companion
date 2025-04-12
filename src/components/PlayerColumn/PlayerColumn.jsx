import RoundsHistory from "../RoundsHistory/RoundsHistory"
import styles from "./PlayerColumn.module.css"

import { useContext, useEffect, useRef, useState } from "react"
import { GameContext } from '../../store/GameContext'
import Modal from "../Modal/Modal"
import { AnimatePresence } from "motion/react"

export default function PlayerColumn({playerNumber}){

    const [modalVisibility, setModalVisibility] = useState(false)

    const {gameState, addPoints, finishRound, burstRound} = useContext(GameContext)
    const playerInfo = gameState.players[playerNumber]
    const isPlayerTurn = (gameState.playerTurn === playerNumber)
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

    return <><div className={styles["player-column"]}>
        <h2 onClick={() => setModalVisibility(true)} >{playerInfo.name}</h2>
        
        <RoundsHistory playerNumber={playerNumber} />

        <p id={styles["score"]}>{`Total: ${playerInfo.totalPoints}`}</p>
        
        <input 
            ref={inputRef} 
            type="number" 
            placeholder="0" 
            disabled={!isPlayerTurn} 
        />   

        <div className={styles["action-buttons"]}>
            <div>
                <button 
                    type="button" 
                    className={`${isPlayerTurn ? styles["add-button"] : "disabled-button"}`} 
                    onClick={handleAddPoints}
                    disabled={!isPlayerTurn}
                >Add</button>

                <button 
                    type="button" 
                    className={`${isPlayerTurn ? styles["finish-button"] : "disabled-button"}`} 
                    onClick={handleFinishRound}
                    disabled={!isPlayerTurn}
                >Finish</button>
            </div>
        
            <button 
                type="button" 
                className={`${isPlayerTurn ? styles["burst-button"] : "disabled-button"}`}  
                onClick={handleBurstRound}
                disabled={!isPlayerTurn}
            >Burst</button>

        </div>

        

    </div>
    
    <AnimatePresence>
        {modalVisibility && <Modal onEscape={() => setModalVisibility(false)}>
            <ChangePlayerNameForm playerNumber={playerNumber} onClose={() => setModalVisibility(false)} />
        </Modal>}
    </AnimatePresence>

    </>
}

function ChangePlayerNameForm({playerNumber, onClose}){
    const {gameState, changeName} = useContext(GameContext)
    const [newName, setNewName] = useState(gameState.players[playerNumber].name)
    
    function handleChangeName(){
        changeName({newName: newName.trim(), playerNumber})
        onClose()
    }

    return <div className={styles["name-modal"]}>
        <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
        ></input>
        <button 
            type="button" 
            onClick={handleChangeName}
            disabled={newName.trim() == ""}
            className={newName.trim() == "" ? "disabled-button" : undefined}    
        >Ok</button>
    </div>
}