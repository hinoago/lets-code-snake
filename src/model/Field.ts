import { Area } from "./Area"

class Field{
    private field: Array<Area> = [];

    constructor(cols: number, rows:number){
        for(let y = 0; y < rows; y++){
            for(let x = 0; x < cols; x++){
                this.field.push(new Area(x, y));
            }
        }
    }

    getField(){
        return this.field;
    }
}

export{Field}