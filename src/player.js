export default class Player{
    constructor(token, isAI, wins){
        this.token = token;
        this.isAI = isAI;
        this.wins = wins
    }

    getStateStatus(gameState){
        let gameStatus  = "incomplete"
        this.wins.forEach(function(win){
            if(gameState[win[0]] === gameState[win[1]] && gameState[win[1]] === gameState[win[2]] && gameState[win[0]] !==""){
                gameStatus = "win";
            }
        }.bind(this))

        if(gameStatus === "incomplete" && !gameState.includes("")){
            gameStatus = "tie";
        }
        return gameStatus;
    }

    move(game){
        let gameStateCopy = game.state
        let bestMove = null;
        let bestScore = - Infinity;
        
        game.state.forEach( function(position, index){
            if(position === ""){
                gameStateCopy[index] = this.token;
                    let score = this.minimax(gameStateCopy, 0, false)
                    if (score > bestScore){
                        bestScore = score;
                        bestMove = index;
                    } 
                    gameStateCopy[index] = ""
            }
        }.bind(this))
        return bestMove;
    }


    minimax(gameStateCopy, depth, isMaximizing){
        let gameStatus = this.getStateStatus(gameStateCopy)
        let retrunedValue;
        if(gameStatus === 'win'){
            retrunedValue = isMaximizing ? 10 : -10 ;
            return retrunedValue;
        }else if(gameStatus === 'tie'){
            retrunedValue = 0;
            return retrunedValue;
        }
        
        let bestScore = isMaximizing ? -Infinity : +Infinity;
        let opponentToken = this.token === "X" ? "O" : "X"
        
        gameStateCopy.forEach(function(position, index){
            if(position === ""){
                gameStateCopy[index] = isMaximizing ? this.token : opponentToken;
                let score = this.minimax(gameStateCopy, depth + 1, !isMaximizing)   
                gameStateCopy[index] = ""
                bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
            }
        }.bind(this))
        return bestScore;
        
        

    }














    //  OLD STUFF

    // move(gameState){
    //     let gameStateCopy = gameState
    //     let bestMove, playedToken, gameStatus, score;
    //     playedToken = isMaximizing ? "X" : "O"
    //     opponentToken = player.token === "X" ? "X" : "O";
    //     gameStateCopy.forEach((position, index) => {
    //         if (position === ""){
    //             bestMove = index;
    //             gameStateCopy[index] = playedToken;
    //             gameStatus = this.game.getStatus(gameStateCopy)
    //             if (gameStatus === 'win'){
    //                 if(playedToken === this.token){
    //                     score = 1;
    //                 }else{
    //                     score = -1;
    //                 }
    //             }else if(gameStatus === "tie"){
    //                 score = 0;
    //             }else{
    //                 this.move(gameStateCopy)
    //             }

    //         }
    //     });
    //     return bestMove;
    // }

    // minimax(gameState, depth, isMaximizing){

    // }

}