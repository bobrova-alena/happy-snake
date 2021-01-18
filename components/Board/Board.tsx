import styles from './Board.module.css'
import { fieldIterator, fieldSideSize, getAppleCoord, getId, Location } from "../../src/utils";
import Cell, { CellType } from "../Cell/Cell";
import { useEffect, useRef, useState } from 'react';
import { checkGameOver, createSnake } from '../../src/game';
import { Coords, Direction, getRandomDirection, Snake } from '../../src/snake';
import { useDispatch, useSelector } from 'react-redux';
import { countIncreased, selectGameOver, finished, resetState } from './boardSlice';
import { selectCount } from './boardSlice';
import MobileDetect from 'mobile-detect';
import Button from 'react-bootstrap/Button';

type BoardInitialState = {
    direction: Direction,
    snake: Snake,
    apple: Coords
};

function createInitialBoardState(): BoardInitialState {
    let direction = getRandomDirection();
    let snake = createSnake(direction);
    return {
        direction,
        snake,
        apple: getAppleCoord(snake)
    }
}

export default function Board() {
    const [state, setState ] = useState(createInitialBoardState());
    const { snake, apple } = state;

    const [isMobile, setIsMobile] = useState(false);
    const gameOver = useSelector(selectGameOver);
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    const stateRef = useRef(state);
    stateRef.current = state;
    
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
        var detector = new MobileDetect(navigator.userAgent);
        if(detector.mobile())
            setIsMobile(true);
    }, []);

    useEffect(()=>{
        let tryChangeDirection = (newDirection) => {
            let currDirection = stateRef.current.direction;
            let currIsHorizontal = currDirection == 'left' || currDirection == 'right';
            let currIsVertical = currDirection == 'up' || currDirection == 'down';

            if((currIsHorizontal && (newDirection == 'up' || newDirection == 'down')) || (currIsVertical && (newDirection == 'left' || newDirection == 'right')))
                setState({ ...stateRef.current, direction: newDirection });
        }

        let onkeydown = (e: KeyboardEvent)=> {
            tryChangeDirection(e.code.replace('Arrow','').toLowerCase());
        }

        let swiped = (e) => {
            let board = document.getElementById('board');
            if(board.contains(e.target))
                tryChangeDirection(e.detail.dir);
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
            let timeout = Math.max(700 - 100 * count, isMobile ? 300 : 200);
            const timer = setTimeout(function moveSnake(){
                let movedSnake = stateRef.current.snake.move(stateRef.current.direction, stateRef.current.apple);
                if(checkGameOver(movedSnake))
                    dispatch(finished());
                if(movedSnake.appleIsEatten(stateRef.current.apple)) {
                    setState({ ...stateRef.current, apple: getAppleCoord(movedSnake) });
                    dispatch(countIncreased());
                }
                setState({ ... stateRef.current, snake: movedSnake });
            }, timeout);

            return () => clearTimeout(timer);
        }
    });

    let reset = () => {
        dispatch(resetState());
        setState(createInitialBoardState());
    };

    let playBtnStr = 'Play';

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
            {gameOver ? 
                <div className={styles.cover}>
                    <div className={styles.auto}/>
                    <Button variant="outline-success" className={styles.playBtn} onClick={()=>reset()} >{playBtnStr}</Button>
                    <div className={styles.auto}/>
                </div> :
                <></> }
        </div>
    );
}