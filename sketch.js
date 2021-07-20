var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground,invisibleGround;
var rand;
var score = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(50,190,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(270,240,700,5);
  invisibleGround = createSprite(270,230,700,5);
  ground.visible = false;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
  
}


function draw() {
  createCanvas(600,250);
  background("lightGreen");
  text("Score:" + score,500,50);
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8;
    monkey.changeAnimation("running",monkey_running);
   
  
  
  if(gameState === PLAY){ 
    
     //calling the function
  bananas();
  spawnObstacles();
  
  //motion of the monkey
  if(keyDown("space") && monkey.y >= 150){
    monkey.velocityY = -11;
    
    }
   
    
  if(monkey.isTouching(foodGroup)){
    score = score + 1;
    foodGroup.destroyEach();
  }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      
    }
  
  } else if(gameState === END){
    text("Monkey is caught",250,125);
    monkey.visible = false;
    
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    
  }
  
  monkey.collide(invisibleGround);
   
    
  
  drawSprites();
}


function bananas(){
  if(frameCount % 150 === 0){
  var banana = createSprite(400,80,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.12;
   // banana.debug = true;
    banana.setCollider("circle",0,0,10);
  
    
    banana.y = Math.round(random(40,80));
    banana.velocityX = -8;
    
    banana.lifetime = 130;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
  

}

function spawnObstacles(){
  if(frameCount % 70 === 0){
 var obstacle = createSprite(500,205,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.12;
    obstacle.velocityX = -(10 + 4/10);
    obstacle.lifetime = 100;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //obstacle.debug = true;
    obstacle.setCollider("rectangle",0,0,200,400);
    
    obstacleGroup.add(obstacle);
  }
  

}

