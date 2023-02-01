const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
//Add Reponsiveness to Canavas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = []


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
    for(let i =0;i<10;i++)
        particlesArray.push(new Particle());
})

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i =0;i<6;i++)
        particlesArray.push(new Particle());
})



// 
class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x=Math.random()*canvas.width
        // this.y=Math.random()*canvas.height
        this.size = Math.random()*10+1;
        this.speedX= Math.random()*3- 1.5; // random numbers b/w +1.5 & 1.5
        this.speedY=Math.random()*3 - 1.5; // For Particle to move in all direction
    }
    update(){
        this.x+=this.speedX;
        this.y +=this.speedY;
        if(this.size >0.2) this.size-=0.1;
    }
    draw(){
        ctx.fillStyle = 'hsl()'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI *2);
        ctx.fill();
    }
}


// console.log(particlesArray)

function handleParticles(){
    for(let i=0;i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size<=0.3){
            particlesArray.splice(i,1);
            i--;
            // console.log(particlesArray.length) // Decresaing Array
        }
    }   
}

function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.02)'
    ctx.clearRect(0,0,canvas.width,canvas.height); //Clears Canavas
    
    handleParticles()
    requestAnimationFrame(animate);
}
animate()






