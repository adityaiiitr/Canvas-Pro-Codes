let canvas = document.getElementById('canvas1')
let ctx= canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Spiral Circle
let i=0,e=1,z=100,r=12;

// Star
let particleArray;


class Particle{
    constructor(){
        this.x=canvas.width/2
        this.y=canvas.height/2
    }
    draw(x,y,c){
        ctx.fillStyle = c
        ctx.beginPath();
        ctx.arc(this.x+x,this.y+y,12,0,Math.PI *2);
        ctx.fill();
    }
    drawScale(x,y,r,c){
        ctx.strokeStyle = c
        ctx.beginPath();
        ctx.arc(this.x+x,this.y+y,r,0,Math.PI *2);
        ctx.stroke();
    }
}

class Star{
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
        drawStar(this.x,this.y,5,this.size,this.size/2)
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

var obj1 = new Particle(); 
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height); //Clears Canavas
    drawsSpiralCircle()
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update()
    }
    requestAnimationFrame(animate);
}
init()
animate()

function init(){
    particleArray = [];
    for(let i=0;i<50;i++){
        let size = Math.random()*5
        let x = Math.random()*(canvas.width-size*2);
        let y = Math.random()*(canvas.height-size*2);
        let directionX=(Math.random()*0.4)-0.2;
        let directionY=(Math.random()*0.4)-0.2;
        // let a=Math.random()*0.5
        // console.log(a);
        // let color = `rgba(0, 0, 0, ${a})`
        let color = 'rgb(215, 214, 214)'
        particleArray.push(new Star(x,y,directionX,directionY,size,color))
    }
}

function drawsSpiralCircle(){
    // if(z<=0)
    if(z==-100)
    {
        z=100;
    }
    if(z==0)
    e++;

    i=i+0.090
    
    
    function scalesR(c1,c2){
        for(let j=0;j<600;j=j+10){
            obj1.drawScale(Math.cos(i)*z,Math.sin(i)*z,r+j,c1)
            obj1.drawScale(Math.cos(i-16)*z,Math.sin(i-16)*z,r+j+2,c2)
        }
    }
    function scalesL(c1,c2){
        for(let j=0;j<600;j=j+10){
            obj1.drawScale(Math.sin(i)*z,Math.cos(i)*z,r+j,c1);
            obj1.drawScale(Math.sin(i-16)*z,Math.cos(i-16)*z,r+j+2,c2);
        }
    }
    
    c='rgb(248, 255, 56)'
    if(e%2==1){
        // scalesR("rgb(10, 10, 10)","rgb(21, 20, 20)")
        obj1.draw(Math.cos(i)*z,Math.sin(i)*z,c);
        obj1.draw(Math.cos(i-16)*z,Math.sin(i-16)*z,c);
    }
    else{
        // scalesL("rgb(10, 10, 10)","rgb(21, 20, 20)")
        obj1.draw(Math.sin(i)*z,Math.cos(i)*z,c);
        obj1.draw(Math.sin(i-16)*z,Math.cos(i-16)*z,c);
    }
    z--;
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




