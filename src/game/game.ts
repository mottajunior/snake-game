import { Apple } from "./apple.js"
import { Snake } from "./snake.js"

//game board
const canvas = getCanvasById("canvas")
const canvasContext = getCanvas2DContext(canvas)

//elementos
var snake = new Snake(250,250,50,canvas)
var apple = new Apple(canvas,snake)

//windows events
window.onload = () => {
    gameLoop()
}

window.addEventListener("keydown", (event: KeyboardEvent) => {
   snake.snakeControl(event)
})


function gameLoop(){
    setInterval(show,1000/15) //15 fps
}

function show(){
     update()
     draw()
}

function update(){
    snake.move()
    snake.checkHitWall()
    snake.checkSnakeHitBody()
    if (snake.checkIfEatApple(apple)) apple = snake.eatApple(apple)
}

function draw(){
    createRect(0,0,canvas.width,canvas.height, "black")
    for(let i=0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size -5, snake.size -5,`white`)
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snake.tail.length),canvas.width - 120,18)
    createRect(apple.x,apple.y,apple.size,apple.size,apple.color)
}

function createRect(x:number,y:number,width:number,height:number,color:string):void {
    canvasContext.fillStyle = color 
    canvasContext.fillRect(x,y,width,height)
}

function getCanvasById(id:string): HTMLCanvasElement {
    const canvas:HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement
    return canvas
}

function getCanvas2DContext(canvas:HTMLCanvasElement):CanvasRenderingContext2D{
    const canvasContext2D: CanvasRenderingContext2D = canvas.getContext("2d")  as CanvasRenderingContext2D
    return canvasContext2D
}
