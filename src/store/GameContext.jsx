/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer} from "react"

const initalStateValue = {
    players: [
        {
            name: "Player 1", 
            number: 0,
            totalPoints: 0,
            currentRound: [],
            history: []
        },
        {
            name: "Player 2", 
            number: 1,
            totalPoints: 0,
            currentRound: [],
            history: []
        }
    ],
    goalScore: 4000,
    showBursted: true,
    playerTurn: 0,
    theme: "light"
}

const defaultContextValue = {
    gameState: initalStateValue,
    addPlayer: () => {},
    removePlayer: () => {},
    addPoints: () => {},
    finishRound: () => {},
    burstRound: () => {},
    changeTheme: () => {},
    resetGame: () => {},
    changeName: () => {},
    setMaxScore: () => {}
}

export const GameContext = createContext({defaultContextValue})

function gameStateReducer(state, action) {
    switch(action.type){
        case "ADD_PLAYER": {
            return {
                ...state,
                players: [
                    ...state.players,
                    {
                        name: `Player ${state.players.length + 1}`,
                        number: state.players.length,
                        totalPoints: 0,
                        currentRound: [],
                        history: []
                    }
                ]
            }
        }
        
        case "REMOVE_PLAYER": {
            if(state.players.length <= 2) return state    
            
            const newState = structuredClone(state)

            if(state.playerTurn === state.players.length-1){
                newState.playerTurn = 0
            }

            newState.players = state.players.slice(0, state.players.length-1)

            return newState
        }

        case "ADD_POINTS": { 
            const newState = structuredClone(state)
            const player = newState.players[action.payload.playerNumber]
            
            player.currentRound = [ ...player.currentRound, +action.payload.points]
            newState.players[action.payload.playerNumber] = player
            
            return newState
        }

        case "FINISH_ROUND": {
            const newState = structuredClone(state)
            const player = newState.players[action.payload.playerNumber]
            
            let roundHistory = player.currentRound 
            //só adiciona os points se forem diferentes de zero
            if(+action.payload.points !== 0 ){
                roundHistory = [...roundHistory, +action.payload.points]
            }

            player.history = [ ...player.history, {
                roundHistory: roundHistory,
                bursted: false
            }]

            player.totalPoints += roundHistory.reduce((acc, current) => acc + current, 0 )
            player.currentRound = []
            newState.players[action.payload.playerNumber] = player

            newState.playerTurn = player.number === (state.players.length - 1) ? 0 : player.number + 1

            return newState
        }

        case "BURST_ROUND": {
            const newState = structuredClone(state)
            const player = newState.players[action.payload.playerNumber]
            
            //burst já na primeira jogada
            let roundHistory = player.currentRound.length > 0 ? player.currentRound : [0]

            player.history = [ ...player.history, {
                roundHistory: roundHistory,
                bursted: true
            }]

            player.currentRound = []
            newState.players[action.payload.playerNumber] = player

            newState.playerTurn = player.number === (state.players.length - 1) ? 0 : player.number + 1
            
            return newState
        }

        case "CHANGE_THEME": {
            const newState = structuredClone(state)
            console.log(state)
            const newTheme = state.theme === "light" ? "dark" : "light"

            newState.theme = newTheme

            return newState
        }

        case "RESET_GAME_STATE": {
            const newState = structuredClone(state)
            
            for (var index in newState.players){
                newState.players[index] = {
                    name: newState.players[index].name, 
                    number: newState.players[index].number,
                    totalPoints: 0,
                    currentRound: [],
                    history: []
                }
            }

            newState.playerTurn = 0

            return newState
        }

        case "CHANGE_NAME": {
            const newState = structuredClone(state)
            
            newState.players[action.payload.playerNumber].name = action.payload.newName
            return newState
        }

        case "SET_MAX_SCORE": {
            return {...state, goalScore: action.payload.newMaxScore}
        }
    }

    return state
}

export default function GameContextProvider ({children}) {
    const [ gameState, dispatch ] = useReducer(gameStateReducer, initalStateValue)

    function addPlayer(){
        dispatch({
            type: "ADD_PLAYER"
        })
    }

    function removePlayer(){
        dispatch({
            type: "REMOVE_PLAYER"
        })
    }

    function addPoints(payload){
        dispatch({
            type: "ADD_POINTS",
            payload: payload
        })
    }

    function finishRound(payload){
        dispatch({
           type: "FINISH_ROUND",
           payload: payload 
        })
    }

    function burstRound(payload){
        dispatch({
            type: "BURST_ROUND",
            payload: payload
        })
    }

    function changeTheme(){
        dispatch({
            type: "CHANGE_THEME",
        })
    }

    function resetGame(){
        dispatch({
            type: "RESET_GAME_STATE"
        })
    }

    function changeName(payload){
        dispatch({
            type: "CHANGE_NAME",
            payload: payload
        })
    }

    function setMaxScore(payload){
        dispatch({
            type: "SET_MAX_SCORE",
            payload: payload
        })
    }

    const ctxValue = {
        gameState,
        addPlayer,
        removePlayer,
        addPoints,
        finishRound,
        burstRound,
        changeTheme,
        resetGame,
        changeName,
        setMaxScore
    }

    return <GameContext.Provider value={ctxValue}>
        {children}
    </GameContext.Provider>
}
