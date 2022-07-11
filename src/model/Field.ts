import { View } from "../View";
import { Position } from "./Position";

class Field{
    private cols: number;
    private rows: number;
    private field: Array<Position> = [];

    constructor(cols: number, rows: number){
        this.cols = cols;
        this.rows = rows;
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                if(i == 0 && j == 0){
                    this.field.push(new Position(j, i, "head"));
                    View.createArea(j, i, "snake");
                    continue;
                }
                this.field.push(new Position(j, i, "blank"));
                View.createArea(j, i, "blank");
            }
        }
    }

    getField(){
        return this.field;
    }
}

export {Field}