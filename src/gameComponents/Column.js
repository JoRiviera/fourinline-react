import React, { Component } from 'react';
import { Tile } from './Tile';

export function Column(props) {
    let classes = 'column';
    classes += props.content[props.content.length - 1] === null ? "" : " columnFull";
    
    
    const content = props.content.map((tile, key) => {
        const tileColor = tile ? (tile === 'R' ? 'redPlayerTile' : 'yellowPlayerTile') : 'emptyTile';
        return <Tile
            key={key}
            tileColor={tileColor}
        />
    });
    
    return (
        <div className={classes} onClick={props.onClick}>
            {content}
        </div>
    );
}