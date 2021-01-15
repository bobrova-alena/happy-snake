export class Coords {
    xCoord: number;
    yCoord: number;
}

export class Snake {
    parts: Array<Coords>;

    get head() {
        return this.parts[this.parts.length - 1];
    }
    get neck() {
        return this.parts[this.parts.length - 2];
    }
    get tail() {
        return this.parts[0];
    }
    get beforeTail() {
        return this.parts[1];
    }

    initialize(tail: Coords, direction: Direction){
        this.parts = new Array<Coords>(snakeInitialLength);
        this.parts[0] = tail;
        for(let i = 1; i < this.parts.length; i ++) {
            this.parts[i] = this._createNextPart(direction, this.parts[i-1]);
        }
    }

    private _createNextPart(direction: Direction, last: Coords): Coords {
        let tail: Coords;
        if(direction == 'left' || direction == 'right'){
            tail = {
                xCoord: direction == 'right'? last.xCoord + 1: last.xCoord - 1,
                yCoord: last.yCoord
            }
        } else {
            tail = {
                xCoord: last.xCoord,
                yCoord: direction == 'up'? last.yCoord + 1: last.yCoord - 1
            }
            
        }
        return tail;
    }

    appleIsEatten(apple: Coords) {
        return this.head.xCoord == apple.xCoord && this.head.yCoord == apple.yCoord;
    }

    move(direction: Direction, apple: Coords): Snake {
        let movedSnake = new Snake();
        let movedSnakeHead: Coords;

        if(direction == 'left' || direction == 'right'){
            movedSnakeHead = {
                xCoord: direction == 'right'? this.head.xCoord + 1: this.head.xCoord - 1,
                yCoord: this.head.yCoord
            };
        } else {
            movedSnakeHead = {
                xCoord: this.head.xCoord,
                yCoord: direction == 'up'? this.head.yCoord + 1: this.head.yCoord - 1
            };
        }

        let appleIsEatten = movedSnakeHead.xCoord == apple.xCoord && movedSnakeHead.yCoord == apple.yCoord;
        if(appleIsEatten) {
            movedSnake.parts = this.parts.concat([movedSnakeHead]);
        } else {
            movedSnake.parts = this.parts.slice(1).concat([movedSnakeHead]);
        }

        return movedSnake;
    }
}

export function getRandomDirection(): Direction {
    let random = Math.random();
    if(random<0.25)
        return 'left';
    else if(random<0.5)
        return 'right';
    else if (random < 0.75)
        return 'up';
    return 'down';
}

export type Direction = 'left' | 'right' | 'up' | 'down';

export const snakeInitialLength: number = 4;