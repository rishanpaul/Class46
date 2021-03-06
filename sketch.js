var ocean_img;
var ocean;
var plastic;
var plastic_img;
var fish1, fish2, fish3;
var plasticGroup;
var fishGroup;
var player, player_img;
var plasticArray = []
var score = 0;
var fishArray = []
var gameState = "play"
var reset, reset_img;
function preload(){
  ocean_img = loadImage("images/ocean_image.png");
  plastic_img = loadImage("images/plastic_image.png")
  fish1 = loadImage("images/blue_fish.png")
  fish2 = loadImage("images/red_fish.png")
  fish3 = loadImage("images/small_fish.png")
  player_img = loadImage("images/player_image.png")
  reset_img = loadImage("images/reset_button.png")


}

function setup() {
  createCanvas(windowWidth, windowHeight);
 fishGroup = new Group();
 ocean = createSprite(0,0,width, height);
 ocean.scale = 1.8
 ocean.addImage(ocean_img);
 ocean.y = height/2;
 player = createSprite(width/2, height-100, 50,50);
 player.scale = 0.2;
 player.addImage(player_img);
 reset = createSprite(width/2, height/2 + 10, 50, 50);
 reset.addImage(reset_img);
 reset.scale = 0.3
 reset.visible = false;
}

function draw() {
  background(0);  
  console.log(score);
if (gameState === "play"){
  if(ocean.y > -350){
    ocean.y = height/2;
  }
  if(keyDown(UP_ARROW)){
    player.y = player.y - 5;
  }
  if(keyDown(RIGHT_ARROW)){
    player.x = player.x + 5;
  }
  if(keyDown(DOWN_ARROW)){
    player.y = player.y + 5;
  }
  if(keyDown(LEFT_ARROW)){
    player.x = player.x - 5;
  }
    if (plasticArray !== []) {
        for (var i = 0; i < plasticArray.length; i++) {
            if (player.isTouching(plasticArray[i])) {
                plasticArray[i].destroy();
                score = score + 10;
            }
        }
      
}
if (fishArray !== []) {
  for (var i = 0; i < fishArray.length; i++) {
      if (player.isTouching(fishArray[i])) {
          fishArray[i].destroy();
          score = score - 50;
      }
  }

}
if (score < 0) {
  gameState = "end"
}
  spawnFish();
  drawSprites();
  spawnPlastic();
}
else if (gameState === "end") {
  textSize(50)
  stroke("Red")
  text("You Lose!", width/2, height/2)
  if(mousePressedOver(reset)){
    restart()
  }
}
  textSize(20)
  stroke("Green");
  text("Score: " + score, 80,80)
}
function restart(){
  score = 0;
  gameState = "play";
  reset.visible = false
}

function spawnPlastic(){
  if(frameCount% 90 === 0){
    plastic = createSprite(100,100,50,50)
    plastic.scale = 0.1
    plastic.addImage(plastic_img);
    plastic.y = Math.round(random(30,height-300))
    plastic.x = Math.round(random(200,width - 80))
    plastic.lifetime = 400;
    plastic.velocityY = 2
    plasticArray.push(plastic);
    console.log(plasticArray);
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
    fishArray.push(fish);
  }
}