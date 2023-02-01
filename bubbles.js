const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
//Add Reponsiveness to Canavas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

const mouse = {
    x:undefined,
    y:undefined,
}

canvas.addEventListener('click',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(event);
    drawCircle()
})

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})



// 
class Particle{
    constructor(){
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x=Math.random()*canvas.width
        this.y=Math.random()*canvas.height
        this.size = Math.random()*5+1;
        this.speedX= Math.random()*3- 1.5; // random numbers b/w +1.5 & 1.5
        this.speedY=Math.random()*3 - 1.5; // For Particle to move in all direction
    }
    update(){
        this.x+=this.speedX;
        this.y +=this.speedY;
    }
    draw(){
        ctx.fillStyle = 'blue'
        ctx.beginPath();
        ctx.arc(this.x,this.y,50,0,Math.PI *2);
        ctx.fill();
    }
}

// Function that calls to create circle
const particlesArray = []
function init(){
    for(let i=0;i<100;i++)
    particlesArray.push(new Particle()); 
}
init()
// console.log(particlesArray)

function handleParticles(){
    for(let i=0;i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }   
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height); //Clears Canavas
    handleParticles()
    requestAnimationFrame(animate);
}
animate()






