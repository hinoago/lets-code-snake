import { SnakeSlice } from "./SnakeSlice"

class Snake{
    private snake: Array<SnakeSlice> = [];

    constructor(){
        for(let i = 2; i >= 0; i--){
            this.snake.push(new SnakeSlice(0, i));
        }
    }

    move(direction: 'up' | 'down' | 'left' | 'right'){
        let currentX;
        let currentY;
        let newX;
        let newY;

        for(let i = 0; i < this.snake.length; i++){
            if(i == 0){
                currentX = this.snake[i].getX();
                currentY = this.snake[i].getY();
                if(direction == 'up'){
                    this.snake[i].setY(currentY-1);
                }
                if(direction == 'down'){
                    this.snake[i].setY(currentY+1);
                }
                if(direction == 'left'){
                    this.snake[i].setX(currentX-1);
                }
                if(direction == 'right'){
                    this.snake[i].setX(currentX+1);
                }
            }else{
                newX = this.snake[i].getX();
                newY = this.snake[i].getY();
                if(currentX != undefined && currentY != undefined){
                    this.snake[i].setX(currentX);
                    this.snake[i].setY(currentY);
                    currentX = newX;
                    currentY = newY;
                }
            }
        }
    }

    getSnake(){
        return this.snake;
    }

    eat(x: number, y: number){
        this.getSnake().unshift(new SnakeSlice(x, y));
    }
}

export{Snake}