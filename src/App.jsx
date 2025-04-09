import './App.css'
import styles from "./App.module.css"

import { useContext, useEffect } from "react"
import { GameContext } from './store/GameContext'

import PlayerColumn from './components/PlayerColumn/PlayerColumn'

function App() {
    const {
        gameState, 
        addPlayer, 
        removePlayer, 
        changeTheme,
        resetGame
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
                    <button type='button'>Goal Score</button>
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
        </>
    )
}

export default App
