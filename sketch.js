var PLAY=1
var END=0;
var gameState=PLAY

var monkey , monkey_running;
var banana ,bananaImage,banana1 ,banana1Image, obstacle, obstacleImage,bananaGroup,banana1Group;
var FoodGroup, obstacleGroup;


var ground,groundImage,invisibleGround;
var cloudsGroup, cloudImage;
var gameover
var survivalTime; 
function preload(){
  
  
monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  groundImage=loadImage("ground1.png")
  cloudImage=loadImage("cloud1.png")
  bananaImage = loadImage("banana.png");
  banana1Image = loadImage("banana1.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  
  createCanvas(600,400);
 
  
  ground = createSprite (0,100,0,10) 
  ground.addImage("ground",groundImage)
  ground.scale=3
  
   monkey = createSprite (150,240,10,10)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.07
  
  
 
  ground.velocityX=-5
  
    invisibleGround = createSprite(200,275,400,10);
  invisibleGround.visible = false;
   cloudsGroup = new Group();
 obstacleGroup = new Group();
  bananaGroup =  new Group();
  banana1Group= new Group();
  survivalTime = 0
}


function draw() {

   monkey.collide(invisibleGround)
  
  
   if (gameState===PLAY){
    
    if (ground.x < 100){
      ground.x = ground.width/2;
    ground.velocityX = -(6 + 3*survivalTime/2);
    } 
   if(keyDown("space")&& monkey.y >= 210){
  monkey.velocityY=-18
  
  }
   
     
     monkey.velocityY=monkey.velocityY+0.9
     
     
  if(monkey.isTouching(bananaGroup)){
  monkey.scale=monkey.scale+0.003
    survivalTime = survivalTime + 1 
    bananaGroup.destroyEach()
        

  }
   if(monkey.isTouching(banana1Group)){
  monkey.scale=monkey.scale+0.003
    survivalTime = survivalTime + 1 
    
        banana1Group.destroyEach()

  }
  
         
    if(monkey.isTouching(obstacleGroup)){
      
     monkey.scale=monkey.scale-0.001
  
  }
     
     
     
   }
  
  
  
  
  
  
  
  
  else if (gameState === END) {
   
   
  ground.velocityX=0
      cloud.velocityX=0
   
   
   }
  spawnClouds()
  bananas()
   bananas1()
  obstacles()
  drawSprites()     
  text("survivalTime:"+survivalTime,20,50)
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(0,150));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
     cloud.velocityX = -(6 + 3*survivalTime/2);
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function bananas(){
      if (frameCount%100===0){
    banana = createSprite(600,200,10,10);
    banana.velocityX=-4
    banana.lifetime=145
    var rand=Math.round(random(120,200))
    banana.addImage(bananaImage);
    banana.scale = 0.09;
        banana.debug=true
         banana.velocityX = -(6 + 3*survivalTime/2);
    banana.y = rand;
    bananaGroup.add(banana)
  
}
}
function bananas1(){
      if (frameCount%200===0){
    banana1 = createSprite(600,200,10,10);
    banana1.velocityX=-4
    banana1.lifetime=145
    var rand=Math.round(random(120,200))
    banana1.addImage(banana1Image);
    banana1.scale = 0.1;
        banana1.debug=true
         banana1.velocityX = -(6 + 3*survivalTime/2);
    banana1.y = rand;
    banana1Group.add(banana1)
  
}
}
function obstacles(){

if (frameCount%70===0){
obstacle = createSprite(600,200,10,10);
  obstacle .velocityX=-4
  obstacle .lifetime=145
  var rand=Math.round(random(253,253))
  obstacle .addImage(obstacleImage);
   obstacle .scale = 0.1;
    obstacle .y = rand;
   obstacle.velocityX = -(6 + 3*survivalTime/2);
  obstacle.debug=true
  obstacle.setCollider("rectangle",0,10,0,0)   
  obstacleGroup.add(obstacle)
  
}


}



