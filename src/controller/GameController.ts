import { Field } from "../model/Field";

class GameController{
    private field: Field = new Field(10, 10);

    constructor(){
        this.snakeMove();
    }

    snakeMove(){
        document.body.addEventListener("keydown", (e) =>{
            if(e.key == "ArrowUp"){
                this.field.getField().find(position => position.getContent() == "head");
                
            }

            if(e.key == "ArrowDown"){
                this.field.getField().find(position => position.getContent() == "head");
            }

            if(e.key == "ArrowLeft"){

            }

            if(e.key == "ArrowRight"){

            }
        })
    }
}

export{GameController}