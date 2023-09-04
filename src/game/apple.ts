import { Snake } from "./snake"

export class Apple{
    public x: number
    public y: number
    public color:string = ""
    public size:number = 50
     constructor(boardGame:HTMLCanvasElement,snake:Snake){
        var isTouching
        while(true){
            isTouching = false
            this.x = Math.floor(Math.random() * boardGame.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * boardGame.height / snake.size) * snake.size
            for(let i = 0; i < snake.tail.length; i++){
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            this.color = "red"        
            this.size = snake.size
            if (!isTouching){
                break
            }
        }
    }
}