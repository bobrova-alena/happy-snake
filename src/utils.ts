import { Coords, Direction, Snake, snakeInitialLength } from "./snake";

export function getId(xCoord: number, yCoord: number) {
    return `${xCoord}-${yCoord}`;
}

export const fieldSideSize = 15;

export type Location = 'left' | 'right' | 'top' | 'bottom' | 'None';

export let fieldIterator = (()=>{
    let array = Array<number>(fieldSideSize);
    for(let i = 0; i<fieldSideSize;i++){
        array[i] = i;
    }
    return array;
})();

export function getRandomCoord(max: number){
    return Math.max(Math.round(Math.random()*max), 1);
}

export function getAppleCoord(shake: Snake) {
    let apple: Coords;

    let insideOfSnake = false;
    do {
        apple = {
            xCoord: getRandomCoord(fieldSideSize),
            yCoord: getRandomCoord(fieldSideSize)
        };

        insideOfSnake = shake.parts.some(part => {
            return apple.xCoord == part.xCoord && apple.yCoord == part.yCoord;
        });
    } while (insideOfSnake);

    return apple;
}

export function getSnakeTailCoors(direction: Direction) {
    let tail: Coords;
    let distance = 3;
    let snakeInitialLength = 4;

    let closeToEdge = false;
    do {
        tail = {
            xCoord: getRandomCoord(fieldSideSize),
            yCoord: getRandomCoord(fieldSideSize)
        };

        switch(direction) {
            case 'left':
                closeToEdge = tail.xCoord - snakeInitialLength < distance;
                break;
            case 'right':
                closeToEdge = tail.xCoord + snakeInitialLength > fieldSideSize - distance;
                break;
            case 'up':
                closeToEdge = tail.yCoord + snakeInitialLength > fieldSideSize - distance;
                break;
            default:
                closeToEdge = tail.yCoord - snakeInitialLength < distance;
                break;
        }
    } while (closeToEdge);

    return tail;
}