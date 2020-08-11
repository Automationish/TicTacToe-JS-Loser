export default class Game{
    constructor(player1, player2, wins){
        this.state  = ["", "", "", "", "", "", "", "", ""];
        this.winner;
        this.currentPlayer;
        this.gameStatus = "incomplete"
        this.winningCombination;
        this.player1 = player1
        this.player2 = player2
        this.wins = wins;
    }

    getStatus(){

        this.wins.forEach(function(win){

            if(this.state[win[0]] === this.state[win[1]] && this.state[win[1]] === this.state[win[2]] && this.state[win[0]] !==""){
                this.gameStatus = "win";
                this.winningCombination = win;
            }
        }.bind(this))

        if(this.gameStatus === "incomplete"){
            if(!this.state.includes("")){
                this.gameStatus = "tie";
            }
        }
        return this.gameStatus;
    }

    sleep = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      

    async makeMove(position, board){
        if(this.state[position]==="" && this.gameStatus === 'incomplete'){
            this.state[position] = this.currentPlayer.token;
            this.gameStatus = this.getStatus();
            this.currentPlayer.token === "X" ? board.drawCross(position) : board.drawCircle(position);
            
            if(this.gameStatus === 'win'){
                board.declareWinner(this.winningCombination, this.currentPlayer.token);
                this.winner = this.currentPlayer;
            }else if(this.gameStatus === 'tie'){
                board.declareTie();
            }else{
                this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1
                if(this.currentPlayer.isAI){
                    await this.sleep(1000)
                    this.makeMove(this.currentPlayer.move(this), board)
                }
            }
        }

        return this.gameStatus;
    }

}