import { GameController } from "./controller/GameController";

const game = new GameController();

document.addEventListener("keydown", (event) =>{
    if(event.key == "ArrowDown"){
        game.snakeMove('down');
    }
});

export{}