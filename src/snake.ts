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

    initialize(headXCoord: number, headYCoord: number, direction: Direction){
        this.parts = new Array<Coords>(4);
        this.parts[0] = { xCoord: headXCoord, yCoord: headYCoord };
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
                yCoord: direction == 'top'? last.yCoord + 1: last.yCoord - 1
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
                yCoord: direction == 'top'? this.head.yCoord + 1: this.head.yCoord - 1
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
        return 'top';
    return 'bottom';
    //return 'right';
}

export type Direction = 'left' | 'right' | 'top' | 'bottom';

/*
export class FirstSnake {
    length = 4;
    head: SnakePart;
    tail: SnakePart;
    private _current: SnakePart;

    constructor(xCoord: number, yCoord: number, direction: Direction){
        this.head = new SnakePart();
        this.head.xCoord = xCoord;
        this.head.yCood = yCoord;
        for(let i = 0; i < this.length; i++)
            this.tail = this._increaseTail(direction);
    }

    private _increaseTail(direction: Direction): SnakePart{
        let tail = new SnakePart();
        this.head.prev = tail;
        tail.next = this.head;

        if(direction == 'left' || direction == 'right'){
            tail.xCoord = direction == 'left'? tail.xCoord - 1: tail.xCoord + 1;
            tail.yCood = this.head.yCood;
        } else {
            tail.xCoord = this.head.xCoord;
            tail.yCood = direction == 'top'? tail.yCood - 1: tail.yCood + 1;
        }

        return tail;
    }
    move(direction: Direction, appleXCoord: number, appleYCoord: number): void {// mutating of snake is forbidden
        let newHead = new SnakePart();
        if(direction == 'left' || direction == 'right'){
            newHead.xCoord = direction == 'left'? this.head.xCoord + 1: this.head.xCoord - 1;
            newHead.yCood = this.head.yCood;
        } else {
            newHead.xCoord = this.head.xCoord;
            newHead.yCood = direction == 'top'? this.head.yCood + 1: this.head.yCood - 1;
        }

        newHead.prev = this.head;
        this.head.next = newHead;
        this.head = newHead;

        if(this.head.xCoord != appleXCoord || this.head.yCood != appleYCoord){
            this.tail.next.prev = undefined;
            this.tail.next = undefined;
            this.tail = this.tail.next;
        }
    }
    checkHeadOutOfFielf(width: number, heith: number): boolean {
        return this.head.xCoord < 0 ||
            this.head.xCoord > width ||
            this.head.yCood < 0 ||
            this.head.yCood > heith;
    }
    checkIntersectionWithYourself() {
        let intersect = false;
        let current = this.tail;
        let next = current.next;

        while(next) {

        }
    }

    [Symbol.iterator] = ()=> {
        this._current = this.tail;
        return this;
    }

    next() {
        if (this._current) {
            let temp = this._current;
            this._current = this._current.next;
            return { done: false, value: temp };
        } else {
            return { done: true };
        }
    }
}

export class SnakePart {
    prev: SnakePart;
    next: SnakePart;
    xCoord: number;
    yCood: number;
}

export type Direction = 'left' | 'right' | 'top' | 'bottom';

export function createSnake(xCoord: number, yCoord: number, direction: Direction){
    let snake = new FirstSnake(xCoord, yCoord, direction);
}

export function game(){
    let maxXCoord = 9;
    let maxYCoord = 9;
    let xCoord = getRandomCoord(maxXCoord);
    let yCoord = getRandomCoord(maxYCoord);
    let direction:Direction;
    let random = Math.random();
    if(random<0.25)
        direction = 'left';
    else if(random<0.5)
        direction = 'right';
    else if (random < 0.75)
        direction = 'top';
    else direction = 'bottom';

    let snake = new FirstSnake(xCoord, yCoord, direction);
    let interval = 1000;
    let appleXCoord = getRandomCoord(maxXCoord);
    let appleYCoord = getRandomCoord(maxYCoord);

    setInterval(()=>{
        snake.move(direction, appleXCoord, appleYCoord);
        if(snake.checkHeadOutOfFielf(maxXCoord, maxYCoord)){
            console.log('Game is over!');
        }
        if(snake.head.xCoord == appleXCoord && snake.head.yCood == appleYCoord) {
            appleXCoord = getRandomCoord(maxXCoord);
            appleYCoord = getRandomCoord(maxYCoord);
        }
    }, interval);

    //change direction on key press
}
*/