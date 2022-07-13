import { Field } from "../model/Field";

class View{
    private static SIZE = 30;
    private static FIELD = document.getElementById('field')!;

    private constructor(){}

    static renderField(rows: number, cols: number){
        for(let y = 0; y < rows; y++){
            for(let x = 0; x < cols; x++){
                const area = document.createElement("div");
                area.className = 'blank';
                area.id = `x:${x}y:${y}`;
                area.style.position = 'absolute';
                area.style.top = y*this.SIZE+"px";
                area.style.left = x*this.SIZE+"px";
                area.style.height = this.SIZE+"px";
                area.style.width = this.SIZE+"px";
                this.FIELD.appendChild(area);
            }
        }
    }

    static updateField(field: Field){
        const f = field.getField();
        f.forEach(area =>{
            const x = area.getX();
            const y = area.getY();

            const fieldAreaDOM = document.getElementById(`x:${x}y:${y}`)!;

            if(area.getContent() == 'snake'){
                fieldAreaDOM.className = 'snake';
            }else if(area.getContent() == 'food'){
                fieldAreaDOM.className = 'food';
            }else{
                fieldAreaDOM.className = 'blank';
            }
        });
    }
}

export{View}