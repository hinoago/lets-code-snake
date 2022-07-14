import { Area } from "../model/Area";
import { Field } from "../model/Field"
import { Snake } from "../model/Snake";
import { View } from "../view/View";

//TODO: need some bugfixes
class GameController{
    private TIME_IN_MILISSECONDS = 3000;
    private field: Field = new Field(10, 10);
    private snake = new Snake();
    private snakeDirection: 'up' | 'down' | 'left' |'right' = 'down';
    private insertFoodTimer: number = 0;
    private stopMovementTimer: number = 0;
    private foodsOnField: Array<Area> = [];
    private move = (event: KeyboardEvent) =>{
        if(event.key == "ArrowUp"){
            this.snakeDirection = 'up';
        }
        if(event.key == "ArrowDown"){
            this.snakeDirection = 'down';
        }
        if(event.key == "ArrowLeft"){
            this.snakeDirection = 'left';
        }
        if(event.key == "ArrowRight"){
            this.snakeDirection = 'right';
        }
    }

    start(): void{
        this.renderField();
        this.foodManage();
        this.listenSnakeMovement();
        this.snakeAutoMove();
        this.autoUpdate();
    }

    listenSnakeMovement(): void{
        document.addEventListener("keydown", this.move);
    }

    stopSnakeMovementListener(): void{
        document.removeEventListener("keydown", this.move);
    }

    stopSnakeAutoMove(){
        if(this.stopMovementTimer != undefined){
            clearInterval(this.stopMovementTimer);
        }
    }

    snakeAutoMove(){
        this.stopMovementTimer = setInterval(() =>{
            this.snakeMove(this.snakeDirection);
        },100);
    }

    //TODO: Verify if the next snake's movement is inside the field
    snakeMove(direction: 'up' | 'down' | 'left' | 'right'): void{
        
        //Increasing snake size on eating food
        let area;
        const head = this.snake.getSnake()[0];
        if(direction == 'down'){
            area = this.getField().find(area => area.getX() == head.getX() && area.getY() == head.getY()+1);
        }else if(direction == 'up'){
            area = this.getField().find(area => area.getX() == head.getX() && area.getY() == head.getY()-1);
        }else if(direction == 'right'){
            area = this.getField().find(area => area.getX() == head.getX()+1 && area.getY() == head.getY());
        }else{
            area = this.getField().find(area => area.getX() == head.getX()-1 && area.getY() == head.getY());
        }

        if(area && area.getContent() == 'food'){
            this.snake.eat(area.getX(), area.getY());
            area.setContent('snake');
            this.updateField();
            return;
        }

        //Handling game over possibilities
        if(area == undefined || area.getContent() == 'snake'){
            try{
                this.gameOver();
            }catch(err: any){
                alert(err.message);
                return;
            }
        }

        this.snake.move(direction);
        this.updateField();
    }

    foodManage(){
        this.insertFood();
    }

    insertFood(): void{
        this.insertFoodTimer = setInterval(() =>{
            const field = this.getField();
            const emptyAreas = field.filter(area => area.getContent() == 'blank');
            if(emptyAreas.length > 0){
                const emptyArea = emptyAreas[Math.floor(Math.random()*emptyAreas.length)];
                this.foodsOnField.push(emptyArea);
                emptyArea.setContent('food');
                this.updateField();
            }
            setTimeout(() =>{
                const food = this.foodsOnField.at(0);
                if(food){
                    food.setContent('blank');
                    this.foodsOnField.shift();
                }
            }, this.TIME_IN_MILISSECONDS*.9)
        }, this.TIME_IN_MILISSECONDS);
    }

    stopFoodInsert(){
        if(this.insertFoodTimer != undefined){
            clearInterval(this.insertFoodTimer);
        }
    }

    renderField(): void{
        const fieldLength = this.getField().length/10;
        View.renderField(fieldLength, fieldLength);
        View.renderSnake();
    }

    autoUpdate(){
        setInterval(() =>{
            this.updateField();
        }, 100);
    }

    updateField(): void{
        const snakePositionOnField = this.getSnakeOnField();

        //Removing snake from area(tail)
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

    gameOver(): never{
        this.stopFoodInsert();
        this.stopSnakeMovementListener();
        this.stopSnakeAutoMove();

        throw new Error("Fim De Jogo");
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
}

export{GameController}