var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var arr = [
    "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
    "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631270305224E03_DXXX.jpg",
    "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631210503681E01_DXXX.jpg",
    "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631010503661E02_DXXX.jpg"
]

var rover = {
    x: 0,
    y: 0,
    speed: 10,
    fuel: 100
};

function up(){
    rover.y -= rover.speed;
    updatefuel()
    updateRover()
}
function down(){
    rover.y += rover.speed;
    updatefuel()
    updateRover()
}
function left(){
    rover.x -= rover.speed;
    updatefuel()
    updateRover()
}
function right(){
    rover.x += rover.speed;
    updatefuel()
    updateRover()
}

background_image = "mars.jpg";
rover_image = "rover.png";

function load(){
    rimg = new Image();
    rimg.src = arr[Math.floor(Math.random() * 4)];
    img = new Image();
    img.src = rover_image;
    rimg.onload = updateBackground;
    img.onload = updateRover;
}

window.addEventListener("keydown",keypress);
function keypress(e){
    if(e.code == "ArrowUp"){
        up()
    }else if(e.code == "ArrowDown"){
        down()
    }else if(e.code == "ArrowLeft"){
        left()
    }else if(e.code == "ArrowRight"){
        right()
    }else if(e.key == "w"){
        fuelup()
    }else if(e.key == "s"){
        fueldown()
    }
}
function fuelup(){
    rover.speed += 1;
    updateRover();
}
function fueldown(){
    if(rover.speed > 1){
    rover.speed -= 1;
    }
    updateRover();
}
function updatefuel(){
    rover.fuel -= (rover.speed**1.2)/100;
}
function updateRover(){
    ctx.drawImage(rimg,0,0,canvas.width,canvas.height)
    ctx.drawImage(img,rover.x,rover.y,40,40)
    document.getElementById("fuel").innerHTML = Math.round(rover.fuel*100)/100
    document.getElementById("speed").innerHTML = rover.speed;
    if(rover.x > canvas.width - 20){
        rover.x = canvas.width - 10;
    }
    if(rover.x < 0){
        rover.x = 5;
    }
    if(rover.y > canvas.height - 20){
        rover.y = canvas.height - 10;
    }
    if(rover.y < 0){
        rover.y = 5;
    }
}
function updateBackground(){
    ctx.drawImage(rimg,0,0,canvas.width,canvas.height)
}
var tick = 0;
function loopupdate(){
    tick++;
    console.log(tick)
    if(tick > 20){
        updateRover()
    }
    if(fuel < 20){
        alert("Fuel is low U+26A0")
    }
    requestAnimationFrame(loopupdate);
}
loopupdate()