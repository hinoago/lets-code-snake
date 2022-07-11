class Position{
    private x: number;
    private y: number;
    private content: 'snake' | 'food' | 'blank' | 'head';

    constructor(x: number, y: number, content: 'snake' | 'food' | 'blank' | 'head'){
        this.x = x;
        this.y = y;
        this.content = content;
    }

    getX(): number{
        return this.x;
    }
    
    getY(): number{
        return this.y;
    }

    getContent(): string{
        return this.content;
    }

    setContent(content: 'snake' | 'food' | 'blank'){
        this.content = content;
    }
}

export{Position}