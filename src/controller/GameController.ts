import { Area } from "../model/Area";
import { Field } from "../model/Field"
import { Snake } from "../model/Snake";
import { View } from "../view/View";

class GameController{
    private field: Field = new Field(10, 10);
    private snake = new Snake();

    start(): void{
        this.renderField();
        this.insertFood(1000);
        this.listenSnakeMovement();
    }

    getField(): Array<Area>{
        return this.field.getField();
    }

    getSnakeOnField(): Array<Area>{
        return this.getField().filter(area =>{
            const slice = this.snake.getSnake().find(pos => pos.getX() == area.getX() && pos.getY() == area.getY());
            if(slice){
                return true;
            }else{
                return false;
            }
        });
    }

    listenSnakeMovement(): void{
        document.addEventListener("keydown", (event) =>{
            if(event.key == "ArrowUp"){
                this.snakeMove('up')
            }
            if(event.key == "ArrowDown"){
                this.snakeMove('down');
            }
            if(event.key == "ArrowLeft"){
                this.snakeMove('left');
            }
            if(event.key == "ArrowRight"){
                this.snakeMove('right');
            }
        });
    }

    //TODO: Verify if the next snake's movement is inside the field
    snakeMove(direction: 'up' | 'down' | 'left' | 'right'): void{
        this.snake.move(direction);
        this.updateField();
    }

    insertFood(time: number): void{
        setInterval(() =>{
            this.renderFood();
        }, time);
    }

    renderFood(): void{
        const field = this.getField();
        const emptyAreas = field.filter(area => area.getContent() == 'blank');
        const emptyArea = emptyAreas[Math.floor(Math.random()*emptyAreas.length)];
        emptyArea.setContent('food');
        this.updateField();
    }

    renderField(): void{
        const fieldLength = this.getField().length/10;
        View.renderField(fieldLength, fieldLength);
        View.renderSnake();
    }

    updateField(): void{
        const snakePositionOnField = this.getSnakeOnField();

        //Removing snake from area
        const snakeOnField = this.getField().filter(area => area.getContent() == 'snake');
        const snakeToRemove = snakeOnField.find(area =>{
            const a = snakePositionOnField.find(a => a.getX() == area.getX() && a.getY() == area.getY());
            if(a){
                return false;
            }else{
                return true;
            }
        });

        if(snakeToRemove){
            this.getField().at(this.getField().indexOf(snakeToRemove))?.setContent('blank');
        }

        //Setting snake on area
        snakePositionOnField.forEach(area =>{
            const a = this.getField().find(a => a.getX() == area.getX() && a.getY() == area.getY());
            if(a){
                a.setContent('snake');
            }
        });

        View.updateField(this.field);
    }
}

export{GameController}