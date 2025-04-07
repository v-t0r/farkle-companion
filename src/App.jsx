import './App.css'
import styles from "./App.module.css"

import { useContext } from "react"
import { GameContext } from './store/GameContext'

import PlayerColumn from './components/PlayerColumn/PlayerColumn'

function App() {
    const {gameState, addPlayer, removePlayer} = useContext(GameContext)
    return (<>
            <header><h1>Farkle Companion</h1></header>
            <main>
                <div className={styles["config-buttons-div"]}>
                    <button type='button' onClick={addPlayer} >Add player</button>
                    <button type='button' onClick={removePlayer} >Remove player</button>
                    <button type='button'>Winner Score</button>
                    <button type='button'>Reset</button>
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
