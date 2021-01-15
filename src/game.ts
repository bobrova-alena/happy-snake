import { Direction, Snake } from "./snake";
import { fieldSideSize, getSnakeTailCoors } from "./utils";

export function createSnake(direction: Direction){
    let snake = new Snake();
    snake.initialize(getSnakeTailCoors(direction), direction);
    return snake;
}

export function checkGameOver(snake: Snake){
    let head = snake.head;
    if((head.xCoord > fieldSideSize || head.xCoord < 1) || (head.yCoord > fieldSideSize || head.yCoord < 1))
        return true;

    return snake.parts.slice(0, snake.parts.length - 1).some(part => {
        return head.xCoord == part.xCoord && head.yCoord == part.yCoord;
    });
}