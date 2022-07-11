class View{
    private static SIZE: number = 30;
    private static Field = document.getElementById("field")!;
    private constructor(){}

    static createArea(x: number, y: number, content: 'snake' | 'food' | 'blank'){
        const area = document.createElement("div");
        area.style.position = "absolute";
        area.style.top = (y*this.SIZE)+"px";
        area.style.left = (x*this.SIZE)+"px";
        area.style.width = this.SIZE+"px";
        area.style.height = this.SIZE+"px";
        area.className = content;
        this.Field.appendChild(area);
    }

    static changeArea(){

    }
}

export{View}