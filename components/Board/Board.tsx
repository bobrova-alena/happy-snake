import styles from './Board.module.css'
import { fieldIterator, fieldSideSize, getAppleCoord, getId, Location } from "../../src/utils";
import Cell, { CellType } from "../Cell/Cell";
import { useEffect, useRef, useState } from 'react';
import { checkGameOver, createSnake } from '../../src/game';
import { getRandomDirection } from '../../src/snake';
import { useDispatch, useSelector } from 'react-redux';
import { countIncreased, selectGameOver, finished } from './boardSlice';
import { selectCount } from './boardSlice';

export default function Board() {
    const [direction, setDirection] = useState(getRandomDirection());
    const [snake, setSnake] = useState(createSnake(direction));
    const [apple, setApple] = useState(getAppleCoord(snake));
    const gameOver = useSelector(selectGameOver);
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    const appleRef = useRef(apple);
    appleRef.current = apple;
    const snakeRef = useRef(snake);
    snakeRef.current = snake;
    const directionRef = useRef(direction);
    directionRef.current = direction;
    
    let getCellType = (xCoord: number, yCoord: number): CellType => {
        let isSnake = false;
        snake.parts.some((part)=>{
            if(xCoord == part.xCoord && yCoord == part.yCoord){
                isSnake = true;
                return true;
            }
        });

        if(isSnake) {
            if(xCoord == snake.head.xCoord && yCoord == snake.head.yCoord)
                return 'SnakesHead';

            return (xCoord == snake.tail.xCoord && yCoord == snake.tail.yCoord)? 'SnakesTail' : 'SnakesBody';
        }

        if(xCoord == apple.xCoord && yCoord == apple.yCoord) {
            return 'Apple';
        }

        return 'Field';
    };

    let getNeighborLocation = (xCoord: number, yCoord: number, cellType: CellType): Location =>{
        if(cellType == 'SnakesHead' || cellType == 'SnakesTail') {
            let neighbor = cellType == 'SnakesHead' ? snake.neck : snake.beforeTail;
            if(yCoord == neighbor.yCoord) {
                return xCoord > neighbor.xCoord ? 'left' : 'right';
            } else {
                return yCoord < neighbor.yCoord ? 'top' : 'bottom';
            }
        }
        return 'None';
    };

    useEffect(()=>{
        let changeDirection = (direction) => {
            let currIsHorizontal = directionRef.current == 'left' || directionRef.current == 'right';
            let currIsVertical = directionRef.current == 'up' || directionRef.current == 'down';

            if((currIsHorizontal && (direction == 'up' || direction == 'down')) || (currIsVertical && (direction == 'left' || direction == 'right')))
                setDirection(direction);
        }

        let onkeydown = (e: KeyboardEvent)=> {
            changeDirection(e.code.replace('Arrow','').toLowerCase());
        }

        let swiped = (e) => {
            changeDirection(e.detail.dir);
        };

        document.addEventListener('keydown', onkeydown);
        document.addEventListener('swiped', swiped);

        return () => {
            document.removeEventListener('swiped', swiped);
            document.removeEventListener('keydown', onkeydown);
        }
    },[]);

    useEffect(()=>{
        if(!gameOver) {
            let timeout = Math.max(700 - 100 * count, 200);
            const timer = setTimeout(function moveSnake(){
                let movedSnake = snakeRef.current.move(directionRef.current, appleRef.current);
                if(checkGameOver(movedSnake))
                    dispatch(finished());
                if(movedSnake.appleIsEatten(appleRef.current)) {
                    setApple(getAppleCoord(movedSnake));
                    dispatch(countIncreased());
                }
                setSnake(movedSnake);
            }, timeout);

            return () => clearTimeout(timer);
        }
    });

    let gameOverStr = 'Game Over!';

    return (
        <div id='board' className={`${styles.board} ${gameOver? styles.gameOver: ''}`}>
            {fieldIterator.map(rowIndex => 
                <div key = {rowIndex} className={styles.row}>
                    {fieldIterator.map(columnIndex => {
                        let xCoord = columnIndex + 1;
                        let yCoord = fieldSideSize - rowIndex;
                        let cellType = getCellType(xCoord, yCoord);
                        return <Cell key={getId(xCoord, yCoord)} xCoord={xCoord} yCoord={yCoord} type={cellType} neighborLocation={getNeighborLocation(xCoord, yCoord, cellType)}/>
                    })}
                </div>)}
        </div>
    );

    //<div className={gameOver? styles.gameOverText: styles.displayNone }>{gameOverStr}</div>
}