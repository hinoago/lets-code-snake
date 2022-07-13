import { Area } from "../model/Area";
import { Field } from "../model/Field"
import { Snake } from "../model/Snake";
import { View } from "../view/View";

class GameController{
    private field: Field = new Field(10, 10);
    private snake = new Snake();

    constructor(){
        this.renderField();
    }

    getField(){
        return this.field.getField();
    }

    getSnakeOnField(){
        return this.getField().filter(area =>{
            const slice = this.snake.getSnake().find(pos => pos.getX() == area.getX() && pos.getY() == area.getY());
            if(slice){
                return true;
            }else{
                return false;
            }
        });
    }

    //TODO: Verify if the next snake's movement is inside the field
    snakeMove(direction: 'down'){
        if(direction == 'down'){
            this.snake.moveDown();
        }
        this.updateField();
    }

    renderField(){
        const fieldLength = this.getField().length/10;
        View.renderField(fieldLength, fieldLength);
        return this.field;
    }

    updateField(){
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