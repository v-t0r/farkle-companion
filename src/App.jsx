import './App.css'
import styles from "./App.module.css"

import { useContext, useEffect, useState } from "react"
import { GameContext } from './store/GameContext'

import PlayerColumn from './components/PlayerColumn/PlayerColumn'
import Modal from './components/Modal/Modal'
import { AnimatePresence } from 'motion/react'

import { winnerPlayer } from "./utils/functions"
import GameConfigForm from './components/GameConfigForm/GameConfigForm'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'

function App() {

    const [modalState, setModalState] = useState({
        gameOverModal: false,
        gameConfigModal: false,
        winnerPlayers: []
    })

    const {
        gameState, 
        changeTheme,
        resetGame,
    } = useContext(GameContext)

    useEffect(() => {
        document.getElementById("body").setAttribute("data-theme", gameState.theme)
    }, [gameState.theme])

    useEffect(() => {
        const winnerPlayers = winnerPlayer(gameState.players, gameState.maxScore)
        if(winnerPlayers !== -1){
            setModalState(prev => ({...prev, gameOverModal: true, winnerPlayers}))
        }
    }, [gameState.players, gameState.maxScore])

    return (<>
            <header><h1>Farkle Companion</h1></header>
            <main>
                <div className={styles["buttons-div"]}>
                    <div className={styles["config-buttons-div"]} >
                        <button 
                            type='button' 
                            onClick={() => setModalState(prev => ({...prev, gameConfigModal: true}))}
                            className={`${styles["config-button"]} ${gameState.isNewGame ? undefined : "disabled-button"}`}
                            disabled={!gameState.isNewGame}
                        >
                            <span class="material-icons">settings</span>
                        </button>
                        <button type='button' onClick={resetGame}>Reset</button>
                    </div>
                    
                    {/* <button type="button" onClick={changeTheme}>Theme</button> */}
                    <ThemeToggle onChange={changeTheme} currentTheme={gameState.theme} />
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

            {/* Modais */}
            <AnimatePresence>
                {modalState.gameOverModal && <Modal onEscape={() => setModalState(prev => ({...prev, gameOverModal: false}))} >
                    <div className={styles["modal"]}>
                        
                        {modalState.winnerPlayers.length === 1 ? <h3>We have a winner!</h3> : <h3>We have a tie!</h3>}
                        
                        {modalState.winnerPlayers.map(winner => {
                            return <h2>{winner.name}</h2>
                        })}
                        
                        <button 
                            type='button' 
                            onClick={() => {resetGame(); setModalState(prev => ({...prev, gameOverModal: false}))}}
                        >Reset</button>
                    </div>
                    
                </Modal>}

                {modalState.gameConfigModal && <Modal onEscape={() => setModalState(prev => ({...prev, gameConfigModal: false}))} >
                    <div className={styles["modal"]}>
                        <GameConfigForm onClose={() => setModalState(prev => ({...prev, gameConfigModal: false}))} />
                    </div>
                    
                </Modal>}
            </AnimatePresence>
        </>
    )
}

export default App
