import './App.css'
import styles from "./App.module.css"

import { useContext, useEffect, useState } from "react"
import { GameContext } from './store/GameContext'

import PlayerColumn from './components/PlayerColumn/PlayerColumn'
import Modal from './components/Modal/Modal'

function App() {

    const [modalVisibility, setModalVisibility] = useState(false)

    const {
        gameState, 
        addPlayer, 
        removePlayer, 
        changeTheme,
        resetGame,
        setMaxScore
    } = useContext(GameContext)

    useEffect(() => {
        document.getElementById("body").setAttribute("data-theme", gameState.theme)
    }, [gameState.theme])

    return (<>
            <header><h1>Farkle Companion</h1></header>
            <main>
                <div className={styles["config-buttons-div"]}>
                    <button type='button' onClick={addPlayer} >Add Player</button>
                    <button type='button' onClick={removePlayer} >Remove Player</button>
                    <button type='button' onClick={() => setModalVisibility(true)}>Max Score</button>
                    <button type='button' onClick={resetGame}>Reset</button>
                    <button type="button" onClick={changeTheme}>Theme</button>
                </div>
                
                <div className={styles["players-div"]}>
                    {gameState.players.map(player => {
                        return <PlayerColumn 
                            key={player.number} 
                            playerName={player.name} 
                            playerNumber={player.number}
                        />
                    })}
                </div>
            </main>

            {modalVisibility && <Modal onEscape={() => setModalVisibility(false)} >
                <div className={styles["score-modal"]}>
                    <div>
                        <label>Max Score</label>
                        <input 
                            type="number"
                            value={gameState.goalScore}
                            onChange={(e) => setMaxScore({newMaxScore: e.target.value})}></input>
                    </div>
                    
                    <button type='button' onClick={() => setModalVisibility(false)}>Ok</button>
                </div>
                
            </Modal>}
            

        </>
    )
}

export default App
