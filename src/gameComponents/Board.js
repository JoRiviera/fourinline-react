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
        };
    };

    handleClick(i) {
        let board = this.state.board;
        let column = board[i];
        const redPlayerTurn = this.state.redPlayerTurn;
        if (column[column.length - 1] !== null) {
            return;
        } else {
            const tileSpot = column.indexOf(null);
            column[tileSpot] = redPlayerTurn ? 'R' : 'Y';
            board[i] = column;
            this.setState({
                board: board,
                redPlayerTurn : !redPlayerTurn,
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
        return (
            <div className="board">
                {columns}
            </div>
        );
    }
}

export default Board;