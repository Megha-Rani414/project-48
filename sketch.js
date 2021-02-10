var backgroundImg,spaceship,spaceshipImg;
var form,doodle1,doodle1Img,doodle2,doodle2Img;
var doodle3,doodle3Img,doodle4,doodle4Img;
var doodle5,doodle5Img,doodle,monster,monsterGroup;
var monster1,monster1Img,monster2;
var monster2Img,monster3,monster3Img;
var monster4,monster4Img,monster5;
var monster5Img,monster6,monster6Img;
var backgroundSprite,wallGroup;
var wall1,wall1Img,wall2,wall2Img;
var wall3,wall3Img,wall,titleImg,playImg;
var JumpSound,FallSound,SpringSound;
var spring,springImg,ground,groundGroup;
var title,play,springGroup,doodleGroup,score=0;
var gamestate=1,invisibleGround,invisibleGroundGroup;
var reset,resetImg;

function preload(){

  backgroundImg = loadImage("background.png");
  spaceshipImg = loadImage("spaceship.png");

  doodle1Img = loadImage("doodle1.png");
  doodle2Img = loadImage("doodle2.png");
  doodle3Img = loadImage("doodle3.png");
  doodle4Img = loadImage("doodle4.png");
  doodle5Img = loadImage("doodle5.png");

  monster1Img = loadImage("monster1.png");
  monster2Img = loadImage("monster2.png");
  monster3Img = loadImage("monster3.png");
  monster4Img = loadImage("monster4.png");
  monster5Img = loadImage("monster5.png");
  monster6Img = loadImage("monster6.png");

  wall1Img = loadImage("wall1.png");
  wall2Img = loadImage("wall2.png");
  wall3Img = loadImage("wall3.png");

  springImg = loadImage("spring.png");
  titleImg = loadImage("title.png");
  playImg = loadImage("play.png");

  JumpSound = loadSound("jumpSound.mp4");
  FallSound = loadSound("fallSound.mp4");
  SpringSound = loadSound("springSound.mp4");

  resetImg = loadImage("reset.png");

}

function setup(){

  createCanvas(500,700);

  backgroundSprite = createSprite(250,350,500,700);
  backgroundSprite.addImage(backgroundImg);

  
     

  wallGroup = new Group();
  groundGroup = new Group();
  springGroup = new Group();
  doodleGroup = new Group();
  monsterGroup = new Group();
  invisibleGroundGroup = new Group();

  ground = createSprite(250,650,500,50);
  ground.shapeColor = "lavender";
  groundGroup.add(ground);
  

  randomDoodle();
  form();
  
}

function draw(){

  background(144,238,144);
  drawSprites();

  if(mousePressedOver(play)){
    Start();
    gamestate = 2;
  }

  if (gamestate === 2){

    backgroundSprite.velocityY = 3;

    backgroundSprite.visible = true;

    if(backgroundSprite.y > 400){
      backgroundSprite.y = 300;
    }

    spawnWalls();

    if(keyDown(RIGHT_ARROW)){
      doodle.x = doodle.x + 5;
    }

    if(keyDown(LEFT_ARROW)){
      doodle.x = doodle.x - 5;
    } 

    if(doodleGroup.y > 710){
      FallSound.play();
    }

    //if(keyDown("space")){
      //doodle.velocityY = -8;
    //}

    //if(keyWentDown("space")){
      //JumpSound.play();
    //}

    if(wallGroup.isTouching(doodle)){
      doodle.velocityY = -12;
      JumpSound.play();
      score++;
    }

    if(groundGroup.isTouching(doodle)){

      doodle.collide(ground);
      wallGroup.destroyEach();
      backgroundSprite.velocityY = 0;
      springGroup.destroyEach();
      invisibleGroundGroup.destroyEach();
      monsterGroup.destroyEach();
      resetgame();
      

    }

    if(doodle.x > 505){
      doodle.x = -5;
    }

    if(doodle.x < -5){
      doodle.x = 510;
    }

    if(doodle.y < -10){
      doodle.velocityY = 2;
    }

    if(frameCount % 400 === 0){

      spring = createSprite(wall.x + 5,wall.y - 5);
      spring.addImage(springImg);
      springGroup.add(spring);
      spring.scale = 0.5;
      spring.velocityY = 3;
      spring.lifetime = 285;
      spring.debug = false;
      spring.setCollider("rectangle",0,0,50,75);

    }

    if(springGroup.isTouching(doodle)){
      doodle.velocityY = -16;
      SpringSound.play();
      score = score + 2;
    }

    /* if(doodle.y > 700){

      //doodle.y = -10;
      FallSound.play();

      doodle.collide(ground);
      doodle.rotation = 90;
      wallGroup.destroyEach();
      springGroup.destroyEach();
      invisibleGroundGroup.destroyEach();
      monsterGroup.destroyEach();

    }  */

    if(invisibleGroundGroup.isTouching(doodleGroup)){
      //doodle.velocityY = 3;
      doodleGroup.setVelocityYEach(3)
      //console.log("HI");
    }

    doodle.velocityY = doodle.velocityY + 0.40;

    textSize(25);
    fill("red");
    text("Score: " + score,20,50);
 
    if(score > 20){
      spawnMonsters();
    }

     
    

  }
 

  if(mousePressedOver(reset)){
    //gamestate = 1;
    form();
    //console.log("HI");
  }

}

function  resetgame(){
  reset = createSprite(430,50,75,10);
      reset.addImage(resetImg);
      reset.scale = 0.8
  
  backgroundSprite.visible = false;

  wallGroup.destroyEach();
  springGroup.destroyEach();
  invisibleGroundGroup.destroyEach();
  monsterGroup.destroyEach();
  doodleGroup.destroyEach();

  fill("red");
  textSize(50);
  text("OH!!! GAME OVER!!!",20,350);
 

}
function randomDoodle(){

  doodle = createSprite(250,-400,50,50);
  doodle.scale = 0.3;
  doodleGroup.add(doodle);
  doodle.debug = false;
  doodle.setCollider("rectangle",0,0,200,190);
  
  var rand = Math.round(random(1,5));
  switch(rand){

    case 1 : doodle.addImage(doodle1Img);
    break;
    case 2 : doodle.addImage(doodle2Img);
    break;
    case 3 : doodle.addImage(doodle3Img);
    break;
    case 4 : doodle.addImage(doodle4Img);
    break;
    case 5 : doodle.addImage(doodle5Img);
    break; 

  }

}

function spawnWalls(){

  if(frameCount % 30 === 0){

    wall = createSprite(random(0,500),-20,20,10);
    wall.scale = 2;
    wall.velocityY = 3;
    wallGroup.add(wall);
    wall.lifetime = 285;
    var rand = Math.round(random(1,3));
    wall.debug = false;
    wall.setCollider("rectangle",2,0,28,6);

    switch(rand){

      case 1 : wall.addImage(wall1Img);
      break;
      case 2 : wall.addImage(wall2Img);
      break;
      case 3 : wall.addImage(wall3Img);
      break;

    }

    invisibleGround = createSprite(wall.x+5,wall.y+12,60,5);
    invisibleGroundGroup.add(invisibleGround);
    invisibleGround.velocityY = 3;
    invisibleGround.lifetime = 300;
    invisibleGround.debug = false;
    invisibleGround.visible = false;

  }

}

function form(){

  doodle2 = createSprite(100,375);
  doodle2.addImage(doodle2Img);
  doodle2.scale = 0.8;
  doodle2.rotation = 340;

  monster1 = createSprite(400,465);
  monster1.addImage(monster1Img);
  monster1.scale = 1.3;

  monster2 = createSprite(245,500);
  monster2.addImage(monster2Img);
  monster2.scale = 1.1;

  monster3 = createSprite(400,330);
  monster3.addImage(monster3Img);
  monster3.scale = 1.3;

  monster4 = createSprite(75,70);
  monster4.addImage(monster4Img);
  monster4.scale = 1.2;

  monster5 = createSprite(100,580);
  monster5.addImage(monster5Img);
  monster5.scale = 1.15;

  monster6 = createSprite(400,600);
  monster6.addImage(monster6Img);
  monster6.scale = 1.2;

  spaceship = createSprite(400,150);
  spaceship.addImage(spaceshipImg);

  title = createSprite(130,180);
  title.addImage(titleImg);

  play = createSprite(155,250,75,35);
  play.addImage(playImg);

}

function Start(){

  doodle2.visible=false;
  monster1.visible=false;
  monster2.visible=false;
  monster3.visible=false;
  monster4.visible=false;
  monster5.visible=false;
  monster6.visible=false;
  spaceship.visible=false;
  title.visible=false;
  play.visible=false;

}

function spawnMonsters(){

  if(frameCount % 450 === 0){

    monster = createSprite(random(0,500),-50);
    monster.velocityY = 3;
    monster.lifetime = 300;
    monsterGroup.add(monster);
    monster.debug = false;
    //monster.setCollider("rectangle",0,0,75,75);
    var rand = Math.round(random(1,6));
    switch(rand){

      case 1 : monster.addImage(monster1Img);
      break;
      case 2 : monster.addImage(monster2Img);
      break;
      case 3 : monster.addImage(monster3Img);
      break;
      case 4 : monster.addImage(monster4Img);
      break;
      case 5 : monster.addImage(monster5Img);
      break;
      case 6 : monster.addImage(monster6Img);
      break;

    }

  }

}
