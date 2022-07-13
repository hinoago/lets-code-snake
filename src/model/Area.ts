class Area{
    private x: number;
    private y: number;
    private content: 'blank' | 'snake' | 'food';

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.content = 'blank';
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getContent(){
        return this.content;
    }

    setContent(content: 'blank' | 'snake' | 'food'){
        this.content = content;
    }
}

export{Area}