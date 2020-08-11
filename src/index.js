import Player from './player.js'
import Game from './game.js'
import Board from './board.js';


let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

const GAMEHEIGHT = canvas.height;
const GAMEWIDTH = canvas.width;
const GAMEMARGIN = 50;

let boardCoordinates = {
    XBorderLeft: GAMEMARGIN + canvas.offsetLeft,
    XBorderRight: GAMEWIDTH + canvas.offsetLeft - GAMEMARGIN,
    XLine1: (1/3) * (GAMEWIDTH - GAMEMARGIN*2) + canvas.offsetLeft + GAMEMARGIN,
    XLine2: (2/3) * (GAMEWIDTH - GAMEMARGIN*2) + canvas.offsetLeft + GAMEMARGIN,
    YBorderTop: GAMEMARGIN + canvas.offsetTop,
    YBorderBottom: GAMEWIDTH + canvas.offsetTop - GAMEMARGIN,
    YLine1: (1/3) * (GAMEHEIGHT - GAMEMARGIN*2) + canvas.offsetTop + GAMEMARGIN,
    YLine2: (2/3) * (GAMEHEIGHT - GAMEMARGIN*2) + canvas.offsetTop + GAMEMARGIN,
}

const WINNINGCOMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]];

let ongoingGame = false;
let board = new Board(canvas, ctx, boardCoordinates, GAMEMARGIN)
let game;
let player1;
let player2;
board.initialize()

canvas.addEventListener('click', function(event){

    // clientLeft returns the # of pixels of the left border of the element
    // offsetLeft returns the # of pixels by which the element is offset on the left
    
    var x = event.pageX - canvas.offsetLeft - canvas.clientLeft,
        y = event.pageY - canvas.offsetTop - canvas.clientTop;
        
    if (ongoingGame === false){
        player1 = new Player("X", false, WINNINGCOMBINATIONS);
        player2 = new Player("O", true, WINNINGCOMBINATIONS);
        game = new Game(player1, player2, WINNINGCOMBINATIONS);
        ongoingGame = true;
        game.currentPlayer = player1;
    }else{
        let gameStatus = game.getStatus()
        if(gameStatus === 'win'){
            ongoingGame = false;
            board.initialize()
        }else if(gameStatus === 'tie'){
            ongoingGame = false;
            board.initialize()
        }else{
            null;
        }
    }

    if(game.currentPlayer.isAI === false){
        if (x <= (boardCoordinates.XBorderRight) & y <= (boardCoordinates.YBorderBottom)){
            if(x > boardCoordinates.XLine2){
                if (y > boardCoordinates.YLine2){
                    game.makeMove(8, board); 
                }else if (y > boardCoordinates.YLine1){
                    game.makeMove(5, board); 
                }else if (y > boardCoordinates.YBorderTop){
                    game.makeMove(2, board); 
                };
            }else if (x > boardCoordinates.XLine1){
                if (y > boardCoordinates.YLine2){
                    game.makeMove(7, board); 
                }else if (y > boardCoordinates.YLine1){
                    game.makeMove(4, board); 
                }else if (y > boardCoordinates.YBorderTop){
                    game.makeMove(1, board); 
                };
            }else if (x > boardCoordinates.XBorderLeft){
                if (y > boardCoordinates.YLine2){
                    game.makeMove(6, board); 
                }else if (y > boardCoordinates.YLine1){
                    game.makeMove(3, board); 
                }else if (y > boardCoordinates.YBorderTop){
                    game.makeMove(0, board); 
                };
            };
        };
    }else{
        game.makeMove(game.currentPlayer.move(game), board);
    }
    
})
