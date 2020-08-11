export default class Board{
    
    constructor(canvas, ctx, boardCoordinates, gameMargin){
        this.canvas = canvas;
        this.ctx = ctx;
        this.boardCoordinates = boardCoordinates
        // this.gameMargin = gameMargin
        this.positionCentersCoordinates = {
            0: [(boardCoordinates.XLine1 - boardCoordinates.XBorderLeft)/2 + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YLine1 - boardCoordinates.YBorderTop)/2 + canvas.offsetTop + gameMargin],

            1: [(boardCoordinates.XLine2 - boardCoordinates.XLine1)*(3/2) + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YLine1 - boardCoordinates.YBorderTop)/2 + canvas.offsetTop + gameMargin],

            2: [(boardCoordinates.XBorderRight - boardCoordinates.XLine2)*(5/2) + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YLine1 - boardCoordinates.YBorderTop)/2 + canvas.offsetTop + gameMargin],
            
            3: [(boardCoordinates.XLine1 - boardCoordinates.XBorderLeft)/2 + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YLine2 - boardCoordinates.YLine1)*(3/2) + canvas.offsetTop + gameMargin],

            4: [(boardCoordinates.XLine2 - boardCoordinates.XLine1)*(3/2) + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YLine2 - boardCoordinates.YLine1)*(3/2)  + canvas.offsetTop + gameMargin],

            5: [(boardCoordinates.XBorderRight - boardCoordinates.XLine2)*(5/2) + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YLine2 - boardCoordinates.YLine1)*(3/2) + canvas.offsetTop + gameMargin],

            6: [(boardCoordinates.XLine1 - boardCoordinates.XBorderLeft)/2 + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YBorderBottom - boardCoordinates.YLine2)*(5/2) + canvas.offsetTop + gameMargin],

            7: [(boardCoordinates.XLine2 - boardCoordinates.XLine1)*(3/2) + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YBorderBottom - boardCoordinates.YLine2)*(5/2) + canvas.offsetTop + gameMargin],

            8: [(boardCoordinates.XBorderRight - boardCoordinates.XLine2)*(5/2) + canvas.offsetTop + gameMargin, 
                (boardCoordinates.YBorderBottom - boardCoordinates.YLine2)*(5/2) + canvas.offsetTop + gameMargin]
        }
    }

    drawBoard(){
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        
        // Draw vertical lines
        this.ctx.moveTo( this.boardCoordinates.XLine1, this.boardCoordinates.YBorderTop );
        this.ctx.lineTo( this.boardCoordinates.XLine1, this.boardCoordinates.YBorderBottom );
        
        this.ctx.moveTo( this.boardCoordinates.XLine2, this.boardCoordinates.YBorderTop );
        this.ctx.lineTo( this.boardCoordinates.XLine2, this.boardCoordinates.YBorderBottom );

        
        // Draw horizontal lines
        this.ctx.moveTo( this.boardCoordinates.XBorderLeft, this.boardCoordinates.YLine1 );
        this.ctx.lineTo( this.boardCoordinates.XBorderRight, this.boardCoordinates.YLine1 );
        
        this.ctx.moveTo( this.boardCoordinates.XBorderLeft, this.boardCoordinates.YLine2 );
        this.ctx.lineTo( this.boardCoordinates.XBorderRight, this.boardCoordinates.YLine2 );

        this.ctx.stroke();
    }

    drawCross(position) {
        let x = this.positionCentersCoordinates[position][0]
        let y = this.positionCentersCoordinates[position][1]
        
        this.ctx.lineWidth = 20;
        this.ctx.beginPath();
    
        this.ctx.moveTo(x - 40, y - 40);
        this.ctx.lineTo(x + 40, y + 40);
    
        this.ctx.moveTo(x + 40, y - 40);
        this.ctx.lineTo(x - 40, y + 40);
        this.ctx.stroke();
    }
    
    drawCircle(position){
        let x = this.positionCentersCoordinates[position][0]
        let y = this.positionCentersCoordinates[position][1]

        this.ctx.lineWidth = 20;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 40, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawLine(start, end){
        this.ctx.lineWidth = 20;
        this.ctx.beginPath();
        this.ctx.moveTo(this.positionCentersCoordinates[start][0], this.positionCentersCoordinates[start][1]);
        this.ctx.lineTo(this.positionCentersCoordinates[end][0], this.positionCentersCoordinates[end][1]);
        this.ctx.stroke();
    }

    declareWinner(winningCombination, winner){
        this.writeGameResult(winner + " wins")
        this.drawLine(winningCombination[0], winningCombination[2])
    }

    declareTie(){
        this.writeGameResult("It's a tie")
    }

    writeGameResult(text){
        this.ctx.font = "40px Calibri";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(text, 60, 590);
    }

    initialize(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBoard();
    }
}