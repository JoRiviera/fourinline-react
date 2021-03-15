import React from 'react'
/*
    PROPS:
     - tileColor : css class setting the color of the tile
*/
export const Tile = (props) => {
    const classes = `tile ${props.tileColor}`;
    return (
        <div className={classes}>
            
        </div>
    )
}