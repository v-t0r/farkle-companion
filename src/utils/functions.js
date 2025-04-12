function isEveryoneInTheSameRound(players){
    const playerZeroRound = players[0].history.length

    for (const player of players) {
        if(player.history.length !== playerZeroRound) return false
    }

    return true
}

export function winnerPlayer(players, maxScore) { 

    //rounds nao sincronizados
    if (!isEveryoneInTheSameRound(players)) return -1
    
    const highestPlayers = players
        .toSorted((playerA, playerB) => playerB.totalPoints - playerA.totalPoints)
        .filter(player => player.totalPoints === players[0].totalPoints)
    
    //ngm ganhou ainda
    if(highestPlayers[0].totalPoints < maxScore) return -1
    
    return highestPlayers
}


