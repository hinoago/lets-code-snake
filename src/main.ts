import { GameController } from "./controller/GameController";

const game = new GameController();

document.addEventListener("keydown", (event) =>{
    if(event.key == "ArrowUp"){
        game.snakeMove('up');
    }
    if(event.key == "ArrowDown"){
        game.snakeMove('down');
    }
    if(event.key == "ArrowLeft"){
        game.snakeMove('left');
    }
    if(event.key == "ArrowRight"){
        game.snakeMove('right');
    }
});

export{}