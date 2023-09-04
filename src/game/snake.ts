import { Apple } from "./apple.js"
import { Angle } from "./interfaces"

export class Snake {
    public x:number
    public y:number
    public size:number
    public tail:Angle[]
    public rotateX = 0
    public rotateY = 1
    private boardGame:HTMLCanvasElement

    constructor(x: number,y:number,size:number,boardGame:HTMLCanvasElement){
        this.x = x
        this.y = y 
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.boardGame = boardGame
    }

    public move():void {
        let newRect:Angle = {x:0,y:0}
        if (this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length -1].x + this.size,
                y: this.tail[this.tail.length -1].y
            }
        } else if (this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length -1].x - this.size,
                y: this.tail[this.tail.length -1].y
            }
        } else if (this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length -1].x,
                y: this.tail[this.tail.length -1].y + this.size
            }
        } else if (this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length -1].x,
                y: this.tail[this.tail.length -1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)   
    }

    public checkHitWall(){
        let headTail = this.tail[this.tail.length -1]
        if (headTail.x == -this.size){
            headTail.x = this.boardGame.width - this.size
        }else if (headTail.x == this.boardGame.width){
            headTail.x = 0        
        }else if (headTail.y == - this.size){
            headTail.y = this.boardGame.height - this.size
        }else if (headTail.y == this.boardGame.height){
            headTail.y = 0
        }
    }

    public checkSnakeHitBody(){
        let headTail = this.tail[this.tail.length -1]
        for (var i = this.tail.length - 2; i >= 0; --i) {
        if (this.tail[i].x == headTail.x && this.tail[i].y == headTail.y) {
          alert(`You lose`)
          location.reload()
          break;
        }
      }
    }

    public eatApple(apple:Apple):Apple{
        this.tail.push({x:apple.x,y:apple.y})
        return new Apple(this.boardGame,this)
    }

    public checkIfEatApple(apple:Apple):boolean {
        return this.tail[this.tail.length -1].x == apple.x && 
        this.tail && this.tail[this.tail.length -1].y == apple.y
    }

    public snakeControl(event: KeyboardEvent):void{
        setTimeout(() => {
            if (event.keyCode == 37 && this.rotateX != 1){
                this.rotateX = -1
                this.rotateY = 0
            } else if (event.keyCode == 38 && this.rotateY != 1){
                this.rotateX = 0
                this.rotateY = -1
            } else if (event.keyCode == 39 && this.rotateX != -1){
                this.rotateX = 1
                this.rotateY = 0
            } else if (event.keyCode == 40 && this.rotateY != -1){
                this.rotateX = 0
                this.rotateY = 1
            }
        })
    }
}