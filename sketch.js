var ocean_img;
var ocean;
var plastic;
var plastic_img;
var fish1, fish2, fish3;
var plasticGroup;
var fishGroup;
var player, player_img;
function preload(){
  ocean_img = loadImage("images/ocean_image.png");
  plastic_img = loadImage("images/plastic_image.png")
  fish1 = loadImage("images/blue_fish.png")
  fish2 = loadImage("images/red_fish.png")
  fish3 = loadImage("images/small_fish.png")
  player_img = loadImage("images/player_image.png")


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 plasticGroup = new Group();
 fishGroup = new Group();
 ocean = createSprite(0,0,width, 100);
 ocean.scale = 1.8
 ocean.addImage(ocean_img);
 ocean.velocityY = -1;
 ocean.y = height/2;
 player = createSprite(width/2, height-100, 50,50);
 player.scale = 0.2;
 player.addImage(player_img);
}

function draw() {
  background(0);  
  if(ocean.y > -350){
    ocean.y = height/2;
  }
  if(plasticGroup.isTouching(fishGroup)){
    fishGroup.destroyEach();
  }
  if(keyDown(UP_ARROW)){
    player.y = player.y - 4;
  }
  if(keyDown(RIGHT_ARROW)){
    player.x = player.x + 4;
  }
  if(keyDown(DOWN_ARROW)){
    player.y = player.y + 4;
  }
  if(keyDown(LEFT_ARROW)){
    player.x = player.x - 4;
  }
  spawnFish();
  spawnPlastic();
  drawSprites();
}

function spawnPlastic(){
  if(frameCount% 90 === 0){
    plastic = createSprite(100,100,50,50);
    plastic.scale = 0.1
    plastic.addImage(plastic_img);
    plastic.y = Math.round(random(30,height-100))
    plastic.x = Math.round(random(200,width - 80))
    plastic.lifetime = 500;
    plastic.velocityY = 2
    plasticGroup.add(plastic);
  }
}
function spawnFish(){
  if(frameCount% 350 === 0){
    fish = createSprite(100,100,50,50);
    fish.scale = 0.2
    fish.y = Math.round(random(10, height - 100))
    fish.x = width - 200;
    fish.velocityX = -6
    var rand  = Math.round(random(1,3))
    switch(rand){
      case 1 : fish.addImage(fish1)
      break
      case 2 : fish.addImage(fish2)
      break
      case 3: fish.addImage(fish3)
      break
      default : break
    }
    fishGroup.add(fish)
  }
}