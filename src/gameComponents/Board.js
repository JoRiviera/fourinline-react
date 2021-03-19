import React, { Component } from 'react';
import { Column } from './Column';

export class Board extends Component {
    constructor(props) {
        super(props);
        let board = Array(props.width).fill(null);
        for (let i = 0; i < props.width; i++){
            board[i] = Array(props.height).fill(null);
        }
        board.forEach((ele) => ele = Array(props.height).fill(null));

        this.state = {
            board: board,
            redPlayerTurn: true,
            winner: null,
            scoreRedPlayer: 0,
            scoreYellowPlayer: 0,
        };
    };

    handleClick(i) {
        console.log("click on column: " + i);
        let board = this.state.board;
        let column = board[i];
        const redPlayerTurn = this.state.redPlayerTurn;
        let winner = this.state.winner;
        if (column[column.length - 1] !== null || winner) {
            // Full column, nothing happens
            return;
        } else {
            // Process the move
            const tileLine = column.indexOf(null);
            console.log("tile dropped in line " + tileLine + " column " + i);
            column[tileLine] = redPlayerTurn ? 'R' : 'Y';
            board[i] = column;
            const score = scoreWithMove(board, i, tileLine);
            let scoreRedPlayer = this.state.scoreRedPlayer;
            let scoreYellowPlayer = this.state.scoreYellowPlayer;
            winner = score > 0 ? (redPlayerTurn ? 'R' : 'Y' ) : null;
            if (winner) {
                scoreRedPlayer +=  redPlayerTurn ? score : 0;
                scoreYellowPlayer += !redPlayerTurn ? score : 0;
            }
            
            this.setState({
                board: board,
                redPlayerTurn: !redPlayerTurn,
                winner: winner,
                scoreRedPlayer: scoreRedPlayer,
                scoreYellowPlayer: scoreYellowPlayer,
            });
        }
    };

    render() {
        const board = this.state.board;
        const height = this.props.height;
        const columns = board.map((column, key) => {
        const index = key;
            return <Column
                        key={index}
                        height={height}
                        content={column}
                        onClick={() => this.handleClick(index)}
                    />
        });
        if(this.state.winner) {
            // redplayerTurn has been switched after the move that makes a winner
            window.alert(`${this.state.redPlayerTurn ? "Yellow" : "Red"} Player wins and scores ${this.state.redPlayerTurn ? this.state.scoreYellowPlayer : this.state.scoreRedPlayer} points !`)
        }
        
        return (
            <div className="board">
                {columns}
            </div>
        );
    }
}
// -------------- FROM col i line j

const MINIMUM_LINE_TO_SCORE = 4;

function scoreWithMove(board, col, line) {

    if (!Array.isArray(board)) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka board parameter failed : " + board + ")");
    if (col < 0 || col >= board.length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka col parameter failed : " + col + ")");
    if (line < 0 || line >= board[col].length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka line parameter failed : " + line + ")");

    let playerScore = 0;

    playerScore += countHorizontalLine(board, col, line);
    playerScore += countVerticalLine(board, col, line);
    playerScore += countDiagDown(board, col, line);
    playerScore += countDiagUp(board, col, line);

    return playerScore;
}

// Count max aligned tiles on lines after the move

function countOnDirection(board, col, line, iDelta, jDelta) {
    
    if (![-1, 0, 1].includes(iDelta)) throw Error("countOnDirection: wrong parameters. Abort, hoy hoy! (aka iDelta parameter failed : " + iDelta + ")");
    if (![-1, 0, 1].includes(jDelta)) throw Error("countOnDirection: wrong parameters. Abort, hoy hoy! (aka jDelta parameter failed : " + jDelta + ")");
        
    const playerTile = board[col][line];
    let i = col + iDelta, j = line + jDelta;
    let playerLine = 0;
    while ( i >= 0 && i < board.length && 
            j >= 0 && j < board[i].length &&
            board[i][j] === playerTile) {
            
            playerLine++;
            i += iDelta;
            j += jDelta;
    }    
    return playerLine;
}

function countHorizontalLine(board, col, line) {

    if (!Array.isArray(board)) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka board parameter failed : " + board + ")");
    if (col < 0 || col >= board.length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka col parameter failed : " + col + ")");
    if (line < 0 || line >= board[col].length) throw Error("scoreWithMove: wrong parameters. Abort, hoy hoy! (aka line parameter failed : " + line + ")");

    let playerLine = 1;
    // Right
    if (col < board.length) {
        playerLine += countOnDirection(board, col, line, 1, 0);
    }
    // To the left
    if (col >= 0) {
        playerLine += countOnDirection(board, col, line, -1, 0);
    }
    return (playerLine >= MINIMUM_LINE_TO_SCORE ? playerLine : 0);
}

function countVerticalLine(board, col, line) {
    let playerLine = 1;
    // Up
    if (line < board[col].length) {
        playerLine += countOnDirection(board, col, line, 0, -1);
    }
    // Down
    if (line >= 0) {
        playerLine += countOnDirection(board, col, line,  0, 1);
    }
    return (playerLine >= MINIMUM_LINE_TO_SCORE ? playerLine : 0);
}

function countDiagDown(board, col, line) {
    let playerLine = 1;
    // Up Left
    if (line < board[col].length && col >= 0) {
        playerLine += countOnDirection(board, col, line, 1, -1);
    }
    // Down Right
    if (line >= 0 && col < board.length) {
        playerLine += countOnDirection(board, col, line, -1, 1);
    }
    return (playerLine >= MINIMUM_LINE_TO_SCORE ? playerLine : 0);
}

function countDiagUp(board, col, line) {
    let playerLine = 1;
    // Down Left
    if (line >= 0 && col >= 0) {
        playerLine += countOnDirection(board, col, line, -1, -1);
    }
    // Up Right
    if (line < board[col].length && col < board.length) {
        playerLine += countOnDirection(board, col, line, 1, 1);
    }
    return (playerLine >= MINIMUM_LINE_TO_SCORE ? playerLine : 0);
}

export default Board;