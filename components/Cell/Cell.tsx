import React from 'react';
import { getId, Location } from '../../src/utils';
import styles from './Cell.module.css';

type CellProps = {
    xCoord: number;
    yCoord: number;
    type: CellType;
    neighborLocation: Location;
}

export type CellType = 'Field' | 'Apple' | 'SnakesHead' | 'SnakesBody' | 'SnakesTail';

export default function Cell(props: CellProps){
    let getClassByType = (type: CellType) => {
        switch(type) {
            case 'Field':
                return styles.field;
            case 'SnakesBody':
                return styles.snakeBody;
            case 'SnakesHead':
                return styles.snakeHead;
            case 'SnakesTail':
                return styles.snakeTail;
            default:
                return styles.apple;
        }
    };

    let getClassByNeighborLocation = (neighborlocation: Location) => {
        switch (neighborlocation) {
            case 'left':
                return styles.rightBorderRadius;
            case 'right':
                return styles.leftBorderRadius;
            case 'top':
                return styles.bottomBorderRadius;
            case 'bottom':
                return styles.topBorderRadius;
            default:
                return '';
        }
    }

    return (
        <div id={getId(props.xCoord, props.yCoord)} className={`${styles.cell} ${getClassByType(props.type)} ${getClassByNeighborLocation(props.neighborLocation)}`}/>
    );
}