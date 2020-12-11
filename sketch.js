
var monkey , monkey_running;
var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,invisibleGround;
var score=0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);

  monkey = createSprite(100,300,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.10;

  
  ground = createSprite(300,335,1200,10)
  ground.shapeColor = "green"
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
 foodGroup = new Group();
  obstacleGroup = new Group();
  
}


  function draw() {
   background("lightgreen")
    text("Survival Time: "+ score, 500,50);

    if(gameState===PLAY){
      
      if(ground.x<0){
        ground.x = ground.width /2;
      }
      
       if(keyDown("space")&& monkey.y >= 159){
      monkey.velocityY = -12
    }

      if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score+1;
    }
      
       monkey.velocityY = monkey.velocityY+0.8
      
      monkey.collide(ground)
      
       spawnObstacles();
     spawnFruits();
      
       if(obstacleGroup.isTouching(monkey)){      
  
   gameState= END;
       }
      
    }
    
    
    else if(gameState===END){
         textSize(100);
    text("Game Over",50,200)
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
       monkey.collide(ground)
   ground.velocityX = 0;
     
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
    }
      
      

  
  
  drawSprites();
}


function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(500,300,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
   obstacle.lifetime = 150;
  obstacleGroup.add(obstacle)
  }
  
}

function spawnFruits(){
  if(frameCount % 80 === 0){
    var fruit = createSprite(500,200,10,10)
    fruit.addImage(bananaImage)
    fruit.velocityX = -6;
    fruit.scale = 0.09
    fruit.lifetime = 120;
    foodGroup.add(fruit)
  }
 
}



