
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var survialTime=0;
var ground;

function preload(){
  
 //to load animation for monkey 
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  //to load animation for banana 
  bananaImage =  loadImage("banana.png");
  //to load animation of obstacles
  obstacleImage = loadImage("obstacle.png");
 
}
 

function setup() {

  //creating a monkey sprite
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;

  //creating a ground 
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x= ground.width/2;

  //add to groups
  bananaGroup = new Group();
  obstaclesGroup = new Group();
//survial time
  score = 0;
  

}


function draw() {
background("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  
  //to make move the ground 
  if(ground.x<0){
   ground.x = ground.width/2;
  }
  //to make the monkey jump
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  //to  monkey fall down after jumping
    monkey.velocityY = monkey.velocityY + 0.8;

  
  //stop monkey from falling down
  monkey.collide(ground);
  
  spawnFood();
  
  spawnObstacles();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  //if the monkey toches the obstacle the game will stop
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    
    
    }
  

  drawSprites();

}
//to draw banana 
function spawnFood(){
   if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
        //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
 
    //add each banana to the group
    bananaGroup.add(banana);
  }
  
}
//to create obstacles 
function spawnObstacles() {
if(frameCount % 300 === 0) {

 var obstacle = createSprite(800,320,10,40);
 
  obstacle.velocityX = -6 ; 
    //add image of obstacles
 obstacle.addImage(obstacleImage);
 obstacle.scale = 0.15;
  //assign a lifetime to the variable
  obstacle.lifetime = 300;
  monkey.depth = obstacle.depth+1
  

  
  //add each obstacle to group
  obstaclesGroup.add(obstacle);
}
}