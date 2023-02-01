let canvas = document.getElementById('canvas1')
let ctx= canvas.getContext('2d')
console.log(ctx)
//Add Reponsiveness to Canavas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let particleArray;

class Particle{
    constructor(x,y,directionX,directionY,size,color)
    {
        this.x = x;
        this.y =y;
        this.directionX=directionX;
        this.directionY=directionY;
        this.size = size;
        this.color= color;
    }
    draw(){
        ctx.beginPath();
        drawStar(this.x,this.y,4,this.size,this.size/2)
        // ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
    update(){
        if(this.x+this.size > canvas.width || this.x-this.size <0){
            this.directionX = -this.directionX
        }
        if(this.y+this.size > canvas.width || this.y-this.size <0){
            this.directionY = -this.directionY           
        }
        this.x+=this.directionX
        this.y+=this.directionY
        this.draw()
    }

}

function drawStar(posX,posY,spikes,outerRadius,innerRadius){
    let rotation = Math.PI/2*3;
    let x= posX;
    let y = posY;
    let step = Math.PI / spikes;

    ctx.beginPath()
    ctx.moveTo(posX,posY-outerRadius);
    for(let i=0;i<spikes;i++){
        x=posX+Math.cos(rotation)*outerRadius;
        y=posY+Math.sin(rotation)*outerRadius;
        ctx.lineTo(x,y);
        rotation+=step;
        x=posX+Math.cos(rotation)*innerRadius;
        y=posY+Math.sin(rotation)*innerRadius;
        ctx.lineTo(x,y);
        rotation+=step;
    }
    ctx.lineTo(posX,posY-outerRadius)
    ctx.closePath()
}

// Add draw Method

function init(){
    particleArray = [];
    for(let i=0;i<100;i++){
        let size = Math.random()*10
        let x = Math.random()*(canvas.width-size*2);
        let y = Math.random()*(canvas.height-size*2);
        let directionX=(Math.random()*0.4)-0.2;
        let directionY=(Math.random()*0.4)-0.2;
        let color = 'white'
        particleArray.push(new Particle(x,y,directionX,directionY,size,color))
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update()
    }
    requestAnimationFrame(animate);
}
init()
console.log(particleArray)
animate();

